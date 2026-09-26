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
      assistantWelcome: 'Hello! Ask me about crop health, pests, irrigation, fertilizer, or weather guidance.', assistantRetry: 'Retry',
      clearChat: 'Clear chat', chatSaveFailed: 'Your response is shown, but could not be synced to your account.',
      startVoice: 'Start voice input', stopVoice: 'Stop voice input', stopSpeaking: 'Stop speaking',
      voiceUnsupported: 'Voice input is not supported in this browser.', voiceOutputUnsupported: 'Speech output is not supported in this browser.',
      voiceLanguageUnsupported: 'Voice input supports English and Telugu. Change the selected language to use voice.',
      voiceListening: 'Listening...', voiceTranscriptReady: 'Transcript ready. Review it and send when you are ready.',
      voicePermissionDenied: 'Microphone permission was denied. Allow microphone access in your browser settings.',
      voiceNoSpeech: 'No speech was detected. Try again.', voiceInputError: 'Voice input failed. Check microphone access and try again.',
      send: 'Send', thinking: 'Assistant is thinking...', assistantUnavailable: 'The AI assistant is unavailable right now.',
      assistantEmptyQuestion: 'Please enter a question first.', assistantQuestionTooLong: 'Please keep your question under 1000 characters.',
      fallbackLabel: 'Deterministic guidance (AI unavailable)', aiLabel: 'AI-generated guidance',
      quickNow: 'What should I do now?', quickMonitor: 'What should I monitor?', quickRescan: 'When should I scan again?',
      saveSnapshot: 'Save Crop Snapshot', scanAnother: 'Scan Another Crop', weatherUnavailableShort: 'Weather context unavailable.',
      phrases: {
        'Language': 'Language', 'Select language': 'Select language', 
        'Farm profile': 'Farm profile', 'Saved Snapshots History': 'Saved Snapshots History', 'View Saved Snapshots': 'View Saved Snapshots',
        'AI Settings / API Key': 'AI Settings / API Key', 'Open AI Settings': 'Open AI Settings', 'Toggle navigation menu': 'Toggle navigation menu',
        'Farm summary': 'Farm summary', 'Not set': 'Not set', 'Primary crop: Not set': 'Primary crop: Not set', 'Size: Not set': 'Size: Not set',
        'Edit farm profile': 'Edit farm profile', 'Start your first crop scan.': 'Start your first crop scan.',
        'Risk assessment based on available scan information.': 'Risk assessment based on available scan information.',
        'Your saved scans will appear here.': 'Your saved scans will appear here.', 'Not configured': 'Not configured',
        'Location needed': 'Location needed', 'Add your farm location to view weather.': 'Add your farm location to view weather.',
        'Humidity: Not set': 'Humidity: Not set', 'Rain chance: Not set': 'Rain chance: Not set', 'Rainfall: Not set': 'Rainfall: Not set', 'Wind: Not set': 'Wind: Not set',
        'What needs attention': 'What needs attention', 'No alerts yet. Alerts will appear after a high-risk scan or configured weather check.': 'No alerts yet. Alerts will appear after a high-risk scan or configured weather check.',
        'Your field history': 'Your field history', 'View all': 'View all', 'Complete a scan to receive crop-specific guidance.': 'Complete a scan to receive crop-specific guidance.',
        'Guidance is informational. Consult a local agriculture expert and follow product labels/local guidance.': 'Guidance is informational. Consult a local agriculture expert and follow product labels/local guidance.',
        'Your field record': 'Your field record', 'Farmer & farm profile': 'Farmer & farm profile', 'Keep your context close to the recommendations. Nothing is assumed or pre-filled.': 'Keep your context close to the recommendations. Nothing is assumed or pre-filled.',
        'Farmer profile': 'Farmer profile', 'About you': 'About you', 'Name': 'Name', 'Phone': 'Phone', 'Email': 'Email', 'Location': 'Location', 'Preferred language': 'Preferred language', 'Save farmer profile': 'Save farmer profile',
        'Farm profile': 'Farm profile', 'About your field': 'About your field', 'Farm name': 'Farm name', 'Farm size': 'Farm size', 'Primary crop': 'Primary crop', 'Growth stage': 'Growth stage', 'Irrigation method': 'Irrigation method', 'Soil type': 'Soil type', 'Planting date': 'Planting date', 'Save farm profile': 'Save farm profile',
        'AI-Powered Agricultural Decision Support': 'AI-Powered Agricultural Decision Support', 'Protect Your Harvest.': 'Protect Your Harvest.', 'AI-powered crop disease detection that helps farmers identify potential problems early and understand what action to take next.': 'AI-powered crop disease detection that helps farmers identify potential problems early and understand what action to take next.',
        'Scan My Crop': 'Scan My Crop', 'How It Works': 'How It Works', 'Multi-Crop Disease Support': 'Multi-Crop Disease Support', 'Instant Risk Score': 'Instant Risk Score', 'Farmer Support Portals': 'Farmer Support Portals',
        'Tomato Early Blight': 'Tomato Early Blight', '94% Match': '94% Match', 'Crop Risk Meter': 'Crop Risk Meter', '81/100 Indicative Risk': '81/100 Indicative Risk',
        'Early Detection': 'Early Detection', 'Detect foliar pathogens at initial symptom onset before widespread field contagion occurs.': 'Detect foliar pathogens at initial symptom onset before widespread field contagion occurs.',
        'AI-Powered Analysis': 'AI-Powered Analysis', 'AI-assisted analysis evaluates leaf patterns, discoloration, and visible lesion characteristics.': 'AI-assisted analysis evaluates leaf patterns, discoloration, and visible lesion characteristics.',
        'Actionable Guidance': 'Actionable Guidance', 'Decision-support risk scores, treatment windows, prevention tips, and verified support schemes.': 'Decision-support risk scores, treatment windows, prevention tips, and verified support schemes.',
        'System Workflow': 'System Workflow', 'Detect → Understand → Act': 'Detect → Understand → Act', 'A streamlined, 3-step decision support process designed for fast field diagnostics.': 'A streamlined, 3-step decision support process designed for fast field diagnostics.',
        '01 — SCAN': '01 — SCAN', '02 — ANALYZE': '02 — ANALYZE', '03 — ACT': '03 — ACT', 'STEP 01': 'STEP 01', 'STEP 02': 'STEP 02', 'STEP 03': 'STEP 03',
        'Capture or select a clear image of an affected leaf using your mobile camera or file picker.': 'Capture or select a clear image of an affected leaf using your mobile camera or file picker.',
        'AI-assisted analysis evaluates visible lesion patterns and crop symptoms to support condition and severity assessment.': 'AI-assisted analysis evaluates visible lesion patterns and crop symptoms to support condition and severity assessment.',
        'Receive your Crop Risk Score, treatment window, prevention tips, and relevant government schemes.': 'Receive your Crop Risk Score, treatment window, prevention tips, and relevant government schemes.',
        'AI Crop Diagnostics': 'AI Crop Diagnostics', 'Capture a clear image of an affected leaf for instant AI analysis and risk evaluation.': 'Capture a clear image of an affected leaf for instant AI analysis and risk evaluation.',
        'Upload crop leaf photo': 'Upload crop leaf photo', 'Click or drag and drop leaf photo': 'Click or drag and drop leaf photo', 'Drag & Drop Leaf Photo Here': 'Drag & Drop Leaf Photo Here',
        'Supports JPG, PNG, WebP up to 10MB • Direct camera capture on mobile': 'Supports JPG, PNG, WebP up to 10MB • Direct camera capture on mobile', 'Browse Files / Open Camera': 'Browse Files / Open Camera',
        'Sample Preset': 'Sample Preset', 'Remove selected image': 'Remove selected image', '✕ Remove Image': '✕ Remove Image', 'Select crop being scanned': 'Select crop being scanned',
        'Demo Quick Presets': 'Demo Quick Presets', '1-Click Test': '1-Click Test', 'Select any multi-crop sample to run the complete diagnostic flow instantly:': 'Select any multi-crop sample to run the complete diagnostic flow instantly:',
        'Solanum lycopersicum': 'Solanum lycopersicum', 'High Risk': 'High Risk', 'Rice Leaf Blast': 'Rice Leaf Blast', 'Oryza sativa (Paddy)': 'Oryza sativa (Paddy)', 'Cotton Leaf Spot': 'Cotton Leaf Spot', 'Gossypium hirsutum': 'Gossypium hirsutum', 'Moderate': 'Moderate', 'Potato Early Blight': 'Potato Early Blight', 'Solanum tuberosum': 'Solanum tuberosum', 'Healthy Tomato Leaf': 'Healthy Tomato Leaf', 'Optimal Condition': 'Optimal Condition', 'Healthy': 'Healthy',
        'Analyzing your crop...': 'Analyzing your crop...', 'Evaluating foliar patterns, lesion morphology, and calculating risk indices.': 'Evaluating foliar patterns, lesion morphology, and calculating risk indices.',
        'Inspecting leaf patterns': 'Inspecting leaf patterns', 'Identifying possible disease': 'Identifying possible disease', 'Estimating severity': 'Estimating severity', 'Preparing action plan': 'Preparing action plan',
        '● Demo Mode': '● Demo Mode', 'AI Decision Support': 'AI Decision Support', 'Scientific name not available': 'Scientific name not available', 'Pathogen Analysis Completed': 'Pathogen Analysis Completed',
        'Characteristic foliar lesions identified upon pattern inspection.': 'Characteristic foliar lesions identified upon pattern inspection.', 'Reasons: ': 'Reasons: ', 'Reasons: available scan information': 'Reasons: available scan information',
        'Foliar coverage evaluation': 'Foliar coverage evaluation', 'This is an AI-assisted prototype result, not a definitive agricultural diagnosis. Always consult certified agronomic professionals.': 'This is an AI-assisted prototype result, not a definitive agricultural diagnosis. Always consult certified agronomic professionals.',
        'Indicative 0–100 Decision Support Metric': 'Indicative 0–100 Decision Support Metric', 'RISK INDEX': 'RISK INDEX', 'HIGH RISK (IMMEDIATE ACTION)': 'HIGH RISK (IMMEDIATE ACTION)', 'Reasons will appear with the scan result.': 'Reasons will appear with the scan result.',
        'Weather unavailable': 'Weather unavailable', 'Available': 'Available', 'Weather context unavailable.': 'Weather context unavailable.', 'Conditions around this scan': 'Conditions around this scan', 'Current conditions may affect disease risk.': 'Current conditions may affect disease risk.',
        'Your Crop Health Snapshot': 'Your Crop Health Snapshot', 'Key executive summary parameters for your field record:': 'Key executive summary parameters for your field record:', 'Crop Risk': 'Crop Risk', 'Risk Level': 'Risk Level', 'Recovery Outlook': 'Recovery Outlook', 'Action Window': 'Action Window',
        'Prompt Attention Needed': 'Prompt Attention Needed', 'Prototype decision-support estimate • Saved locally in your browser storage': 'Prototype decision-support estimate • Saved locally in your browser storage',
        'Recommended Action': 'Recommended Action', 'ℹ️ Treatment recommendations are general guidance. Follow local agricultural advice and product labels.': 'ℹ️ Treatment recommendations are general guidance. Follow local agricultural advice and product labels.',
        'Prevention Tips': 'Prevention Tips', '🌱 Consistent prevention protects soil microbial balance and minimizes seasonal losses.': '🌱 Consistent prevention protects soil microbial balance and minimizes seasonal losses.', 'Action Urgency': 'Action Urgency', 'HIGH URGENCY': 'HIGH URGENCY',
        'Take prompt protective action and seek local agronomic guidance to preserve leaf canopy before fungal spread accelerates.': 'Take prompt protective action and seek local agronomic guidance to preserve leaf canopy before fungal spread accelerates.',
        'Saved locally': 'Saved locally', 'Scan history': 'Scan history', 'Review your saved crop checks on this device. History is not synced until an account is added.': 'Review your saved crop checks on this device. History is not synced until an account is added.',
        'Government Portals': 'Government Portals', 'Farmer Support Schemes': 'Farmer Support Schemes', 'Useful verified government support and insurance resources for farmers.': 'Useful verified government support and insurance resources for farmers.',
        'All Support': 'All Support', 'Income Support': 'Income Support', 'Crop Insurance': 'Crop Insurance', 'Soil Management': 'Soil Management', 'Agronomic Advisory': 'Agronomic Advisory',
        'Close API Modal': 'Close API Modal', 'AI Integration Settings': 'AI Integration Settings', 'AI analysis is securely handled by the CropGuardian backend. API keys are never entered or stored in this browser.': 'AI analysis is securely handled by the CropGuardian backend. API keys are never entered or stored in this browser.',
        'Checking backend status...': 'Checking backend status...', 'Close History Modal': 'Close History Modal', 'Saved Crop Snapshots': 'Saved Crop Snapshots', 'Local history of your recent crop diagnostic sessions.': 'Local history of your recent crop diagnostic sessions.',
        'Helping farmers detect crop diseases early before they lose their harvest through computer vision and actionable decision support.': 'Helping farmers detect crop diseases early before they lose their harvest through computer vision and actionable decision support.',
        'Quick Navigation': 'Quick Navigation', 'Safety & Compliance': 'Safety & Compliance', 'Prototype Decision Support': 'Prototype Decision Support', 'Non-Definitive Diagnosis': 'Non-Definitive Diagnosis',
        'Zero Server Data Retention': 'Zero Server Data Retention', 'Home': 'Home', 'Scan': 'Scan', 'History': 'History', 'How It Works': 'How It Works', 'Farmer Support Schemes': 'Farmer Support Schemes',
        '© 2026 CropGuardian AI. Presentation-Ready Hackathon Prototype.': '© 2026 CropGuardian AI. Presentation-Ready Hackathon Prototype.', 'Built with pure HTML5, CSS3, & Vanilla JavaScript.': 'Built with pure HTML5, CSS3, & Vanilla JavaScript.',
    
        'A safer place for your records': 'A safer place for your records', 'Create your account': 'Create your account', 'Save crop analyses, chat history, and your preferred language across sessions.': 'Save crop analyses, chat history, and your preferred language across sessions.',
        'Your name': 'Your name', 'Use at least 10 characters.': 'Use at least 10 characters.', 'Already have an account?': 'Already have an account?',
         'Speaking...': 'Speaking...',
        'Saved on this device.': 'Saved on this device.', 'Unable to save. Check browser storage settings.': 'Unable to save. Check browser storage settings.',
        'Location needed': 'Location needed', 'Updating...': 'Updating...', 'Updating weather...': 'Updating weather...', 'Unavailable': 'Unavailable', 'Stale data': 'Stale data',
        'No scans yet. Start your first crop scan.': 'No scans yet. Start your first crop scan.', 'No scans yet. Complete a demo or AI analysis and save the result here.': 'No scans yet. Complete a demo or AI analysis and save the result here.',
        'Date not set': 'Date not set', 'Demo Mode': 'Demo Mode', 'AI Analysis': 'AI Analysis', 'AI confidence': 'AI confidence', 'Severity': 'Severity', 'Delete': 'Delete',
        'No schemes found in this category.': 'No schemes found in this category.', 'Learn More': 'Learn More', 'Please select a JPG, PNG, or WEBP image.': 'Please select a JPG, PNG, or WEBP image.',
        'Image size exceeds 10MB limit.': 'Image size exceeds 10MB limit.', 'We could not read this image. Please choose another file.': 'We could not read this image. Please choose another file.',
        'This image is very small. A clearer leaf photo may improve analysis.': 'This image is very small. A clearer leaf photo may improve analysis.', 'Image loaded successfully. Review the leaf framing before analysis.': 'Image loaded successfully. Review the leaf framing before analysis.',
        'Please select or upload a crop leaf image first.': 'Please select or upload a crop leaf image first.', 'Unable to save this snapshot in browser storage.': 'Unable to save this snapshot in browser storage.',
        'Crop Health Snapshot saved successfully!': 'Crop Health Snapshot saved successfully!', 'Saved on this device. Account sync is unavailable.': 'Saved on this device. Account sync is unavailable.',
        'Checking backend status...': 'Checking backend status...', 'Backend connected. AI analysis is available when configured.': 'Backend connected. AI analysis is available when configured.',
        'Backend unavailable. Demo Mode remains available for verified presets.': 'Backend unavailable. Demo Mode remains available for verified presets.',
        'Good morning, {name}.': 'Good morning, {name}.', 'Primary crop: {crop}': 'Primary crop: {crop}', 'Size: {size}': 'Size: {size}', 'Humidity: {value}': 'Humidity: {value}',
        'Rain chance: {value}': 'Rain chance: {value}', 'Rainfall: {value}': 'Rainfall: {value}', 'Wind: {value}': 'Wind: {value}', 'Temperature: {value}': 'Temperature: {value}',
        'Reasons: {reasons}': 'Reasons: {reasons}', 'Risk score: {score}': 'Risk score: {score}', 'Recorded: {date} at {time} · AI confidence {confidence}% · Severity {severity}': 'Recorded: {date} at {time} · AI confidence {confidence}% · Severity {severity}',
        'Read crop leaf photo': 'Read crop leaf photo', 'Open image chooser': 'Open image chooser', 'Close dialog': 'Close dialog', 'Password': 'Password', 'Confirm Password': 'Confirm Password', 'Forgot Password': 'Forgot Password',
        'Signing in...': 'Signing in...', 'Creating your account...': 'Creating your account...', 'Account created successfully': 'Account created successfully', 'Invalid email or password.': 'Invalid email or password.',
        'Unable to sign in. Please try again.': 'Unable to sign in. Please try again.', 'Unable to create your account. Please try again.': 'Unable to create your account. Please try again.',
        'Something went wrong. Please try again.': 'Something went wrong. Please try again.', 'Try again': 'Try again', 'No internet connection. Check your connection and try again.': 'No internet connection. Check your connection and try again.',
        'Please choose a valid crop.': 'Please choose a valid crop.', 'Name must be 100 characters or fewer.': 'Name must be 100 characters or fewer.', 'Farm location must be 120 characters or fewer.': 'Farm location must be 120 characters or fewer.', 'Please select a supported diagnostic crop.': 'Please select a supported diagnostic crop.', 'Temperature': 'Temperature', 'Humidity': 'Humidity', 'Wind': 'Wind', 'Rain': 'Rain', 'Forecast': 'Forecast',
        'Urgency': 'Urgency', 'Recommendation': 'Recommendation', 'Disease': 'Disease', 'Confidence': 'Confidence', 'Prevention': 'Prevention', 'Immediate Action': 'Immediate Action', 'Camera': 'Camera', 'Upload Image': 'Upload Image', 'Weather': 'Weather', 'Recent Activity': 'Recent Activity', 'Voice Assistant': 'Voice Assistant', 'Settings': 'Settings', 'Profile': 'Profile', 'Edit Profile': 'Edit Profile', 'Saved History': 'Saved History',
        'AI is thinking...': 'AI is thinking...', 'Typing...': 'Typing...', 'Thinking...': 'Thinking...', 'Invalid login': 'Invalid login', 'Something went wrong': 'Something went wrong', 'No internet': 'No internet', 'Microphone Permission Denied': 'Microphone Permission Denied', 'Voice Not Supported': 'Voice Not Supported',
        'pageTitleHome': 'CropGuardian AI — Early Crop Disease Detection & Decision Support', 'pageTitleLogin': 'Sign In | CropGuardian AI', 'pageTitleSignup': 'Create Account | CropGuardian AI',
        'Analysis error': 'Analysis error', 'Try again': 'Try again', 'Account': 'Account', 'Not available': 'Not available'
      }
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
      assistantWelcome: 'నమస్కారం! పంట ఆరోగ్యం, పురుగులు, నీటిపారుదల, ఎరువులు లేదా వాతావరణం గురించి అడగండి.', assistantRetry: 'మళ్లీ ప్రయత్నించండి',
      clearChat: 'చాట్‌ను తొలగించండి', chatSaveFailed: 'సమాధానం చూపబడింది, కానీ మీ ఖాతాకు సేవ్ కాలేదు.',
      startVoice: 'వాయిస్ ఇన్‌పుట్ ప్రారంభించండి', stopVoice: 'వాయిస్ ఇన్‌పుట్ ఆపండి', stopSpeaking: 'మాట్లాడటం ఆపండి',
      voiceUnsupported: 'ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్‌కు మద్దతు లేదు.', voiceOutputUnsupported: 'ఈ బ్రౌజర్‌లో మాటల అవుట్‌పుట్‌కు మద్దతు లేదు.',
      voiceLanguageUnsupported: 'వాయిస్ ఇన్‌పుట్ ఇంగ్లీష్ మరియు తెలుగుకు మాత్రమే ఉంది. వాయిస్ కోసం భాషను మార్చండి.',
      voiceListening: 'వింటున్నాను...', voiceTranscriptReady: 'ట్రాన్స్‌క్రిప్ట్ సిద్ధంగా ఉంది. సమీక్షించి పంపండి.',
      voicePermissionDenied: 'మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. బ్రౌజర్ సెట్టింగ్‌లలో అనుమతించండి.',
      voiceNoSpeech: 'మాట వినిపించలేదు. మళ్లీ ప్రయత్నించండి.', voiceInputError: 'వాయిస్ ఇన్‌పుట్ విఫలమైంది. మైక్రోఫోన్‌ను తనిఖీ చేయండి.',
      send: 'పంపండి', thinking: 'సహాయకుడు ఆలోచిస్తున్నాడు...', assistantUnavailable: 'AI సహాయకుడు ప్రస్తుతం అందుబాటులో లేదు.',
      assistantEmptyQuestion: 'ముందుగా ఒక ప్రశ్నను నమోదు చేయండి.', assistantQuestionTooLong: 'మీ ప్రశ్నను 1000 అక్షరాల లోపు ఉంచండి.',
      fallbackLabel: 'సాధారణ మార్గదర్శకం (AI అందుబాటులో లేదు)', aiLabel: 'AI రూపొందించిన మార్గదర్శకం',
      quickNow: 'ఇప్పుడు ఏమి చేయాలి?', quickMonitor: 'ఏమి గమనించాలి?', quickRescan: 'మళ్లీ ఎప్పుడు స్కాన్ చేయాలి?',
      saveSnapshot: 'పంట స్నాప్‌షాట్‌ను సేవ్ చేయండి', scanAnother: 'మరో పంటను స్కాన్ చేయండి', weatherUnavailableShort: 'వాతావరణ సమాచారం అందుబాటులో లేదు.',
      phrases: {
        'Language': 'భాష', 'Select language': 'భాషను ఎంచుకోండి', 'Farm profile': 'వ్యవసాయ ప్రొఫైల్',
        'Saved Snapshots History': 'సేవ్ చేసిన పంట వివరాలు', 'View Saved Snapshots': 'సేవ్ చేసిన వివరాలు చూడండి', 'AI Settings / API Key': 'AI సెట్టింగ్‌లు', 'Open AI Settings': 'AI సెట్టింగ్‌లు తెరవండి', 'Toggle navigation menu': 'నావిగేషన్ మెనూ మార్చండి',
        'Farm summary': 'పొలం సారాంశం', 'Not set': 'సెట్ చేయలేదు', 'Primary crop: Not set': 'ప్రధాన పంట: సెట్ చేయలేదు', 'Size: Not set': 'విస్తీర్ణం: సెట్ చేయలేదు', 'Edit farm profile': 'పొలం వివరాలు సవరించండి',
        'Start your first crop scan.': 'మీ మొదటి పంట స్కాన్‌ను ప్రారంభించండి.', 'Risk assessment based on available scan information.': 'అందుబాటులో ఉన్న స్కాన్ సమాచారం ఆధారంగా ప్రమాద అంచనా.', 'Your saved scans will appear here.': 'మీ సేవ్ చేసిన స్కాన్‌లు ఇక్కడ కనిపిస్తాయి.',
        'Not configured': 'కాన్ఫిగర్ చేయలేదు', 'Location needed': 'ప్రాంతం అవసరం', 'Add your farm location to view weather.': 'వాతావరణం చూడటానికి పొలం ప్రాంతాన్ని జోడించండి.', 'Humidity: Not set': 'తేమ: సెట్ చేయలేదు', 'Rain chance: Not set': 'వర్ష అవకాశం: సెట్ చేయలేదు', 'Rainfall: Not set': 'వర్షపాతం: సెట్ చేయలేదు', 'Wind: Not set': 'గాలి: సెట్ చేయలేదు',
        'What needs attention': 'దృష్టి పెట్టాల్సినవి', 'No alerts yet. Alerts will appear after a high-risk scan or configured weather check.': 'ఇంకా హెచ్చరికలు లేవు. అధిక ప్రమాద స్కాన్ లేదా వాతావరణ తనిఖీ తర్వాత కనిపిస్తాయి.', 'Your field history': 'మీ పొలం చరిత్ర', 'View all': 'అన్నీ చూడండి', 'Complete a scan to receive crop-specific guidance.': 'పంటకు తగిన సూచనలు పొందడానికి స్కాన్ చేయండి.',
        'Guidance is informational. Consult a local agriculture expert and follow product labels/local guidance.': 'ఈ సూచనలు సమాచారానికే. స్థానిక వ్యవసాయ నిపుణుడిని సంప్రదించి ఉత్పత్తి లేబుల్, స్థానిక మార్గదర్శకాలను పాటించండి.',
        'Your field record': 'మీ పొలం నమోదు', 'Farmer & farm profile': 'రైతు మరియు పొలం వివరాలు', 'Keep your context close to the recommendations. Nothing is assumed or pre-filled.': 'సూచనలకు అవసరమైన మీ వివరాలను నిర్వహించండి. ఏ సమాచారమూ ఊహించి నింపలేదు.', 'Farmer profile': 'రైతు వివరాలు', 'About you': 'మీ గురించి', 'Name': 'పేరు', 'Phone': 'ఫోన్', 'Email': 'ఇమెయిల్', 'Location': 'ప్రాంతం', 'Preferred language': 'ఇష్టమైన భాష', 'Save farmer profile': 'రైతు వివరాలు సేవ్ చేయండి', 'About your field': 'మీ పొలం గురించి', 'Farm name': 'పొలం పేరు', 'Farm size': 'పొలం విస్తీర్ణం', 'Primary crop': 'ప్రధాన పంట', 'Growth stage': 'పెరుగుదల దశ', 'Irrigation method': 'నీటిపారుదల విధానం', 'Soil type': 'నేల రకం', 'Planting date': 'నాటిన తేదీ', 'Save farm profile': 'పొలం వివరాలు సేవ్ చేయండి',
        'AI-Powered Agricultural Decision Support': 'AI ఆధారిత వ్యవసాయ నిర్ణయ సహాయం', 'Protect Your Harvest.': 'మీ పంటను కాపాడండి.', 'AI-powered crop disease detection that helps farmers identify potential problems early and understand what action to take next.': 'పంట సమస్యలను ముందుగానే గుర్తించి, తదుపరి చర్యను నిర్ణయించేందుకు AI సహాయం.', 'Scan My Crop': 'నా పంటను స్కాన్ చేయండి', 'How It Works': 'ఇది ఎలా పనిచేస్తుంది', 'Multi-Crop Disease Support': 'అనేక పంటల వ్యాధి సహాయం', 'Instant Risk Score': 'తక్షణ ప్రమాద స్కోరు', 'Farmer Support Portals': 'రైతు సహాయ పోర్టళ్లు',
        '94% Match': '94% సరిపోలిక', '81/100 Indicative Risk': 'సూచిక ప్రమాదం 81/100', 'Early Detection': 'ముందస్తు గుర్తింపు', 'Detect foliar pathogens at initial symptom onset before widespread field contagion occurs.': 'లక్షణాలు మొదలైనప్పుడే ఆకుల వ్యాధులను గుర్తించి పొలం అంతటా వ్యాప్తిని తగ్గించండి.', 'AI-Powered Analysis': 'AI విశ్లేషణ', 'AI-assisted analysis evaluates leaf patterns, discoloration, and visible lesion characteristics.': 'ఆకుల నమూనాలు, రంగు మార్పులు, కనిపించే మచ్చలను AI పరిశీలిస్తుంది.', 'Actionable Guidance': 'చర్యకు ఉపయోగపడే సూచనలు', 'Decision-support risk scores, treatment windows, prevention tips, and verified support schemes.': 'ప్రమాద స్కోర్లు, చర్య సమయం, నివారణ సూచనలు, ధృవీకరించిన ప్రభుత్వ పథకాలు.',
        'System Workflow': 'పని విధానం', 'Detect → Understand → Act': 'గుర్తించండి → అర్థం చేసుకోండి → చర్య తీసుకోండి', 'A streamlined, 3-step decision support process designed for fast field diagnostics.': 'పొలంలో త్వరిత నిర్ణయాల కోసం రూపొందించిన మూడు దశల విధానం.', '01 — SCAN': '01 — స్కాన్', '02 — ANALYZE': '02 — విశ్లేషణ', '03 — ACT': '03 — చర్య', 'STEP 01': 'దశ 01', 'STEP 02': 'దశ 02', 'STEP 03': 'దశ 03',
        'Capture or select a clear image of an affected leaf using your mobile camera or file picker.': 'మొబైల్ కెమెరాతో లేదా ఫైల్ ఎంపిక ద్వారా ప్రభావిత ఆకును స్పష్టంగా చిత్రీకరించండి.', 'AI-assisted analysis evaluates visible lesion patterns and crop symptoms to support condition and severity assessment.': 'కనిపించే మచ్చలు, పంట లక్షణాల ఆధారంగా పరిస్థితి మరియు తీవ్రతను అంచనా వేయడంలో AI సహాయపడుతుంది.', 'Receive your Crop Risk Score, treatment window, prevention tips, and relevant government schemes.': 'పంట ప్రమాద స్కోరు, చర్య సమయం, నివారణ సూచనలు, ప్రభుత్వ పథకాలను పొందండి.',
        'AI Crop Diagnostics': 'AI పంట నిర్ధారణ', 'Capture a clear image of an affected leaf for instant AI analysis and risk evaluation.': 'తక్షణ AI విశ్లేషణ, ప్రమాద అంచనా కోసం ప్రభావిత ఆకును స్పష్టంగా చిత్రీకరించండి.', 'Upload crop leaf photo': 'పంట ఆకు ఫోటోను అప్‌లోడ్ చేయండి', 'Click or drag and drop leaf photo': 'ఆకు ఫోటోను ఎంచుకోండి లేదా ఇక్కడికి లాగండి', 'Drag & Drop Leaf Photo Here': 'ఆకు ఫోటోను ఇక్కడికి లాగండి', 'Supports JPG, PNG, WebP up to 10MB • Direct camera capture on mobile': '10MB వరకు JPG, PNG, WebP • మొబైల్ కెమెరాతో నేరుగా చిత్రీకరించవచ్చు', 'Browse Files / Open Camera': 'ఫైళ్లు చూడండి / కెమెరా తెరవండి', 'Sample Preset': 'నమూనా', 'Remove selected image': 'ఎంచుకున్న చిత్రాన్ని తొలగించండి', '✕ Remove Image': '✕ చిత్రాన్ని తొలగించండి', 'Select crop being scanned': 'స్కాన్ చేస్తున్న పంటను ఎంచుకోండి', 'Demo Quick Presets': 'త్వరిత డెమో నమూనాలు', '1-Click Test': 'ఒక క్లిక్ పరీక్ష', 'Select any multi-crop sample to run the complete diagnostic flow instantly:': 'పూర్తి నిర్ధారణను చూడటానికి పంట నమూనాను ఎంచుకోండి:', 'High Risk': 'అధిక ప్రమాదం', 'Moderate': 'మధ్యస్థం', 'Optimal Condition': 'ఆదర్శ స్థితి', 'Healthy': 'ఆరోగ్యంగా ఉంది',
        'Analyzing your crop...': 'మీ పంటను విశ్లేషిస్తోంది...', 'Evaluating foliar patterns, lesion morphology, and calculating risk indices.': 'ఆకుల నమూనాలు, మచ్చల ఆకృతిని పరిశీలించి ప్రమాదాన్ని లెక్కిస్తోంది.', 'Inspecting leaf patterns': 'ఆకు నమూనాలను పరిశీలిస్తోంది', 'Identifying possible disease': 'సంభావ్య వ్యాధిని గుర్తిస్తోంది', 'Estimating severity': 'తీవ్రతను అంచనా వేస్తోంది', 'Preparing action plan': 'చర్య ప్రణాళికను సిద్ధం చేస్తోంది', '● Demo Mode': '● డెమో విధానం', 'AI Decision Support': 'AI నిర్ణయ సహాయం',
        'Scientific name not available': 'శాస్త్రీయ పేరు అందుబాటులో లేదు', 'Pathogen Analysis Completed': 'వ్యాధికారక విశ్లేషణ పూర్తయింది', 'Characteristic foliar lesions identified upon pattern inspection.': 'ఆకుల నమూనా పరిశీలనలో లక్షణ మచ్చలు గుర్తించబడ్డాయి.', 'Reasons: ': 'కారణాలు: ', 'Reasons: available scan information': 'కారణాలు: అందుబాటులో ఉన్న స్కాన్ సమాచారం', 'Foliar coverage evaluation': 'ఆకుల ప్రభావిత స్థాయి అంచనా',
        'This is an AI-assisted prototype result, not a definitive agricultural diagnosis. Always consult certified agronomic professionals.': 'ఇది AI సహాయంతో రూపొందించిన ప్రాథమిక అంచనా మాత్రమే; తుది వ్యవసాయ నిర్ధారణ కాదు. నిపుణులను సంప్రదించండి.', 'Indicative 0–100 Decision Support Metric': 'సూచిక నిర్ణయ సహాయ కొలమానం 0–100', 'RISK INDEX': 'ప్రమాద సూచిక', 'HIGH RISK (IMMEDIATE ACTION)': 'అధిక ప్రమాదం (తక్షణ చర్య)', 'Reasons will appear with the scan result.': 'స్కాన్ ఫలితంతో కారణాలు కనిపిస్తాయి.',
        'Weather unavailable': 'వాతావరణ సమాచారం లేదు', 'Available': 'అందుబాటులో ఉంది', 'Weather context unavailable.': 'వాతావరణ సమాచారం అందుబాటులో లేదు.', 'Conditions around this scan': 'ఈ స్కాన్ సమయంలోని పరిస్థితులు', 'Current conditions may affect disease risk.': 'ప్రస్తుత పరిస్థితులు వ్యాధి ప్రమాదాన్ని ప్రభావితం చేయవచ్చు.',
        'Your Crop Health Snapshot': 'మీ పంట ఆరోగ్య సంగ్రహం', 'Key executive summary parameters for your field record:': 'పొలం నమోదు కోసం ముఖ్యమైన సారాంశ వివరాలు:', 'Crop Risk': 'పంట ప్రమాదం', 'Risk Level': 'ప్రమాద స్థాయి', 'Recovery Outlook': 'కోలుకునే అవకాశం', 'Action Window': 'చర్య తీసుకోవాల్సిన సమయం', 'Prompt Attention Needed': 'త్వరగా దృష్టి పెట్టాలి', 'Prototype decision-support estimate • Saved locally in your browser storage': 'ప్రాథమిక నిర్ణయ అంచనా • మీ బ్రౌజర్‌లో స్థానికంగా సేవ్ అవుతుంది', 'Recommended Action': 'సిఫార్సు చేసిన చర్య', 'ℹ️ Treatment recommendations are general guidance. Follow local agricultural advice and product labels.': 'ℹ️ చికిత్స సూచనలు సాధారణ మార్గదర్శకాలు మాత్రమే. స్థానిక వ్యవసాయ సలహా, ఉత్పత్తి లేబుళ్లను పాటించండి.', 'Prevention Tips': 'నివారణ సూచనలు', '🌱 Consistent prevention protects soil microbial balance and minimizes seasonal losses.': '🌱 నిరంతర నివారణ నేల జీవ సమతుల్యతను కాపాడి కాలానుగుణ నష్టాలను తగ్గిస్తుంది.', 'Action Urgency': 'చర్య అత్యవసరత', 'HIGH URGENCY': 'అత్యవసరం', 'Take prompt protective action and seek local agronomic guidance to preserve leaf canopy before fungal spread accelerates.': 'శిలీంధ్ర వ్యాప్తి పెరగకముందే రక్షణ చర్యలు తీసుకుని స్థానిక వ్యవసాయ నిపుణుల సలహా పొందండి.',
        'Saved locally': 'స్థానికంగా సేవ్ చేయబడింది', 'Scan history': 'స్కాన్ చరిత్ర', 'Review your saved crop checks on this device. History is not synced until an account is added.': 'ఈ పరికరంలో సేవ్ చేసిన పంట తనిఖీలను చూడండి. ఖాతాలోకి ప్రవేశించే వరకు చరిత్ర సమకాలీకరించబడదు.',
        'Government Portals': 'ప్రభుత్వ పోర్టళ్లు', 'Farmer Support Schemes': 'రైతు సహాయ పథకాలు', 'Useful verified government support and insurance resources for farmers.': 'రైతుల కోసం ధృవీకరించిన ప్రభుత్వ సహాయం, బీమా వనరులు.', 'All Support': 'అన్ని సహాయాలు', 'Income Support': 'ఆదాయ సహాయం', 'Crop Insurance': 'పంట బీమా', 'Soil Management': 'నేల నిర్వహణ', 'Agronomic Advisory': 'వ్యవసాయ సలహా',
        'Close API Modal': 'API విండో మూసివేయండి', 'AI Integration Settings': 'AI అనుసంధాన సెట్టింగ్‌లు', 'AI analysis is securely handled by the CropGuardian backend. API keys are never entered or stored in this browser.': 'AI విశ్లేషణను CropGuardian సర్వర్ సురక్షితంగా నిర్వహిస్తుంది. API కీలు ఈ బ్రౌజర్‌లో నమోదు లేదా నిల్వ చేయబడవు.', 'Checking backend status...': 'సర్వర్ స్థితిని తనిఖీ చేస్తోంది...', 'Close History Modal': 'చరిత్ర విండో మూసివేయండి', 'Saved Crop Snapshots': 'సేవ్ చేసిన పంట వివరాలు', 'Local history of your recent crop diagnostic sessions.': 'ఇటీవలి పంట నిర్ధారణల స్థానిక చరిత్ర.',
        'Helping farmers detect crop diseases early before they lose their harvest through computer vision and actionable decision support.': 'కంప్యూటర్ విజన్, ఉపయోగకరమైన నిర్ణయ సహాయంతో పంట నష్టానికి ముందే వ్యాధులను గుర్తించడంలో రైతులకు సహాయం.', 'Quick Navigation': 'త్వరిత నావిగేషన్', 'Safety & Compliance': 'భద్రత మరియు అనుసరణ', 'Prototype Decision Support': 'ప్రాథమిక నిర్ణయ సహాయం', 'Non-Definitive Diagnosis': 'తుది నిర్ధారణ కాదు', 'Zero Server Data Retention': 'సర్వర్‌లో డేటా నిల్వ లేదు', 'Home': 'హోమ్', 'Scan': 'స్కాన్', 'History': 'చరిత్ర', 'How It Works': 'ఇది ఎలా పనిచేస్తుంది', 'Farmer Support Schemes': 'రైతు సహాయ పథకాలు',
        '© 2026 CropGuardian AI. Presentation-Ready Hackathon Prototype.': '© 2026 CropGuardian AI. హ్యాకథాన్ ప్రదర్శన నమూనా.', 'Built with pure HTML5, CSS3, & Vanilla JavaScript.': 'HTML5, CSS3, Vanilla JavaScript‌తో రూపొందించబడింది.',
        'Welcome back': 'తిరిగి స్వాగతం', 'Your farm workspace': 'మీ వ్యవసాయ కార్యస్థలం', 'New to CropGuardian?': 'CropGuardian‌కు కొత్తవారా?', 'Create an account': 'ఖాతా సృష్టించండి', 'Continue without signing in': 'ప్రవేశించకుండా కొనసాగండి',
        'A safer place for your records': 'మీ వ్యవసాయ రికార్డులకు భద్రమైన స్థలం', 'Create your account': 'మీ ఖాతాను సృష్టించండి', 'Save crop analyses, chat history, and your preferred language across sessions.': 'పంట విశ్లేషణలు, సంభాషణ చరిత్ర, ఇష్టమైన భాషను సేవ్ చేసుకోండి.', 'Your name': 'మీ పేరు', 'Use at least 10 characters.': 'కనీసం 10 అక్షరాలు ఉపయోగించండి.', 'Already have an account?': 'ఇప్పటికే ఖాతా ఉందా?', 'Create account': 'ఖాతా సృష్టించండి', 'Speaking...': 'మాట్లాడుతోంది...',
        'Saved on this device.': 'ఈ పరికరంలో సేవ్ చేయబడింది.', 'Unable to save. Check browser storage settings.': 'సేవ్ చేయలేకపోయింది. బ్రౌజర్ నిల్వ సెట్టింగ్‌లను తనిఖీ చేయండి.', 'Updating...': 'నవీకరిస్తోంది...', 'Updating weather...': 'వాతావరణాన్ని నవీకరిస్తోంది...', 'Unavailable': 'అందుబాటులో లేదు', 'Stale data': 'పాత సమాచారం', 'No scans yet. Start your first crop scan.': 'ఇంకా స్కాన్‌లు లేవు. మొదటి పంట స్కాన్‌ను ప్రారంభించండి.', 'No scans yet. Complete a demo or AI analysis and save the result here.': 'ఇంకా స్కాన్‌లు లేవు. డెమో లేదా AI విశ్లేషణ చేసి ఫలితాన్ని ఇక్కడ సేవ్ చేయండి.', 'Date not set': 'తేదీ సెట్ చేయలేదు', 'Demo Mode': 'డెమో విధానం', 'AI Analysis': 'AI విశ్లేషణ', 'Severity': 'తీవ్రత', 'Delete': 'తొలగించండి', 'No schemes found in this category.': 'ఈ వర్గంలో పథకాలు కనబడలేదు.', 'Learn More': 'మరింత తెలుసుకోండి', 'Please select a JPG, PNG, or WEBP image.': 'JPG, PNG లేదా WEBP చిత్రాన్ని ఎంచుకోండి.', 'Image size exceeds 10MB limit.': 'చిత్ర పరిమాణం 10MB పరిమితిని మించింది.', 'We could not read this image. Please choose another file.': 'చిత్రాన్ని చదవలేకపోయాం. మరో చిత్రాన్ని ఎంచుకోండి.', 'This image is very small. A clearer leaf photo may improve analysis.': 'ఈ చిత్రం చాలా చిన్నది. స్పష్టమైన ఆకు ఫోటో విశ్లేషణను మెరుగుపరుస్తుంది.', 'Image loaded successfully. Review the leaf framing before analysis.': 'చిత్రం లోడ్ అయింది. విశ్లేషణకు ముందు ఆకు స్పష్టతను పరిశీలించండి.', 'Please select or upload a crop leaf image first.': 'ముందుగా పంట ఆకు చిత్రాన్ని ఎంచుకోండి లేదా అప్‌లోడ్ చేయండి.', 'Unable to save this snapshot in browser storage.': 'ఈ వివరాన్ని బ్రౌజర్ నిల్వలో సేవ్ చేయలేకపోయింది.', 'Crop Health Snapshot saved successfully!': 'పంట ఆరోగ్య వివరాలు విజయవంతంగా సేవ్ అయ్యాయి!', 'Saved on this device. Account sync is unavailable.': 'ఈ పరికరంలో సేవ్ అయింది. ఖాతాతో సమకాలీకరణ అందుబాటులో లేదు.',
        'Backend connected. AI analysis is available when configured.': 'సర్వర్ అనుసంధానమైంది. కాన్ఫిగర్ చేసినప్పుడు AI విశ్లేషణ అందుబాటులో ఉంటుంది.', 'Backend unavailable. Demo Mode remains available for verified presets.': 'సర్వర్ అందుబాటులో లేదు. ధృవీకరించిన నమూనాలకు డెమో విధానం అందుబాటులో ఉంటుంది.', 'Primary crop: {crop}': 'ప్రధాన పంట: {crop}', 'Size: {size}': 'విస్తీర్ణం: {size}', 'Humidity: {value}': 'తేమ: {value}', 'Rain chance: {value}': 'వర్ష అవకాశం: {value}', 'Rainfall: {value}': 'వర్షపాతం: {value}', 'Wind: {value}': 'గాలి: {value}', 'Temperature: {value}': 'ఉష్ణోగ్రత: {value}', 'Reasons: {reasons}': 'కారణాలు: {reasons}', 'Risk score: {score}': 'ప్రమాద స్కోరు: {score}', 'Close dialog': 'డైలాగ్ మూసివేయండి'
      }
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
      demoConfidenceNote: 'डेमो मोड अनुमान; इसका कैलिब्रेटेड भरोसा नहीं है।', aiConfidenceNote: 'बाहरी AI भरोसा; इसका गारंटी नहीं है।',
      riskAssessment: 'उपलब्ध स्कैन जानकारी के आधार पर जोखिम आकलन।',
      treatment: 'उपचार', prevention: 'बचाव के सुझाव', assistant: 'कृषि सहायक',
      assistantIntro: 'अपनी वर्तमान फसल जानकारी के बारे में प्रश्न पूछें।', assistantPlaceholder: 'अपनी फसल के बारे में पूछें...',
      assistantWelcome: 'नमस्ते! फसल स्वास्थ्य, कीट, सिंचाई, खाद या मौसम के बारे में पूछें।', assistantRetry: 'फिर कोशिश करें',
      clearChat: 'चैट साफ़ करें', chatSaveFailed: 'उत्तर दिखाया गया, लेकिन खाते में सिंक नहीं हो सका।',
      startVoice: 'आवाज़ से लिखें', stopVoice: 'आवाज़ इनपुट रोकें', stopSpeaking: 'बोलना बंद करें',
      voiceUnsupported: 'इस ब्राउज़र में आवाज़ से लिखना समर्थित नहीं है।', voiceOutputUnsupported: 'इस ब्राउज़र में आवाज़ आउटपुट समर्थित नहीं है।',
      voiceLanguageUnsupported: 'आवाज़ इनपुट अंग्रेज़ी और तेलुगु के लिए उपलब्ध है। भाषा बदलें।',
      voiceListening: 'सुन रहा है...', voiceTranscriptReady: 'ट्रांसक्रिप्ट तैयार है। समीक्षा करके भेजें।',
      voicePermissionDenied: 'माइक्रोफ़ोन अनुमति अस्वीकृत हुई। ब्राउज़र सेटिंग में अनुमति दें।',
      voiceNoSpeech: 'कोई आवाज़ नहीं मिली। फिर कोशिश करें।', voiceInputError: 'आवाज़ इनपुट विफल हुआ। माइक्रोफ़ोन जाँचें।',
      send: 'भेजें', thinking: 'सहायक सोच रहा है...', assistantUnavailable: 'AI सहायक अभी उपलब्ध नहीं है।',
      assistantEmptyQuestion: 'पहले अपना प्रश्न दर्ज करें।', assistantQuestionTooLong: 'अपना प्रश्न 1000 अक्षरों से कम रखें।',
      fallbackLabel: 'सामान्य मार्गदर्शन (AI उपलब्ध नहीं)', aiLabel: 'AI द्वारा बनाया गया मार्गदर्शन',
      quickNow: 'अभी क्या करना चाहिए?', quickMonitor: 'क्या निगरानी करनी चाहिए?', quickRescan: 'दोबारा स्कैन कब करें?',
      saveSnapshot: 'फसल स्नैपशॉट सेव करें', scanAnother: 'दूसरी फसल स्कैन करें', weatherUnavailableShort: 'मौसम संदर्भ उपलब्ध नहीं है.',
      phrases: {
        'Language': 'भाषा', 'Select language': 'भाषा चुनें', 'Sign in': 'साइन इन', 'Sign out': 'साइन आउट', 'Farm profile': 'खेत की प्रोफ़ाइल', 'Saved Snapshots History': 'सहेजे गए फसल रिकॉर्ड', 'View Saved Snapshots': 'सहेजे गए रिकॉर्ड देखें', 'AI Settings / API Key': 'AI सेटिंग', 'Open AI Settings': 'AI सेटिंग खोलें', 'Toggle navigation menu': 'नेविगेशन मेन्यू खोलें या बंद करें',
        'Farm summary': 'खेत का सारांश', 'Not set': 'सेट नहीं है', 'Primary crop: Not set': 'मुख्य फसल: सेट नहीं है', 'Size: Not set': 'क्षेत्रफल: सेट नहीं है', 'Edit farm profile': 'खेत की जानकारी बदलें', 'Start your first crop scan.': 'अपना पहला फसल स्कैन शुरू करें।', 'Risk assessment based on available scan information.': 'उपलब्ध स्कैन जानकारी के आधार पर जोखिम आकलन।', 'Your saved scans will appear here.': 'आपके सहेजे स्कैन यहाँ दिखेंगे।', 'Not configured': 'कॉन्फ़िगर नहीं है', 'Location needed': 'स्थान आवश्यक है', 'Add your farm location to view weather.': 'मौसम देखने के लिए खेत का स्थान जोड़ें।', 'Humidity: Not set': 'नमी: सेट नहीं है', 'Rain chance: Not set': 'बारिश की संभावना: सेट नहीं है', 'Rainfall: Not set': 'वर्षा: सेट नहीं है', 'Wind: Not set': 'हवा: सेट नहीं है',
        'What needs attention': 'ध्यान देने योग्य बातें', 'No alerts yet. Alerts will appear after a high-risk scan or configured weather check.': 'अभी कोई चेतावनी नहीं है। अधिक जोखिम वाले स्कैन या मौसम जाँच के बाद चेतावनी दिखेगी।', 'Your field history': 'आपके खेत का इतिहास', 'View all': 'सभी देखें', 'Complete a scan to receive crop-specific guidance.': 'फसल के अनुसार सलाह पाने के लिए स्कैन पूरा करें।', 'Guidance is informational. Consult a local agriculture expert and follow product labels/local guidance.': 'यह जानकारी सामान्य मार्गदर्शन के लिए है। स्थानीय कृषि विशेषज्ञ से सलाह लें और उत्पाद लेबल व स्थानीय निर्देशों का पालन करें।',
        'Your field record': 'आपके खेत का रिकॉर्ड', 'Farmer & farm profile': 'किसान और खेत की जानकारी', 'Keep your context close to the recommendations. Nothing is assumed or pre-filled.': 'सलाह के लिए अपनी जानकारी यहाँ रखें। कोई विवरण मानकर नहीं भरा गया है।', 'Farmer profile': 'किसान की जानकारी', 'About you': 'आपके बारे में', 'Name': 'नाम', 'Phone': 'फ़ोन', 'Email': 'ईमेल', 'Location': 'स्थान', 'Preferred language': 'पसंदीदा भाषा', 'Save farmer profile': 'किसान की जानकारी सहेजें', 'About your field': 'आपके खेत के बारे में', 'Farm name': 'खेत का नाम', 'Farm size': 'खेत का क्षेत्रफल', 'Primary crop': 'मुख्य फसल', 'Growth stage': 'विकास अवस्था', 'Irrigation method': 'सिंचाई का तरीका', 'Soil type': 'मिट्टी का प्रकार', 'Planting date': 'बुवाई की तारीख', 'Save farm profile': 'खेत की जानकारी सहेजें',
        'AI-Powered Agricultural Decision Support': 'AI आधारित कृषि निर्णय सहायता', 'Protect Your Harvest.': 'अपनी फसल सुरक्षित रखें।', 'AI-powered crop disease detection that helps farmers identify potential problems early and understand what action to take next.': 'AI से फसल की समस्या समय रहते पहचानें और आगे की कार्रवाई समझें।', 'Scan My Crop': 'मेरी फसल स्कैन करें', 'How It Works': 'यह कैसे काम करता है', 'Multi-Crop Disease Support': 'कई फसलों की रोग पहचान', 'Instant Risk Score': 'तुरंत जोखिम स्कोर', 'Farmer Support Portals': 'किसान सहायता पोर्टल', '94% Match': '94% मेल', '81/100 Indicative Risk': 'अनुमानित जोखिम 81/100', 'Early Detection': 'समय रहते पहचान', 'Detect foliar pathogens at initial symptom onset before widespread field contagion occurs.': 'शुरुआती लक्षणों पर पत्तियों के रोग पहचानें, ताकि वे पूरे खेत में न फैलें।', 'AI-Powered Analysis': 'AI विश्लेषण', 'AI-assisted analysis evaluates leaf patterns, discoloration, and visible lesion characteristics.': 'AI पत्तियों के नमूने, रंग बदलाव और दिखाई देने वाले धब्बों का आकलन करता है।', 'Actionable Guidance': 'काम की सलाह', 'Decision-support risk scores, treatment windows, prevention tips, and verified support schemes.': 'जोखिम स्कोर, कार्रवाई का सही समय, बचाव के सुझाव और सत्यापित सरकारी योजनाएँ।',
        'System Workflow': 'काम की प्रक्रिया', 'Detect → Understand → Act': 'पहचानें → समझें → कदम उठाएँ', 'A streamlined, 3-step decision support process designed for fast field diagnostics.': 'खेत में तेज़ जाँच और निर्णय के लिए तीन आसान चरण।', '01 — SCAN': '01 — स्कैन', '02 — ANALYZE': '02 — जाँच', '03 — ACT': '03 — कार्रवाई', 'STEP 01': 'चरण 01', 'STEP 02': 'चरण 02', 'STEP 03': 'चरण 03',
        'Capture or select a clear image of an affected leaf using your mobile camera or file picker.': 'मोबाइल कैमरे से प्रभावित पत्ती की साफ़ तस्वीर लें या फ़ाइल चुनें।', 'AI-assisted analysis evaluates visible lesion patterns and crop symptoms to support condition and severity assessment.': 'दिखने वाले धब्बों और लक्षणों से स्थिति व गंभीरता समझने में AI मदद करता है।', 'Receive your Crop Risk Score, treatment window, prevention tips, and relevant government schemes.': 'जोखिम स्कोर, कार्रवाई का समय, बचाव के सुझाव और उपयोगी सरकारी योजनाएँ पाएँ।',
        'AI Crop Diagnostics': 'AI फसल जाँच', 'Capture a clear image of an affected leaf for instant AI analysis and risk evaluation.': 'तुरंत AI जाँच और जोखिम आकलन के लिए प्रभावित पत्ती की साफ़ तस्वीर लें।', 'Upload crop leaf photo': 'फसल की पत्ती की तस्वीर अपलोड करें', 'Click or drag and drop leaf photo': 'पत्ती की तस्वीर चुनें या यहाँ खींचकर छोड़ें', 'Drag & Drop Leaf Photo Here': 'पत्ती की तस्वीर यहाँ छोड़ें', 'Supports JPG, PNG, WebP up to 10MB • Direct camera capture on mobile': '10MB तक JPG, PNG, WebP • मोबाइल पर सीधे कैमरे से तस्वीर लें', 'Browse Files / Open Camera': 'फ़ाइल चुनें / कैमरा तెరवंडिल', 'Sample Preset': 'नमूना', 'Remove selected image': 'चुनी हुई तस्वीर हटाएँ', '✕ Remove Image': '✕ तस्वीर हटाएँ', 'Select crop being scanned': 'स्कैन की जा रही फसल चुनें', 'Demo Quick Presets': 'त्वरित डेमो नमूनालు', '1-Click Test': 'एक क्लिक जाँच', 'Select any multi-crop sample to run the complete diagnostic flow instantly:': 'पूरी जाँच तुरंत देखने के लिए फसल का नमूना चुनें:', 'High Risk': 'अधिक जोखिम', 'Moderate': 'मध्यम', 'Optimal Condition': 'आदर्श स्थिति', 'Healthy': 'स्वस्थ',
        'Analyzing your crop...': 'आपकी फसल की जाँच हो रही है...', 'Evaluating foliar patterns, lesion morphology, and calculating risk indices.': 'पत्तियों के नमूने और धब्बों का आकलन करके जोखिम निकाला जा रहा है।', 'Inspecting leaf patterns': 'पत्तियों के नमूने देख रहे हैं', 'Identifying possible disease': 'संभावित रोग पहचान रहे हैं', 'Estimating severity': 'गंभीरता का अनुमान लगा रहे हैं', 'Preparing action plan': 'कार्रवाई की योजना बना रहे हैं', '● Demo Mode': '● डेमो मोड', 'AI Decision Support': 'AI निर्णय सहायता',
        'Scientific name not available': 'वैज्ञानिक नाम उपलब्ध नहीं', 'Pathogen Analysis Completed': 'वीरोगकारक का विश्लेषण पूरा', 'Characteristic foliar lesions identified upon pattern inspection.': 'पत्ती के नमूनों में सामान्य रोग-धब्बे दिखाई दिए।', 'Reasons: ': 'कारण: ', 'Reasons: available scan information': 'कारण: उपलब्ध स्कैन जानकारी', 'Foliar coverage evaluation': 'पत्तियों पर असर का आकलन',
        'This is an AI-assisted prototype result, not a definitive agricultural diagnosis. Always consult certified agronomic professionals.': 'यह AI-सहायित प्रारंभिक नतीजा है, अंतिम कृषि निदान नहीं। कृषि विशेषज्ञ से सलाह लें।', 'Indicative 0–100 Decision Support Metric': 'अनुमानित निर्णय सहायता माप 0–100', 'RISK INDEX': 'जोखिम सूचिकांक', 'HIGH RISK (IMMEDIATE ACTION)': 'अधिक जोखिम (तक्षण कार्रवाई)', 'Reasons will appear with the scan result.': 'स्कैन के नतीजे के साथ कारण दिखेंगे।',
        'Weather unavailable': 'मौसम जानकारी उपलब्ध नहीं', 'Available': 'उपलब्ध', 'Weather context unavailable.': 'मौसम की जानकारी उपलब्ध नहीं।', 'Conditions around this scan': 'ई स्कैन के समय की मौसम स्थिति', 'Current conditions may affect disease risk.': 'प्रस्तुत मौसम रोग के जोखिम को प्रभावित कर सकता है।',
        'Your Crop Health Snapshot': 'आपकी फसल का स्वास्थ्य सारांश', 'Key executive summary parameters for your field record:': 'खेत के रिकॉर्ड के लिए मुख्य जानकारी:', 'Crop Risk': 'फसल का जोखिम', 'Risk Level': 'जोखिम स्तर', 'Recovery Outlook': 'सुधार की संभावना', 'Action Window': 'कार्रवाई का समय', 'Prompt Attention Needed': 'जल्द ध्यान देना ज़रूरी', 'Prototype decision-support estimate • Saved locally in your browser storage': 'प्रारंभिक जोखिम अनुमान • ब्राउज़र में सुरक्षित', 'Recommended Action': 'सुझाई गई कार्रवाई', 'ℹ️ Treatment recommendations are general guidance. Follow local agricultural advice and product labels.': 'ℹ️ चिकित्स की सलाह सामान्य है। स्थानीय कृषि सलाह और उत्पाद के लेबल का पालन करें।', 'Prevention Tips': 'बचाव के सुझाव', '🌱 Consistent prevention protects soil microbial balance and minimizes seasonal losses.': '🌱 नियमित बचाव से मिट्टी का संतुलन बना रहता है और मौसमी नुकसान घटता है।', 'Action Urgency': 'कार्रवाई की तात्कालिकता', 'HIGH URGENCY': 'तुरंत कार्रवाई करें', 'Take prompt protective action and seek local agronomic guidance to preserve leaf canopy before fungal spread accelerates.': 'फफूंद फैलने से पहले सुरक्षात्मक कदम उठाएँ और स्थानीय कृषि विशेषज्ञ से सलाह लें।',
        'Saved locally': 'यहीं सहेजा गया', 'Scan history': 'स्कैन इतिहास', 'Review your saved crop checks on this device. History is not synced until an account is added.': 'इस डिवाइस पर सहेजी गई जाँच देखें। खाते में प्रवेश करने पर इतिहास सिंक होगा।', 'Government Portals': 'सरकारी पोर्टल', 'Farmer Support Schemes': 'किसान सहायता योजनाएँ', 'Useful verified government support and insurance resources for farmers.': 'किसानों के लिए सत्यापित सरकारी सहायता और बीमा संसाधन।', 'All Support': 'सभी सहायता', 'Income Support': 'आदाय सहायता', 'Crop Insurance': 'फसल बीमा', 'Soil Management': 'मिट्टी प्रबंधन', 'Agronomic Advisory': 'कृषि सलाह',
        'Close API Modal': 'API विंडो बंद करें', 'AI Integration Settings': 'AI एकीकरण सेटिंग', 'AI analysis is securely handled by the CropGuardian backend. API keys are never entered or stored in this browser.': 'AI विश्लेषण CropGuardian सर्वर पर सुरक्षित रूप से होती है। API कुंजी इस ब्राउज़र में कभी नहीं रखी जाती।', 'Checking backend status...': 'सर्वर की स्थिति जाँची जा रही है...', 'Close History Modal': 'इतिहास विंडो बंद करें', 'Saved Crop Snapshots': 'सहेजे गए फसल रिकॉर्ड', 'Local history of your recent crop diagnostic sessions.': 'हाल की फसल जाँच का स्थानीय इतिहास।',
        'Helping farmers detect crop diseases early before they lose their harvest through computer vision and actionable decision support.': 'कंप्यूटर विज़न और उपयोगी सलाह से फसल नुकसान से पहले रोग पहचानने में किसानों की मदद।', 'Quick Navigation': 'त्वरित नाविगेशन', 'Safety & Compliance': 'सुरक्षा और नियम', 'Prototype Decision Support': 'प्रारंभिक निर्णय सहायता', 'Non-Definitive Diagnosis': 'अंतिम निदान नहीं', 'Zero Server Data Retention': 'सर्वर पर डेटा नहीं रखा जाता', 'Home': 'होम', 'Scan': 'स्कैन', 'History': 'इतिहास', 'How It Works': 'यह कैसे काम करता है', 'Farmer Support Schemes': 'रైతు సహాయ పథకాలు',
        '© 2026 CropGuardian AI. Presentation-Ready Hackathon Prototype.': '© 2026 CropGuardian AI. హ్యాకథాన్ ప్రదర్శన నమూనా.', 'Built with pure HTML5, CSS3, & Vanilla JavaScript.': 'HTML5, CSS3, Vanilla JavaScript‌తో రూపొందించబడింది.',
        'Welcome back': 'फिर से स्वागत है', 'Your farm workspace': 'आपका खेत कार्यक्षेत्र', 'Sign in to access your saved crop history and assistant conversations.': 'सहेजा हुआ फसल इतिहास और सहायक की बातचीत देखने के लिए साइन इन करें।', 'Remember me on this device': 'इस डिवाइस पर याद रखें', 'New to CropGuardian?': 'CropGuardian‌कु नए हैं?', 'Create an account': 'खाता बनाएँ', 'Continue without signing in': 'बिना साइन इन किए आगे बढ़ें', 'A safer place for your records': 'आपके खेत के रिकार्ड के लिए सुरक्षित जगह', 'Create your account': 'अपना खाता बनाएँ', 'Save crop analyses, chat history, and your preferred language across sessions.': 'फसल विश्लेषण, चैट इतिहास और पसंदीदा भाषा सहेजें।', 'Your name': 'आपका नाम', 'Use at least 10 characters.': 'कम से कम 10 अक्षर रखें।', 'Already have an account?': 'पहले से खाता है?', 'Create account': 'खाता बनाएँ', 'Speaking...': 'बोल रहा है...',
        'Saved on this device.': 'इस डिवाइस पर सहेजा गया।', 'Unable to save. Check browser storage settings.': 'सहेज नहीं पाए। ब्राउज़र स्टोरेज सेटिंग जाँचें।', 'Updating...': 'अपडेट हो रहा है...', 'Updating weather...': 'मौसम अपडेट हो रहा है...', 'Unavailable': 'उपलब्ध नहीं', 'Stale data': 'पुरानी जानकारी', 'No scans yet. Start your first crop scan.': 'अभी कोई स्कैन नहीं। पहला फसल स्कैन शुरू करें।', 'No scans yet. Complete a demo or AI analysis and save the result here.': 'अभी कोई स्कैन नहीं। डेमो लేదా AI విశ్లేషణ చేసి ఫలితాన్ని ఇక్కడ సేవ్ చేయండి.', 'Date not set': 'तारीख नहीं', 'Demo Mode': 'डेमो मोड', 'AI Analysis': 'AI विश्लेषण', 'Severity': 'गंभीरता', 'Delete': 'हटाएँ', 'No schemes found in this category.': 'ఈ వర్గంలో పథకాలు కనబడలేదు.', 'Learn More': 'और जानें', 'Please select a JPG, PNG, or WEBP image.': 'JPG, PNG लేదా WEBP चित్రాన్ని ఎంచుకోండి.', 'Image size exceeds 10MB limit.': 'चित్ర 10MB పరिमితిని మించింది.', 'We could not read this image. Please choose another file.': 'चित్రాన్ని చదవలేకపోయాం. మరో చित్రాన్ని ఎంచుకోండి.', 'This image is very small. A clearer leaf photo may improve analysis.': 'ఈ చित్రం చాలా చిన్నది. స్పష్టమైన ఆకు ఫోటో విశ్లేషణను మెరుగుపరుస్తుంది.', 'Image loaded successfully. Review the leaf framing before analysis.': 'चित్రं लोड हो गई। विश्लेषण के लिए मुंद आकు का फ्रेम देखें।', 'Please select or upload a crop leaf image first.': 'पहले फसल की पत्ती की तस्वीर चुनें या अपलोड करें।', 'Unable to save this snapshot in browser storage.': 'ఈ వివరాన్ని బ్రౌజర్ నిల్వలో సేవ్ చేయలేకపోయింది.', 'Crop Health Snapshot saved successfully!': 'फसल स्वास्थ्य विवरालు विजयवंतंगासी अయ్యాయి!', 'Saved on this device. Account sync is unavailable.': 'इस डिवाइस पर सेव अयింది. खाते से सिंक उपलब्ध नहीं है.', 'Backend connected. AI analysis is available when configured.': 'सर्वर जुड़ा है। सेटअप पूरा होने पर AI विश्लेषण उपलब्ध होगी।', 'Backend unavailable. Demo Mode remains available for verified presets.': 'सर्वर उपलब्ध नहीं। सत्यापित नमूनालకు డెమో విధానం అందుబాటులో ఉంటుంది.', 'Primary crop: {crop}': 'मुख्य फसल: {crop}', 'Size: {size}': 'क्षेत्रफल: {size}', 'Humidity: {value}': 'तेम: {value}', 'Rain chance: {value}': 'बारिश की संभावना: {value}', 'Rainfall: {value}': 'वर्षा: {value}', 'Wind: {value}': 'हवा: {value}', 'Temperature: {value}': 'उष्णोग्रत: {value}', 'Reasons: {reasons}': 'कारण: {reasons}', 'Risk score: {score}': 'जोखिम स्कोर: {score}', 'Close dialog': 'डायलॉగ్ మూసివేయండి'
      }
    }
  };

  translations.en.languageLabel = 'Language';
  translations.te.languageLabel = 'భాష';
  translations.hi.languageLabel = 'भाषा';
  translations.en.pageTitleHome = 'CropGuardian AI — Early Crop Disease Detection & Decision Support';
  translations.te.pageTitleHome = 'CropGuardian AI — పంట వ్యాధుల ముందస్తు గుర్తింపు';
  translations.hi.pageTitleHome = 'CropGuardian AI — फसल रोगों की समय रहते पहचान';
  translations.en.pageTitleLogin = 'Sign In | CropGuardian AI';
  translations.te.pageTitleLogin = 'ప్రవేశించండి | CropGuardian AI';
  translations.hi.pageTitleLogin = 'साइन इन | CropGuardian AI';
  translations.en.pageTitleSignup = 'Create Account | CropGuardian AI';
  translations.te.pageTitleSignup = 'ఖాతా సృష్టించండి | CropGuardian AI';
  translations.hi.pageTitleSignup = 'खाता बनाएँ | CropGuardian AI';
  translations.hi.phrases = {
    'Language': 'भाषा', 'Select language': 'भाषा चुनें', 'Sign in': 'साइन इन', 'Sign out': 'साइन आउट', 'Farm profile': 'खेत की प्रोफ़ाइल',
    'Saved Snapshots History': 'सहेजे गए फसल रिकॉर्ड', 'View Saved Snapshots': 'सहेजे गए रिकॉर्ड देखें', 'AI Settings / API Key': 'AI सेटिंग', 'Open AI Settings': 'AI सेटिंग खोलें', 'Toggle navigation menu': 'नेविगेशन मेन्यू खोलें या बंद करें',
    'Farm summary': 'खेत का सारांश', 'Not set': 'सेट नहीं है', 'Primary crop: Not set': 'मुख्य फसल: सेट नहीं है', 'Size: Not set': 'क्षेत्रफल: सेट नहीं है', 'Edit farm profile': 'खेत की जानकारी बदलें',
    'Start your first crop scan.': 'अपना पहला फसल स्कैन शुरू करें।', 'Risk assessment based on available scan information.': 'उपलब्ध स्कैन जानकारी के आधार पर जोखिम आकलन।', 'Your saved scans will appear here.': 'आपके सहेजे स्कैन यहाँ दिखेंगे।',
    'Not configured': 'कॉन्फ़िगर नहीं है', 'Location needed': 'स्थान आवश्यक है', 'Add your farm location to view weather.': 'मौसम देखने के लिए खेत का स्थान जोड़ें।', 'Humidity: Not set': 'नमी: सेट नहीं है', 'Rain chance: Not set': 'बारिश की संभावना: सेट नहीं है', 'Rainfall: Not set': 'वर्षा: सेट नहीं है', 'Wind: Not set': 'हवा: सेट नहीं है',
    'What needs attention': 'ध्यान देने योग्य बातें', 'No alerts yet. Alerts will appear after a high-risk scan or configured weather check.': 'अभी कोई चेतावनी नहीं है। अधिक जोखिम वाले स्कैन या मौसम जाँच के बाद चेतावनी दिखेगी।', 'Your field history': 'आपके खेत का इतिहास', 'View all': 'सभी देखें',
    'Complete a scan to receive crop-specific guidance.': 'फसल के अनुसार सलाह पाने के लिए स्कैन पूरा करें।', 'Guidance is informational. Consult a local agriculture expert and follow product labels/local guidance.': 'यह जानकारी सामान्य मार्गदर्शन के लिए है। स्थानीय कृषि विशेषज्ञ से सलाह लें और उत्पाद लेबल व स्थानीय निर्देशों का पालन करें।',
    'Your field record': 'आपके खेत का रिकॉर्ड', 'Farmer & farm profile': 'किसान और खेत की जानकारी', 'Keep your context close to the recommendations. Nothing is assumed or pre-filled.': 'सलाह के लिए अपनी जानकारी यहाँ रखें। कोई विवरण मानकर नहीं भरा गया है।',
    'Farmer profile': 'किसान की जानकारी', 'About you': 'आपके बारे में', 'Name': 'नाम', 'Phone': 'फ़ोन', 'Email': 'ईमेल', 'Location': 'स्थान', 'Preferred language': 'पसंदीदा भाषा', 'Save farmer profile': 'किसान की जानकारी सहेजें',
    'About your field': 'आपके खेत के बारे में', 'Farm name': 'खेत का नाम', 'Farm size': 'खेत का क्षेत्रफल', 'Primary crop': 'मुख्य फसल', 'Growth stage': 'विकास अवस्था', 'Irrigation method': 'सिंचाई का तरीका', 'Soil type': 'मिट्टी का प्रकार', 'Planting date': 'बुवाई की तारीख', 'Save farm profile': 'खेत की जानकारी सहेजें',
    'AI-Powered Agricultural Decision Support': 'AI आधारित कृषि निर्णय सहायता', 'Protect Your Harvest.': 'अपनी फसल सुरक्षित रखें।', 'AI-powered crop disease detection that helps farmers identify potential problems early and understand what action to take next.': 'AI से फसल की समस्या समय रहते पहचानें और आगे की कार्रवाई समझें।',
    'Scan My Crop': 'मेरी फसल स्कैन करें', 'How It Works': 'यह कैसे काम करता है', 'Multi-Crop Disease Support': 'कई फसलों की रोग पहचान', 'Instant Risk Score': 'तुरंत जोखिम स्कोर', 'Farmer Support Portals': 'किसान सहायता पोर्टल',
    'Early Detection': 'समय रहते पहचान', 'Detect foliar pathogens at initial symptom onset before widespread field contagion occurs.': 'शुरुआती लक्षणों पर पत्तियों के रोग पहचानें, ताकि वे पूरे खेत में न फैलें।', 'AI-Powered Analysis': 'AI विश्लेषण', 'Actionable Guidance': 'काम की सलाह',
    'System Workflow': 'काम की प्रक्रिया', 'Detect → Understand → Act': 'पहचानें → समझें → कदम उठाएँ', '01 — SCAN': '01 — स्कैन', '02 — ANALYZE': '02 — जाँच', '03 — ACT': '03 — कार्रवाई', 'STEP 01': 'चरण 01', 'STEP 02': 'चरण 02', 'STEP 03': 'चरण 03',
    'AI Crop Diagnostics': 'AI फसल जाँच', 'Drag & Drop Leaf Photo Here': 'पत्ती की तस्वीर यहाँ छोड़ें', 'Browse Files / Open Camera': 'फ़ाइल चुनें / कैमरा खोलें', 'Demo Quick Presets': 'त्वरित डेमो नमूने', '1-Click Test': 'एक क्लिक जाँच',
    'Analyzing your crop...': 'आपकी फसल की जाँच हो रही है...', 'Inspecting leaf patterns': 'पत्तियों के नमूने देख रहे हैं', 'Identifying possible disease': 'संभावित रोग पहचान रहे हैं', 'Estimating severity': 'गंभीरता का अनुमान लगा रहे हैं', 'Preparing action plan': 'कार्रवाई की योजना बना रहे हैं',
    'Scientific name not available': 'वैज्ञानिक नाम उपलब्ध नहीं', 'Pathogen Analysis Completed': 'रोगकारक का विश्लेषण पूरा', 'Foliar coverage evaluation': 'पत्तियों पर असर का आकलन', 'RISK INDEX': 'जोखिम सूचकांक', 'HIGH RISK (IMMEDIATE ACTION)': 'अधिक जोखिम (तुरंत कार्रवाई)',
    'Weather unavailable': 'मौसम जानकारी उपलब्ध नहीं', 'Available': 'उपलब्ध', 'Weather context unavailable.': 'मौसम की जानकारी उपलब्ध नहीं।', 'Conditions around this scan': 'स्कैन के समय की मौसम स्थिति', 'Current conditions may affect disease risk.': 'मौजूदा मौसम रोग के जोखिम को प्रभावित कर सकता है।',
    'Your Crop Health Snapshot': 'आपकी फसल का स्वास्थ्य सारांश', 'Crop Risk': 'फसल का जोखिम', 'Risk Level': 'जोखिम स्तर', 'Recovery Outlook': 'सुधार की संभावना', 'Action Window': 'कार्रवाई का समय', 'Prompt Attention Needed': 'जल्द ध्यान देना ज़रूरी',
    'Recommended Action': 'सुझाई गई कार्रवाई', 'Prevention Tips': 'बचाव के सुझाव', 'Action Urgency': 'कार्रवाई की तात्कालिकता', 'HIGH URGENCY': 'तुरंत कार्रवाई करें', 'Saved locally': 'यहीं सहेजा गया', 'Scan history': 'स्कैन इतिहास',
    'Government Portals': 'सरकारी पोर्टल', 'Farmer Support Schemes': 'किसान सहायता योजनाएँ', 'All Support': 'सभी सहायता', 'Income Support': 'आय सहायता', 'Crop Insurance': 'फसल बीमा', 'Soil Management': 'मिट्टी प्रबंधन', 'Agronomic Advisory': 'कृषि सलाह',
    'AI Integration Settings': 'AI एकीकरण सेटिंग', 'Close History Modal': 'इतिहास विंडो बंद करें', 'Saved Crop Snapshots': 'सहेजे गए फसल रिकॉर्ड', 'Quick Navigation': 'त्वरित नेविगेशन', 'Safety & Compliance': 'सुरक्षा और नियम',
    'Welcome back': 'फिर से स्वागत है', 'Your farm workspace': 'आपका खेत कार्यक्षेत्र', 'Sign in to access your saved crop history and assistant conversations.': 'सहेजा हुआ फसल इतिहास और सहायक की बातचीत देखने के लिए साइन इन करें।',
    'Remember me on this device': 'इस डिवाइस पर याद रखें', 'New to CropGuardian?': 'CropGuardian पर नए हैं?', 'Create an account': 'खाता बनाएँ', 'Continue without signing in': 'बिना साइन इन किए आगे बढ़ें', 'A safer place for your records': 'आपके खेत के रिकॉर्ड के लिए सुरक्षित जगह',
    'Create your account': 'अपना खाता बनाएँ', 'Save crop analyses, chat history, and your preferred language across sessions.': 'फसल विश्लेषण, चैट इतिहास और पसंदीदा भाषा सहेजें।', 'Your name': 'आपका नाम', 'Use at least 10 characters.': 'कम से कम 10 अक्षर रखें।', 'Already have an account?': 'पहले से खाता है?',
    'Password': 'पासवर्ड', 'Confirm Password': 'पासवर्ड की पुष्टि करें', 'Forgot Password': 'पासवर्ड भूल गए?', 'Signing in...': 'साइन इन हो रहा है...', 'Creating your account...': 'खाता बनाया जा रहा है...', 'Invalid email or password.': 'ईमेल या पासवर्ड सही नहीं है।',
    'Unable to sign in. Please try again.': 'साइन इन नहीं हो पाया। फिर से प्रयास करें।', 'Unable to create your account. Please try again.': 'खाता नहीं बन पाया। फिर से प्रयास करें।', 'Something went wrong. Please try again.': 'कुछ गड़बड़ हुई। फिर से प्रयास करें।', 'Try again': 'फिर से प्रयास करें',
    'No internet connection. Check your connection and try again.': 'इंटरनेट कनेक्शन नहीं है। जाँचकर फिर से प्रयास करें।', 'Please choose a valid crop.': 'मान्य फसल चुनें।', 'Name must be 100 characters or fewer.': 'नाम 100 अक्षरों से अधिक नहीं होना चाहिए।',
    'Farm location must be 120 characters or fewer.': 'खेत का स्थान 120 अक्षरों से अधिक नहीं होना चाहिए।', 'Please select a supported diagnostic crop.': 'जाँच के लिए समर्थित फसल चुनें।', 'Temperature': 'तापमान', 'Humidity': 'नमी', 'Wind': 'हवा', 'Rain': 'बारिश', 'Forecast': 'पूर्वानुमान',
    'Urgency': 'तात्कालिकता', 'Recommendation': 'सिफारिश', 'Disease': 'रोग', 'Confidence': 'विश्वास स्तर', 'Prevention': 'बचाव', 'Immediate Action': 'तुरंत कार्रवाई', 'Camera': 'कैमरा', 'Upload Image': 'तस्वीर अपलोड करें', 'Weather': 'मौसम', 'Recent Activity': 'हाल की गतिविधि', 'Voice Assistant': 'वॉयस सहायक', 'Settings': 'सेटिंग', 'Profile': 'प्रोफ़ाइल', 'Edit Profile': 'प्रोफ़ाइल संपादित करें', 'Saved History': 'सहेजा गया इतिहास',
    'AI is thinking...': 'AI सोच रहा है...', 'Typing...': 'लिख रहा है...', 'Thinking...': 'सोच रहा है...', 'Listening...': 'सुन रहा है...', 'Speaking...': 'बोल रहा है...', 'Microphone Permission Denied': 'माइक्रोफ़ोन अनुमति नहीं मिली', 'Voice Not Supported': 'वॉयस सुविधा समर्थित नहीं है',
    'Saved on this device.': 'इस डिवाइस पर सहेजा गया।', 'Unable to save. Check browser storage settings.': 'सहेज नहीं पाए। ब्राउज़र स्टोरेज सेटिंग जाँचें।', 'Updating...': 'अपडेट हो रहा है...', 'Updating weather...': 'मौसम अपडेट हो रहा है...', 'Unavailable': 'उपलब्ध नहीं', 'Stale data': 'पुरानी जानकारी',
    'No scans yet. Start your first crop scan.': 'अभी कोई स्कैन नहीं। पहला फसल स्कैन शुरू करें।', 'No scans yet. Complete a demo or AI analysis and save the result here.': 'अभी कोई स्कैन नहीं। डेमो या AI जाँच करके नतीजा यहाँ सहेजें।', 'Date not set': 'तारीख तय नहीं', 'Demo Mode': 'डेमो मोड', 'AI Analysis': 'AI जाँच', 'Severity': 'गंभीरता', 'Delete': 'हटाएँ', 'No schemes found in this category.': 'इस श्रेणी में कोई योजना नहीं मिली।', 'Learn More': 'और जानें',
    'Please select a JPG, PNG, or WEBP image.': 'JPG, PNG या WEBP तस्वीर चुनें।', 'Image size exceeds 10MB limit.': 'तस्वीर 10MB की सीमा से बड़ी है।', 'We could not read this image. Please choose another file.': 'तस्वीर पढ़ नहीं पाए। दूसरी फ़ाइल चुनें।', 'This image is very small. A clearer leaf photo may improve analysis.': 'तस्वीर बहुत छोटी है। पत्ती की साफ़ तस्वीर से जाँच बेहतर हो सकती है।', 'Image loaded successfully. Review the leaf framing before analysis.': 'तस्वीर लोड हो गई। जाँच से पहले पत्ती का फ्रेम देखें।',
    'Please select or upload a crop leaf image first.': 'पहले फसल की पत्ती की तस्वीर चुनें या अपलोड करें।', 'Unable to save this snapshot in browser storage.': 'यह रिकॉर्ड ब्राउज़र में सहेज नहीं पाए।', 'Crop Health Snapshot saved successfully!': 'फसल स्वास्थ्य रिकॉर्ड सहेज लिया गया!', 'Saved on this device. Account sync is unavailable.': 'इस डिवाइस पर सहेजा गया। खाते से सिंक उपलब्ध नहीं है।',
    'Backend connected. AI analysis is available when configured.': 'सर्वर जुड़ा है। सेटअप पूरा होने पर AI जाँच उपलब्ध होगी।', 'Backend unavailable. Demo Mode remains available for verified presets.': 'सर्वर उपलब्ध नहीं। सत्यापित नमूनों के लिए डेमो मोड उपलब्ध है।'
  };
  Object.assign(translations.te.phrases, {
    'Start voice input': 'వాయిస్ ప్రశ్న అడగండి', 'Speak your question': 'మీ ప్రశ్నను మాట్లాడండి', 'Stop voice input': 'వాయిస్ ఇన్‌పుట్ ఆపండి', 'Stop speaking': 'మాట్లాడటం ఆపండి',
    'Good morning,': 'శుభోదయం,', 'farmer': 'రైతు', 'Your latest crop signals, farm details, and next actions in one place.': 'మీ పంట స్థితి, పొలం వివరాలు, తదుపరి చర్యలు ఒకేచోట.',
    'Add your farm location in your profile.': 'మీ ప్రొఫైల్‌లో పొలం ప్రాంతాన్ని జోడించండి.', 'No scans yet': 'ఇంకా స్కాన్‌లు లేవు', 'Updated recently': 'ఇటీవల నవీకరించబడింది', 'No recommendation yet': 'ఇంకా సిఫార్సు లేదు',
    'Deterministic guidance': 'సాధారణ మార్గదర్శకం', 'Farmer question': 'రైతు ప్రశ్న', 'Seedling': 'మొలక దశ', 'Vegetative': 'ఆకు పెరుగుదల దశ', 'Flowering': 'పూత దశ', 'Harvest': 'కోత దశ',
    'Drip': 'బిందు సేద్యం', 'Furrow': 'కాలువ సేద్యం', 'Flood': 'ముంపు సేద్యం', 'Rainfed': 'వర్షాధారిత', 'Detect Early.': 'ముందుగానే గుర్తించండి.', 'Act Smart.': 'తెలివిగా చర్య తీసుకోండి.',
    'Crop Risk Meter': 'పంట ప్రమాద సూచిక', 'Demo Preset': 'డెమో నమూనా', 'Healthy Tomato Leaf': 'ఆరోగ్యకరమైన టమాటా ఆకు', 'Scan Another Crop': 'మరో పంటను స్కాన్ చేయండి', 'Alternaria solani': 'Alternaria solani',
    'Demo Mode estimate; not calibrated confidence.': 'డెమో అంచనా; నమ్మక శాతం కేలిబ్రేట్ చేయలేదు.', 'Concentric ring target lesions with chlorotic yellow halo margins detected on lower foliage.': 'కింది ఆకులపై పసుపు అంచులతో వలయాకార మచ్చలు కనిపించాయి.',
    'Risk assessment based on the available scan information. No active disease severity was reported.': 'అందుబాటులో ఉన్న స్కాన్ సమాచారం ఆధారంగా అంచనా. వ్యాధి తీవ్రత నమోదు కాలేదు.', 'Weather context': 'వాతావరణ సమాచారం', 'Temperature: Not set': 'ఉష్ణోగ్రత: నమోదు కాలేదు',
    'Prune and safely destroy lower leaves exhibiting early target-spot symptoms to reduce spore spread.': 'వ్యాధి వ్యాప్తి తగ్గించేందుకు లక్షణాలున్న కింది ఆకులను కత్తిరించి సురక్షితంగా తొలగించండి.',
    'Apply approved protective copper fungicide or bio-agent spray per local agricultural recommendations.': 'స్థానిక వ్యవసాయ సలహా ప్రకారం ఆమోదిత రాగి శిలీంధ్రనాశిని లేదా జీవ నియంత్రకాన్ని వాడండి.',
    'Improve plant trellising and spacing to increase air circulation and keep foliage dry.': 'గాలి ప్రసరణ పెరిగి ఆకులు పొడిగా ఉండేలా మొక్కల మధ్య దూరం, ఆధారాలను సరిచేయండి.',
    'Consult your local Krishi Vigyan Kendra (KVK) or extension officer if lesions spread to stems or fruit.': 'మచ్చలు కాండం లేదా పండ్లకు వ్యాపిస్తే స్థానిక కృషి విజ్ఞాన కేంద్రం లేదా వ్యవసాయ అధికారిని సంప్రదించండి.',
    'Switch to drip irrigation or furrow watering to avoid wetting upper leaf canopies.': 'పై ఆకులు తడవకుండా బిందు లేదా కాలువ సేద్యాన్ని ఉపయోగించండి.',
    'Implement a 2-3 year crop rotation schedule avoiding other Solanaceae (potatoes, eggplants).': 'బంగాళాదుంప, వంకాయ వంటి సోలానేసీ పంటలను మినహాయించి 2–3 ఏళ్ల పంట మార్పిడి చేయండి.',
    'Apply organic straw or plastic mulch around plant bases to prevent soil splashing of spores.': 'మట్టి చిమ్మి బీజాంశాలు వ్యాపించకుండా మొక్కల అడుగున సేంద్రియ గడ్డి లేదా ప్లాస్టిక్ మల్చ్ వేయండి.',
    'Sanitize all pruning shears and tools with diluted disinfectant between planting beds.': 'మొక్కల వరుసల మధ్య కత్తెరలు, పనిముట్లను పలుచన చేసిన శుభ్రపరిచే ద్రావణంతో శుభ్రం చేయండి.',
    'Direct Benefit Transfer': 'నేరుగా లబ్ధిదారునికి చెల్లింపు', 'Provides ₹6,000 per year direct income support in three equal installments to eligible landholding farmer families across India to meet agricultural inputs and domestic needs.': 'అర్హత కలిగిన భూమి ఉన్న రైతు కుటుంబాలకు వ్యవసాయ, గృహ అవసరాల కోసం సంవత్సరానికి ₹6,000ను మూడు విడతలుగా అందిస్తుంది.',
    'Official PM-KISAN Portal': 'అధికారిక PM-KISAN పోర్టల్', 'Comprehensive Risk Cover': 'సమగ్ర ప్రమాద బీమా', 'Comprehensive yield insurance coverage against non-preventable natural risks, localized calamities, post-harvest losses, and widespread crop disease outbreaks at minimal premium rates.': 'నివారించలేని ప్రకృతి ప్రమాదాలు, స్థానిక విపత్తులు, కోత అనంతర నష్టాలు, విస్తృత పంట వ్యాధుల నుంచి తక్కువ ప్రీమియంతో దిగుబడి బీమా.',
    'Official PMFBY Portal': 'అధికారిక PMFBY పోర్టల్', 'Soil Nutrient Advisory': 'నేల పోషకాల సలహా', 'Provides farmers with personalized crop-wise nutrient recommendations and soil health reports to optimize fertilizer use, improve soil fertility, and reduce input costs.': 'ఎరువుల వినియోగాన్ని మెరుగుపరచి ఖర్చు తగ్గించేందుకు పంటకు తగిన పోషక సూచనలు, నేల ఆరోగ్య నివేదికలు అందిస్తుంది.', 'Official Soil Health Portal': 'అధికారిక నేల ఆరోగ్య పోర్టల్',
    'Affordable Farm Credit': 'తక్కువ ఖర్చు వ్యవసాయ రుణం', 'Provides timely access to short-term institutional credit for cultivation expenses, post-harvest costs, and maintenance of farm assets with interest subvention benefits.': 'సాగు ఖర్చులు, కోత అనంతర అవసరాలు, వ్యవసాయ ఆస్తుల నిర్వహణకు వడ్డీ రాయితీతో స్వల్పకాలిక రుణం అందిస్తుంది.', 'Official Ministry Portal (agricoop.nic.in)': 'అధికారిక మంత్రిత్వ శాఖ పోర్టల్',
    'Expert Agro-Scientists': 'వ్యవసాయ శాస్త్ర నిపుణులు', 'District-level agricultural science centers providing front-line demonstrations, on-farm testing of crop protection technologies, disease diagnostics, and farmer training.': 'జిల్లా స్థాయి వ్యవసాయ విజ్ఞాన కేంద్రాలు పంట రక్షణ పరీక్షలు, వ్యాధి నిర్ధారణ, రైతు శిక్షణ అందిస్తాయి.', 'Official ICAR KVK Portal': 'అధికారిక ICAR KVK పోర్టల్',
    'Immediately isolate infected plants and remove severely blighted vines into sealed bags.': 'సోకిన మొక్కలను వెంటనే వేరుచేసి, తీవ్రంగా దెబ్బతిన్న తీగలను మూసిన సంచుల్లో తొలగించండి.',
    'Apply targeted systemic or contact anti-oomycete sprays recommended by certified agronomists.': 'ధృవీకరించిన వ్యవసాయ నిపుణులు సూచించిన వ్యాధి నియంత్రణ మందును మాత్రమే వాడండి.',
    'Avoid overhead watering completely and inspect surrounding rows daily.': 'పై నుంచి నీరు పోయడం పూర్తిగా నివారించి, పక్క వరుసలను ప్రతిరోజూ పరిశీలించండి.',
    'Harvest unaffected mature fruits early if humid conditions persist.': 'తేమ ఎక్కువగా కొనసాగితే ఆరోగ్యంగా పండిన పండ్లను ముందుగానే కోయండి.',
    'Plant certified disease-resistant tomato hybrids during monsoon or high-humidity seasons.': 'వర్షాకాలం లేదా అధిక తేమ సమయంలో ధృవీకరించిన వ్యాధి నిరోధక టమాటా రకాలు నాటండి.',
    'Ensure wide plant spacing (minimum 60 cm) to facilitate rapid wind circulation.': 'గాలి ప్రసరణకు మొక్కల మధ్య కనీసం 60 సెం.మీ. దూరం ఉంచండి.',
    'Eliminate cull piles, volunteer tomato seedlings, and wild nightshade weeds.': 'తిరస్కరించిన మొక్కల కుప్పలు, స్వయంగా మొలిచిన టమాటా మొక్కలు, అడవి కలుపును తొలగించండి.',
    'Monitor regional agro-meteorological disease forecast alerts.': 'ప్రాంతీయ వ్యవసాయ వాతావరణ వ్యాధి హెచ్చరికలను గమనించండి.',
    'Immediate field intervention required. Late blight can rapidly defoliate entire crop stands.': 'తక్షణ పొల చర్య అవసరం. ఆలస్య తెగులు త్వరగా మొత్తం పంట ఆకులను నాశనం చేయగలదు.',
    'Guarded. Rapid intervention is vital to contain whole-field sporulation.': 'జాగ్రత్త అవసరం. పొలం అంతటా వ్యాప్తిని ఆపేందుకు త్వరిత చర్య ముఖ్యం.',
    'Regulate field water levels maintaining shallow standing water (2-5 cm) to suppress blast spread.': 'తెగులు వ్యాప్తి తగ్గించేందుకు పొలంలో 2–5 సెం.మీ. లోతు నీటిని స్థిరంగా ఉంచండి.',
    'Temporarily suspend excessive top-dress nitrogen fertilizers which exacerbate foliage susceptibility.': 'ఆకుల సున్నితత్వం పెరగకుండా అధిక నత్రజని పైఎరువును తాత్కాలికంగా ఆపండి.',
    'Apply recommended bio-control agents (Pseudomonas fluorescens) or approved triazole fungicide sprays.': 'సూచించిన జీవ నియంత్రకాలు లేదా ఆమోదిత ట్రయాజోల్ శిలీంధ్రనాశినిని వాడండి.',
    'Spray during early morning or late afternoon when wind speeds are minimal.': 'గాలి తక్కువగా ఉండే ఉదయం లేదా సాయంత్రం వేళ పిచికారీ చేయండి.',
    'Treat seeds before sowing with recommended bio-priming agents or hot-water sanitation.': 'విత్తే ముందు సూచించిన జీవ శుద్ధి లేదా వేడి నీటి పద్ధతితో విత్తనాలను శుద్ధి చేయండి.',
    'Adopt split application of nitrogenous fertilizers balanced with adequate potassium and silica.': 'పొటాషియం, సిలికాతో సమతుల్యంగా నత్రజని ఎరువును విడతలుగా వేయండి.',
    'Maintain clean bunds by weeding wild grassy host plants that harbor blast spores.': 'తెగులు బీజాంశాలు ఉండే అడవి గడ్డి మొక్కలను తొలగించి గట్లను శుభ్రంగా ఉంచండి.',
    'Cultivate blast-tolerant paddy varieties suited for your agro-climatic zone.': 'మీ వాతావరణ ప్రాంతానికి సరిపోయే తెగులు నిరోధక వరి రకాలను సాగు చేయండి.',
    'Take prompt agronomic and field water management action before blast reaches panicle stage.': 'తెగులు కంకి దశకు చేరకముందే వ్యవసాయ, నీటి నిర్వహణ చర్యలు తీసుకోండి.',
    'Favorable with nitrogen regulation and timely protective spray before neck-blast phase.': 'నత్రజని నియంత్రణ, సరైన సమయంలో రక్షణ పిచికారీ చేస్తే కోలుకునే అవకాశం మంచిది.',
    'Remove and destroy heavily spotted senescing leaves from bottom nodes.': 'కింది కొమ్మలపై ఎక్కువ మచ్చలున్న వాడిన ఆకులను తొలగించి నాశనం చేయండి.',
    'Apply foliar potassium sprays if leaf spot is associated with nutrient deficiency stress.': 'పోషక లోపం వల్ల మచ్చలు వస్తే ఆకులపై పొటాషియం పిచికారీ చేయండి.',
    'Apply approved protective copper oxychloride or mancozeb sprays as guided by local experts.': 'స్థానిక నిపుణుల సూచనతో ఆమోదిత కాపర్ ఆక్సీక్లోరైడ్ లేదా మాంకోజెబ్ వాడండి.',
    'Maintain optimal field drainage to avoid root hypoxia after heavy rains.': 'భారీ వర్షాల తర్వాత వేర్లకు గాలి అందేలా పొలంలో నీరు బయటకు వెళ్లే మార్గం ఉంచండి.',
    'Ensure balanced N-P-K soil nutrition based on recent Soil Health Card recommendations.': 'తాజా నేల ఆరోగ్య కార్డు సూచనల ప్రకారం N-P-K పోషకాలను సమతుల్యం చేయండి.',
    'Destroy cotton crop residues thoroughly after the final harvest picking.': 'చివరి పత్తి ఏరిన తర్వాత పంట అవశేషాలను పూర్తిగా తొలగించండి.',
    'Follow recommended seed treatment protocols prior to sowing.': 'విత్తే ముందు సూచించిన విత్తన శుద్ధి విధానాన్ని పాటించండి.',
    'Space cotton rows properly to avoid dense canopy micro-climates.': 'ఆకుల దట్టమైన తేమ వాతావరణం ఏర్పడకుండా పత్తి వరుసలకు తగిన దూరం ఇవ్వండి.',
    'Monitor closely, inspect surrounding rows, and balance foliar nutrition.': 'దగ్గరగా గమనించి పక్క వరుసలను పరిశీలించండి; ఆకుల పోషణను సమతుల్యం చేయండి.',
    'Moderate to High. Yield impact remains low if leaf spot is contained before mid-boll development.': 'మధ్యస్థం నుంచి మంచిది. కాయలు పెరిగే ముందు మచ్చలను నియంత్రిస్తే దిగుబడి నష్టం తక్కువగా ఉంటుంది.',
    'Rogue out severely affected foliage to limit airborne conidial spore load.': 'గాలిలో వ్యాపించే బీజాంశాలు తగ్గించేందుకు తీవ్రంగా దెబ్బతిన్న ఆకులను తొలగించండి.',
    'Apply certified protective fungicide barrier on healthy adjacent rows.': 'పక్కనున్న ఆరోగ్యకరమైన వరుసలకు ధృవీకరించిన రక్షణ శిలీంధ్రనాశిని వేయండి.',
    'Ensure plants are well-watered at the root zone without causing soil saturation.': 'నేల ముంచకుండా వేర్ల ప్రాంతానికి సరిపడా నీరు అందించండి.',
    'Maintain tuber hilling to prevent fungal spores from washing down into potato tubers.': 'బీజాంశాలు దుంపలకు చేరకుండా బంగాళాదుంప మొక్కల చుట్టూ మట్టిని ఎత్తుగా పెట్టండి.',
    'Use certified disease-free potato seed tubers.': 'ధృవీకరించిన వ్యాధి రహిత బంగాళాదుంప విత్తన దుంపలు వాడండి.',
    'Practice 3-year crop rotation with non-host cereals or legumes.': 'వ్యాధికి ఆతిథ్యం ఇవ్వని ధాన్యాలు లేదా పప్పులతో మూడేళ్ల పంట మార్పిడి చేయండి.',
    'Maintain optimum soil potassium and nitrogen levels to support crop vigor.': 'పంట బలంగా పెరగడానికి నేలలో పొటాషియం, నత్రజని స్థాయిలను సరైన రీతిలో ఉంచండి.',
    'Harvest tubers only after vine maturity and avoid skinning during digging.': 'తీగలు పూర్తిగా పక్వమైన తర్వాతే దుంపలు తీయండి; తవ్వేటప్పుడు తొక్క దెబ్బతినకుండా చూడండి.',
    'Inspect lower canopy and apply preventive protective barrier.': 'కింది ఆకులను పరిశీలించి ముందస్తు రక్షణ చర్య తీసుకోండి.',
    'No chemical or corrective treatment required. Crop demonstrates optimal physiological health.': 'రసాయన లేదా సరిదిద్దే చికిత్స అవసరం లేదు. పంట ఆరోగ్యంగా ఉంది.',
    'Continue standard organic fertilization, regular scouting, and moisture maintenance.': 'సాధారణ సేంద్రియ ఎరువులు, పంట పరిశీలన, తేమ నిర్వహణ కొనసాగించండి.',
    'Ensure supportive staking and gentle pruning of bottom suckers for adequate air flow.': 'గాలి ప్రసరణ కోసం మొక్కలకు ఆధారం ఇచ్చి కింది అనవసర కొమ్మలను మృదువుగా కత్తిరించండి.',
    'Maintain uniform drip irrigation schedule to prevent blossom-end rot and foliage moisture.': 'పండ్ల చివర కుళ్ళు, ఆకుల తేమ నివారించేందుకు సమానంగా బిందు సేద్యం చేయండి.',
    'Keep scouting twice weekly during high humidity or rain transitions.': 'తేమ ఎక్కువగా ఉన్నప్పుడు లేదా వర్ష మార్పుల సమయంలో వారానికి రెండుసార్లు పరిశీలించండి.',
    'Preserve beneficial predator insects (ladybugs, hoverflies) for natural pest control.': 'సహజ పురుగు నియంత్రణకు మిత్ర కీటకాలను (లేడీబర్డ్, హోవర్‌ఫ్లై) కాపాడండి.',
    'Regularly replenish organic mulch layers.': 'సేంద్రియ మల్చ్ పొరను క్రమం తప్పకుండా పెంచండి.',
    'Continue regular preventative monitoring and standard agronomic care.': 'నియమిత నివారణ పరిశీలన, సాధారణ వ్యవసాయ సంరక్షణ కొనసాగించండి.'
  });
  Object.assign(translations.hi.phrases, {
    'Start voice input': 'आवाज़ में सवाल पूछें', 'Speak your question': 'अपना सवाल बोलें', 'Stop voice input': 'आवाज़ इनपुट रोकें', 'Stop speaking': 'बोलना बंद करें',
    'Good morning,': 'सुप्रभात,', 'farmer': 'किसान', 'Your latest crop signals, farm details, and next actions in one place.': 'आपकी फसल की स्थिति, खेत का विवरण और अगले कदम एक ही जगह।',
    'Add your farm location in your profile.': 'मौसम देखने के लिए प्रोफ़ाइल में खेत का स्थान जोड़ें।', 'No scans yet': 'अभी कोई स्कैन नहीं', 'Updated recently': 'हाल में अपडेट किया गया', 'No recommendation yet': 'अभी कोई सलाह नहीं',
    'Deterministic guidance': 'सामान्य मार्गदर्शन', 'Farmer question': 'किसान का सवाल', 'Seedling': 'अंकुर अवस्था', 'Vegetative': 'विकास अवस्था', 'Flowering': 'फूल आने की अवस्था', 'Harvest': 'कटाई',
    'Drip': 'टपक सिंचाई', 'Furrow': 'नाली सिंचाई', 'Flood': 'भराव सिंचाई', 'Rainfed': 'वर्षा आधारित', 'Detect Early.': 'समय रहते पहचानें।', 'Act Smart.': 'समझदारी से कदम उठाएँ।',
    'Crop Risk Meter': 'फसल जोखिम मापक', 'Demo Preset': 'डेमो नमूना', 'Healthy Tomato Leaf': 'स्वस्थ टमाटर का पत्ता', 'Scan Another Crop': 'दूसरी फसल स्कैन करें', 'Alternaria solani': 'Alternaria solani',
    'Demo Mode estimate; not calibrated confidence.': 'डेमो अनुमान; विश्वास स्तर का अंशांकन नहीं हुआ है।', 'Concentric ring target lesions with chlorotic yellow halo margins detected on lower foliage.': 'निचली पत्तियों पर पीले घेरे वाले गोल धब्बे दिखाई दिए।',
    'Risk assessment based on the available scan information. No active disease severity was reported.': 'उपलब्ध स्कैन जानकारी के आधार पर आकलन। रोग की सक्रिय गंभीरता दर्ज नहीं हुई।', 'Weather context': 'मौसम की जानकारी', 'Temperature: Not set': 'तापमान: दर्ज नहीं',
    'Prune and safely destroy lower leaves exhibiting early target-spot symptoms to reduce spore spread.': 'रोग फैलाव घटाने के लिए धब्बों वाली निचली पत्तियाँ काटकर सुरक्षित रूप से नष्ट करें।',
    'Apply approved protective copper fungicide or bio-agent spray per local agricultural recommendations.': 'स्थानीय कृषि सलाह के अनुसार स्वीकृत तांबा-आधारित फफूंदनाशक या जैविक घोल का उपयोग करें।',
    'Improve plant trellising and spacing to increase air circulation and keep foliage dry.': 'हवा का संचार बढ़ाने और पत्तियाँ सूखी रखने के लिए पौधों को सहारा दें और उचित दूरी रखें।',
    'Consult your local Krishi Vigyan Kendra (KVK) or extension officer if lesions spread to stems or fruit.': 'धब्बे तने या फल तक फैलें तो स्थानीय कृषि विज्ञान केंद्र या विस्तार अधिकारी से सलाह लें।',
    'Switch to drip irrigation or furrow watering to avoid wetting upper leaf canopies.': 'ऊपरी पत्तियाँ गीली होने से बचाने के लिए टपक या नाली सिंचाई अपनाएँ।',
    'Implement a 2-3 year crop rotation schedule avoiding other Solanaceae (potatoes, eggplants).': 'आलू और बैंगन जैसी सोलेनेसी फसलों से बचते हुए 2–3 साल का फसल चक्र अपनाएँ।',
    'Apply organic straw or plastic mulch around plant bases to prevent soil splashing of spores.': 'मिट्टी के छींटों से रोगाणु फैलने से रोकने के लिए पौधों के पास जैविक भूसा या प्लास्टिक मल्च बिछाएँ।',
    'Sanitize all pruning shears and tools with diluted disinfectant between planting beds.': 'क्यारियों के बीच छँटाई की कैंची और औज़ारों को हल्के कीटाणुनाशक से साफ़ करें।',
    'Direct Benefit Transfer': 'सीधे खाते में सहायता', 'Provides ₹6,000 per year direct income support in three equal installments to eligible landholding farmer families across India to meet agricultural inputs and domestic needs.': 'पात्र भूमिधारक किसान परिवारों को खेती और घरेलू जरूरतों के लिए सालाना ₹6,000 तीन बराबर किस्तों में दिए जाते हैं।', 'Official PM-KISAN Portal': 'आधिकारिक PM-KISAN पोर्टल',
    'Comprehensive Risk Cover': 'व्यापक जोखिम सुरक्षा', 'Comprehensive yield insurance coverage against non-preventable natural risks, localized calamities, post-harvest losses, and widespread crop disease outbreaks at minimal premium rates.': 'कम प्रीमियम पर प्राकृतिक जोखिम, स्थानीय आपदा, कटाई बाद नुकसान और व्यापक फसल रोग से उपज का बीमा कवर।', 'Official PMFBY Portal': 'आधिकारिक PMFBY पोर्टल',
    'Soil Nutrient Advisory': 'मिट्टी पोषण सलाह', 'Provides farmers with personalized crop-wise nutrient recommendations and soil health reports to optimize fertilizer use, improve soil fertility, and reduce input costs.': 'उर्वरक का सही उपयोग, मिट्टी की उर्वरता और लागत सुधारने के लिए फसल अनुसार पोषक सलाह और मिट्टी स्वास्थ्य रिपोर्ट।', 'Official Soil Health Portal': 'आधिकारिक मृदा स्वास्थ्य पोर्टल',
    'Affordable Farm Credit': 'किफायती कृषि ऋण', 'Provides timely access to short-term institutional credit for cultivation expenses, post-harvest costs, and maintenance of farm assets with interest subvention benefits.': 'खेती, कटाई बाद खर्च और कृषि संपत्ति के रखरखाव के लिए ब्याज सहायता सहित समय पर अल्पकालिक संस्थागत ऋण।', 'Official Ministry Portal (agricoop.nic.in)': 'आधिकारिक मंत्रालय पोर्टल',
    'Expert Agro-Scientists': 'कृषि विज्ञान विशेषज्ञ', 'District-level agricultural science centers providing front-line demonstrations, on-farm testing of crop protection technologies, disease diagnostics, and farmer training.': 'जिला कृषि विज्ञान केंद्र खेत में तकनीक का परीक्षण, रोग पहचान और किसान प्रशिक्षण देते हैं।', 'Official ICAR KVK Portal': 'आधिकारिक ICAR KVK पोर्टल',
    'Immediately isolate infected plants and remove severely blighted vines into sealed bags.': 'संक्रमित पौधों को तुरंत अलग करें और गंभीर रूप से प्रभावित बेलों को बंद थैलों में हटाएँ।',
    'Apply targeted systemic or contact anti-oomycete sprays recommended by certified agronomists.': 'प्रमाणित कृषि विशेषज्ञ की सलाह से ही रोग नियंत्रण स्प्रे का उपयोग करें।',
    'Avoid overhead watering completely and inspect surrounding rows daily.': 'ऊपर से पानी देना बंद करें और आसपास की कतारों को रोज़ जाँचें।',
    'Harvest unaffected mature fruits early if humid conditions persist.': 'नमी लगातार बनी रहे तो स्वस्थ पके फलों को जल्दी तोड़ लें।',
    'Plant certified disease-resistant tomato hybrids during monsoon or high-humidity seasons.': 'मानसून या अधिक नमी के मौसम में प्रमाणित रोग-रोधी टमाटर संकर लगाएँ।',
    'Ensure wide plant spacing (minimum 60 cm) to facilitate rapid wind circulation.': 'हवा के अच्छे संचार के लिए पौधों में कम से कम 60 सेमी दूरी रखें।',
    'Eliminate cull piles, volunteer tomato seedlings, and wild nightshade weeds.': 'खराब पौधों के ढेर, अपने आप उगे टमाटर और जंगली खरपतवार हटाएँ।',
    'Monitor regional agro-meteorological disease forecast alerts.': 'क्षेत्रीय कृषि-मौसम रोग पूर्वानुमान चेतावनियों पर नज़र रखें।',
    'Immediate field intervention required. Late blight can rapidly defoliate entire crop stands.': 'खेत में तुरंत कार्रवाई करें। पछेती झुलसा तेजी से पूरी फसल की पत्तियाँ नष्ट कर सकता है।',
    'Guarded. Rapid intervention is vital to contain whole-field sporulation.': 'स्थिति गंभीर हो सकती है। पूरे खेत में फैलाव रोकने के लिए तुरंत कार्रवाई ज़रूरी है।',
    'Regulate field water levels maintaining shallow standing water (2-5 cm) to suppress blast spread.': 'ब्लास्ट फैलाव रोकने के लिए खेत में 2–5 सेमी पानी का स्तर बनाए रखें।',
    'Temporarily suspend excessive top-dress nitrogen fertilizers which exacerbate foliage susceptibility.': 'पत्तियों की संवेदनशीलता घटाने के लिए अधिक नाइट्रोजन टॉप-ड्रेसिंग कुछ समय रोकें।',
    'Apply recommended bio-control agents (Pseudomonas fluorescens) or approved triazole fungicide sprays.': 'सलाह अनुसार जैव नियंत्रण एजेंट या स्वीकृत ट्रायाज़ोल फफूंदनाशक का उपयोग करें।',
    'Spray during early morning or late afternoon when wind speeds are minimal.': 'हवा धीमी हो तब सुबह जल्दी या शाम को छिड़काव करें।',
    'Treat seeds before sowing with recommended bio-priming agents or hot-water sanitation.': 'बुवाई से पहले बीजों का अनुशंसित जैव उपचार या गर्म पानी से शोधन करें।',
    'Adopt split application of nitrogenous fertilizers balanced with adequate potassium and silica.': 'नाइट्रोजन उर्वरक को किस्तों में दें और पोटैशियम व सिलिका का संतुलन रखें।',
    'Maintain clean bunds by weeding wild grassy host plants that harbor blast spores.': 'ब्लास्ट के आश्रय खरपतवार हटाकर खेत की मेड़ों को साफ़ रखें।',
    'Cultivate blast-tolerant paddy varieties suited for your agro-climatic zone.': 'अपने क्षेत्र के अनुकूल ब्लास्ट-सहिष्णु धान की किस्में उगाएँ।',
    'Take prompt agronomic and field water management action before blast reaches panicle stage.': 'ब्लास्ट के बालियों तक पहुँचने से पहले खेत और पानी का प्रबंधन करें।',
    'Favorable with nitrogen regulation and timely protective spray before neck-blast phase.': 'नाइट्रोजन नियंत्रण और समय पर बचाव स्प्रे से सुधार की संभावना अच्छी है।',
    'Remove and destroy heavily spotted senescing leaves from bottom nodes.': 'नीचे की गाँठों से अधिक धब्बों वाली पुरानी पत्तियाँ हटाकर नष्ट करें।',
    'Apply foliar potassium sprays if leaf spot is associated with nutrient deficiency stress.': 'पोषक तत्वों की कमी से धब्बे हों तो पत्तियों पर पोटैशियम स्प्रे करें।',
    'Apply approved protective copper oxychloride or mancozeb sprays as guided by local experts.': 'स्थानीय विशेषज्ञ की सलाह पर स्वीकृत कॉपर ऑक्सीक्लोराइड या मैनकोज़ेब का छिड़काव करें।',
    'Maintain optimal field drainage to avoid root hypoxia after heavy rains.': 'भारी बारिश के बाद जड़ों में हवा की कमी रोकने के लिए खेत की निकासी ठीक रखें।',
    'Ensure balanced N-P-K soil nutrition based on recent Soil Health Card recommendations.': 'नवीनतम मृदा स्वास्थ्य कार्ड के अनुसार N-P-K पोषण संतुलित रखें।',
    'Destroy cotton crop residues thoroughly after the final harvest picking.': 'कपास की आखिरी चुनाई के बाद फसल अवशेष पूरी तरह नष्ट करें।',
    'Follow recommended seed treatment protocols prior to sowing.': 'बुवाई से पहले अनुशंसित बीज उपचार करें।',
    'Space cotton rows properly to avoid dense canopy micro-climates.': 'घनी छतरी और नमी बनने से बचाने के लिए कपास की कतारों में उचित दूरी रखें।',
    'Monitor closely, inspect surrounding rows, and balance foliar nutrition.': 'नियमित निगरानी करें, पास की कतारें देखें और पत्तियों का पोषण संतुलित रखें।',
    'Moderate to High. Yield impact remains low if leaf spot is contained before mid-boll development.': 'मध्यम से अच्छा। टिंडे के विकास से पहले धब्बे रोकने पर उपज का नुकसान कम रहेगा।',
    'Rogue out severely affected foliage to limit airborne conidial spore load.': 'हवा में बीजाणु कम करने के लिए गंभीर रूप से प्रभावित पत्तियाँ हटाएँ।',
    'Apply certified protective fungicide barrier on healthy adjacent rows.': 'पास की स्वस्थ कतारों पर प्रमाणित सुरक्षात्मक फफूंदनाशक लगाएँ।',
    'Ensure plants are well-watered at the root zone without causing soil saturation.': 'मिट्टी को जलभराव किए बिना जड़ों के पास पर्याप्त पानी दें।',
    'Maintain tuber hilling to prevent fungal spores from washing down into potato tubers.': 'फफूंद बीजाणु कंदों तक न पहुँचें, इसके लिए आलू के पौधों पर मिट्टी चढ़ाएँ।',
    'Use certified disease-free potato seed tubers.': 'प्रमाणित रोग-मुक्त आलू बीज कंद इस्तेमाल करें।',
    'Practice 3-year crop rotation with non-host cereals or legumes.': 'रोग के गैर-आश्रयी अनाज या दलहन के साथ तीन साल का फसल चक्र अपनाएँ।',
    'Maintain optimum soil potassium and nitrogen levels to support crop vigor.': 'फसल की वृद्धि के लिए मिट्टी में पोटैशियम और नाइट्रोजन का उचित स्तर रखें।',
    'Harvest tubers only after vine maturity and avoid skinning during digging.': 'बेल पकने के बाद ही कंद निकालें और खुदाई में छिलका न उतरने दें।',
    'Inspect lower canopy and apply preventive protective barrier.': 'निचली पत्तियों की जाँच करें और बचाव की सुरक्षात्मक परत लगाएँ।',
    'No chemical or corrective treatment required. Crop demonstrates optimal physiological health.': 'रासायनिक या सुधार उपचार की ज़रूरत नहीं। फसल स्वस्थ दिख रही है।',
    'Continue standard organic fertilization, regular scouting, and moisture maintenance.': 'सामान्य जैविक खाद, नियमित निरीक्षण और नमी प्रबंधन जारी रखें।',
    'Ensure supportive staking and gentle pruning of bottom suckers for adequate air flow.': 'हवा के संचार के लिए पौधों को सहारा दें और नीचे की अनावश्यक शाखाएँ सावधानी से काटें।',
    'Maintain uniform drip irrigation schedule to prevent blossom-end rot and foliage moisture.': 'फल के सिरे की सड़न और पत्तियों की नमी रोकने के लिए नियमित टपक सिंचाई करें।',
    'Keep scouting twice weekly during high humidity or rain transitions.': 'अधिक नमी या बारिश के बदलाव में सप्ताह में दो बार फसल जाँचें।',
    'Preserve beneficial predator insects (ladybugs, hoverflies) for natural pest control.': 'प्राकृतिक कीट नियंत्रण के लिए लेडीबर्ड और होवरफ्लाई जैसे मित्र कीट बचाएँ।',
    'Regularly replenish organic mulch layers.': 'जैविक मल्च की परत नियमित रूप से बढ़ाएँ।', 'Continue regular preventative monitoring and standard agronomic care.': 'नियमित बचाव निगरानी और सामान्य कृषि देखभाल जारी रखें।'
  });
  translations.te.phrases = {
    ...translations.te.phrases,
    'Password': 'పాస్‌వర్డ్', 'Confirm Password': 'పాస్‌వర్డ్‌ను నిర్ధారించండి', 'Forgot Password': 'పాస్‌వర్డ్ మర్చిపోయారా?',
    'Signing in...': 'ప్రవేశిస్తోంది...', 'Creating your account...': 'మీ ఖాతాను సృష్టిస్తోంది...', 'Invalid email or password.': 'ఇమెయిల్ లేదా పాస్‌వర్డ్ తప్పుగా ఉంది.',
    'Unable to sign in. Please try again.': 'ప్రవేశం సాధ్యం కాలేదు. మళ్లీ ప్రయత్నించండి.', 'Unable to create your account. Please try again.': 'ఖాతా సృష్టించలేకపోయాం. మళ్లీ ప్రయత్నించండి.',
    'Something went wrong. Please try again.': 'ఏదో సమస్య వచ్చింది. మళ్లీ ప్రయత్నించండి.', 'Try again': 'మళ్లీ ప్రయత్నించండి',
    'No internet connection. Check your connection and try again.': 'ఇంటర్నెట్ కనెక్షన్ లేదు. తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.',
    'Temperature': 'ఉష్ణోగ్రత', 'Humidity': 'తేమ', 'Wind': 'గాలి', 'Rain': 'వర్షం', 'Forecast': 'ముందస్తు అంచనా', 'Urgency': 'అత్యవసరత',
    'Recommendation': 'సిఫార్సు', 'Disease': 'వ్యాధి', 'Confidence': 'నమ్మక స్థాయి', 'Prevention': 'నివారణ', 'Immediate Action': 'తక్షణ చర్య',
    'Camera': 'కెమెరా', 'Upload Image': 'చిత్రాన్ని అప్‌లోడ్ చేయండి', 'Weather': 'వాతావరణం', 'Recent Activity': 'ఇటీవలి కార్యకలాపాలు',
    'Voice Assistant': 'వాయిస్ సహాయకుడు', 'Settings': 'సెట్టింగ్‌లు', 'Profile': 'ప్రొఫైల్', 'Edit Profile': 'ప్రొఫైల్ సవరించండి', 'Saved History': 'సేవ్ చేసిన చరిత్ర',
    'AI is thinking...': 'AI ఆలోచిస్తోంది...', 'Typing...': 'టైప్ చేస్తోంది...', 'Thinking...': 'ఆలోచిస్తోంది...', 'Listening...': 'వింటోంది...', 'Speaking...': 'మాట్లాడుతోంది...',
    'Microphone Permission Denied': 'మైక్రోఫోన్ అనుమతి నిరాకరించబడింది', 'Voice Not Supported': 'వాయిస్‌కు మద్దతు లేదు',
    'Saved on this device.': 'ఈ పరికరంలో సేవ్ చేయబడింది.', 'Unable to save. Check browser storage settings.': 'సేవ్ చేయలేకపోయింది. బ్రౌజర్ నిల్వ సెట్టింగ్‌లను తనిఖీ చేయండి.',
    'Updating...': 'నవీకరిస్తోంది...', 'Updating weather...': 'వాతావరణాన్ని నవీకరిస్తోంది...', 'Unavailable': 'అందుబాటులో లేదు', 'Stale data': 'పాత సమాచారం',
    'No scans yet. Start your first crop scan.': 'ఇంకా స్కాన్‌లు లేవు. మొదటి పంట స్కాన్‌ను ప్రారంభించండి.', 'No scans yet. Complete a demo or AI analysis and save the result here.': 'ఇంకా స్కాన్‌లు లేవు. డెమో లేదా AI విశ్లేషణ చేసి ఫలితాన్ని ఇక్కడ సేవ్ చేయండి.',
    'Date not set': 'తేదీ సెట్ చేయలేదు', 'Delete': 'తొలగించండి', 'No schemes found in this category.': 'ఈ వర్గంలో పథకాలు కనబడలేదు.', 'Learn More': 'మరింత తెలుసుకోండి',
    'High': 'అధికం', 'Medium': 'మధ్యస్థం', 'Low': 'తక్కువ', 'Monitor': 'పర్యవేక్షించండి', 'Immediate Action': 'తక్షణ చర్య', 'High disease severity': 'వ్యాధి తీవ్రత ఎక్కువ',
    'Moderate disease severity': 'వ్యాధి తీవ్రత మధ్యస్థం', 'No active disease severity reported': 'ప్రస్తుతం వ్యాధి తీవ్రత నమోదు కాలేదు', 'High AI confidence': 'AI అంచనా నమ్మక స్థాయి ఎక్కువ',
    'Reasons: available scan information': 'కారణాలు: అందుబాటులో ఉన్న స్కాన్ సమాచారం', 'Healthy / Low Risk': 'ఆరోగ్యంగా / తక్కువ ప్రమాదం', 'Moderate Risk (Monitor)': 'మధ్యస్థ ప్రమాదం (పర్యవేక్షించండి)', 'High Risk (Immediate Action)': 'అధిక ప్రమాదం (తక్షణ చర్య)',
    'Risk assessment based on the available scan information. No active disease severity was reported.': 'అందుబాటులో ఉన్న స్కాన్ సమాచారం ఆధారంగా అంచనా. వ్యాధి తీవ్రత నమోదు కాలేదు.',
    'Risk assessment based on the available scan information. Continue scouting and preventive care.': 'అందుబాటులో ఉన్న స్కాన్ సమాచారం ఆధారంగా అంచనా. పంటను పరిశీలిస్తూ నివారణ చర్యలు కొనసాగించండి.',
    'Risk assessment based on the available scan information. Inspect the crop and address symptoms promptly.': 'అందుబాటులో ఉన్న స్కాన్ సమాచారం ఆధారంగా అంచనా. పంటను పరిశీలించి లక్షణాలకు త్వరగా చర్య తీసుకోండి.',
    'Routine Schedule': 'సాధారణ షెడ్యూల్', 'Within 3 to 5 days': '3 నుంచి 5 రోజుల్లో', 'Within 24-48 hours': '24–48 గంటల్లో', 'Within 48 hours': '48 గంటల్లో', 'Within 3-5 days': '3–5 రోజుల్లో',
    'Optimal (No active disease threat)': 'ఉత్తమం (వ్యాధి ముప్పు లేదు)', 'Good if monitored and managed before canopy spread': 'వ్యాప్తికి ముందే పర్యవేక్షించి చర్య తీసుకుంటే మంచిది', 'Prompt agronomic intervention needed to protect yield': 'దిగుబడిని కాపాడేందుకు త్వరిత వ్యవసాయ చర్య అవసరం',
    'Weather service is not configured.': 'వాతావరణ సేవ సెటప్ కాలేదు.', 'Weather service is currently unavailable.': 'వాతావరణ సేవ ప్రస్తుతం అందుబాటులో లేదు.', 'Condition not set': 'పరిస్థితి నమోదు కాలేదు', 'Updated earlier': 'ముందుగా నవీకరించబడింది', 'Updated': 'నవీకరణ',
    'Current humidity may increase fungal disease risk.': 'ప్రస్తుత తేమ శిలీంధ్ర వ్యాధి ప్రమాదాన్ని పెంచవచ్చు.', 'Rain is expected soon; check local conditions before foliar treatments.': 'త్వరలో వర్షం వచ్చే అవకాశం ఉంది; ఆకులపై చికిత్సకు ముందు స్థానిక పరిస్థితులు చూడండి.', 'Current conditions may affect disease risk.': 'ప్రస్తుత పరిస్థితులు వ్యాధి ప్రమాదాన్ని ప్రభావితం చేయవచ్చు.',
    'Condition not set': 'పరిస్థితి నమోదు కాలేదు', 'Weather influence: elevated conditions.': 'వాతావరణ ప్రభావం: ప్రమాదకర పరిస్థితులు.', 'Weather data unavailable; this assessment uses scan information.': 'వాతావరణ సమాచారం లేదు; ఈ అంచనా స్కాన్ వివరాలపై ఆధారపడింది.',
    'Continue monitoring': 'పర్యవేక్షణ కొనసాగించండి', 'Review scan guidance': 'స్కాన్ సూచనలను చూడండి', 'Open the saved result for treatment and prevention guidance.': 'చికిత్స, నివారణ సూచనల కోసం సేవ్ చేసిన ఫలితాన్ని తెరవండి.'
  };
  translations.hi.phrases = {
    ...translations.hi.phrases,
    'High': 'अधिक', 'Medium': 'मध्यम', 'Low': 'कम', 'Monitor': 'निगरानी करें', 'Immediate Action': 'तुरंत कार्रवाई', 'High disease severity': 'रोग की गंभीरता अधिक है',
    'Moderate disease severity': 'रोग की गंभीरता मध्यम है', 'No active disease severity reported': 'रोग की सक्रिय गंभीरता दर्ज नहीं है', 'High AI confidence': 'AI का विश्वास स्तर अधिक है',
    'Reasons: available scan information': 'कारण: उपलब्ध स्कैन जानकारी', 'Healthy / Low Risk': 'स्वस्थ / कम जोखिम', 'Moderate Risk (Monitor)': 'मध्यम जोखिम (निगरानी करें)', 'High Risk (Immediate Action)': 'अधिक जोखिम (तुरंत कार्रवाई)',
    'Risk assessment based on the available scan information. No active disease severity was reported.': 'उपलब्ध स्कैन जानकारी के आधार पर आकलन। रोग की सक्रिय गंभीरता दर्ज नहीं हुई।',
    'Risk assessment based on the available scan information. Continue scouting and preventive care.': 'उपलब्ध स्कैन जानकारी के आधार पर आकलन। फसल की जाँच और बचाव जारी रखें।',
    'Risk assessment based on the available scan information. Inspect the crop and address symptoms promptly.': 'उपलब्ध स्कैन जानकारी के आधार पर आकलन। फसल देखें और लक्षणों पर तुरंत ध्यान दें।',
    'Routine Schedule': 'नियमित देखभाल', 'Within 3 to 5 days': '3 से 5 दिनों में', 'Within 24-48 hours': '24–48 घंटों में', 'Within 48 hours': '48 घंटों में', 'Within 3-5 days': '3–5 दिनों में',
    'Optimal (No active disease threat)': 'बेहतरीन (रोग का सक्रिय खतरा नहीं)', 'Good if monitored and managed before canopy spread': 'फैलाव से पहले निगरानी और देखभाल करने पर सुधार अच्छा रहेगा', 'Prompt agronomic intervention needed to protect yield': 'उपज बचाने के लिए शीघ्र कृषि सलाह और कार्रवाई ज़रूरी है',
    'Weather service is not configured.': 'मौसम सेवा सेट नहीं है।', 'Weather service is currently unavailable.': 'मौसम सेवा अभी उपलब्ध नहीं है।', 'Condition not set': 'स्थिति दर्ज नहीं', 'Updated earlier': 'पहले अपडेट हुआ', 'Updated': 'अपडेट',
    'Current humidity may increase fungal disease risk.': 'मौजूदा नमी से फफूंद रोग का जोखिम बढ़ सकता है।', 'Rain is expected soon; check local conditions before foliar treatments.': 'जल्द बारिश हो सकती है; पत्तियों पर उपचार से पहले स्थानीय स्थिति जाँचें।', 'Current conditions may affect disease risk.': 'मौजूदा स्थिति रोग के जोखिम को प्रभावित कर सकती है।',
    'Weather influence: elevated conditions.': 'मौसम का असर: जोखिम बढ़ाने वाली स्थिति।', 'Weather data unavailable; this assessment uses scan information.': 'मौसम की जानकारी उपलब्ध नहीं; आकलन स्कैन विवरण पर आधारित है।', 'Continue monitoring': 'निगरानी जारी रखें', 'Review scan guidance': 'स्कैन सलाह देखें', 'Open the saved result for treatment and prevention guidance.': 'उपचार और बचाव की सलाह के लिए सहेजा नतीजा खोलें।'
  };
  Object.assign(translations.te.phrases, {
    'Crop Scanner': 'పంట స్కానర్', 'Weather service is not configured.': 'వాతావరణ సేవ సెటప్ కాలేదు.', 'Weather service is currently unavailable.': 'వాతావరణ సేవ ప్రస్తుతం అందుబాటులో లేదు.',
    'The request timed out. Please try again.': 'అభ్యర్థనకు సమయం మించిపోయింది. మళ్లీ ప్రయత్నించండి.', 'The backend is unavailable. Check your connection and try again.': 'సర్వర్ అందుబాటులో లేదు. కనెక్షన్ తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.',
    'The AI assistant timed out. Please try again.': 'AI సహాయకుడి స్పందనకు సమయం మించిపోయింది. మళ్లీ ప్రయత్నించండి.', 'The AI assistant is temporarily unavailable. Please try again shortly.': 'AI సహాయకుడు తాత్కాలికంగా అందుబాటులో లేదు. కొద్దిసేపటికి మళ్లీ ప్రయత్నించండి.',
    'MODERATE URGENCY': 'మధ్యస్థ అత్యవసరత', 'LOW URGENCY': 'తక్కువ అత్యవసరత',
    'CropGuardian AI — Early Crop Disease Detection & Decision Support': 'CropGuardian AI — పంట వ్యాధుల ముందస్తు గుర్తింపు మరియు నిర్ణయ సహాయం',
    'Helping farmers detect crop diseases early before they lose their harvest with AI-powered crop disease detection and actionable decision support.': 'AI సహాయంతో పంట వ్యాధులను ముందుగానే గుర్తించి, పంట నష్టాన్ని తగ్గించేందుకు రైతులకు ఉపయోగకరమైన నిర్ణయ సహాయం.', 'e.g. 2 acres': 'ఉదా: 2 ఎకరాలు'
    ,'Passwords do not match.': 'పాస్‌వర్డ్‌లు సరిపోలడం లేదు.', 'Helping farmers detect crop diseases early before they lose their harvest with AI-powered pathology detection and actionable decision support.': 'AI సహాయంతో పంట వ్యాధులను ముందుగానే గుర్తించి, పంట నష్టానికి ముందు చర్య తీసుకునే సహాయం.',
    'Continue without signing in': 'ప్రవేశించకుండా కొనసాగండి', 'Saved locally in your browser storage': 'మీ బ్రౌజర్‌లో స్థానికంగా సేవ్ చేయబడింది', 'Routine Schedule': 'సాధారణ షెడ్యూల్'
  });
  Object.assign(translations.hi.phrases, {
    'Crop Scanner': 'फसल स्कैनर', 'Weather service is not configured.': 'मौसम सेवा सेट नहीं है।', 'Weather service is currently unavailable.': 'मौसम सेवा अभी उपलब्ध नहीं है।',
    'The request timed out. Please try again.': 'अनुरोध में समय लग गया। फिर से प्रयास करें।', 'The backend is unavailable. Check your connection and try again.': 'सर्वर उपलब्ध नहीं है। कनेक्शन जाँचकर फिर से प्रयास करें।',
    'The AI assistant timed out. Please try again.': 'AI सहायक के जवाब में समय लग गया। फिर से प्रयास करें।', 'The AI assistant is temporarily unavailable. Please try again shortly.': 'AI सहायक अभी उपलब्ध नहीं है। थोड़ी देर में फिर प्रयास करें।',
    'MODERATE URGENCY': 'मध्यम तात्कालिकता', 'LOW URGENCY': 'कम तात्कालिकता',
    'CropGuardian AI — Early Crop Disease Detection & Decision Support': 'CropGuardian AI — फसल रोगों की समय रहते पहचान और निर्णय सहायता',
    'Helping farmers detect crop diseases early before they lose their harvest with AI-powered crop disease detection and actionable decision support.': 'AI से फसल रोगों की समय रहते पहचान और फसल नुकसान कम करने के लिए उपयोगी सलाह।', 'e.g. 2 acres': 'जैसे: 2 एकड़'
    ,'Passwords do not match.': 'दोनों पासवर्ड मेल नहीं खाते।', 'Helping farmers detect crop diseases early before they lose their harvest with AI-powered pathology detection and actionable decision support.': 'AI से फसल रोगों की समय रहते पहचान और फसल नुकसान से पहले कार्रवाई के लिए उपयोगी सलाह।',
    'Continue without signing in': 'बिना साइन इन किए आगे बढ़ें', 'Saved locally in your browser storage': 'आपके ब्राउज़र में सुरक्षित', 'Routine Schedule': 'नियमित देखभाल'
  });
  Object.assign(translations.te.phrases, {
    'Decision-support risk scores, treatment windows, prevention tips, and verified support schemes.': 'ప్రమాద స్కోర్లు, చర్య సమయం, నివారణ సూచనలు, ధృవీకరించిన ప్రభుత్వ పథకాలు.',
    'Capture or select a clear image of an affected leaf using your mobile camera or file picker.': 'మొబైల్ కెమెరాతో లేదా ఫైల్ ఎంపిక ద్వారా ప్రభావిత ఆకును స్పష్టంగా చిత్రీకరించండి.',
    'Receive your Crop Risk Score, treatment window, prevention tips, and relevant government schemes.': 'పంట ప్రమాద స్కోరు, చర్య సమయం, నివారణ సూచనలు, ప్రభుత్వ పథకాలను పొందండి.',
    '✕ Remove Image': '✕ చిత్రాన్ని తొలగించండి', 'Select any multi-crop sample to run the complete diagnostic flow instantly:': 'పూర్తి నిర్ధారణను చూడటానికి పంట నమూనాను ఎంచుకోండి:',
    'High Risk': 'అధిక ప్రమాదం', 'Moderate': 'మధ్యస్థం', 'Optimal Condition': 'ఆదర్శ స్థితి', 'Healthy': 'ఆరోగ్యంగా ఉంది',
    'Evaluating foliar patterns, lesion morphology, and calculating risk indices.': 'ఆకుల నమూనాలు, మచ్చల ఆకృతిని పరిశీలించి ప్రమాదాన్ని లెక్కిస్తోంది.', '● Demo Mode': '● డెమో విధానం',
    'Risk assessment based on the available scan information.': 'అందుబాటులో ఉన్న స్కాన్ సమాచారం ఆధారంగా ప్రమాద అంచనా.', 'Reasons will appear with the scan result.': 'స్కాన్ ఫలితంతో కారణాలు కనిపిస్తాయి.',
    'Key executive summary parameters for your field record:': 'పొలం నమోదు కోసం ముఖ్యమైన సారాంశ వివరాలు:', 'Prototype decision-support estimate • Saved locally in your browser storage': 'ప్రాథమిక నిర్ణయ అంచనా • మీ బ్రౌజర్‌లో స్థానికంగా సేవ్ అవుతుంది',
    'Prune and safely destroy lower leaves exhibiting early target-spot symptoms.': 'ప్రారంభ మచ్చల లక్షణాలున్న కింది ఆకులను కత్తిరించి సురక్షితంగా తొలగించండి.',
    'Apply approved copper-based or bio-fungicide protective sprays.': 'ఆమోదిత రాగి ఆధారిత లేదా జీవ శిలీంధ్రనాశిని పిచికారీ చేయండి.',
    'Improve row spacing to increase airflow and accelerate foliage drying.': 'గాలి ప్రసరణ పెరిగి ఆకులు త్వరగా పొడిగా ఉండేలా వరుసల మధ్య దూరం పెంచండి.',
    'Switch to drip irrigation to avoid wetting upper leaf canopies.': 'పై ఆకులు తడవకుండా బిందు సేద్యాన్ని ఉపయోగించండి.',
    'Implement a 2-3 year crop rotation schedule avoiding Solanaceae.': 'సోలానేసీ పంటలను మినహాయించి 2–3 ఏళ్ల పంట మార్పిడి చేయండి.',
    'Apply organic mulch to prevent soil splashing of spores.': 'మట్టి చిమ్మి బీజాంశాలు వ్యాపించకుండా సేంద్రియ మల్చ్ వేయండి.',
    'ℹ️ Treatment recommendations are general guidance. Follow local agricultural advice and product labels.': 'ℹ️ చికిత్స సూచనలు సాధారణ మార్గదర్శకాలు మాత్రమే. స్థానిక వ్యవసాయ సలహా, ఉత్పత్తి లేబుళ్లను పాటించండి.'
  });
  Object.assign(translations.hi.phrases, {
    'Decision-support risk scores, treatment windows, prevention tips, and verified support schemes.': 'जोखिम स्कोर, कार्रवाई का सही समय, बचाव के सुझाव और सत्यापित सरकारी योजनाएँ।',
    'Capture or select a clear image of an affected leaf using your mobile camera or file picker.': 'मोबाइल कैमरे से प्रभावित पत्ती की साफ़ तस्वीर लें या फ़ाइल चुनें।',
    'Receive your Crop Risk Score, treatment window, prevention tips, and relevant government schemes.': 'जोखिम स्कोर, कार्रवाई का समय, बचाव के सुझाव और उपयोगी सरकारी योजनाएँ पाएँ।',
    '✕ Remove Image': '✕ तस्वीर हटाएँ', 'Select any multi-crop sample to run the complete diagnostic flow instantly:': 'पूरी जाँच तुरंत देखने के लिए फसल का नमूना चुनें:',
    'High Risk': 'अधिक जोखिम', 'Moderate': 'मध्यम', 'Optimal Condition': 'बेहतरीन स्थिति', 'Healthy': 'स्वस्थ',
    'Evaluating foliar patterns, lesion morphology, and calculating risk indices.': 'पत्तियों के नमूने और धब्बों का आकलन करके जोखिम निकाला जा रहा है।', '● Demo Mode': '● डेमो मोड',
    'Risk assessment based on the available scan information.': 'उपलब्ध स्कैन जानकारी के आधार पर जोखिम आकलन।', 'Reasons will appear with the scan result.': 'स्कैन के नतीजे के साथ कारण दिखेंगे।',
    'Key executive summary parameters for your field record:': 'खेत के रिकॉर्ड के लिए मुख्य जानकारी:', 'Prototype decision-support estimate • Saved locally in your browser storage': 'प्रारंभिक जोखिम अनुमान • ब्राउज़र में सुरक्षित',
    'Prune and safely destroy lower leaves exhibiting early target-spot symptoms.': 'शुरुआती धब्बों वाली निचली पत्तियाँ काटकर सुरक्षित रूप से नष्ट करें।',
    'Apply approved copper-based or bio-fungicide protective sprays.': 'स्वीकृत तांबा-आधारित या जैविक फफूंदनाशक का छिड़काव करें।',
    'Improve row spacing to increase airflow and accelerate foliage drying.': 'हवा के संचार और पत्तियाँ जल्दी सुखाने के लिए कतारों में दूरी बढ़ाएँ।',
    'Switch to drip irrigation to avoid wetting upper leaf canopies.': 'ऊपरी पत्तियाँ गीली होने से बचाने के लिए टपक सिंचाई अपनाएँ।',
    'Implement a 2-3 year crop rotation schedule avoiding Solanaceae.': 'सोलेनेसी फसलों से बचते हुए 2–3 साल का फसल चक्र अपनाएँ।',
    'Apply organic mulch to prevent soil splashing of spores.': 'मिट्टी के छींटों से रोगाणु फैलने से रोकने के लिए जैविक मल्च बिछाएँ।',
    'ℹ️ Treatment recommendations are general guidance. Follow local agricultural advice and product labels.': 'ℹ️ उपचार की सलाह सामान्य है। स्थानीय कृषि सलाह और उत्पाद के लेबल का पालन करें।',
    '🌱 Consistent prevention protects soil microbial balance and minimizes seasonal losses.': '🌱 नियमित बचाव मिट्टी का संतुलन बनाए रखता है और मौसमी नुकसान घटाता है।',
    'Take prompt protective action and seek local agronomic guidance to preserve leaf canopy before fungal spread accelerates.': 'फफूंद फैलने से पहले बचाव के कदम उठाएँ और स्थानीय कृषि विशेषज्ञ से सलाह लें।',
    'Review your saved crop checks on this device. History is not synced until an account is added.': 'इस डिवाइस पर सहेजी फसल जाँच देखें। खाते में प्रवेश करने तक इतिहास सिंक नहीं होगा।',
    'Useful verified government support and insurance resources for farmers.': 'किसानों के लिए सत्यापित सरकारी सहायता और बीमा संसाधन।',
    'Checking backend status...': 'सर्वर की स्थिति जाँची जा रही है...', 'Local history of your recent crop diagnostic sessions.': 'हाल की फसल जाँच का स्थानीय इतिहास।',
    'Helping farmers detect crop diseases early before they lose their harvest through computer vision and actionable decision support.': 'कंप्यूटर विज़न और उपयोगी सलाह से फसल नुकसान से पहले रोग पहचानने में किसानों की मदद।',
    'Home': 'होम', 'Prototype Decision Support': 'प्रारंभिक निर्णय सहायता', 'Non-Definitive Diagnosis': 'अंतिम निदान नहीं', 'Zero Server Data Retention': 'सर्वर पर डेटा नहीं रखा जाता'
  });
  Object.assign(translations.te.phrases, {
    'Tomato': 'టమాటా', 'Rice (Paddy)': 'వరి', 'Cotton': 'పత్తి', 'Potato': 'బంగాళాదుంప', 'Tomato Early Blight': 'టమాటా ప్రారంభ ఎండు తెగులు',
    'Tomato Late Blight': 'టమాటా ఆలస్య ఎండు తెగులు', 'Rice Leaf Blast': 'వరి ఆకుమచ్చ తెగులు', 'Cotton Leaf Spot': 'పత్తి ఆకు మచ్చ', 'Potato Early Blight': 'బంగాళాదుంప ప్రారంభ ఎండు తెగులు',
    'Healthy Tomato Leaf': 'ఆరోగ్యకరమైన టమాటా ఆకు', 'Take prompt protective action and seek local agronomic guidance to preserve leaf canopy.': 'ఆకులను కాపాడేందుకు వెంటనే రక్షణ చర్యలు తీసుకుని స్థానిక వ్యవసాయ నిపుణుడి సలహా పొందండి.',
    'Good if addressed promptly before fungal lesions spread to fruit clusters.': 'శిలీంధ్ర మచ్చలు పండ్ల గుత్తులకు వ్యాపించేలోపు చర్య తీసుకుంటే కోలుకునే అవకాశం మంచిది.',
    'The AI assistant returned an invalid response.': 'AI సహాయకుడి స్పందన సరైన రూపంలో లేదు.', 'The AI assistant is temporarily unavailable.': 'AI సహాయకుడు తాత్కాలికంగా అందుబాటులో లేదు.'
    ,'Sunny': 'ఎండగా ఉంది', 'Clear': 'ఆకాశం నిర్మలంగా ఉంది', 'Partly cloudy': 'కొంత మేఘావృతం', 'Cloudy': 'మేఘావృతం', 'Overcast': 'దట్టమైన మేఘాలు', 'Mist': 'పొగమంచు', 'Fog': 'మంచు',
    'Patchy rain possible': 'చోటుచోటు వర్షం పడవచ్చు', 'Light rain': 'తేలికపాటి వర్షం', 'Moderate rain': 'మోస్తరు వర్షం', 'Heavy rain': 'భారీ వర్షం', 'Light drizzle': 'తేలికపాటి జల్లులు',
    'Pradhan Mantri Fasal Bima Yojana (PMFBY)': 'ప్రధానమంత్రి ఫసల్ బీమా యోజన (PMFBY)', 'Soil Health Card Scheme': 'నేల ఆరోగ్య కార్డు పథకం', 'Kisan Credit Card (KCC)': 'కిసాన్ క్రెడిట్ కార్డు (KCC)'
  });
  Object.assign(translations.hi.phrases, {
    'Tomato': 'टमाटर', 'Rice (Paddy)': 'धान', 'Cotton': 'कपास', 'Potato': 'आलू', 'Tomato Early Blight': 'टमाटर का अगेती झुलसा रोग',
    'Tomato Late Blight': 'टमाटर का पछेती झुलसा रोग', 'Rice Leaf Blast': 'धान का पत्ती झुलसा रोग', 'Cotton Leaf Spot': 'कपास का पत्ती धब्बा रोग', 'Potato Early Blight': 'आलू का अगेती झुलसा रोग',
    'Healthy Tomato Leaf': 'स्वस्थ टमाटर का पत्ता', 'Take prompt protective action and seek local agronomic guidance to preserve leaf canopy.': 'पत्तियों की सुरक्षा के लिए तुरंत बचाव करें और स्थानीय कृषि विशेषज्ञ से सलाह लें।',
    'Good if addressed promptly before fungal lesions spread to fruit clusters.': 'फफूंद के धब्बे फलों तक फैलने से पहले कदम उठाने पर सुधार की संभावना अच्छी है।',
    'The AI assistant returned an invalid response.': 'AI सहायक का जवाब सही रूप में नहीं मिला।', 'The AI assistant is temporarily unavailable.': 'AI सहायक अभी उपलब्ध नहीं है।'
    ,'Sunny': 'धूप है', 'Clear': 'आसमान साफ़ है', 'Partly cloudy': 'आंशिक बादल', 'Cloudy': 'बादल छाए हैं', 'Overcast': 'घने बादल', 'Mist': 'हल्का कोहरा', 'Fog': 'कोहरा',
    'Patchy rain possible': 'कुछ जगह बारिश हो सकती है', 'Light rain': 'हल्की बारिश', 'Moderate rain': 'मध्यम बारिश', 'Heavy rain': 'तेज़ बारिश', 'Light drizzle': 'हल्की फुहार',
    'Pradhan Mantri Fasal Bima Yojana (PMFBY)': 'प्रधानमंत्री फसल बीमा योजना (PMFBY)', 'Soil Health Card Scheme': 'मृदा स्वास्थ्य कार्ड योजना', 'Kisan Credit Card (KCC)': 'किसान क्रेडिट कार्ड (KCC)'
  });
  Object.assign(translations.te.phrases, { 'Create account': 'ఖాతా సృష్టించండి' });
  Object.assign(translations.hi.phrases, { 'Create account': 'खाता बनाएँ' });
  let language = 'en';
  let initialized = false;
  const originalTextNodes = new WeakMap();
  const originalAttributes = new WeakMap();
  let observer = null;

  function init() {
    if (initialized) {
      applyLanguage();
      return;
    }
    initialized = true;
    language = StorageModule.getLanguage();
    bindSelectors();
    applyLanguage();
    observer = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          translateDom(node);
          bindSelectors(node);
        } else if (node.nodeType === Node.TEXT_NODE) {
          translateTextNode(node);
        }
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function setLanguage(nextLanguage) {
    if (!translations[nextLanguage]) return;
    language = nextLanguage;
    StorageModule.saveLanguage(language);
    AuthModule.savePreferredLanguage(language);
    document.querySelectorAll('[data-language-select]').forEach(selector => { selector.value = language; });
    applyLanguage();
    document.dispatchEvent(new CustomEvent('cropguardian:languagechange', { detail: { language } }));
  }

  function restoreLanguage(nextLanguage) {
    if (!translations[nextLanguage]) return;
    language = nextLanguage;
    applyLanguage();
    document.querySelectorAll('[data-language-select]').forEach(selector => { selector.value = language; });
    document.dispatchEvent(new CustomEvent('cropguardian:languagechange', { detail: { language } }));
  }

  function applyLanguage() {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      if (element.childElementCount === 0) element.textContent = t(element.dataset.i18n);
    });
    translateDom(document.body);
    document.querySelectorAll('[data-language-select]').forEach(selector => { selector.value = language; });
    const title = document.querySelector('title');
    if (title) {
      if (!title.dataset.originalTitle) title.dataset.originalTitle = title.textContent;
      title.textContent = title.dataset.i18nTitle ? t(title.dataset.i18nTitle) : phrase(title.dataset.originalTitle);
    }
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = phrase(getOriginalAttribute(description, 'content'));
  }

  function t(key, fallback = key) {
    return translations[language]?.[key] || translations.en[key] || fallback;
  }

  function phrase(value, parameters = {}) {
    if (value == null) return '';
    let result = String(value);
    const translated = translations[language]?.phrases?.[result];
    if (translated) result = translated;
    Object.entries(parameters).forEach(([name, parameter]) => {
      result = result.replaceAll(`{${name}}`, String(parameter));
    });
    return result;
  }

  function getOriginalAttribute(element, name) {
    let values = originalAttributes.get(element);
    if (!values) {
      values = new Map();
      originalAttributes.set(element, values);
    }
    if (!values.has(name)) values.set(name, element.getAttribute(name) || '');
    return values.get(name);
  }

  function translateDom(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return;
    const localizedElements = [];
    if (root.hasAttribute('data-i18n-source')) localizedElements.push(root);
    localizedElements.push(...root.querySelectorAll('[data-i18n-source]'));
    localizedElements.forEach(element => {
      let parameters = {};
      try {
        parameters = JSON.parse(element.dataset.i18nParams || '{}');
      } catch (error) {
        parameters = {};
      }
      const localized = phrase(element.dataset.i18nSource, parameters);
      if (element.textContent !== localized) element.textContent = localized;
    });
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement?.closest('script,style,svg,[data-i18n-ignore]')
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      }
    });
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(translateTextNode);

    const elements = [root, ...root.querySelectorAll('*')];
    elements.forEach(element => {
      ['placeholder', 'title', 'aria-label', 'alt'].forEach(attribute => {
        if (!element.hasAttribute(attribute)) return;
        const suffix = attribute.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
        const key = element.dataset[`i18n${suffix}`];
        if (key) {
          element.setAttribute(attribute, t(key));
          return;
        }
        const source = getOriginalAttribute(element, attribute);
        const translated = phrase(source);
        if (element.getAttribute(attribute) !== translated) element.setAttribute(attribute, translated);
      });
    });
  }

  function translateTextNode(node) {
    if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue || '');
    const original = originalTextNodes.get(node);
    const trimmed = original.trim();
    if (!trimmed) return;
    const translated = phrase(trimmed);
    const leading = original.match(/^\s*/)?.[0] || '';
    const trailing = original.match(/\s*$/)?.[0] || '';
    const localizedValue = leading + translated + trailing;
    if (node.nodeValue !== localizedValue) node.nodeValue = localizedValue;
  }

  function setText(element, source, parameters = {}) {
    if (!element) return;
    source = sourceText(String(source));
    element.dataset.i18nSource = source;
    element.dataset.i18nParams = JSON.stringify(parameters);
    const localized = phrase(source, parameters);
    if (element.textContent !== localized) element.textContent = localized;
  }

  function sourceText(value) {
    if (language === 'en') return value;
    for (const [source, translated] of Object.entries(translations[language]?.phrases || {})) {
      if (translated === value) return source;
    }
    for (const [key, translated] of Object.entries(translations[language] || {})) {
      if (key !== 'phrases' && translated === value && typeof translations.en[key] === 'string') {
        return translations.en[key];
      }
    }
    return value;
  }

  function getLanguage() {
    return language;
  }

  function bindSelectors(root = document) {
    root.querySelectorAll?.('[data-language-select]').forEach(selector => {
      if (selector.dataset.i18nBound) return;
      selector.dataset.i18nBound = 'true';
      selector.value = language;
      selector.addEventListener('change', () => setLanguage(selector.value));
    });
  }

  return { init, setLanguage, restoreLanguage, getLanguage, t, phrase, translateText: phrase, setText, translations };
})();
