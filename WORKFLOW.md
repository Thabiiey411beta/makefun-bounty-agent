# make.fun Agent Workflow (extracted + improved)

Lessons folded in from high-performing entries (including KangDan’s bring-the-humans-02 guide) and the official skill.md.

## 0. Before you touch any code

1. Confirm the bounty is still open and you have daily/ total quota left.
2. Read **RULES.txt** inside the kit word-for-word. That document decides acceptance.
3. Read the **scoring section** carefully. Build toward what is measured, not what looks impressive.
4. Check prerequisites (`GET /api/competitions/<slug>/requirements`). If any required item is unmet and you cannot fix it, pick another bounty.

## 1. Account & wallet (one-time / rare)

- Human account: @newton
- Wallet: 9v3sETY2aatENNWHEGi9CwpTgxykEB1jLhaU8SszQ7bk
- Link GitHub on the make.fun profile if still null.
- Kit login (so entries go under the human account):
  ```sh
  node cli/makefun.mjs login --origin https://make.fun
  ```
- Never commit the keypair or API key.

## 2. Create the entry repository

- Public repo under Thabiiey411beta, created **after** the bounty opened.
- Root must contain the required files (main.py / main.ts / index.html / README.md / etc.).
- Add MIT LICENSE immediately.
- Whole repo size limits matter on some bounties (e.g. tiny-chess ≤ 8192 bytes total).

## 3. Session discipline (critical for paid places)

- Start a **fresh** agent session only after the bounty is open.
- First prompt should include:
  - Link to https://make.fun/skill.md
  - The exact scoring / deliverable section from RULES.txt
  - Size or format constraints (e.g. “main.py ≤ 4096 bytes”)
- Let the agent write the code. Heavy pasting of external code weakens the authorship signal.
- Keep the session recorded so `bundle` can find it.

## 4. Build loop

```
kit/                     # from curl -sSL "https://make.fun/c/<slug>/kit" | tar xz
entry-repo/              # your public GitHub repo
```

1. Copy starter/ if the kit provides one.
2. Implement against the real interface (for tiny-chess: MAKEFUN_ENV_URL + /game + /move).
3. Stay inside size / dependency limits.
4. Make the program deterministic (fixed depth/nodes, seeded or no RNG).
5. Commit often with clean messages.

## 5. Pre-submit gate (never skip)

From inside the kit folder:

```sh
# Collect transcripts
node cli/makefun.mjs bundle --repo ../entry-repo --out transcripts.tar.gz

# Local checks — free, catches most rejections
node cli/makefun.mjs check --kit . --repo ../entry-repo --transcripts transcripts.tar.gz

# Optional local grade when the kit supports it
node cli/makefun.mjs grade-local --kit . --bot ../entry-repo --driver docker
```

Only submit after `check` is clean.

## 6. Submit

```sh
node cli/makefun.mjs submit --competition <slug> \
  --repo-url https://github.com/Thabiiey411beta/<repo> \
  --commit <full-sha> \
  --bundle transcripts.tar.gz \
  --keypair ~/.makefun/keypairs/https_make.fun.json
```

Or use the API key path when the kit is already authenticated.

- Daily limits exist (tiny-chess: 5/day, 20 total). A rejected entry still counts.
- Ties go to the **earlier** submission. Do not wait until the last hour.

## 7. After submit

```sh
node cli/makefun.mjs status
node cli/makefun.mjs status --competition <slug>
```

Fix any failed checks and resubmit while quota remains. Latest valid entry is the one that counts unless you explicitly choose an earlier one.

## 8. Claim

When a reward is ready:

```sh
node cli/makefun.mjs claim --claim <id> \
  --keypair ~/.makefun/keypairs/https_make.fun.json --us-person no
```

Claim promptly — windows are limited.

## 9. Common ways beginners lose entries

| Mistake | Why it hurts |
|---------|--------------|
| Session started before bounty opened | Cannot be entered at all |
| No local `check` before submit | Burns a daily slot on a reject |
| Missing LICENSE | Instant refuse |
| Heavy pasted code | Authorship / transcript gate fails |
| Last-hour submit | No time to fix + ties go to earlier entry |
| Building for looks instead of the scoring metric | Low rank even if “impressive” |
| Handed-over transcripts on `handed_over_places: none` | Ranked but $0 |

## 10. tiny-chess-01 specific notes

- `main.py` ≤ 4096 bytes (comments + whitespace + any packed payload count).
- Whole repo ≤ 8192 bytes, no single file > 4096.
- Python 3.13 stdlib only. No other files read/imported at runtime.
- Deterministic search (fixed depth or fixed node budget). No wall-clock search.
- Interface: POST to `$MAKEFUN_ENV_URL/game` and `/move` with UCI moves.
- Practice Elo ≥ 1154 required to reach the final.
- Prize requires beating the sunfish 4 KB baseline.
- Max 5 submissions/day, 20 total.

## 11. Referral side income

Every account has a referral link. Verified human signups and later wins generate extra USDC. Keep your own referral link ready for growth-style bounties, but never put someone else’s code or referral into our entries.
