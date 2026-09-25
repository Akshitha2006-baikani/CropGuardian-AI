const CropGuardianAPI = (function() {
  const configuredBase = document.querySelector('meta[name="api-base-url"]')?.content || '';
  const baseUrl = (window.CROPGUARDIAN_API_BASE || configuredBase).replace(/\/$/, '');

  async function request(path, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeout || 45000);

    try {
      const response = await fetch(baseUrl + path, {
        ...options,
        signal: controller.signal
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.detail || payload.error || 'The server could not complete the request.');
      }
      return payload;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('The request timed out. Please try again.');
      }
      if (!navigator.onLine || error instanceof TypeError) {
        throw new Error('The backend is unavailable. Check your connection and try again.');
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
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
      timeout: 30000
    });
  }

  return { analyzeImage, getHealth, getWeather, calculateRisk, askAssistant };
})();
