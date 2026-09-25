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
        if (status) status.textContent = validationError;
        return;
      }
      const saved = type === 'farmer' ? StorageModule.saveProfile(data) : StorageModule.saveFarm(data);
      if (status) status.textContent = saved ? 'Saved on this device.' : 'Unable to save. Check browser storage settings.';
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
      if (input) input.value = data[input.name] || '';
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

    text('dashboardFarmerName', profile.name || 'farmer');
    text('dashboardFarmName', farm.farmName || 'Not set');
    text('dashboardFarmLocation', farm.location || 'Add your farm location in your profile.');
    text('dashboardPrimaryCrop', `Primary crop: ${farm.primaryCrop || 'Not set'}`);
    text('dashboardFarmSize', `Size: ${farm.farmSize || 'Not set'}`);

    if (latest) {
      text('dashboardHealthValue', latest.severity === 'Healthy' ? 'Healthy' : latest.riskLevel || 'Monitor');
      text('dashboardHealthText', `${latest.crop} · AI confidence ${latest.confidence}%`);
      text('dashboardRiskValue', `${latest.riskScore}/100`);
      const weatherInfluence = latest.weatherFactors?.length ? ' Weather influence: elevated conditions.' : '';
      const weatherAvailability = latest.weather ? '' : ' Weather data unavailable; this assessment uses scan information.';
      text('dashboardRiskText', `${latest.riskLevel} risk. Risk assessment based on available scan information.${weatherInfluence}${weatherAvailability}`);
      text('dashboardScanValue', latest.disease);
      text('dashboardScanText', `${latest.crop} · ${latest.mode === 'demo' ? 'Demo Mode' : 'AI Analysis'}`);
      text('dashboardRecommendationTitle', latest.disease === 'Healthy Tomato Leaf' ? 'Continue monitoring' : 'Review scan guidance');
      text('dashboardRecommendationText', latest.recommendation || 'Open the saved result for treatment and prevention guidance.');
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
      if (status) status.textContent = 'Location needed';
      state.textContent = 'Add your farm location to view weather.';
      return Promise.resolve(null);
    }
    if (!force && weatherCache.data && weatherCache.location === location) {
      renderWeather(weatherCache.data);
      return Promise.resolve(weatherCache.data);
    }
    if (!force && weatherCache.promise && weatherCache.location === location) return weatherCache.promise;
    if (status) status.textContent = 'Updating...';
    state.textContent = 'Updating weather...';
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
        renderWeather({ available: false, message: 'Weather service is currently unavailable.' });
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
      state.textContent = weather?.message || 'Weather service is currently unavailable.';
      if (status) status.textContent = 'Unavailable';
      return;
    }
    const timestamp = Date.parse(weather.timestamp || '');
    const isStale = stale || !Number.isFinite(timestamp) || Date.now() - timestamp > WEATHER_STALE_MS;
    state.hidden = true;
    data.hidden = false;
    if (status) status.textContent = isStale ? 'Stale data' : 'Available';
    text('dashboardTemperature', weather.temperature == null ? 'Not set' : `${weather.temperature}°C`);
    text('dashboardCondition', weather.condition || 'Condition not set');
    text('dashboardHumidity', `Humidity: ${weather.humidity == null ? 'Not set' : weather.humidity + '%'}`);
    text('dashboardRain', `Rain chance: ${weather.rainProbability == null ? 'Not set' : weather.rainProbability + '%'}`);
    text('dashboardRainfall', `Rainfall: ${weather.rainfall == null ? 'Not set' : weather.rainfall + ' mm'}`);
    text('dashboardWind', `Wind: ${weather.windSpeed == null ? 'Not set' : weather.windSpeed + ' km/h'}`);
    text('dashboardWeatherUpdated', isStale ? 'Updated earlier' : `Updated ${new Date(weather.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
  }

  function renderRecentScans(scans) {
    const container = document.getElementById('dashboardRecentScans');
    if (!container) return;
    container.textContent = '';
    if (!scans.length) {
      container.textContent = 'No scans yet. Start your first crop scan.';
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
      empty.textContent = 'No scans yet. Complete a demo or AI analysis and save the result here.';
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
    title.textContent = `${scan.crop}: ${scan.disease}`;
    const meta = document.createElement('p');
    meta.textContent = `${scan.date || 'Date not set'} · ${scan.mode === 'demo' ? 'Demo Mode' : 'AI Analysis'} · AI confidence ${scan.confidence}% · Severity ${scan.severity || 'Not set'}`;
    details.append(title, meta);
    const score = document.createElement('strong');
    score.className = 'history-row-score';
    score.textContent = `${scan.riskScore}/100 ${scan.riskLevel}`;
    row.append(details, score);
    if (showDelete) {
      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-secondary history-delete-button';
      deleteButton.type = 'button';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        if (StorageModule.deleteScan(scan.id)) renderAll();
      });
      row.appendChild(deleteButton);
    }
    return row;
  }

  function text(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  return { init, renderAll, renderHistory, getWeather: loadWeather };
})();
