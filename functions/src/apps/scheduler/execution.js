import { onSchedule } from "firebase-functions/v2/scheduler";
import {
  apiFetchDueScheduledAttacks,
  apiClaimScheduledAttack,
  apiMassAttackDeduction,
  apiCompleteScheduledAttack,
  apiFailScheduledAttack,
} from "../../domains/attack/api.js";

const REGION = "europe-west1";

/**
 * Scheduled function that polls for due attacks and executes them.
 * Runs in europe-west1 because Cloud Scheduler does not support africa-south1.
 */
export const scheduled_executePendingAttacks = onSchedule(
  {
    region: REGION,
    schedule: "every 1 minutes",
    timeZone: "Etc/UTC",
  },
  async () => {
    try {
      const dueAttacks = await apiFetchDueScheduledAttacks({ limit: 5 });
      if (!dueAttacks.length) {
        return;
      }

      for (const attack of dueAttacks) {
        const claimed = await apiClaimScheduledAttack(attack.id);
        if (!claimed) {
          continue;
        }

        try {
          const result = await apiMassAttackDeduction(claimed.wave || []);
          const executionSummary = {
            scheduledAtMs: claimed.scheduledAtMs,
            attackCount: Array.isArray(claimed.wave) ? claimed.wave.length : 0,
            processedUsers: Array.isArray(result) ? result.length : 0,
          };
          await apiCompleteScheduledAttack(claimed.id, executionSummary);
        } catch (err) {
          console.error("Failed to execute scheduled attack", claimed.id, err);
          await apiFailScheduledAttack(claimed.id, err);
        }
      }
    } catch (err) {
      console.error("Scheduled executor run failed:", err);
      throw err;
    }
  }
);
