const LOCAL_NODE_IMAGES = {
  aristoteles: '/images/aristoteles.jpg',
  augustinus: '/images/augustinus.jpg',
  aurelius: '/images/aurelius.svg',
  buddha: '/images/buddha.jpg',
  camus: '/images/camus.svg',
  descartes: '/images/descartes.jpg',
  epikur: '/images/epikur.svg',
  hegel: '/images/hegel.svg',
  heraklit: '/images/heraklit.jpg',
  kant: '/images/kant.jpg',
  konfuzios: '/images/konfuzios.jpg',
  laozi: '/images/laozi.jpg',
  nietzsche: '/images/nietzsche.jpg',
  parmenides: '/images/parmenides.jpg',
  platon: '/images/platon.jpg',
  plotin: '/images/plotin.jpg',
  sartre: '/images/sartre.svg',
  schopenhauer: '/images/schopenhauer.svg',
  seneca: '/images/seneca.svg',
  shankara: '/images/shankara.svg',
  sokrates: '/images/sokrates.jpg',
  spinoza: '/images/spinoza.jpg',
};

const VISUAL_OVERRIDES = {
  buddha: {
    symbol: 'BUD',
    secondary: '#d6a569',
    landmarkTitle: 'Bodhi-Baum',
    landmarkLocation: 'Bodh Gaya, Indien',
    landmarkSummary: 'Unter dem Bodhi-Baum wird Erwachen nicht als Theorie, sondern als Befreiung aus Anhaftung lesbar.',
    landmarkType: 'natur',
  },
  laozi: {
    symbol: 'DAO',
    secondary: '#bfd69f',
    landmarkTitle: 'Tor des Dao',
    landmarkLocation: 'Grenzpass am Hangu, China',
    landmarkSummary: 'Der Daoismus erscheint als Weg, der nicht erzwungen wird: Passage, Wind, Leere und Richtung ohne Zwang.',
    landmarkType: 'weg',
  },
  konfuzios: {
    symbol: 'REN',
    secondary: '#f1c37f',
    landmarkTitle: 'Ritualhof',
    landmarkLocation: 'Qufu, China',
    landmarkSummary: 'Konfuzianische Ordnung lebt in Beziehungen, Riten und der Formung des Charakters durch Praxis.',
    landmarkType: 'denkmal',
  },
  augustinus: {
    symbol: 'INT',
    secondary: '#c5acd9',
    landmarkTitle: 'Innenhof der Erinnerung',
    landmarkLocation: 'Hippo Regius, Nordafrika',
    landmarkSummary: 'Augustinus verlagert Wahrheit in den inneren Raum von Gedächtnis, Gewissen und Rückkehr.',
    landmarkType: 'licht',
  },
  spinoza: {
    symbol: 'SUB',
    secondary: '#8eb8d0',
    landmarkTitle: 'Werkstatt der Linsen',
    landmarkLocation: 'Den Haag, Niederlande',
    landmarkSummary: 'Spinozas Präzision verbindet Handwerk und Ontologie: Schleifen, Schärfen, Durchblick.',
    landmarkType: 'denkmal',
  },
  plotin: {
    symbol: 'ONE',
    secondary: '#b89ca8',
    landmarkTitle: 'Lichthof des Einen',
    landmarkLocation: 'Rom, Spätantike',
    landmarkSummary: 'Neuplatonische Rückkehr erscheint als Bewegung aus Vielheit in Sammlung, Licht und Ursprung.',
    landmarkType: 'licht',
  },
  shankara: {
    symbol: 'ADV',
    secondary: '#b9cc8d',
    landmarkTitle: 'Pfad der Nicht-Zweiheit',
    landmarkLocation: 'Kalady, Indien',
    landmarkSummary: 'Advaita liest die Trennung als Schleier; der Weg ist Rückkehr in ungeteiltes Bewusstsein.',
    landmarkType: 'weg',
  },
  tradition_buddhism: {
    symbol: 'DHM',
    secondary: '#d6a569',
    landmarkTitle: 'Rad des Dharma',
    landmarkLocation: 'Nordindien und darüber hinaus',
    landmarkSummary: 'Buddhistische Tradition ordnet Befreiung als Schule von Einsicht, Ethik und Übung.',
    landmarkType: 'licht',
  },
  tradition_daoism: {
    symbol: 'DAO',
    secondary: '#bfd69f',
    landmarkTitle: 'Tal des Nicht-Erzwingens',
    landmarkLocation: 'China',
    landmarkSummary: 'Daoistische Weltwahrnehmung liest Ordnung als Fluss, nicht als Kontrolle.',
    landmarkType: 'natur',
  },
  tradition_confucianism: {
    symbol: 'LI',
    secondary: '#e1bf86',
    landmarkTitle: 'Haus der Riten',
    landmarkLocation: 'Qufu und Ostasien',
    landmarkSummary: 'Konfuzianische Bildung wird in Ritual, Beziehung und gemeinsamer Form lesbar.',
    landmarkType: 'denkmal',
  },
  tradition_christian_theology: {
    symbol: 'LOG',
    secondary: '#d0b0d9',
    landmarkTitle: 'Basilika des Logos',
    landmarkLocation: 'Mittelmeerraum',
    landmarkSummary: 'Christliche Theologie spannt einen Raum zwischen Offenbarung, Denken und innerer Verwandlung.',
    landmarkType: 'licht',
  },
  tradition_upanishadic: {
    symbol: 'ATM',
    secondary: '#c8b36f',
    landmarkTitle: 'Wald der Upanishaden',
    landmarkLocation: 'Nordindien',
    landmarkSummary: 'Die Upanishaden öffnen einen kontemplativen Raum, in dem das Innere als Grund des Wirklichen erscheint.',
    landmarkType: 'natur',
  },
  tradition_neoplatonism: {
    symbol: 'ONE',
    secondary: '#b89ca8',
    landmarkTitle: 'Stufen der Emanation',
    landmarkLocation: 'Alexandria und Rom',
    landmarkSummary: 'Neuplatonismus liest Wirklichkeit als abgestuften Ausstrom und Rückweg zum Ursprung.',
    landmarkType: 'licht',
  },
  tradition_enlightenment: {
    symbol: 'LUM',
    secondary: '#9ec3ea',
    landmarkTitle: 'Salon der Kritik',
    landmarkLocation: 'Europa der Neuzeit',
    landmarkSummary: 'Aufklärung formt einen Raum öffentlicher Kritik, Vernunft und methodischer Prüfung.',
    landmarkType: 'denkmal',
  },
  text_daodejing: {
    symbol: 'TXT',
    secondary: '#bfd69f',
    landmarkTitle: 'Bambusrolle des Dao',
    landmarkLocation: 'China',
    landmarkSummary: 'Der Text arbeitet mit Verdichtung, Gegenläufigkeit und Leere statt mit Definition.',
    landmarkType: 'weg',
  },
  text_dhammapada: {
    symbol: 'TXT',
    secondary: '#d6a569',
    landmarkTitle: 'Verse des Weges',
    landmarkLocation: 'Suedasien',
    landmarkSummary: 'Der Dhammapada bündelt Praxis, Aufmerksamkeit und Befreiung in knappen Lehrversen.',
    landmarkType: 'licht',
  },
  text_upanishads: {
    symbol: 'TXT',
    secondary: '#c8b36f',
    landmarkTitle: 'Waldtexte',
    landmarkLocation: 'Indien',
    landmarkSummary: 'Die Upanishaden öffnen einen Text-Raum der Frage nach Selbst, Grund und Bewusstsein.',
    landmarkType: 'natur',
  },
  text_republic: {
    symbol: 'TXT',
    secondary: '#ceb08a',
    landmarkTitle: 'Akademische Rolle',
    landmarkLocation: 'Athen',
    landmarkSummary: 'Platons Politeia verbindet politische Ordnung, Seelenbildung und Wahrheitssuche.',
    landmarkType: 'denkmal',
  },
  text_enneads: {
    symbol: 'TXT',
    secondary: '#b89ca8',
    landmarkTitle: 'Buch der Rueckkehr',
    landmarkLocation: 'Spätantikes Rom',
    landmarkSummary: 'Die Enneaden lesen Wirklichkeit als Ausstrom, Sammlung und Heimkehr zum Einen.',
    landmarkType: 'licht',
  },
};

