import { z } from "zod";
import { type Address } from "viem";

// ── Address validation ──
const addressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid EVM address") as z.ZodType<Address>;

// ── Take-Profit rule params ──
export const takeProfitSchema = z.object({
  tokenIn: addressSchema,
  tokenOut: addressSchema,
  entryPriceUsd: z.number().positive(),
  targetMultiple: z.number().min(1.1).max(1000),
  sellPercent: z.number().min(1).max(100),
  maxSlippageBps: z.number().min(10).max(500).default(200),
  parkInVault: addressSchema.optional(),
});

export type TakeProfitParams = z.infer<typeof takeProfitSchema>;

// ── DCA rule params ──
export const dcaSchema = z.object({
  tokenIn: addressSchema,
  tokenOut: addressSchema,
  amountPerRun: z.string().min(1),
  intervalSeconds: z.number().min(3600),
  maxRuns: z.number().min(1).max(10000),
  maxSlippageBps: z.number().min(10).max(500).default(200),
});

export type DcaParams = z.infer<typeof dcaSchema>;

// ── Rule template union ──
export const ruleTemplateSchema = z.discriminatedUnion("template", [
  z.object({ template: z.literal("TAKE_PROFIT"), params: takeProfitSchema }),
  z.object({ template: z.literal("DCA"), params: dcaSchema }),
]);

export type RuleTemplate = z.infer<typeof ruleTemplateSchema>;

// ── Rule status ──
export const ruleStatusSchema = z.enum([
  "ACTIVE",
  "EXECUTING",
  "COMPLETED",
  "FAILED",
  "PAUSED",
  "REVOKED",
  "EXPIRED",
]);

export type RuleStatus = z.infer<typeof ruleStatusSchema>;

// ── Execution status ──
export const executionStatusSchema = z.enum([
  "SIMULATED",
  "SUBMITTED",
  "CONFIRMED",
  "FAILED",
  "SKIPPED",
]);

export type ExecutionStatus = z.infer<typeof executionStatusSchema>;

// ── Full rule row (matches DB shape) ──
export interface Rule {
  id: string;
  userId: string;
  accountId: string;
  template: "TAKE_PROFIT" | "DCA";
  params: TakeProfitParams | DcaParams;
  status: RuleStatus;
  sessionKeyAddress: string | null;
  permissionBlob: string | null;
  maxTotalUsd: number;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

// ── Execution row ──
export interface Execution {
  id: string;
  ruleId: string;
  status: ExecutionStatus;
  triggerPrice: number | null;
  amountIn: string | null;
  amountOut: string | null;
  useropHash: string | null;
  txHash: string | null;
  reason: string | null;
  createdAt: string;
}
