/**
 * Convert hex color to RGB string
 * @param {string} hex - Hex color (e.g., "#273344")
 * @returns {string} RGB string (e.g., "39, 51, 68")
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

/**
 * Convert RGB string to hex color
 * @param {string} rgb - RGB string (e.g., "39, 51, 68")
 * @returns {string} Hex color (e.g., "#273344")
 */
export function rgbToHex(rgb) {
  const [r, g, b] = rgb.split(',').map(s => parseInt(s.trim(), 10));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
