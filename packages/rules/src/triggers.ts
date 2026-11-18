import type { TakeProfitParams, DcaParams } from "@hasp/shared";

/**
 * Evaluate whether a take-profit rule should trigger.
 * Requires two consecutive confirmations (anti-spike).
 */
export function shouldTriggerTakeProfit(
  params: TakeProfitParams,
  currentPriceUsd: number,
  previousPriceUsd: number | null
): { triggered: boolean; reason: string } {
  const targetPrice = params.entryPriceUsd * params.targetMultiple;

  if (currentPriceUsd < targetPrice) {
    return {
      triggered: false,
      reason: `Price $${currentPriceUsd.toFixed(4)} below target $${targetPrice.toFixed(4)} (${params.targetMultiple}x entry)`,
    };
  }

  // Anti-spike: require two consecutive checks above target
  if (previousPriceUsd === null || previousPriceUsd < targetPrice) {
    return {
      triggered: false,
      reason: `Price above target but waiting for second confirmation (anti-spike)`,
    };
  }

  return {
    triggered: true,
    reason: `Price $${currentPriceUsd.toFixed(4)} >= target $${targetPrice.toFixed(4)} (confirmed twice)`,
  };
}

/**
 * Evaluate whether a DCA rule should trigger.
 */
export function shouldTriggerDca(
  params: DcaParams,
  lastRunAt: number | null,
  runsCompleted: number,
  now: number = Date.now()
): { triggered: boolean; reason: string } {
  if (runsCompleted >= params.maxRuns) {
    return { triggered: false, reason: `Max runs reached (${params.maxRuns})` };
  }

  const nowSeconds = Math.floor(now / 1000);

  if (lastRunAt === null) {
    return { triggered: true, reason: "First run (no previous execution)" };
  }

  const nextRunAt = lastRunAt + params.intervalSeconds;
  if (nowSeconds < nextRunAt) {
    const waitSeconds = nextRunAt - nowSeconds;
    return {
      triggered: false,
      reason: `Next run in ${waitSeconds}s (interval: ${params.intervalSeconds}s)`,
    };
  }

  return {
    triggered: true,
    reason: `Interval elapsed (${params.intervalSeconds}s since last run)`,
  };
}
