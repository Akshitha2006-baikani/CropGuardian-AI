const I18nModule = (function() {
  const translations = {
    en: {
      dashboard: 'Dashboard', home: 'Home', scan: 'Scan', history: 'History', farmProfile: 'Farm Profile',
      scanCrop: 'Scan a Crop', viewHistory: 'View Scan History', fieldOverview: 'Field overview',
      dashboardGreeting: 'Good morning, {name}.', cropHealth: 'Crop health', latestRisk: 'Latest risk',
      latestScan: 'Latest scan', weatherContext: 'Weather context', recommendation: 'Recommendation',
      alerts: 'Alerts', recentScans: 'Recent scans', noScans: 'No scans yet. Start your first crop scan.',
      startScan: 'Start your first crop scan.', addLocation: 'Add your farm location to view weather.',
      weatherUnavailable: 'Weather service is currently unavailable.', updatingWeather: 'Updating weather...',
      refreshWeather: 'Refresh weather', scanYourCrop: 'Scan Your Crop', analyzeCrop: 'Analyze Crop',
      selectCrop: 'Crop being scanned', demoMode: 'Demo Mode', aiAnalysis: 'AI Analysis',
      aiConfidence: 'AI confidence', estimatedSeverity: 'Estimated Severity', symptoms: 'Visible Pathology:',
      demoConfidenceNote: 'Demo Mode estimate; not calibrated confidence.', aiConfidenceNote: 'External AI confidence; not a guarantee.',
      riskAssessment: 'Risk assessment based on the available scan information.',
      treatment: 'Treatment', prevention: 'Prevention Tips', assistant: 'Agricultural assistant',
      assistantIntro: 'Ask a question about your current crop context.', assistantPlaceholder: 'Ask about your crop...',
      send: 'Send', thinking: 'Assistant is thinking...', assistantUnavailable: 'The AI assistant is unavailable right now.',
      assistantEmptyQuestion: 'Please enter a question first.', assistantQuestionTooLong: 'Please keep your question under 1000 characters.',
      fallbackLabel: 'Deterministic guidance (AI unavailable)', aiLabel: 'AI-generated guidance',
      quickNow: 'What should I do now?', quickMonitor: 'What should I monitor?', quickRescan: 'When should I scan again?',
      saveSnapshot: 'Save Crop Snapshot', scanAnother: 'Scan Another Crop', weatherUnavailableShort: 'Weather context unavailable.'
    },
    te: {
      dashboard: 'డాష్‌బోర్డ్', home: 'హోమ్', scan: 'స్కాన్', history: 'చరిత్ర', farmProfile: 'వ్యవసాయ ప్రొఫైల్',
      scanCrop: 'పంటను స్కాన్ చేయండి', viewHistory: 'స్కాన్ చరిత్రను చూడండి', fieldOverview: 'పొలం అవలోకనం',
      dashboardGreeting: 'శుభోదయం, {name}.', cropHealth: 'పంట ఆరోగ్యం', latestRisk: 'తాజా ప్రమాదం',
      latestScan: 'తాజా స్కాన్', weatherContext: 'వాతావరణ సమాచారం', recommendation: 'సిఫార్సు',
      alerts: 'హెచ్చరికలు', recentScans: 'ఇటీవలి స్కాన్లు', noScans: 'ఇంకా స్కాన్లు లేవు. మొదటి పంట స్కాన్‌ను ప్రారంభించండి.',
      startScan: 'మీ మొదటి పంట స్కాన్‌ను ప్రారంభించండి.', addLocation: 'వాతావరణం చూడటానికి మీ పొలం ప్రాంతాన్ని జోడించండి.',
      weatherUnavailable: 'వాతావరణ సేవ ప్రస్తుతం అందుబాటులో లేదు.', updatingWeather: 'వాతావరణాన్ని నవీకరిస్తోంది...',
      refreshWeather: 'వాతావరణాన్ని రిఫ్రెష్ చేయండి', scanYourCrop: 'మీ పంటను స్కాన్ చేయండి', analyzeCrop: 'పంటను విశ్లేషించండి',
      selectCrop: 'స్కాన్ చేస్తున్న పంట', demoMode: 'డెమో మోడ్', aiAnalysis: 'AI విశ్లేషణ',
      aiConfidence: 'AI నమ్మకం', estimatedSeverity: 'అంచనా తీవ్రత', symptoms: 'కనిపించే లక్షణాలు:',
      demoConfidenceNote: 'డెమో మోడ్ అంచనా; ఇది కేలిబ్రేట్ చేసిన నమ్మకం కాదు.', aiConfidenceNote: 'బాహ్య AI నమ్మకం; ఇది హామీ కాదు.',
      riskAssessment: 'అందుబాటులో ఉన్న స్కాన్ సమాచారం ఆధారంగా ప్రమాద అంచనా.',
      treatment: 'చికిత్స', prevention: 'నివారణ సూచనలు', assistant: 'వ్యవసాయ సహాయకుడు',
      assistantIntro: 'మీ ప్రస్తుత పంట సమాచారం గురించి ప్రశ్న అడగండి.', assistantPlaceholder: 'మీ పంట గురించి అడగండి...',
      send: 'పంపండి', thinking: 'సహాయకుడు ఆలోచిస్తున్నాడు...', assistantUnavailable: 'AI సహాయకుడు ప్రస్తుతం అందుబాటులో లేదు.',
      assistantEmptyQuestion: 'ముందుగా ఒక ప్రశ్నను నమోదు చేయండి.', assistantQuestionTooLong: 'మీ ప్రశ్నను 1000 అక్షరాల లోపు ఉంచండి.',
      fallbackLabel: 'సాధారణ మార్గదర్శకం (AI అందుబాటులో లేదు)', aiLabel: 'AI రూపొందించిన మార్గదర్శకం',
      quickNow: 'ఇప్పుడు ఏమి చేయాలి?', quickMonitor: 'ఏమి గమనించాలి?', quickRescan: 'మళ్లీ ఎప్పుడు స్కాన్ చేయాలి?',
      saveSnapshot: 'పంట స్నాప్‌షాట్‌ను సేవ్ చేయండి', scanAnother: 'మరో పంటను స్కాన్ చేయండి', weatherUnavailableShort: 'వాతావరణ సమాచారం అందుబాటులో లేదు.'
    },
    hi: {
      dashboard: 'डैशबोर्ड', home: 'होम', scan: 'स्कैन', history: 'इतिहास', farmProfile: 'खेत प्रोफ़ाइल',
      scanCrop: 'फसल स्कैन करें', viewHistory: 'स्कैन इतिहास देखें', fieldOverview: 'खेत का अवलोकन',
      dashboardGreeting: 'सुप्रभात, {name}.', cropHealth: 'फसल स्वास्थ्य', latestRisk: 'नवीनतम जोखिम',
      latestScan: 'नवीनतम स्कैन', weatherContext: 'मौसम संदर्भ', recommendation: 'सिफारिश',
      alerts: 'अलर्ट', recentScans: 'हाल के स्कैन', noScans: 'अभी कोई स्कैन नहीं है। अपना पहला फसल स्कैन शुरू करें।',
      startScan: 'अपना पहला फसल स्कैन शुरू करें।', addLocation: 'मौसम देखने के लिए अपने खेत का स्थान जोड़ें।',
      weatherUnavailable: 'मौसम सेवा अभी उपलब्ध नहीं है।', updatingWeather: 'मौसम अपडेट हो रहा है...',
      refreshWeather: 'मौसम रीफ्रेश करें', scanYourCrop: 'अपनी फसल स्कैन करें', analyzeCrop: 'फसल का विश्लेषण करें',
      selectCrop: 'स्कैन की जा रही फसल', demoMode: 'डेमो मोड', aiAnalysis: 'AI विश्लेषण',
      aiConfidence: 'AI भरोसा', estimatedSeverity: 'अनुमानित गंभीरता', symptoms: 'दिखने वाले लक्षण:',
      demoConfidenceNote: 'डेमो मोड अनुमान; यह कैलिब्रेटेड भरोसा नहीं है।', aiConfidenceNote: 'बाहरी AI भरोसा; यह गारंटी नहीं है।',
      riskAssessment: 'उपलब्ध स्कैन जानकारी के आधार पर जोखिम आकलन।',
      treatment: 'उपचार', prevention: 'बचाव के सुझाव', assistant: 'कृषि सहायक',
      assistantIntro: 'अपनी वर्तमान फसल जानकारी के बारे में प्रश्न पूछें।', assistantPlaceholder: 'अपनी फसल के बारे में पूछें...',
      send: 'भेजें', thinking: 'सहायक सोच रहा है...', assistantUnavailable: 'AI सहायक अभी उपलब्ध नहीं है।',
      assistantEmptyQuestion: 'पहले अपना प्रश्न दर्ज करें।', assistantQuestionTooLong: 'अपना प्रश्न 1000 अक्षरों से कम रखें।',
      fallbackLabel: 'सामान्य मार्गदर्शन (AI उपलब्ध नहीं)', aiLabel: 'AI द्वारा बनाया गया मार्गदर्शन',
      quickNow: 'अभी क्या करना चाहिए?', quickMonitor: 'क्या निगरानी करनी चाहिए?', quickRescan: 'दोबारा स्कैन कब करें?',
      saveSnapshot: 'फसल स्नैपशॉट सेव करें', scanAnother: 'दूसरी फसल स्कैन करें', weatherUnavailableShort: 'मौसम संदर्भ उपलब्ध नहीं है।'
    }
  };
  let language = 'en';

  function init() {
    language = StorageModule.getLanguage();
    const selector = document.getElementById('languageSelect');
    if (selector) {
      selector.value = language;
      selector.addEventListener('change', () => setLanguage(selector.value));
    }
    applyLanguage();
  }

  function setLanguage(nextLanguage) {
    if (!translations[nextLanguage]) return;
    language = nextLanguage;
    StorageModule.saveLanguage(language);
    const selector = document.getElementById('languageSelect');
    if (selector) selector.value = language;
    applyLanguage();
    document.dispatchEvent(new CustomEvent('cropguardian:languagechange', { detail: { language } }));
  }

  function applyLanguage() {
    document.documentElement.lang = language === 'te' ? 'te' : language === 'hi' ? 'hi' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = t(element.dataset.i18n);
      if (value) element.textContent = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });
  }

  function t(key, fallback = key) {
    return translations[language]?.[key] || translations.en[key] || fallback;
  }

  function getLanguage() {
    return language;
  }

  return { init, setLanguage, getLanguage, t, translations };
})();