/**
 * Convert SVG string to data URI
 * @param {string} svg - SVG content
 * @returns {string} Data URI
 */
function svgDataUri(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

/**
 * Normalize hex color, defaulting to fallback if invalid
 * @param {string} hex - Hex color code
 * @returns {string} Normalized hex color
 */
function normalizeColor(hex) {
  return hex?.startsWith('#') ? hex : '#b48b7a';
}

/**
 * Create a color pair tuple with accent and fallback
 * @param {string} accent - Primary accent color
 * @param {string} fallback - Fallback color
 * @returns {[string, string]} Color pair tuple
 */
function colorPair(accent, fallback) {
  const normalized = normalizeColor(accent);
  return [normalized, fallback];
}

/**
 * Get symbol code for a given node type
 * @param {string} type - Node type (Thinker, Tradition, Text, School, ConceptCluster, Epoch)
 * @returns {string} Symbol code
 */
function symbolForType(type) {
  switch (type) {
    case 'Thinker':
      return 'THK';
    case 'Tradition':
      return 'TRD';
    case 'Text':
      return 'TXT';
    case 'School':
      return 'SCH';
    case 'ConceptCluster':
      return 'MAP';
    case 'Epoch':
      return 'ERA';
    default:
      return 'ATL';
  }
}

/**
 * Get fallback landmark type for a given node type
 * @param {string} type - Node type
 * @returns {string} Landmark type (denkmal, natur, licht, weg, fragezeichen)
 */
function fallbackLandmarkType(type) {
  switch (type) {
    case 'Thinker':
    case 'School':
      return 'denkmal';
    case 'Tradition':
    case 'Epoch':
      return 'licht';
    case 'Text':
      return 'weg';
    case 'ConceptCluster':
      return 'fragezeichen';
    default:
      return 'weg';
  }
}

/**
 * Get landmark glyph for a given landmark type
 * @param {string} type - Landmark type (denkmal, natur, licht, fragezeichen, weg)
 * @returns {string} Glyph code
 */
function landmarkGlyph(type) {
  switch (type) {
    case 'denkmal':
      return 'STOA';
    case 'natur':
      return 'GROVE';
    case 'licht':
      return 'LIGHT';
    case 'fragezeichen':
      return 'WHY';
    case 'weg':
      return 'PATH';
    default:
      return 'ATLAS';
  }
}

/**
 * Build hero SVG with title, subtitle, symbol, and color gradient
 * @param {string} title - Main title text
 * @param {string} subtitle - Subtitle text
 * @param {string} symbol - Symbol/code text
 * @param {string} accent - Primary accent color
 * @param {string} secondary - Secondary gradient color
 * @returns {string} SVG data URI
 */
function buildHeroSvg(title, subtitle, symbol, accent, secondary) {
  return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 560">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
      </defs>
      <rect width="900" height="560" rx="34" fill="#111821"/>
      <rect x="24" y="24" width="852" height="512" rx="28" fill="url(#g)" opacity="0.92"/>
      <circle cx="708" cy="148" r="112" fill="rgba(255,255,255,0.14)"/>
      <circle cx="708" cy="148" r="70" fill="rgba(255,255,255,0.22)"/>
      <rect x="68" y="86" width="278" height="330" rx="24" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.28)"/>
      <circle cx="207" cy="194" r="72" fill="rgba(17,24,33,0.22)"/>
      <circle cx="207" cy="174" r="42" fill="rgba(255,255,255,0.30)"/>
      <rect x="151" y="250" width="112" height="86" rx="42" fill="rgba(17,24,33,0.24)"/>
      <text x="430" y="154" fill="rgba(255,255,255,0.78)" font-family="Georgia, serif" font-size="28" letter-spacing="6">${subtitle}</text>
      <text x="430" y="252" fill="#fff7f9" font-family="Georgia, serif" font-size="66" font-weight="700">${escapeXml(title)}</text>
      <text x="430" y="332" fill="rgba(255,255,255,0.88)" font-family="Arial, sans-serif" font-size="26">${escapeXml(symbol)}</text>
      <rect x="430" y="374" width="270" height="2" fill="rgba(255,255,255,0.42)"/>
      <text x="430" y="422" fill="rgba(255,255,255,0.82)" font-family="Arial, sans-serif" font-size="24">Epistemic Atlas</text>
    </svg>
  `);
}

/**
 * Build landmark SVG with title, location, symbol, colors, and glyph
 * @param {string} title - Landmark title
 * @param {string} location - Location text
 * @param {string} symbol - Symbol/code text
 * @param {string} accent - Primary accent color
 * @param {string} secondary - Secondary gradient color
 * @param {string} landmarkType - Landmark type for glyph selection
 * @returns {string} SVG data URI
 */
function buildLandmarkSvg(title, location, symbol, accent, secondary, landmarkType) {
  const glyph = landmarkGlyph(landmarkType);

  return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 560">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${secondary}" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>
      </defs>
      <rect width="900" height="560" rx="34" fill="#0f1520"/>
      <rect x="24" y="24" width="852" height="512" rx="28" fill="url(#sky)" opacity="0.96"/>
      <circle cx="690" cy="132" r="78" fill="rgba(255,255,255,0.24)"/>
      <rect x="0" y="380" width="900" height="180" fill="rgba(16,22,30,0.26)"/>
      <rect x="160" y="246" width="120" height="168" rx="16" fill="rgba(17,24,33,0.34)"/>
      <rect x="198" y="174" width="46" height="82" rx="14" fill="rgba(17,24,33,0.30)"/>
      <rect x="138" y="400" width="184" height="18" rx="9" fill="rgba(255,255,255,0.18)"/>
      <text x="400" y="146" fill="rgba(255,255,255,0.78)" font-family="Arial, sans-serif" font-size="28" letter-spacing="6">${glyph}</text>
      <text x="400" y="238" fill="#fff7f9" font-family="Georgia, serif" font-size="58" font-weight="700">${escapeXml(title)}</text>
      <text x="400" y="304" fill="rgba(255,255,255,0.84)" font-family="Arial, sans-serif" font-size="26">${escapeXml(location)}</text>
      <text x="400" y="374" fill="rgba(255,255,255,0.76)" font-family="Arial, sans-serif" font-size="22">${escapeXml(symbol)}</text>
    </svg>
  `);
}

