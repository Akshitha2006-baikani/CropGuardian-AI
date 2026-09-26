const DashboardModule = (function() {
  const fieldGroups = {
    farmer: ['farmerName', 'farmerPhone', 'farmerEmail', 'farmerLocation', 'preferredLanguage'],
    farm: ['farmName', 'farmLocation', 'farmSize', 'primaryCrop', 'growthStage', 'irrigationMethod', 'soilType', 'plantingDate']
  };
  let weatherCache = { location: '', data: null, promise: null };
  const WEATHER_STALE_MS = 3 * 60 * 60 * 1000;

  function init() {
    bindForm('farmerProfileForm', 'farmer', 'farmerProfileStatus');
    bindForm('farmProfileForm', 'farm', 'farmProfileStatus');
    const refreshButton = document.getElementById('btnRefreshWeather');
    if (refreshButton) {
      refreshButton.addEventListener('click', () => loadWeather(StorageModule.getFarm().location, true));
    }
    loadForm('farmer', StorageModule.getProfile());
    loadForm('farm', StorageModule.getFarm());
    bindFormNavigation();
    renderAll();
    document.addEventListener('cropguardian:languagechange', renderAll);
  }

  function bindForm(formId, type, statusId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const validationError = validateProfile(type, data);
      const status = document.getElementById(statusId);
      if (validationError) {
        I18nModule.setText(status, validationError);
        return;
      }
      const saved = type === 'farmer' ? StorageModule.saveProfile(data) : StorageModule.saveFarm(data);
      I18nModule.setText(status, saved ? 'Saved on this device.' : 'Unable to save. Check browser storage settings.');
      if (saved && type === 'farmer' && ['en', 'te', 'hi'].includes(data.preferredLanguage)) {
        I18nModule.setLanguage(data.preferredLanguage);
      }
      if (saved) renderAll();
    });
  }

  function validateProfile(type, data) {
    const trim = value => (value || '').trim();
    if (type === 'farmer' && trim(data.name).length > 100) return 'Name must be 100 characters or fewer.';
    if (type === 'farm' && trim(data.location).length > 120) return 'Farm location must be 120 characters or fewer.';
    if (type === 'farm' && data.primaryCrop && !['Tomato', 'Rice (Paddy)', 'Cotton', 'Potato'].includes(data.primaryCrop)) {
      return 'Please select a supported diagnostic crop.';
    }
    Object.keys(data).forEach(key => { data[key] = trim(data[key]); });
    return null;
  }

  function loadForm(type, data) {
    fieldGroups[type].forEach((id) => {
      const input = document.getElementById(id);
      if (input) {
        const savedValue = data[input.name] || '';
        input.value = input.name === 'preferredLanguage'
          ? ({ English: 'en', Telugu: 'te', Hindi: 'hi' }[savedValue] || savedValue)
          : savedValue;
      }
    });
  }

  function bindFormNavigation() {
    document.querySelectorAll('[href="#history"]').forEach(link => {
      link.addEventListener('click', () => renderHistory());
    });
  }

  function renderAll() {
    const profile = StorageModule.getProfile();
    const farm = StorageModule.getFarm();
    const scans = StorageModule.getScans();
    const latest = scans[0];

    text('dashboardFarmerName', AuthModule.getUser()?.name || profile.name || 'farmer');
    text('dashboardFarmName', farm.farmName || 'Not set');
    text('dashboardFarmLocation', farm.location || 'Add your farm location in your profile.');
    text('dashboardPrimaryCrop', I18nModule.translateText('Primary crop: {crop}', { crop: farm.primaryCrop || I18nModule.translateText('Not set') }));
    text('dashboardFarmSize', I18nModule.translateText('Size: {size}', { size: farm.farmSize || I18nModule.translateText('Not set') }));

    if (latest) {
      text('dashboardHealthValue', I18nModule.translateText(latest.severity === 'Healthy' ? 'Healthy' : latest.riskLevel || 'Monitor'));
      text('dashboardHealthText', `${I18nModule.translateText(latest.crop)} · ${I18nModule.translateText('AI confidence')} ${latest.confidence}%`);
      text('dashboardRiskValue', `${latest.riskScore}/100`);
      const weatherInfluence = latest.weatherFactors?.length ? ` ${I18nModule.translateText('Weather influence: elevated conditions.')}` : '';
      const weatherAvailability = latest.weather ? '' : ` ${I18nModule.translateText('Weather data unavailable; this assessment uses scan information.')}`;
      text('dashboardRiskText', `${I18nModule.translateText(`${latest.riskLevel} risk.`)} ${I18nModule.t('riskAssessment')}${weatherInfluence}${weatherAvailability}`);
      text('dashboardScanValue', I18nModule.translateText(latest.disease));
      text('dashboardScanText', `${I18nModule.translateText(latest.crop)} · ${I18nModule.translateText(latest.mode === 'demo' ? 'Demo Mode' : 'AI Analysis')}`);
      text('dashboardRecommendationTitle', I18nModule.translateText(latest.disease === 'Healthy Tomato Leaf' ? 'Continue monitoring' : 'Review scan guidance'));
      text('dashboardRecommendationText', I18nModule.translateText(latest.recommendation || 'Open the saved result for treatment and prevention guidance.'));
    } else {
      text('dashboardHealthValue', 'Not set');
      text('dashboardHealthText', 'Start your first crop scan.');
      text('dashboardRiskValue', 'Not set');
      text('dashboardRiskText', 'Risk assessment based on available scan information.');
      text('dashboardScanValue', 'No scans yet');
      text('dashboardScanText', 'Your saved scans will appear here.');
      text('dashboardRecommendationTitle', 'No recommendation yet');
      text('dashboardRecommendationText', 'Complete a scan to receive crop-specific guidance.');
    }

    renderRecentScans(scans);
    renderHistory(scans);
    loadWeather(farm.location);
  }

  function loadWeather(location, force = false) {
    const state = document.getElementById('dashboardWeatherState');
    const data = document.getElementById('dashboardWeatherData');
    const status = document.getElementById('dashboardWeatherStatus');
    if (!state || !data) return Promise.resolve(null);
    data.hidden = true;
    state.hidden = false;
    if (!location) {
      if (status) status.textContent = I18nModule.translateText('Location needed');
      state.textContent = I18nModule.translateText('Add your farm location to view weather.');
      return Promise.resolve(null);
    }
    if (!force && weatherCache.data && weatherCache.location === location) {
      renderWeather(weatherCache.data);
      return Promise.resolve(weatherCache.data);
    }
    if (!force && weatherCache.promise && weatherCache.location === location) return weatherCache.promise;
    if (status) status.textContent = I18nModule.translateText('Updating...');
    state.textContent = I18nModule.translateText('Updating weather...');
    weatherCache.location = location;
    weatherCache.promise = CropGuardianAPI.getWeather(location)
      .then(weather => {
        if (weather.available) weatherCache.data = weather;
        renderWeather(weather);
        return weather.available ? weather : null;
      })
      .catch(() => {
        if (weatherCache.data && weatherCache.location === location) {
          renderWeather(weatherCache.data, true);
          return weatherCache.data;
        }
        renderWeather({ available: false, message: I18nModule.t('weatherUnavailable') });
        return null;
      })
      .finally(() => { weatherCache.promise = null; });
    return weatherCache.promise;
  }

  function renderWeather(weather, stale = false) {
    const state = document.getElementById('dashboardWeatherState');
    const data = document.getElementById('dashboardWeatherData');
    const status = document.getElementById('dashboardWeatherStatus');
    if (!state || !data) return;
    if (!weather || !weather.available) {
      data.hidden = true;
      state.hidden = false;
      state.textContent = weather?.message ? I18nModule.translateText(weather.message) : I18nModule.t('weatherUnavailable');
      if (status) status.textContent = I18nModule.translateText('Unavailable');
      return;
    }
    const timestamp = Date.parse(weather.timestamp || '');
    const isStale = stale || !Number.isFinite(timestamp) || Date.now() - timestamp > WEATHER_STALE_MS;
    state.hidden = true;
    data.hidden = false;
    if (status) status.textContent = I18nModule.translateText(isStale ? 'Stale data' : 'Available');
    text('dashboardTemperature', weather.temperature == null ? 'Not set' : `${weather.temperature}°C`);
    text('dashboardCondition', I18nModule.translateText(weather.condition || 'Condition not set'));
    text('dashboardHumidity', I18nModule.translateText('Humidity: {value}', { value: weather.humidity == null ? I18nModule.translateText('Not set') : weather.humidity + '%' }));
    text('dashboardRain', I18nModule.translateText('Rain chance: {value}', { value: weather.rainProbability == null ? I18nModule.translateText('Not set') : weather.rainProbability + '%' }));
    text('dashboardRainfall', I18nModule.translateText('Rainfall: {value}', { value: weather.rainfall == null ? I18nModule.translateText('Not set') : weather.rainfall + ' mm' }));
    text('dashboardWind', I18nModule.translateText('Wind: {value}', { value: weather.windSpeed == null ? I18nModule.translateText('Not set') : weather.windSpeed + ' km/h' }));
    text('dashboardWeatherUpdated', isStale ? I18nModule.translateText('Updated earlier') : `${I18nModule.translateText('Updated')} ${new Date(weather.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
  }

  function renderRecentScans(scans) {
    const container = document.getElementById('dashboardRecentScans');
    if (!container) return;
    container.textContent = '';
    if (!scans.length) {
      container.textContent = I18nModule.translateText('No scans yet. Start your first crop scan.');
      return;
    }
    scans.slice(0, 3).forEach(scan => container.appendChild(scanRow(scan, false)));
  }

  function renderHistory(scans = StorageModule.getScans()) {
    const container = document.getElementById('fullHistoryList');
    if (!container) return;
    container.textContent = '';
    if (!scans.length) {
      const empty = document.createElement('div');
      empty.className = 'history-empty glass-card';
      empty.textContent = I18nModule.translateText('No scans yet. Complete a demo or AI analysis and save the result here.');
      container.appendChild(empty);
      return;
    }
    scans.forEach(scan => container.appendChild(scanRow(scan, true)));
  }

  function scanRow(scan, showDelete) {
    const row = document.createElement('article');
    row.className = 'full-history-row glass-card';
    const details = document.createElement('div');
    details.className = 'history-row-details';
    const title = document.createElement('h3');
    title.textContent = `${I18nModule.translateText(scan.crop)}: ${I18nModule.translateText(scan.disease)}`;
    const meta = document.createElement('p');
    meta.textContent = I18nModule.translateText('Recorded: {date} at {time} · AI confidence {confidence}% · Severity {severity}', {
      date: scan.date || I18nModule.translateText('Date not set'),
      time: scan.time || '',
      confidence: scan.confidence,
      severity: I18nModule.translateText(scan.severity || 'Not set')
    });
    details.append(title, meta);
    const score = document.createElement('strong');
    score.className = 'history-row-score';
    score.textContent = `${scan.riskScore}/100 ${I18nModule.translateText(scan.riskLevel)}`;
    row.append(details, score);
    if (showDelete) {
      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-secondary history-delete-button';
      deleteButton.type = 'button';
      deleteButton.textContent = I18nModule.translateText('Delete');
      deleteButton.addEventListener('click', () => {
        if (StorageModule.deleteScan(scan.id)) {
          if (AuthModule.isAuthenticated()) AuthModule.deleteAnalysis(scan.id);
          renderAll();
        }
      });
      row.appendChild(deleteButton);
    }
    return row;
  }

  function text(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = I18nModule.translateText(value);
  }

  return { init, renderAll, renderHistory, getWeather: loadWeather };
})();
