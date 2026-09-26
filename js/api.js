const CropGuardianAPI = (function() {
  const configuredBase = document.querySelector('meta[name="api-base-url"]')?.content || '';
  const baseUrl = (window.CROPGUARDIAN_API_BASE || configuredBase).replace(/\/$/, '');

  async function request(path, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeout || 45000);
    const method = (options.method || 'GET').toUpperCase();
    const headers = new Headers(options.headers || {});
    const csrfToken = typeof AuthModule !== 'undefined' ? AuthModule.getCsrfToken() : '';
    if (csrfToken && ['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
      headers.set('X-CSRF-Token', csrfToken);
    }

    try {
      const response = await fetch(baseUrl + path, {
        ...options,
        headers,
        credentials: 'include',
        signal: controller.signal
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const detail = payload.detail || payload.error;
        const message = Array.isArray(detail)
          ? detail.map(item => item.msg || item.message).filter(Boolean).join(' ')
          : typeof detail === 'string'
            ? detail
            : detail?.message;
        const error = new Error(message || 'The server could not complete the request.');
        error.status = response.status;
        throw error;
      }
      return payload;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(localizeError('The request timed out. Please try again.'));
      }
      if (!navigator.onLine || error instanceof TypeError) {
        throw new Error(localizeError('The backend is unavailable. Check your connection and try again.'));
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  function localizeError(message) {
    return typeof I18nModule !== 'undefined' ? I18nModule.translateText(message) : message;
  }

  function analyzeImage(file, crop) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('crop', crop);
    formData.append('mode', 'ai');
    return request('/api/analyze', {
      method: 'POST',
      body: formData
    });
  }

  function getHealth() {
    return request('/api/health', { timeout: 10000 });
  }

  function getWeather(location) {
    return request('/api/weather?location=' + encodeURIComponent(location), { timeout: 15000 });
  }

  function calculateRisk(payload) {
    return request('/api/risk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      timeout: 15000
    });
  }

  function askAssistant(payload) {
    return request('/api/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      timeout: 90000
    });
  }

  

  function updateUserProfile(payload) {
    return request('/api/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  function getChatHistory() {
    return request('/api/user/chat-history');
  }

  function saveChatTurn(payload) {
    return request('/api/user/chat-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  function clearChatHistory() {
    return request('/api/user/chat-history', { method: 'DELETE' });
  }

  function getAnalyses() {
    return request('/api/user/analyses');
  }

  function saveAnalysis(payload) {
    return request('/api/user/analyses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  function deleteAnalysis(id) {
    return request('/api/user/analyses/' + encodeURIComponent(id), { method: 'DELETE' });
  }

  return {
    analyzeImage, getHealth, getWeather, calculateRisk, askAssistant,
    signup, login, getCurrentUser, logout, updateUserProfile,
    getChatHistory, saveChatTurn, clearChatHistory,
    getAnalyses, saveAnalysis, deleteAnalysis
  };
})();
