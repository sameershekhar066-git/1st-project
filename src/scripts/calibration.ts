/**
 * Calibration and Device Detection Engine for Precision Ruler (ไม้บรรทัด.com)
 */

export interface DeviceSpec {
  id: string;
  name: string;
  category: 'phone' | 'tablet' | 'laptop' | 'desktop';
  cssWidth: number;
  cssHeight: number;
  dpr: number;
  diagonal: number; // in inches
  cssPpi: number;   // CSS pixels per inch
  realPpi: number;  // Physical hardware PPI
  uaMatch?: RegExp;
}

export const DEVICE_DATABASE: DeviceSpec[] = [
  // Apple iPhones
  { id: 'iphone-16-promax', name: 'iPhone 16 Pro Max / 15 Pro Max', category: 'phone', cssWidth: 430, cssHeight: 932, dpr: 3, diagonal: 6.86, cssPpi: 153.3, realPpi: 460 },
  { id: 'iphone-16-pro', name: 'iPhone 16 Pro / 15 Pro', category: 'phone', cssWidth: 393, cssHeight: 852, dpr: 3, diagonal: 6.27, cssPpi: 153.3, realPpi: 460 },
  { id: 'iphone-16-plus', name: 'iPhone 16 Plus / 15 Plus / 14 Plus', category: 'phone', cssWidth: 430, cssHeight: 932, dpr: 3, diagonal: 6.69, cssPpi: 153.3, realPpi: 460 },
  { id: 'iphone-16', name: 'iPhone 16 / 15 / 14 / 13 / 12', category: 'phone', cssWidth: 390, cssHeight: 844, dpr: 3, diagonal: 6.06, cssPpi: 153.3, realPpi: 460 },
  { id: 'iphone-13-mini', name: 'iPhone 13 mini / 12 mini', category: 'phone', cssWidth: 375, cssHeight: 812, dpr: 3, diagonal: 5.42, cssPpi: 158.7, realPpi: 476 },
  { id: 'iphone-se-3', name: 'iPhone SE (3rd/2nd gen)', category: 'phone', cssWidth: 375, cssHeight: 667, dpr: 2, diagonal: 4.7, cssPpi: 163, realPpi: 326 },

  // Apple iPads
  { id: 'ipad-pro-13', name: 'iPad Pro 13" (M4)', category: 'tablet', cssWidth: 1032, cssHeight: 1376, dpr: 2, diagonal: 13.0, cssPpi: 132.3, realPpi: 264 },
  { id: 'ipad-pro-11', name: 'iPad Pro 11" (M4/M2/M1)', category: 'tablet', cssWidth: 834, cssHeight: 1210, dpr: 2, diagonal: 11.0, cssPpi: 132.0, realPpi: 264 },
  { id: 'ipad-air-11', name: 'iPad Air 11" / iPad 10th Gen', category: 'tablet', cssWidth: 820, cssHeight: 1180, dpr: 2, diagonal: 10.9, cssPpi: 132.0, realPpi: 264 },
  { id: 'ipad-mini-6', name: 'iPad mini (6th/7th Gen)', category: 'tablet', cssWidth: 744, cssHeight: 1133, dpr: 2, diagonal: 8.3, cssPpi: 163.0, realPpi: 326 },

  // MacBooks
  { id: 'macbook-pro-16', name: 'MacBook Pro 16" (M1/M2/M3/M4)', category: 'laptop', cssWidth: 1728, cssHeight: 1117, dpr: 2, diagonal: 16.2, cssPpi: 127.0, realPpi: 254 },
  { id: 'macbook-pro-14', name: 'MacBook Pro 14" (M1/M2/M3/M4)', category: 'laptop', cssWidth: 1512, cssHeight: 982, dpr: 2, diagonal: 14.2, cssPpi: 127.0, realPpi: 254 },
  { id: 'macbook-air-15', name: 'MacBook Air 15" (M2/M3)', category: 'laptop', cssWidth: 1440, cssHeight: 932, dpr: 2, diagonal: 15.3, cssPpi: 112.2, realPpi: 224 },
  { id: 'macbook-air-13', name: 'MacBook Air 13.6" / 13.3" (M1/M2/M3)', category: 'laptop', cssWidth: 1440, cssHeight: 900, dpr: 2, diagonal: 13.6, cssPpi: 113.8, realPpi: 227 },

  // Popular Android Phones & Tablets
  { id: 'galaxy-s24-ultra', name: 'Samsung Galaxy S24 Ultra / S23 Ultra', category: 'phone', cssWidth: 384, cssHeight: 824, dpr: 3.75, diagonal: 6.8, cssPpi: 133.5, realPpi: 505 },
  { id: 'galaxy-s24-plus', name: 'Samsung Galaxy S24+ / S23+', category: 'phone', cssWidth: 384, cssHeight: 824, dpr: 3.5, diagonal: 6.7, cssPpi: 147.0, realPpi: 516 },
  { id: 'galaxy-s24', name: 'Samsung Galaxy S24 / S23', category: 'phone', cssWidth: 360, cssHeight: 780, dpr: 3.0, diagonal: 6.2, cssPpi: 138.5, realPpi: 416 },
  { id: 'pixel-9-pro-xl', name: 'Google Pixel 9 Pro XL / 8 Pro', category: 'phone', cssWidth: 412, cssHeight: 923, dpr: 3.5, diagonal: 6.8, cssPpi: 148.0, realPpi: 486 },
  { id: 'pixel-9', name: 'Google Pixel 9 / 8', category: 'phone', cssWidth: 412, cssHeight: 915, dpr: 2.625, diagonal: 6.2, cssPpi: 162.0, realPpi: 428 },
  { id: 'galaxy-tab-s9', name: 'Samsung Galaxy Tab S9 (11")', category: 'tablet', cssWidth: 800, cssHeight: 1280, dpr: 2.0, diagonal: 11.0, cssPpi: 137.2, realPpi: 274 },

  // Common Laptops
  { id: 'laptop-13-fhd', name: '13.3" Laptop (1080p FHD)', category: 'laptop', cssWidth: 1920, cssHeight: 1080, dpr: 1, diagonal: 13.3, cssPpi: 165.6, realPpi: 165.6 },
  { id: 'laptop-14-fhd', name: '14.0" Laptop (1080p FHD - ThinkPad/Dell)', category: 'laptop', cssWidth: 1920, cssHeight: 1080, dpr: 1, diagonal: 14.0, cssPpi: 157.4, realPpi: 157.4 },
  { id: 'laptop-15-fhd', name: '15.6" Laptop (1080p FHD - Standard)', category: 'laptop', cssWidth: 1920, cssHeight: 1080, dpr: 1, diagonal: 15.6, cssPpi: 141.2, realPpi: 141.2 },
  { id: 'laptop-15-fhd-scale125', name: '15.6" Laptop (1080p @ 125% Windows Scale)', category: 'laptop', cssWidth: 1536, cssHeight: 864, dpr: 1.25, diagonal: 15.6, cssPpi: 113.0, realPpi: 141.2 },
  { id: 'laptop-15-fhd-scale150', name: '15.6" Laptop (1080p @ 150% Windows Scale)', category: 'laptop', cssWidth: 1280, cssHeight: 720, dpr: 1.5, diagonal: 15.6, cssPpi: 94.1, realPpi: 141.2 },
  { id: 'laptop-14-2k', name: '14.0" Laptop (1440p / 2.8K OLED)', category: 'laptop', cssWidth: 1920, cssHeight: 1200, dpr: 1.5, diagonal: 14.0, cssPpi: 161.7, realPpi: 242.5 },

  // Desktop Monitors
  { id: 'monitor-21-fhd', name: '21.5" Desktop Monitor (1080p FHD)', category: 'desktop', cssWidth: 1920, cssHeight: 1080, dpr: 1, diagonal: 21.5, cssPpi: 102.5, realPpi: 102.5 },
  { id: 'monitor-24-fhd', name: '24.0" Desktop Monitor (1080p FHD Standard)', category: 'desktop', cssWidth: 1920, cssHeight: 1080, dpr: 1, diagonal: 23.8, cssPpi: 92.6, realPpi: 92.6 },
  { id: 'monitor-27-fhd', name: '27.0" Desktop Monitor (1080p FHD)', category: 'desktop', cssWidth: 1920, cssHeight: 1080, dpr: 1, diagonal: 27.0, cssPpi: 81.6, realPpi: 81.6 },
  { id: 'monitor-27-qhd', name: '27.0" Desktop Monitor (1440p QHD / 2K)', category: 'desktop', cssWidth: 2560, cssHeight: 1440, dpr: 1, diagonal: 27.0, cssPpi: 108.8, realPpi: 108.8 },
  { id: 'monitor-27-4k', name: '27.0" Desktop Monitor (4K UHD @ 150% Scale)', category: 'desktop', cssWidth: 2560, cssHeight: 1440, dpr: 1.5, diagonal: 27.0, cssPpi: 108.8, realPpi: 163.2 },
  { id: 'monitor-32-4k', name: '32.0" Desktop Monitor (4K UHD @ 150% Scale)', category: 'desktop', cssWidth: 2560, cssHeight: 1440, dpr: 1.5, diagonal: 31.5, cssPpi: 93.3, realPpi: 139.9 },
  { id: 'monitor-34-ultrawide', name: '34.0" Ultrawide Monitor (3440×1440 UWQHD)', category: 'desktop', cssWidth: 3440, cssHeight: 1440, dpr: 1, diagonal: 34.1, cssPpi: 109.7, realPpi: 109.7 }
];

