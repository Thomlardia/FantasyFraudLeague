import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get matrix background color from CSS
    const rootStyles = getComputedStyle(document.documentElement);
    const matrixBgColor = rootStyles.getPropertyValue("--color-matrix-base").trim() || "#0e1822";
    const matrixDotColor = rootStyles.getPropertyValue("--color-matrix-dot").trim() || "rgba(52, 64, 74, 0.35)";
    const matrixGlyphColor = rootStyles.getPropertyValue("--color-accent-matrix").trim() || "#70A253";

    // Convert hex to RGB for fade overlay
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "14, 24, 34";
    };

    const matrixBgRgb = hexToRgb(matrixBgColor);

    // Matrix configuration - matching original demo
    const state = {
      fps: 30,              // Frames per second
      bgOpacity: 0.1,      // Background fade opacity - higher prevents accumulation
      color: matrixGlyphColor,     // Text color
      charset: "01ABCDEFGHIJKLMNPQRSTUVWXYZアカサタナハマヤラワ0123456789",  // Characters to display
      size: 20              // Font size in pixels
    };

    const characters = state.charset.split("");

    let width = 0;
    let height = 0;
    let columnYPositions = [];
    let dotColumns = [];
    let dotRows = [];
    let intervalId = null;

    // Resize canvas to fit window and reinitialize column positions
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      // Fill canvas with matrix background color initially
      ctx.fillStyle = matrixBgColor;
      ctx.fillRect(0, 0, width, height);

      // Create array to track y-position of each column
      // Each column starts at y = 0 (top of screen)
      const numColumns = Math.ceil(width / state.size);
      columnYPositions = Array(numColumns).fill(0);

      const betweenColumns = Math.max(numColumns - 1, 0);
      const offset = state.size * 0.3;
      dotColumns = Array.from({ length: betweenColumns }, (_, i) => {
        const base = i * state.size + state.size / 2;
        return base + offset;
      });

      const numRows = Math.ceil(height / state.size);
      dotRows = Array.from({ length: Math.max(numRows - 1, 0) }, (_, i) => i * state.size + state.size / 2);
    };

    // Helper function to pick random item from array
    const random = (items) => items[Math.floor(Math.random() * items.length)];
    const randomRange = (start, end) => start + end * Math.random();

    // Draw one frame of the Matrix effect
    const draw = () => {
      // Draw semi-transparent background rectangle to create fading trail effect
      // Uses actual background color from CSS to match page
      ctx.fillStyle = `rgba(${matrixBgRgb},${state.bgOpacity})`;
      ctx.fillRect(0, 0, width, height);

      // Render dot grid between columns for subtle background pattern
      if (dotColumns.length && dotRows.length) {
        const dotSize = Math.max(1, Math.floor(state.size * 0.12));
        const dotOffset = dotSize / 2;
        ctx.fillStyle = matrixDotColor;

        for (let i = 0; i < dotColumns.length; i++) {
          const x = dotColumns[i];
          for (let j = 0; j < dotRows.length; j++) {
            const y = dotRows[j];
            ctx.fillRect(x - dotOffset, y - dotOffset, dotSize, dotSize);
          }
        }
      }

      // Set text style
      ctx.font = state.size + "px monospace";

      // Draw and update each column
      for (let i = 0; i < columnYPositions.length; i++) {
        const yPos = columnYPositions[i];

        // Calculate x position for this column
        const xPos = i * state.size;

        // Set text color
        ctx.fillStyle = state.color;

        // Draw random character at current position
        ctx.fillText(random(characters), xPos, yPos);

        // Update position for next frame
        // Reset to top if: reached bottom OR random chance (creates varying trail lengths)
        const reachedBottom = yPos >= height;
        const randomReset = yPos >= randomRange(100, 5000);

        if (reachedBottom || randomReset) {
          columnYPositions[i] = 0; // Reset to top
        } else {
          columnYPositions[i] = yPos + state.size; // Move down
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Animation loop with FPS control
    intervalId = setInterval(draw, 1000 / state.fps);

    return () => {
      window.removeEventListener("resize", resize);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />;
}
