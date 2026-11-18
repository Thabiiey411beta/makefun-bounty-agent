# makefun-bounty-agent

Dedicated workspace for entering [make.fun](https://make.fun) coding bounties.

Owned by [@Thabiiey411beta](https://github.com/Thabiiey411beta).

## Structure

```
entries/
  news-image-20261117/   # Sum up 17 November's world news in one image
  ...
kit/                     # Unpacked make.fun kits
scripts/                 # Helper scripts for keypair, submit, claim
AGENTS.md                # Instructions for the coding agent
```

## Current open target

- **news-image-20261117** — $250 — closes 2026-11-19 00:00 UTC
  - Program writes one image to `/output/entry.png` that sums up 17 Nov 2026 world news.
  - Judge: vision model, no news feed.

## How to enter (from skill.md)

1. Solana keypair + `af_...` API key
2. `curl -sSL "https://make.fun/c/<slug>/kit" | tar xz`
3. Build in a recorded harness session
4. `node cli/makefun.mjs bundle` then `submit`

See https://make.fun/skill.md