export const STANDARD_OBJECTS = [
  { id: 'credit-card', name: 'Standard Credit / Debit / ID Card (ISO/IEC 7810 ID-1)', widthMm: 85.60, heightMm: 53.98, widthIn: 3.370, heightIn: 2.125 },
  { id: 'usd-bill', name: 'US Dollar Banknote', widthMm: 156.0, heightMm: 66.3, widthIn: 6.14, heightIn: 2.61 },
  { id: 'thai-100-baht', name: 'Thai 100 Baht Banknote (ธนบัตร 100 บาท)', widthMm: 150.0, heightMm: 72.0, widthIn: 5.91, heightIn: 2.83 },
  { id: 'thai-10-baht-coin', name: 'Thai 10 Baht Coin (เหรียญ 10 บาท - 26mm)', widthMm: 26.0, heightMm: 26.0, widthIn: 1.024, heightIn: 1.024 },
  { id: 'us-quarter', name: 'US Quarter Dollar Coin (24.26mm)', widthMm: 24.26, heightMm: 24.26, widthIn: 0.955, heightIn: 0.955 },
  { id: 'euro-2-coin', name: '2 Euro Coin (25.75mm)', widthMm: 25.75, heightMm: 25.75, widthIn: 1.014, heightIn: 1.014 }
];

