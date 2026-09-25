/**
 * CropGuardian AI - AI Module
 * Keeps deterministic sample scenarios separate from backend AI analysis.
 */

const AIModule = (function() {
  const PRESET_MAPPINGS = {
    'tomato-early-blight': {
      crop: 'Tomato',
      scientificName: 'Solanum lycopersicum',
      disease: 'Tomato Early Blight',
      pathogen: 'Alternaria solani (Fungal Pathogen)',
      confidence: 94,
      severity: 'High',
      symptomsSummary: 'Concentric ring target lesions with chlorotic yellow halo margins detected on lower foliage.'
    },
    'rice-leaf-blast': {
      crop: 'Rice (Paddy)',
      scientificName: 'Oryza sativa',
      disease: 'Rice Leaf Blast',
      pathogen: 'Magnaporthe oryzae (Fungus)',
      confidence: 89,
      severity: 'High',
      symptomsSummary: 'Spindle-shaped diamond lesions with grayish-white necrotic centers along leaf blade margins.'
    },
    'cotton-leaf-spot': {
      crop: 'Cotton',
      scientificName: 'Gossypium hirsutum',
      disease: 'Cotton Leaf Spot',
      pathogen: 'Cercospora gossypina',
      confidence: 88,
      severity: 'Medium',
      symptomsSummary: 'Circular reddish-brown necrotic spots with prominent dark purple borders distributed on mature leaf.'
    },
    'potato-early-blight': {
      crop: 'Potato',
      scientificName: 'Solanum tuberosum',
      disease: 'Potato Early Blight',
      pathogen: 'Alternaria solani',
      confidence: 92,
      severity: 'Medium',
      symptomsSummary: 'Irregular dark brown patches exhibiting concentric ring textures on vegetative canopy.'
    },
    'healthy-tomato': {
      crop: 'Tomato',
      scientificName: 'Solanum lycopersicum',
      disease: 'Healthy Tomato Leaf',
      pathogen: 'None (Healthy Foliage)',
      confidence: 98,
      severity: 'Healthy',
      symptomsSummary: 'Uniform chlorophyll pigmentation, intact epidermal margins, and uninhibited cellular structure.'
    }
  };

  function analyzeDemo(activePresetId) {
    if (!activePresetId || !PRESET_MAPPINGS[activePresetId]) {
      throw new Error('Select a verified demo preset or upload an image for AI analysis.');
    }

    return {
      ...PRESET_MAPPINGS[activePresetId],
      mode: 'demo',
      timestamp: new Date().toISOString()
    };
  }

  return {
    analyzeDemo,
    PRESET_MAPPINGS
  };
})();
