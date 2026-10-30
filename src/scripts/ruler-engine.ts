/**
 * Precision Ruler Canvas Rendering Engine (ไม้บรรทัด.com)
 * Renders sub-pixel crisp ticks and labels for cm, mm, in, px across Top, Bottom, Left, Right edges.
 * Supports dynamic Dark / Light themes, red major scale lines, and authentic physical scale rendering.
 */

export type Unit = 'cm' | 'in' | 'mm' | 'px';
export type RulerEdge = 'top' | 'bottom' | 'left' | 'right';
export type Theme = 'dark' | 'light';

export interface DrawOptions {
  unit: Unit;
  ppi: number;
  theme?: Theme;
  showFractions?: boolean;
}

const THEME_COLORS = {
  dark: {
    bg: '#0f1011',
    border: '#23252a',
    majorTick: '#ef4444', // Red for big major scale lines
    mediumTick: '#8a8f98',
    minorTick: '#3e424b',
    accent: '#ef4444',
    accentLight: '#f87171',
    text: '#d0d6e0',
    textMuted: '#62666d',
  },
  light: {
    bg: '#f8f9fb',
    border: '#e3e6ed',
    majorTick: '#dc2626', // Red for big major scale lines
    mediumTick: '#4b5262',
    minorTick: '#c8cdd8',
    accent: '#dc2626',
    accentLight: '#ef4444',
    text: '#1f2329',
    textMuted: '#687082',
  }
};

/**
 * Draws a ruler on the given canvas element for a specific edge.
 */