const STORAGE_KEY = 'ruler_ppi';
const CALIBRATION_META_KEY = 'ruler_cal_meta';

export interface CalibrationMeta {
  method: 'auto' | 'device' | 'diagonal' | 'card' | 'default';
  label: string;
  timestamp: number;
}

/**
 * Calculates CSS PPI from screen dimensions and diagonal size in inches.
 */
export function calculatePpiFromDiagonal(diagonalInches: number, widthCss?: number, heightCss?: number): number {
  if (diagonalInches <= 0) return 96;
  const w = widthCss || window.screen.width;
  const h = heightCss || window.screen.height;
  const diagonalPx = Math.sqrt(w * w + h * h);
  return Number((diagonalPx / diagonalInches).toFixed(2));
}

/**
 * Calculates CSS PPI from on-screen credit card width in pixels.
 * Standard ID-1 card width is 85.60 mm = 3.37007874 inches.
 */
export function calculatePpiFromCardPixels(cardWidthPx: number): number {
  const cardWidthInches = 85.60 / 25.4; // 3.37007874 inches
  return Number((cardWidthPx / cardWidthInches).toFixed(2));
}

/**
 * Returns the card width in CSS pixels for a given PPI.
 */
export function getCardWidthPixels(ppi: number): number {
  const cardWidthInches = 85.60 / 25.4;
  return Number((cardWidthInches * ppi).toFixed(1));
}

/**
 * Returns the card height in CSS pixels for a given PPI.
 */
