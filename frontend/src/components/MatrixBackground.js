import { useEffect, useRef } from "react";

export default function MatrixBackground({ visible = true }) {
  const canvasRef = useRef(null);
  const visibleRef = useRef(visible);
  const intervalIdRef = useRef(null);

  // Update visibility ref when prop changes
  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get matrix background color from CSS
    const rootStyles = getComputedStyle(document.documentElement);
    const matrixDotColor = rootStyles.getPropertyValue("--color-matrix-dot").trim();
    const matrixGlyphColor = rootStyles.getPropertyValue("--color-accent-matrix").trim();

    // Use #d3d3d3 for matrix pages background and fade
    const matrixBgRgb = "211, 211, 211"; // RGB for #d3d3d3

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

    // Resize canvas to fit window and reinitialize column positions
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      // Create array to track y-position of each column
      // Each column starts at y = 0 (top of screen)
      const numColumns = Math.ceil(width / state.size);
      columnYPositions = Array(numColumns).fill(0);
    };

    // Helper function to pick random item from array
    const random = (items) => items[Math.floor(Math.random() * items.length)];
    const randomRange = (start, end) => start + end * Math.random();

    // Draw one frame of the Matrix effect
    const draw = () => {
      // Only draw if visible (optimization to prevent background computation)
      if (!visibleRef.current) return;

      // Draw semi-transparent background rectangle to create fading trail effect
      // Uses actual background color from CSS to match page
      ctx.fillStyle = `rgba(${matrixBgRgb},${state.bgOpacity})`;
      ctx.fillRect(0, 0, width, height);

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
    intervalIdRef.current = setInterval(draw, 1000 / state.fps);

    return () => {
      window.removeEventListener("resize", resize);
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />;
}