/**
 * Escape XML special characters in text
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeXml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

/**
 * Generate subtitle text from type, period, and region
 * @param {string} type - Node type
 * @param {string} period - Historical period
 * @param {string} region - Geographic region
 * @returns {string} Formatted subtitle
 */
function typeSubtitle(type, period, region) {
  const safeType = type === 'ConceptCluster' ? 'Konzeptfeld' : type;
  return `${safeType} • ${period || region || 'Atlas'}`;
}

/**
 * Create a personality portrait SVG for a node
 * @param {string} name - Person/entity name
 * @param {string} role - Role or type label
 * @param {string} accent - Accent color
 * @param {string} symbol - Symbol code
 * @returns {string} SVG data URI
 */
export function createPersonalityPortrait(name, role, accent, symbol) {
  const [primary, secondary] = colorPair(accent, '#1b2c3d');
  return buildHeroSvg(name, role, symbol, primary, secondary);
}

/**
 * Get the local image URL for a node
 * @param {string} nodeId - Node identifier
 * @returns {string|undefined} Image URL or undefined
 */
export function getLocalNodeImage(nodeId) {
  return LOCAL_NODE_IMAGES[nodeId];
}

/**
 * Generate shared media and landmark data for a node
 * @param {Object} input - Node media input
 * @param {string} input.id - Node identifier
 * @param {string} input.title - Node title
 * @param {string} input.type - Node type
 * @param {string} input.period - Historical period
 * @param {string} input.region - Geographic region
 * @param {string} input.accent - Accent color
 * @param {string} [input.portraitOverride] - Custom portrait image URL
 * @returns {Object} Media and landmark data
 * @returns {string} return.symbol - Symbol code
 * @returns {Object} return.hero - Hero media asset
 * @returns {Object[]} return.gallery - Array of media assets
 * @returns {Object} return.landmark - Landmark record
 */
