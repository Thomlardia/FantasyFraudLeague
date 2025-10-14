import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";
import { perf } from "../firebase";
import { trace } from "firebase/performance";

/**
 * Report Core Web Vitals to Firebase Performance Monitoring
 * Tracks: CLS, FID, FCP, LCP, TTFB
 *
 * Call this function once when your app loads to start tracking.
 */
export function reportWebVitals() {
  // Cumulative Layout Shift - visual stability
  getCLS((metric) => {
    sendToFirebasePerformance(metric);
  });

  // First Input Delay - interactivity
  getFID((metric) => {
    sendToFirebasePerformance(metric);
  });

  // First Contentful Paint - loading performance
  getFCP((metric) => {
    sendToFirebasePerformance(metric);
  });

  // Largest Contentful Paint - loading performance
  getLCP((metric) => {
    sendToFirebasePerformance(metric);
  });

  // Time to First Byte - server response time
  getTTFB((metric) => {
    sendToFirebasePerformance(metric);
  });
}

/**
 * Send Web Vitals metric to Firebase Performance as a custom trace
 */
function sendToFirebasePerformance(metric) {
  const { name, value, id } = metric;

  // Create a trace with the metric name
  const metricTrace = trace(perf, name);

  // Set metric value and ID as custom attributes
  metricTrace.putMetric(name, Math.round(value));
  metricTrace.putAttribute("metric_id", id);

  // Record the trace (start and stop immediately since we have the value)
  metricTrace.start();
  metricTrace.stop();

  console.debug(`[Performance] ${name}: ${Math.round(value)}ms`);
}

/**
 * Create a custom trace for tracking specific operations
 * Usage:
 *
 * const defenseTrace = startCustomTrace("buy_defense");
 * // ... perform operation ...
 * defenseTrace.stop();
 *
 * Or with attributes:
 * const attackTrace = startCustomTrace("process_attack", {
 *   attack_type: "Phishing",
 *   damage: "1000"
 * });
 * // ... perform operation ...
 * attackTrace.stop();
 */
export function startCustomTrace(traceName, attributes = {}) {
  const customTrace = trace(perf, traceName);

  // Add custom attributes
  Object.entries(attributes).forEach(([key, value]) => {
    customTrace.putAttribute(key, String(value));
  });

  customTrace.start();
  return customTrace;
}

/**
 * Measure and trace an async operation
 * Usage:
 *
 * await measureAsync("buy_defense", async () => {
 *   await buyDefenseFunction();
 * }, { defense_name: "MFA", level: "1" });
 */
export async function measureAsync(traceName, asyncFn, attributes = {}) {
  const customTrace = startCustomTrace(traceName, attributes);
  try {
    const result = await asyncFn();
    customTrace.stop();
    return result;
  } catch (error) {
    customTrace.putAttribute("error", error.message);
    customTrace.stop();
    throw error;
  }
}

/**
 * Example: Track defense purchases
 * Add this to your defense hooks (e.g., in defenseHooks.js)
 *
 * import { measureAsync } from "../analytics/PerformanceMonitoring";
 *
 * const buyDefense = async (defenseId) => {
 *   return measureAsync("user_buy_defense", async () => {
 *     // Your existing buy logic
 *     const result = await user_buyDefense({ defenseId });
 *     return result;
 *   }, { defense_id: defenseId });
 * };
 */

/**
 * Example: Track attack processing
 * Add this to your attack context/hooks
 *
 * import { startCustomTrace } from "../analytics/PerformanceMonitoring";
 *
 * const processAttack = async (attackData) => {
 *   const trace = startCustomTrace("process_attack", {
 *     attack_type: attackData.type,
 *     base_damage: attackData.damage
 *   });
 *
 *   try {
 *     // Process attack logic
 *     const result = await processAttackLogic(attackData);
 *     trace.putMetric("final_damage", result.finalDamage);
 *     trace.stop();
 *     return result;
 *   } catch (error) {
 *     trace.putAttribute("error", error.message);
 *     trace.stop();
 *     throw error;
 *   }
 * };
 */
