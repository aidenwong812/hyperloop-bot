import { PublicKey } from '@solana/web3.js';

export const RayLiqPoolv4 = new PublicKey(
  '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8',
);

export const OpenbookProgram = new PublicKey(
  'srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX',
);

export const waitingTime = 20 * 60 * 1000; // 20 Minutes

export const MainPackages: { [key: string]: { name: string; price: number } } =
  {
    starter: { name: 'Starter Boost ↗️ 9 SOL', price: 9 },
    growth: { name: 'Growth Accelerator 📈 18 SOL', price: 18 },
    dominance: { name: 'Alpha Dominance 🔥 30 SOL', price: 30 },
    pioneer: { name: 'Ecosystem Pioneer 🚀 60 SOL', price: 60 },
  };

export const MicroPackages: { [key: string]: { name: string; price: number } } =
  {
    A: { name: 'MicroBot A 🟪 1 SOL', price: 1 },
    B: { name: 'MicroBot B 🟩 1.2 SOL', price: 1.2 },
    C: { name: 'MicroBot C 🟧 1.5 SOL', price: 1.5 },
    D: { name: 'MicroBot D 🟨 2 SOL', price: 2 },
    E: { name: 'MicroBot E 🟥 2.5 SOL', price: 2.5 },
    F: { name: 'MicroBot F 🟦 3 SOL', price: 3 },
  };