export function getSharedNodeMedia(input) {
  const override = VISUAL_OVERRIDES[input.id] ?? {};
  const [primary, secondary] = colorPair(override.accent ?? input.accent, override.secondary ?? '#274157');
  const symbol = override.symbol ?? symbolForType(input.type);

  const heroSrc =
    input.portraitOverride ||
    LOCAL_NODE_IMAGES[input.id] ||
    buildHeroSvg(input.title, typeSubtitle(input.type, input.period, input.region), symbol, primary, secondary);

  const hero = {
    id: `${input.id}-hero`,
    source: LOCAL_NODE_IMAGES[input.id] || input.portraitOverride ? 'legacy-einsein' : 'local-generated',
    kind: 'portrait',
    title: input.title,
    subtitle: typeSubtitle(input.type, input.period, input.region),
    src: heroSrc,
    alt: `${input.title} – Atlasmotiv`,
  };

  const landmarkType = override.landmarkType ?? fallbackLandmarkType(input.type);
  const landmarkTitle = override.landmarkTitle ?? `${input.title} – Landmarke`;
  const landmarkLocation = override.landmarkLocation ?? input.region;
  const landmarkSummary =
    override.landmarkSummary ??
    `${input.title} wird im Atlas als verorteter Denkraum lesbar: ${input.type.toLowerCase()} und Region bilden eine begehbare Spur.`;

  const landmarkImageUrl = buildLandmarkSvg(
    landmarkTitle,
    landmarkLocation,
    symbol,
    primary,
    secondary,
    landmarkType
  );

  const landmark = {
    id: `${input.id}-landmark`,
    source: 'local-generated',
    nodeId: input.id,
    title: landmarkTitle,
    location: landmarkLocation,
    summary: landmarkSummary,
    type: landmarkType,
    symbol,
    accent: primary,
    imageUrl: landmarkImageUrl,
  };

  const gallery = [
    hero,
    {
      id: `${input.id}-landmark-visual`,
      source: 'local-generated',
      kind: 'landmark',
      title: landmark.title,
      subtitle: landmark.location,
      src: landmark.imageUrl,
      alt: `${landmark.title} – Landmarke`,
    },
    {
      id: `${input.id}-symbol`,
      source: 'local-generated',
      kind: 'symbol',
      title: `${input.title} – Symbolfeld`,
      subtitle: input.type,
      src: buildHeroSvg(input.title, input.type, symbol, secondary, primary),
      alt: `${input.title} – Symbolbild`,
    },
  ];

  return { symbol, hero, gallery, landmark };
}
