const VoiceAssistantModule = (function() {
  let recognition = null;
  let listening = false;
  let getLanguage = () => 'en';

  function init(options = {}) {
    getLanguage = options.getLanguage || getLanguage;
    const microphoneButton = document.getElementById('assistantMicButton');
    const stopButton = document.getElementById('assistantStopSpeakingButton');
    setListeningState(false);
    microphoneButton?.addEventListener('click', toggleListening);
    stopButton?.addEventListener('click', stopSpeaking);
    document.addEventListener('cropguardian:languagechange', () => {
      if (listening) stopListening();
      setListeningState(false);
      stopSpeaking();
    });
  }

  function toggleListening() {
    if (listening) {
      stopListening();
      return;
    }

    const language = getLanguage();
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus(I18nModule.t('voiceUnsupported'));
      return;
    }

    const input = document.getElementById('assistantQuestion');
    if (!input) return;
    recognition = new SpeechRecognition();
    recognition.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
      listening = true;
      setListeningState(true);
      setStatus(I18nModule.t('voiceListening'));
    };
    recognition.onresult = (event) => {
      const finalParts = [];
      const interimParts = [];
      for (let resultIndex = 0; resultIndex < event.results.length; resultIndex += 1) {
        const result = event.results[resultIndex];
        const transcript = result[0]?.transcript || '';
        if (result.isFinal) finalParts.push(transcript);
        else interimParts.push(transcript);
      }
      const finalTranscript = finalParts.join(' ').trim();
      const interimTranscript = interimParts.join(' ').trim();
      input.value = [finalTranscript, interimTranscript].filter(Boolean).join(' ');
      setStatus(input.value ? `${I18nModule.t('voiceListening')} ${input.value}` : I18nModule.t('voiceListening'));
    };
    recognition.onerror = (event) => {
      listening = false;
      setListeningState(false);
      setStatus(event.error === 'not-allowed' || event.error === 'service-not-allowed'
        ? I18nModule.t('voicePermissionDenied')
        : event.error === 'no-speech'
          ? I18nModule.t('voiceNoSpeech')
          : I18nModule.t('voiceInputError'));
    };
    recognition.onend = () => {
      listening = false;
      setListeningState(false);
      const inputValue = input.value.trim();
      if (inputValue) setStatus(I18nModule.t('voiceTranscriptReady'));
    };

    try {
      recognition.start();
    } catch (error) {
      listening = false;
      setListeningState(false);
      setStatus(I18nModule.t('voiceInputError'));
    }
  }

  function stopListening() {
    if (!recognition || !listening) return;
    try {
      recognition.stop();
    } catch (error) {
      listening = false;
      setListeningState(false);
    }
  }

  function setListeningState(active) {
    const button = document.getElementById('assistantMicButton');
    if (!button) return;
    button.classList.toggle('is-listening', active);
    button.setAttribute('aria-pressed', String(active));
    button.setAttribute('aria-label', I18nModule.t(active ? 'stopVoice' : 'startVoice'));
    button.title = I18nModule.t(active ? 'stopVoice' : 'startVoice');
  }

  function speak(text, language) {
    const synthesis = window.speechSynthesis;
    const Utterance = window.SpeechSynthesisUtterance;
    if (!synthesis || !Utterance) {
      setStatus(I18nModule.t('voiceOutputUnsupported'));
      return;
    }

    synthesis.cancel();
    const utterance = new Utterance(text);
    utterance.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.onstart = () => {
      const stopButton = document.getElementById('assistantStopSpeakingButton');
      if (stopButton) stopButton.hidden = false;
      setStatus(I18nModule.translateText('Speaking...'));
    };
    utterance.onend = () => { hideStopButton(); setStatus(''); };
    utterance.onerror = () => { hideStopButton(); setStatus(I18nModule.t('voiceOutputUnsupported')); };
    try {
      synthesis.speak(utterance);
    } catch (error) {
      hideStopButton();
      setStatus(I18nModule.t('voiceOutputUnsupported'));
    }
  }

  function stopSpeaking() {
    window.speechSynthesis?.cancel();
    hideStopButton();
  }

  function hideStopButton() {
    const stopButton = document.getElementById('assistantStopSpeakingButton');
    if (stopButton) stopButton.hidden = true;
  }

  function setStatus(message) {
    const status = document.getElementById('assistantTranscript');
    I18nModule.setText(status, message);
  }

  return { init, speak, stopSpeaking };
})();