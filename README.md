# THE WORLD — 19 November 2026 in One Image

[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/mamamuda-wikwik/news-image-19-nov/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/mamamuda-wikwik/news-image-19-nov/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

## What this is

A broadsheet newspaper front page called **THE WORLD**, drawn as a single
1024×1024 image. One day of world news — Thursday, 19 November 2026 —
squeezed onto one page, the way a paper front page used to do it: a big
lead story, four more stories in a grid, and a ticker of the day's other
news running along the bottom. Black ink on newsprint white, nothing else.

## The day in the headlines

The day belonged to Shenzhen. For the first time ever, the presidents of
the United States, China and Russia — Donald Trump, Xi Jinping and
Vladimir Putin — sat down together at one table, on the sidelines of the
APEC summit, with nuclear arms, the wars in Ukraine and Iran, trade and
artificial intelligence all on the agenda. Nobody expected a breakthrough,
but three nuclear powers in a single room was the story in itself.

Elsewhere the world kept moving. In The Hague, the International Court of
Justice ruled on Gambia's case accusing Myanmar of genocide against the
Rohingya. In Ukraine, the Crimea bridge was hit for a third time in a
week, traffic suspended, while the diplomats talked. In Antalya, COP31
ministers worked through the night trying to unblock a final climate deal.
And in New York, the AI company Anthropic priced its Nasdaq debut at $83
a share — above its range, the biggest listing of its kind.

The ticker carries the rest: unrest in Bangladesh, where the ancestral
home of Muhammad Yunus was torched; Britain sending Ukraine 1,000
long-range drones; the IAEA reporting wider uranium enrichment in North
Korea; a Van Gogh selling for $190.4 million, a record for the artist;
Cyclone Akvan driving 100,000 people from their homes in Odisha; world
inflation at 4.7%, according to the IMF; and, on a lighter note, GTA VI
arriving on the day.

Every headline was checked against several news sources reporting the
same day, so the page reflects what the day actually contained — not a
single outlet's version of it. The image itself was drawn
programmatically, letter by letter, in a black-and-white newsprint style.

## How to run it

Requires Node.js (no packages, no network — standard library only).

```sh
node main.ts ./out
```

The program checks `entry.png` first: it must be a genuine PNG with a
13-byte IHDR chunk, an IEND trailer, exactly 1024×1024 pixels, and no
more than 1 MiB. If anything fails, it prints an error, exits with a
non-zero code, and copies nothing. On success it copies the image to
`./out/entry.png` and prints a one-line summary with the dimensions and
byte size.

## Files

- `entry.png` — the front page itself, 1024×1024.
- `main.ts` — the validator and copier (Node.js, standard library only).
- `README.md` — this file.
- `LICENSE` — MIT license.

## Referral

Referral code `tdgxqn9n` is tied to this entry.
