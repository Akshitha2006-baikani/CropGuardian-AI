const StorageModule = (function() {
  const SNAPSHOTS_KEY = 'cropguardian_snapshots';
  const PROFILE_KEY = 'cropguardian_profile';
  const FARM_KEY = 'cropguardian_farm';
  const LANGUAGE_KEY = 'cropguardian_language';

  function readObject(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '{}');
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch (error) {
      console.warn('Stored profile data was invalid and has been reset.', error);
      return {};
    }
  }

  function writeObject(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn('Unable to save profile data.', error);
      return false;
    }
  }

  function readSnapshots() {
    try {
      const value = JSON.parse(localStorage.getItem(SNAPSHOTS_KEY) || '[]');
      return Array.isArray(value) ? value.map(normalizeScan).filter(Boolean) : [];
    } catch (error) {
      console.warn('Stored scan history was invalid and has been reset.', error);
      return [];
    }
  }

  function normalizeScan(scan, index) {
    if (!scan || typeof scan !== 'object' || Array.isArray(scan)) return null;
    const text = (value, fallback) => typeof value === 'string' && value.trim() ? value.trim() : fallback;
    const number = (value, fallback) => typeof value === 'number' && Number.isFinite(value) ? value : fallback;
    return {
      ...scan,
      id: scan.id ?? `legacy-${index}`,
      crop: text(scan.crop, 'Not set'),
      disease: text(scan.disease, 'Not set'),
      confidence: number(scan.confidence, 0),
      severity: text(scan.severity, 'Not set'),
      riskScore: number(scan.riskScore, 0),
      riskLevel: text(scan.riskLevel, 'Not set'),
      mode: scan.mode === 'demo' ? 'demo' : scan.mode === 'ai' ? 'ai' : 'unknown',
      riskReasons: Array.isArray(scan.riskReasons) ? scan.riskReasons.filter(item => typeof item === 'string') : [],
      weatherFactors: Array.isArray(scan.weatherFactors) ? scan.weatherFactors : []
    };
  }

  function saveScan(scan) {
    const snapshots = readSnapshots();
    snapshots.unshift(scan);
    try {
      localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(snapshots.slice(0, 15)));
      return true;
    } catch (error) {
      console.warn('Unable to save scan history.', error);
      return false;
    }
  }

  function getScans() {
    return readSnapshots();
  }

  function deleteScan(id) {
    const scans = readSnapshots().filter(scan => String(scan.id) !== String(id));
    return writeObject(SNAPSHOTS_KEY, scans);
  }

  function deleteAllScans() {
    return writeObject(SNAPSHOTS_KEY, []);
  }

  function getProfile() {
    return readObject(PROFILE_KEY);
  }

  function saveProfile(profile) {
    return writeObject(PROFILE_KEY, profile);
  }

  function getFarm() {
    return readObject(FARM_KEY);
  }

  function saveFarm(farm) {
    return writeObject(FARM_KEY, farm);
  }

  function getLanguage() {
    try {
      const value = localStorage.getItem(LANGUAGE_KEY);
      return ['en', 'te', 'hi'].includes(value) ? value : 'en';
    } catch (error) {
      return 'en';
    }
  }

  function saveLanguage(language) {
    if (!['en', 'te', 'hi'].includes(language)) return false;
    try {
      localStorage.setItem(LANGUAGE_KEY, language);
      return true;
    } catch (error) {
      return false;
    }
  }

  return { saveScan, getScans, deleteScan, deleteAllScans, getProfile, saveProfile, getFarm, saveFarm, getLanguage, saveLanguage };
})();
