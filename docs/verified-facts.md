# Verified Facts — Robinhood Chain

> Last updated: 2026-11-18 (Day 1 verification spike)

## Network Configuration

| Item | Value | Status |
|------|-------|--------|
| Testnet Chain ID | `46630` (Hex: `0xb626`) | ✅ CONFIRMED |
| Mainnet Chain ID | `4663` (Hex: `0x1237`) | ✅ CONFIRMED |
| Testnet RPC | `https://rpc.testnet.chain.robinhood.com` | ✅ CONFIRMED |
| Alchemy RPC | `https://robinhood-testnet.g.alchemy.com/v2/<KEY>` | ✅ CONFIRMED |
| Testnet Explorer | `https://explorer.testnet.chain.robinhood.com` | ✅ CONFIRMED |
| Testnet Faucet | `https://faucet.testnet.chain.robinhood.com` | ✅ CONFIRMED |
| Gas Token | ETH | ✅ CONFIRMED |
| WebSocket Feed | `wss://feed.testnet.chain.robinhood.com` | ✅ CONFIRMED |

**Chain type:** Arbitrum Orbit L2, Arbitrum Nitro with Ethereum blobs for DA.

## Account Abstraction

| Item | Address | Status |
|------|---------|--------|
| ERC-4337 | Supported | ✅ CONFIRMED |
| EIP-7702 | Supported (EOA delegation) | ✅ CONFIRMED |
| EntryPoint v0.6 | `0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789` | ✅ CONFIRMED |
| EntryPoint v0.7 | `0x0000000071727De22E5E9d8BAf0edAc6f37da032` | ✅ CONFIRMED |
| EntryPoint v0.8 | `0x4337084D9E255Ff0702461CF8895CE9E3b5Ff108` | ✅ CONFIRMED |
| Safe Module Setup v0.3.0 | `0x2dd68b007B46fBe91B9A7c3EDa5A7a1063cB5b47` | ✅ CONFIRMED |
| Safe 4337 Module v0.3.0 | `0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226` | ✅ CONFIRMED |

**ZeroDev:** ✅ Supports chain 46630 (testnet) and 4663 (mainnet). Session keys, gas sponsorship, modular accounts.

**Decision: Use ZeroDev Kernel** — ZeroDev supports the chain and provides session keys + permissions out of the box. No need for Safe/permissionless fallback.

## USDG Stablecoin

| Item | Value | Status |
|------|-------|--------|
| Issuer | Paxos | ✅ CONFIRMED |
| Decimals | 6 | ✅ CONFIRMED |
| Mainnet address | `0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168` | ✅ CONFIRMED |
| Testnet address | `0x7E955252E15c84f5768B83c41a71F9eba181802F` | ✅ CONFIRMED |

## Stock Tokens

| Item | Status |
|------|--------|
| ERC-20, 18 decimals | ✅ CONFIRMED |
| Chainlink feeds per token (`latestRoundData()`) | ✅ CONFIRMED |
| `uiMultiplier()` per ERC-8056 | ✅ CONFIRMED |
| Feeds auto-factor ERC-8056 multiplier | ✅ CONFIRMED |
| Trading API: `GET https://api.robinhood.com/rhj/assets` | ✅ CONFIRMED |
| Returns `tradingCapabilities`, `deployments[]`, `currentMultiplier` | ✅ CONFIRMED |

## DeFi Protocols

### Uniswap — ✅ Available (v3 + v4 + UniswapX)
| Contract | Address (mainnet) | Testnet |
|----------|-------------------|---------|
| Permit2 | `0x000000000022D473030F116dDEE9F6B43aC78BA3` | Likely same (CREATE2) |
| SwapRouter02 | `0xcaf681a66d020601342297493863e78c959e5cb2` | ⚠️ UNCONFIRMED |
| UniswapV3Factory | `0x1f7d7550b1b028f7571e69a784071f0205fd2efa` | ⚠️ UNCONFIRMED |
| QuoterV2 | `0x33e885ed0ec9bf04ecfb19341582aadcb4c8a9e7` | ⚠️ UNCONFIRMED |
| UniversalRouter | `0x8876789976decbfcbbbe364623c63652db8c0904` | ⚠️ UNCONFIRMED |

> Note: Testnet Uniswap addresses need on-chain verification. If missing, we use MockDex.

### Morpho — ✅ Available (Morpho Blue + MetaMorpho vaults)
- Steakhouse USDG Vault (mainnet): `0xbEeFF0fb1Dc19344A87b8479dAb60A2e16160737`
- Testnet addresses: ⚠️ UNKNOWN

### Chainlink — ✅ Available (Data Feeds, Data Streams, CCIP)
- LINK token (testnet): `0xD610B8f58689de7755947C05342A2DFaC30ebD57`
- Per-asset feed addresses: check data.chain.link for chain 46630

## Core Contracts

| Contract | Address | Network |
|----------|---------|---------|
| WETH | `0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73` | Mainnet |
| ArbSys | `0x0000000000000000000000000000000000000064` | Both |

## UNKNOWN Items (need testnet on-chain verification)

1. Testnet-specific Uniswap addresses (likely same via CREATE2 — verify on-chain)
2. Testnet-specific Morpho addresses
3. Individual Chainlink price feed proxy addresses per asset on testnet
4. Bundler/Paymaster addresses (provisioned dynamically via Alchemy/ZeroDev SDK)

## Architecture Decision

**Smart account stack:** ZeroDev Kernel + ERC-4337 (EntryPoint v0.7)
- ZeroDev supports chain 46630 ✅
- Provides session keys + permissions system ✅
- Alchemy bundler for UserOp submission ✅
- If Uniswap is not on testnet, deploy MockDex/MockToken/MockOracle
