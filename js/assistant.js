const AssistantModule = (function() {
  let currentContext = null;
  let loading = false;
  let lastFailedQuestion = null;

  function init() {
    const form = document.getElementById('assistantForm');
    const input = document.getElementById('assistantQuestion');
    if (form && input) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        send(input.value);
      });
    }
    const clearButton = document.getElementById('assistantClearButton');
    if (clearButton) {
      clearButton.title = I18nModule.t('clearChat');
      clearButton.setAttribute('aria-label', I18nModule.t('clearChat'));
      clearButton.addEventListener('click', clearChat);
    }
    document.getElementById('assistantRetryButton')?.addEventListener('click', () => {
      if (lastFailedQuestion) send(lastFailedQuestion, true);
    });
    VoiceAssistantModule.init({ getLanguage: () => I18nModule.getLanguage() });
    document.querySelectorAll('.assistant-prompt').forEach(button => {
      button.addEventListener('click', () => {
        if (input) {
          input.value = button.dataset.question || button.textContent;
          input.focus();
          input.form?.requestSubmit();
        }
      });
    });
    document.addEventListener('cropguardian:languagechange', () => {
      document.querySelectorAll('.assistant-prompt').forEach(button => {
        button.dataset.question = button.textContent.trim();
      });
    });
    document.addEventListener('cropguardian:languagechange', () => {
      const inputElement = document.getElementById('assistantQuestion');
      if (inputElement) inputElement.placeholder = I18nModule.t('assistantPlaceholder');
      const clearButton = document.getElementById('assistantClearButton');
      if (clearButton) {
        clearButton.title = I18nModule.t('clearChat');
        clearButton.setAttribute('aria-label', I18nModule.t('clearChat'));
      }
    });
  }

  function setContext(result) {
    currentContext = result ? {
      crop: result.crop,
      disease: result.disease,
      severity: result.severity,
      confidence: result.confidence,
      symptomsSummary: result.symptomsSummary,
      riskScore: result.riskScore,
      riskReasons: result.riskReasons || [],
      weather: result.weather || null,
      location: StorageModule.getFarm().location || null
    } : null;
  }

  async function send(question, isRetry = false) {
    const cleanQuestion = (question || '').trim();
    const input = document.getElementById('assistantQuestion');
    if (loading) return;
    if (!cleanQuestion) {
      setStatus(I18nModule.t('assistantEmptyQuestion'));
      return;
    }
    if (cleanQuestion.length > 1000) {
      setStatus(I18nModule.t('assistantQuestionTooLong'));
      return;
    }
    loading = true;
    lastFailedQuestion = null;
    setRetryVisible(false);
    setStatus('');
    if (!isRetry) appendMessage('user', cleanQuestion);
    setTyping(true);
    if (input) input.value = '';
    setButtonDisabled(true);

    try {
      const response = await CropGuardianAPI.askAssistant({
        question: cleanQuestion,
        language: I18nModule.getLanguage(),
        context: getContext()
      });
      renderResponse(response);
      setStatus('');
      if (AuthModule.isAuthenticated()) {
        const saved = await AuthModule.saveChatTurn(cleanQuestion, response);
        if (!saved) setStatus(I18nModule.t('chatSaveFailed'));
      }
    } catch (error) {
      const message = I18nModule.translateText(error.message || I18nModule.t('assistantUnavailable'));
      setStatus(message);
      appendMessage('error', message);
      lastFailedQuestion = cleanQuestion;
      setRetryVisible(true);
    } finally {
      setTyping(false);
      loading = false;
      setButtonDisabled(false);
    }
  }

  function getContext() {
    const saved = StorageModule.getScans()[0];
    const farm = StorageModule.getFarm();
    const source = currentContext || saved || {};
    return {
      crop: source.crop || farm.primaryCrop || null,
      disease: source.disease || null,
      severity: source.severity || null,
      confidence: source.confidence ?? null,
      symptomsSummary: source.symptomsSummary || null,
      riskScore: source.riskScore ?? null,
      riskReasons: source.riskReasons || [],
      weather: source.weather || null,
      location: farm.location || null
    };
  }

  function renderResponse(response, speak = true) {
    const badge = document.getElementById('assistantModeBadge');
    if (badge) {
      badge.className = 'badge badge-live';
      badge.textContent = I18nModule.t('aiLabel');
    }
    appendMessage('assistant', response.answer);
    (response.actions || []).forEach(action => appendMessage('action', action));
    (response.warnings || []).forEach(warning => appendMessage('warning', warning));
    if (response.followUp) appendMessage('follow-up', response.followUp);
    if (speak && response.mode === 'AI') {
      const speechText = [response.answer, ...(response.actions || []), ...(response.warnings || []), response.followUp]
        .filter(Boolean)
        .join('. ');
      VoiceAssistantModule.speak(speechText, I18nModule.getLanguage());
    }
  }

  function loadHistory(turns) {
    const container = document.getElementById('assistantMessages');
    if (!container || !Array.isArray(turns) || !turns.length) return;
    container.replaceChildren();
    turns.forEach(turn => {
      appendMessage('user', turn.question);
      renderResponse(turn.response, false);
    });
  }

  function appendMessage(type, message) {
    const container = document.getElementById('assistantMessages');
    if (!container) return;
    const empty = container.querySelector('.assistant-empty');
    if (empty) empty.remove();
    const item = document.createElement('p');
    item.className = `assistant-message assistant-message-${type}`;
    item.textContent = message;
    item.setAttribute('role', type === 'error' ? 'alert' : 'group');
    container.appendChild(item);
    container.scrollTop = container.scrollHeight;
  }

  function setTyping(active) {
    const container = document.getElementById('assistantMessages');
    if (!container) return;
    container.querySelector('.assistant-typing')?.remove();
    if (!active) return;

    const indicator = document.createElement('div');
    indicator.className = 'assistant-message assistant-message-assistant assistant-typing';
    indicator.setAttribute('role', 'status');
    indicator.setAttribute('aria-label', I18nModule.t('thinking'));
    for (let index = 0; index < 3; index += 1) {
      const dot = document.createElement('span');
      dot.className = 'assistant-typing-dot';
      dot.setAttribute('aria-hidden', 'true');
      indicator.appendChild(dot);
    }
    container.appendChild(indicator);
    container.scrollTop = container.scrollHeight;
  }

  function setRetryVisible(visible) {
    const button = document.getElementById('assistantRetryButton');
    if (button) button.hidden = !visible;
  }

  function clearChat() {
    if (loading) return;
    const container = document.getElementById('assistantMessages');
    if (!container) return;
    container.replaceChildren();
    const welcome = document.createElement('p');
    welcome.className = 'assistant-empty';
    welcome.textContent = I18nModule.t('assistantWelcome');
    container.appendChild(welcome);
    lastFailedQuestion = null;
    setRetryVisible(false);
    setStatus('');
    if (AuthModule.isAuthenticated()) {
      AuthModule.clearChatHistory().then((cleared) => {
        if (!cleared) setStatus(I18nModule.t('chatSaveFailed'));
      });
    }
  }

  function setStatus(message) {
    const status = document.getElementById('assistantStatus');
    I18nModule.setText(status, message);
  }

  function setButtonDisabled(disabled) {
    const button = document.getElementById('assistantSendButton');
    if (button) button.disabled = disabled;
    const clearButton = document.getElementById('assistantClearButton');
    if (clearButton) clearButton.disabled = disabled;
  }

  return { init, setContext, send, loadHistory };
})();
