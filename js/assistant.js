const AssistantModule = (function() {
  let currentContext = null;
  let loading = false;

  function init() {
    const form = document.getElementById('assistantForm');
    const input = document.getElementById('assistantQuestion');
    if (form && input) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        send(input.value);
      });
    }
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
      const inputElement = document.getElementById('assistantQuestion');
      if (inputElement) inputElement.placeholder = I18nModule.t('assistantPlaceholder');
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

  async function send(question) {
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
    setStatus(I18nModule.t('thinking'));
    appendMessage('user', cleanQuestion);
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
    } catch (error) {
      setStatus(error.message || I18nModule.t('assistantUnavailable'));
      appendMessage('error', I18nModule.t('assistantUnavailable'));
    } finally {
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

  function renderResponse(response) {
    const badge = document.getElementById('assistantModeBadge');
    if (badge) {
      badge.className = response.mode === 'AI' ? 'badge badge-live' : 'badge badge-demo';
      badge.textContent = response.mode === 'AI' ? I18nModule.t('aiLabel') : I18nModule.t('fallbackLabel');
    }
    appendMessage('assistant', response.answer);
    (response.actions || []).forEach(action => appendMessage('action', action));
    (response.warnings || []).forEach(warning => appendMessage('warning', warning));
    if (response.followUp) appendMessage('follow-up', response.followUp);
  }

  function appendMessage(type, message) {
    const container = document.getElementById('assistantMessages');
    if (!container) return;
    const empty = container.querySelector('.assistant-empty');
    if (empty) empty.remove();
    const item = document.createElement('p');
    item.className = `assistant-message assistant-message-${type}`;
    item.textContent = message;
    container.appendChild(item);
    container.scrollTop = container.scrollHeight;
  }

  function setStatus(message) {
    const status = document.getElementById('assistantStatus');
    if (status) status.textContent = message;
  }

  function setButtonDisabled(disabled) {
    const button = document.getElementById('assistantSendButton');
    if (button) button.disabled = disabled;
  }

  return { init, setContext, send };
})();
