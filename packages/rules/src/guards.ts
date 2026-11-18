/**
 * Guard checks — all must pass before an execution proceeds.
 * Pure functions, no network calls.
 */

export interface GuardContext {
  priceFresh: boolean;
  priceSourcesAgree: boolean; // sources within 5%
  poolLiquidityUsd: number;
  priceImpactBps: number;
  executableQuoteBps: number; // deviation from oracle
  maxSlippageBps: number;
  stockTokenTradable: boolean | null; // null = not a stock token
  amountUsd: number;
  maxTotalUsd: number;
  spentTotalUsd: number;
  dailyCapUsd: number;
  spentTodayUsd: number;
  gasCostUsd: number;
  gasCapUsd: number;
  killSwitchEnabled: boolean;
  ruleExpired: boolean;
}

export interface GuardResult {
  passed: boolean;
  failedGuard: string | null;
  reason: string;
}

const MIN_POOL_LIQUIDITY_USD = 1000;

export function runGuards(ctx: GuardContext): GuardResult {
  if (ctx.killSwitchEnabled) {
    return fail("KILL_SWITCH", "Global kill switch is enabled");
  }

  if (ctx.ruleExpired) {
    return fail("EXPIRED", "Rule has expired");
  }

  if (!ctx.priceFresh) {
    return fail("STALE_PRICE", "Price data is stale");
  }

  if (!ctx.priceSourcesAgree) {
    return fail("PRICE_DEVIATION", "Price sources diverge by more than 5%");
  }

  if (ctx.poolLiquidityUsd < MIN_POOL_LIQUIDITY_USD) {
    return fail(
      "LOW_LIQUIDITY",
      `Pool liquidity $${ctx.poolLiquidityUsd} below minimum $${MIN_POOL_LIQUIDITY_USD}`
    );
  }

  if (ctx.executableQuoteBps > ctx.maxSlippageBps) {
    return fail(
      "SLIPPAGE",
      `Quote deviates ${ctx.executableQuoteBps}bps from oracle (max ${ctx.maxSlippageBps}bps)`
    );
  }

  if (ctx.stockTokenTradable === false) {
    return fail(
      "STOCK_TOKEN_NOT_TRADABLE",
      "Stock token not tradable in current session"
    );
  }

  if (ctx.spentTotalUsd + ctx.amountUsd > ctx.maxTotalUsd) {
    return fail(
      "TOTAL_CAP",
      `Would exceed total cap: $${ctx.spentTotalUsd} + $${ctx.amountUsd} > $${ctx.maxTotalUsd}`
    );
  }

  if (ctx.spentTodayUsd + ctx.amountUsd > ctx.dailyCapUsd) {
    return fail(
      "DAILY_CAP",
      `Would exceed daily cap: $${ctx.spentTodayUsd} + $${ctx.amountUsd} > $${ctx.dailyCapUsd}`
    );
  }

  if (ctx.gasCostUsd > ctx.gasCapUsd) {
    return fail(
      "GAS_TOO_HIGH",
      `Gas cost $${ctx.gasCostUsd} exceeds cap $${ctx.gasCapUsd}`
    );
  }

  return { passed: true, failedGuard: null, reason: "All guards passed" };
}

function fail(guard: string, reason: string): GuardResult {
  return { passed: false, failedGuard: guard, reason };
}