export function drawRuler(
  canvas: HTMLCanvasElement,
  edge: RulerEdge,
  options: DrawOptions
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  // Resize canvas backing store for HiDPI sharpness
  if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
  }

  ctx.save();
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;

  const themeMode: Theme = options.theme || (document.documentElement.classList.contains('light') ? 'light' : 'dark');
  const COLORS = THEME_COLORS[themeMode];

  // Clear background
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  // Border line facing the inner canvas
  ctx.fillStyle = COLORS.border;
  if (edge === 'top') ctx.fillRect(0, h - 1, w, 1);
  else if (edge === 'bottom') ctx.fillRect(0, 0, w, 1);
  else if (edge === 'left') ctx.fillRect(w - 1, 0, 1, h);
  else if (edge === 'right') ctx.fillRect(0, 0, 1, h);

  const { unit, ppi } = options;
  const isHorizontal = edge === 'top' || edge === 'bottom';
  const totalLength = isHorizontal ? w : h;

  // Pixels per millimeter and per inch
  const pxPerInch = ppi;
  const pxPerMm = ppi / 25.4;

  ctx.font = '500 10px "JetBrains Mono", "Geist Mono", monospace';
  ctx.textBaseline = 'middle';

  if (unit === 'cm' || unit === 'mm') {
    // Metric rendering (1mm minor ticks, 5mm medium ticks, 10mm/1cm major ticks)
    const mmCount = Math.ceil(totalLength / pxPerMm);

    for (let mm = 0; mm <= mmCount; mm++) {
      const pos = Math.round(mm * pxPerMm) + 0.5;
      if (pos > totalLength) break;

      const isCm = mm % 10 === 0;
      const isHalfCm = mm % 5 === 0 && !isCm;

      let tickLength = 6;
      let tickColor = COLORS.minorTick;
      let tickWidth = 1;

      if (isCm) {
        tickLength = 19;
        tickColor = COLORS.majorTick; // Red big line
        tickWidth = 1.5;
      } else if (isHalfCm) {
        tickLength = 11;
        tickColor = COLORS.mediumTick;
        tickWidth = 1;
      }

      ctx.strokeStyle = tickColor;
      ctx.lineWidth = tickWidth;
      ctx.beginPath();

      if (edge === 'top') {
        ctx.moveTo(pos, h - 1);
        ctx.lineTo(pos, h - 1 - tickLength);
      } else if (edge === 'bottom') {
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, tickLength);
      } else if (edge === 'left') {
        ctx.moveTo(w - 1, pos);
        ctx.lineTo(w - 1 - tickLength, pos);
      } else if (edge === 'right') {
        ctx.moveTo(0, pos);
        ctx.lineTo(tickLength, pos);
      }
      ctx.stroke();

      // Labels on centimeter marks (including 0 at origin)
      if (isCm) {
        const val = unit === 'mm' ? mm.toString() : (mm / 10).toString();
        ctx.fillStyle = COLORS.text;
        ctx.font = '600 10px "JetBrains Mono", monospace';

        if (edge === 'top') {
          ctx.textAlign = 'center';
          ctx.fillText(val, Math.max(8, pos), h - tickLength - 8);
        } else if (edge === 'bottom') {
          ctx.textAlign = 'center';
          ctx.fillText(val, Math.max(8, pos), tickLength + 8);
        } else if (edge === 'left') {
          ctx.textAlign = 'right';
          ctx.fillText(val, w - tickLength - 6, Math.max(8, pos));
        } else if (edge === 'right') {
          ctx.textAlign = 'left';
          ctx.fillText(val, tickLength + 6, Math.max(8, pos));
        }
      }
    }
  } else if (unit === 'in') {
    // Imperial rendering (1/16th inch ticks, 1/8th, 1/4, 1/2, 1 inch major)
    const sixteenthCount = Math.ceil(totalLength / (pxPerInch / 16));

    for (let sixteenth = 0; sixteenth <= sixteenthCount; sixteenth++) {
      const pos = Math.round(sixteenth * (pxPerInch / 16)) + 0.5;
      if (pos > totalLength) break;

      const isInch = sixteenth % 16 === 0;
      const isHalf = sixteenth % 8 === 0 && !isInch;
      const isQuarter = sixteenth % 4 === 0 && !isHalf && !isInch;
      const isEighth = sixteenth % 2 === 0 && !isQuarter && !isHalf && !isInch;

      let tickLength = 5;
      let tickColor = COLORS.minorTick;
      let tickWidth = 1;

      if (isInch) {
        tickLength = 20;
        tickColor = COLORS.majorTick; // Red big line
        tickWidth = 1.8;
      } else if (isHalf) {
        tickLength = 14;
        tickColor = COLORS.mediumTick;
        tickWidth = 1.2;
      } else if (isQuarter) {
        tickLength = 10;
        tickColor = COLORS.mediumTick;
      } else if (isEighth) {
        tickLength = 7;
        tickColor = COLORS.minorTick;
      }

      ctx.strokeStyle = tickColor;
      ctx.lineWidth = tickWidth;
      ctx.beginPath();

      if (edge === 'top') {
        ctx.moveTo(pos, h - 1);
        ctx.lineTo(pos, h - 1 - tickLength);
      } else if (edge === 'bottom') {
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, tickLength);
      } else if (edge === 'left') {
        ctx.moveTo(w - 1, pos);
        ctx.lineTo(w - 1 - tickLength, pos);
      } else if (edge === 'right') {
        ctx.moveTo(0, pos);
        ctx.lineTo(tickLength, pos);
      }
      ctx.stroke();

      // Label on inch marks (including 0)
      if (isInch) {
        const val = (sixteenth / 16).toString();
        ctx.fillStyle = COLORS.text;
        ctx.font = '600 11px "JetBrains Mono", monospace';

        if (edge === 'top') {
          ctx.textAlign = 'center';
          ctx.fillText(`${val}"`, Math.max(10, pos), h - tickLength - 8);
        } else if (edge === 'bottom') {
          ctx.textAlign = 'center';
          ctx.fillText(`${val}"`, Math.max(10, pos), tickLength + 8);
        } else if (edge === 'left') {
          ctx.textAlign = 'right';
          ctx.fillText(`${val}"`, w - tickLength - 6, Math.max(10, pos));
        } else if (edge === 'right') {
          ctx.textAlign = 'left';
          ctx.fillText(`${val}"`, tickLength + 6, Math.max(10, pos));
        }
      }
    }
  } else if (unit === 'px') {
    // Pixel rendering (every 10px, 50px, 100px)
    const pxStep = 10;
    const pxCount = Math.ceil(totalLength / pxStep);

    for (let i = 0; i <= pxCount; i++) {
      const pxVal = i * pxStep;
      const pos = pxVal + 0.5;
      if (pos > totalLength) break;

      const is100 = pxVal % 100 === 0;
      const is50 = pxVal % 50 === 0 && !is100;

      let tickLength = 5;
      let tickColor = COLORS.minorTick;
      let tickWidth = 1;

      if (is100) {
        tickLength = 17;
        tickColor = COLORS.majorTick; // Red big line
        tickWidth = 1.5;
      } else if (is50) {
        tickLength = 10;
        tickColor = COLORS.mediumTick;
      }

      ctx.strokeStyle = tickColor;
      ctx.lineWidth = tickWidth;
      ctx.beginPath();

      if (edge === 'top') {
        ctx.moveTo(pos, h - 1);
        ctx.lineTo(pos, h - 1 - tickLength);
      } else if (edge === 'bottom') {
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, tickLength);
      } else if (edge === 'left') {
        ctx.moveTo(w - 1, pos);
        ctx.lineTo(w - 1 - tickLength, pos);
      } else if (edge === 'right') {
        ctx.moveTo(0, pos);
        ctx.lineTo(tickLength, pos);
      }
      ctx.stroke();

      if (is100) {
        ctx.fillStyle = COLORS.text;
        ctx.font = '600 10px "JetBrains Mono", monospace';
        if (edge === 'top') {
          ctx.textAlign = 'center';
          ctx.fillText(pxVal.toString(), Math.max(12, pos), h - tickLength - 8);
        } else if (edge === 'bottom') {
          ctx.textAlign = 'center';
          ctx.fillText(pxVal.toString(), Math.max(12, pos), tickLength + 8);
        } else if (edge === 'left') {
          ctx.textAlign = 'right';
          ctx.fillText(pxVal.toString(), w - tickLength - 6, Math.max(12, pos));
        } else if (edge === 'right') {
          ctx.textAlign = 'left';
          ctx.fillText(pxVal.toString(), tickLength + 6, Math.max(12, pos));
        }
      }
    }
  }

  ctx.restore();
}
