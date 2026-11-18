// ── Contract addresses (will be updated after verification) ──
// These are placeholders. Real addresses go in docs/verified-facts.md
// and are updated here once confirmed.

export const contracts = {
  // Testnet addresses (chain 46630)
  testnet: {
    // USDG stablecoin - VERIFY ADDRESS
    usdg: "0x" as const,

    // DEX router (Uniswap v3 or mock) - VERIFY
    dexRouter: "0x" as const,

    // Chainlink price feeds - VERIFY
    chainlinkFeeds: {} as Record<string, `0x${string}`>,

    // EntryPoint for ERC-4337 - VERIFY VERSION
    entryPoint: "0x" as const,

    // Mock contracts (deployed by us for testnet)
    mocks: {
      mockToken: "0x" as const,
      mockOracle: "0x" as const,
      mockDex: "0x" as const,
    },
  },
} as const;