export function getCardHeightPixels(ppi: number): number {
  const cardHeightInches = 53.98 / 25.4;
  return Number((cardHeightInches * ppi).toFixed(1));
}

/**
 * Auto-detects device specs and estimates CSS PPI.
 */
export function autoDetectDevice(): { device: DeviceSpec | null; estimatedPpi: number; confidence: 'high' | 'medium' | 'estimate' } {
  if (typeof window === 'undefined') {
    return { device: null, estimatedPpi: 96, confidence: 'estimate' };
  }

  const screenW = Math.max(window.screen.width, window.screen.height);
  const screenH = Math.min(window.screen.width, window.screen.height);
  const dpr = window.devicePixelRatio || 1;
  const ua = navigator.userAgent;

  // Exact dimension and DPR matching in device database
  const matched = DEVICE_DATABASE.find(d => {
    const dMax = Math.max(d.cssWidth, d.cssHeight);
    const dMin = Math.min(d.cssWidth, d.cssHeight);
    const dimMatch = Math.abs(dMax - screenW) <= 2 && Math.abs(dMin - screenH) <= 2;
    const dprMatch = Math.abs(d.dpr - dpr) < 0.1;
    return dimMatch && dprMatch;
  });

  if (matched) {
    return { device: matched, estimatedPpi: matched.cssPpi, confidence: 'high' };
  }

  // Dimension only match
  const dimOnlyMatched = DEVICE_DATABASE.find(d => {
    const dMax = Math.max(d.cssWidth, d.cssHeight);
    const dMin = Math.min(d.cssWidth, d.cssHeight);
    return Math.abs(dMax - screenW) <= 2 && Math.abs(dMin - screenH) <= 2;
  });

  if (dimOnlyMatched) {
    return { device: dimOnlyMatched, estimatedPpi: dimOnlyMatched.cssPpi, confidence: 'medium' };
  }

  // Default fallback heuristic based on screen diagonal assumption
  // Mobile / Tablet / Desktop heuristic
  let assumedDiagonal = 24.0;
  if (/Mobi|Android|iPhone/i.test(ua)) {
    assumedDiagonal = 6.2;
  } else if (/iPad|Tablet/i.test(ua)) {
    assumedDiagonal = 10.9;
  } else if (/Macintosh/i.test(ua) && screenW <= 1800) {
    assumedDiagonal = 14.0;
  }

  const estimatedPpi = calculatePpiFromDiagonal(assumedDiagonal, screenW, screenH);
  return { device: null, estimatedPpi: Math.max(60, Math.min(300, estimatedPpi)), confidence: 'estimate' };
}

/**
 * Gets currently saved PPI or initializes from auto-detection.
 */
export function getCurrentPpi(): number {
  if (typeof window === 'undefined') return 96;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = parseFloat(saved);
    if (!isNaN(parsed) && parsed > 30 && parsed < 500) {
      return parsed;
    }
  }
  const auto = autoDetectDevice();
  return auto.estimatedPpi;
}

/**
 * Saves calibrated PPI to localStorage and dispatches a global update event.
 */
export function savePpi(ppi: number, meta: CalibrationMeta): void {
  if (typeof window === 'undefined') return;
  const clamped = Math.max(30, Math.min(500, Number(ppi.toFixed(2))));
  localStorage.setItem(STORAGE_KEY, clamped.toString());
  localStorage.setItem(CALIBRATION_META_KEY, JSON.stringify(meta));
  window.dispatchEvent(new CustomEvent('ruler:ppi-changed', { detail: { ppi: clamped, meta } }));
}

/**
 * Gets calibration metadata.
 */
export function getCalibrationMeta(): CalibrationMeta {
  if (typeof window === 'undefined') {
    return { method: 'default', label: 'Default 96 PPI', timestamp: Date.now() };
  }
  const saved = localStorage.getItem(CALIBRATION_META_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }
  const auto = autoDetectDevice();
  return {
    method: auto.confidence === 'high' ? 'auto' : 'default',
    label: auto.device ? auto.device.name : `Auto-estimated (~${auto.estimatedPpi} PPI)`,
    timestamp: Date.now()
  };
}
