import { defineChain } from "viem";

export const robinhoodTestnet = defineChain({
  id: 46630,
  name: "Robinhood Chain Testnet",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        process.env.NEXT_PUBLIC_RPC_URL ??
          "https://rpc.testnet.chain.robinhood.com",
      ],
    },
    alchemy: {
      http: [
        `https://robinhood-testnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY ?? ""}`,
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.testnet.chain.robinhood.com",
    },
  },
  testnet: true,
});

export const robinhoodMainnet = defineChain({
  id: 4663,
  name: "Robinhood Chain",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.chain.robinhood.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.chain.robinhood.com",
    },
  },
});

// ── Verified contract addresses ──

export const TESTNET_CONTRACTS = {
  usdg: "0x7E955252E15c84f5768B83c41a71F9eba181802F" as const,
  
  // EntryPoints
  entryPointV06: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789" as const,
  entryPointV07: "0x0000000071727De22E5E9d8BAf0edAc6f37da032" as const,
  entryPointV08: "0x4337084D9E255Ff0702461CF8895CE9E3b5Ff108" as const,

  // Safe modules
  safeModuleSetup: "0x2dd68b007B46fBe91B9A7c3EDa5A7a1063cB5b47" as const,
  safe4337Module: "0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226" as const,

  // Chainlink
  linkToken: "0xD610B8f58689de7755947C05342A2DFaC30ebD57" as const,

  // Uniswap (mainnet addresses — need testnet verification)
  permit2: "0x000000000022D473030F116dDEE9F6B43aC78BA3" as const,

  // Mock contracts (deployed by us — addresses TBD)
  mocks: {
    mockToken: "" as `0x${string}`,
    mockOracle: "" as `0x${string}`,
    mockDex: "" as `0x${string}`,
  },
} as const;

export const MAINNET_CONTRACTS = {
  usdg: "0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168" as const,
  weth: "0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73" as const,
  swapRouter02: "0xcaf681a66d020601342297493863e78c959e5cb2" as const,
  uniswapV3Factory: "0x1f7d7550b1b028f7571e69a784071f0205fd2efa" as const,
  quoterV2: "0x33e885ed0ec9bf04ecfb19341582aadcb4c8a9e7" as const,
  universalRouter: "0x8876789976decbfcbbbe364623c63652db8c0904" as const,
  morphoSteakhouseVault: "0xbEeFF0fb1Dc19344A87b8479dAb60A2e16160737" as const,
} as const;
