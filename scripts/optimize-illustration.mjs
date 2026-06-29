/**
 * Optimizes an editorial illustration in `public/illustrations/*` for commit.
 * Re-encodes a high-quality source (the designer's PNG master) into a small
 * lossy web asset that `next/image` then re-encodes (WebP, or JPEG for clients
 * that don't accept WebP) at delivery. Defaults are tuned for the
 * engraved-on-bone illustration family (DEC-066): lossy WebP, flattened onto
 * the bone page background (so next/image's JPEG fallback never turns the
 * feathered vignette black), sRGB kept.
 *
 * Writes a sibling file; never overwrites the input. Reports before/after size
 * and exits non-zero when the output is over budget, so it can gate a hook/CI.
 *
 *   node scripts/optimize-illustration.mjs public/illustrations/hero-campfire.png
 *   node scripts/optimize-illustration.mjs <input> [--format webp|avif|png]
 *     [--quality 75] [--alpha-quality 80] [--effort 6] [--max-edge 0]
 *     [--background "#f7f2e8"|none] [--out <path>] [--max-bytes 500000] [--dry-run]
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";
import { parse as parsePath, join, relative } from "node:path";

const EXT = { webp: ".webp", avif: ".avif", png: ".png" };

function parseArgs(argv) {
  const opts = {
    input: null,
    out: null,
    format: "webp",
    // Color in the engraved illustration family is grain-limited — WebP color
    // PSNR is flat above ~q72, so 75 captures the effective color quality
    // without spending bytes that don't change the look. See DEC-066.
    quality: 75,
    // Only used when --background none keeps the alpha channel.
    alphaQuality: 80,
    effort: 6,
    maxEdge: 0, // 0 = no resize; never upscale a smaller source
    // Composite onto the bone page background and drop alpha by default. The
    // site is single-theme (always bone), and a transparent source makes
    // next/image's JPEG fallback (non-WebP clients / opening the image
    // directly) flatten the feathered vignette onto BLACK. Baking the bone bg
    // in is identical on the page and correct in every format. `--background
    // none` keeps the alpha channel. See DEC-066.
    background: "#f7f2e8",
    maxBytes: 500_000, // <500 KB budget (DEC-066 / ASSET-REQUIREMENTS)
    dryRun: false,
  };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case "--out":
        opts.out = argv[++i];
        break;
      case "--format":
        opts.format = argv[++i];
        break;
      case "--quality":
        opts.quality = Number(argv[++i]);
        break;
      case "--alpha-quality":
        opts.alphaQuality = Number(argv[++i]);
        break;
      case "--effort":
        opts.effort = Number(argv[++i]);
        break;
      case "--max-edge":
        opts.maxEdge = Number(argv[++i]);
        break;
      case "--background":
        opts.background = argv[++i];
        break;
      case "--max-bytes":
        opts.maxBytes = Number(argv[++i]);
        break;
      case "--dry-run":
        opts.dryRun = true;
        break;
      default:
        if (a.startsWith("--")) throw new Error(`unknown option: ${a}`);
        positional.push(a);
    }
  }
  opts.input = positional[0] ?? null;
  return opts;
}

function fmtBytes(n) {
  return `${n.toLocaleString("en-US")} B`;
}

function defaultOut(input, format) {
  const { dir, name } = parsePath(input);
  return join(dir, name + EXT[format]);
}

const fmtBytesShort = (n) => `${(n / 1_000_000).toFixed(2)} MB`;

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (!opts.input) {
    throw new Error(
      "usage: node scripts/optimize-illustration.mjs <input> [--format webp|avif|png] [--quality n] [--background hex|none] [--max-edge px] [--out path] [--dry-run]",
    );
  }
  if (!EXT[opts.format]) {
    throw new Error(
      `unknown --format "${opts.format}" (use webp | avif | png)`,
    );
  }

  const flatten = opts.background && opts.background !== "none";

  const inMeta = await sharp(opts.input).metadata(); // throws if input is unreadable
  const inSize = (await stat(opts.input)).size;
  const out = opts.out ?? defaultOut(opts.input, opts.format);

  if (relative(opts.input, out) === "") {
    throw new Error(
      `refusing to overwrite the input (${opts.input}). Pass an explicit --out to write in place.`,
    );
  }

  const longest = Math.max(inMeta.width, inMeta.height);
  const willResize = opts.maxEdge > 0 && longest > opts.maxEdge;

  if (opts.dryRun) {
    console.log(`\n=== optimize-illustration (dry run) ===`);
    console.log(
      `input : ${opts.input}   ${fmtBytes(inSize)}   ${inMeta.width}×${inMeta.height}   ${inMeta.format}${inMeta.hasAlpha ? " RGBA" : ""}`,
    );
    console.log(
      `plan  : → ${out}   ${opts.format} (q${opts.quality}${opts.format !== "png" && !flatten ? ` a${opts.alphaQuality}` : ""} e${opts.effort})` +
        `   ${flatten ? `flatten onto ${opts.background}` : "keep alpha"}` +
        (willResize ? `   resize longest edge → ${opts.maxEdge}px` : ``),
    );
    console.log(`budget: ${Math.round(opts.maxBytes / 1000)} KB`);
    return 0;
  }

  // keepIccProfile retains the sRGB profile while dropping EXIF/other metadata
  // (smaller files); libvips assumes sRGB if no profile is present.
  let pipeline = sharp(opts.input, { failOn: "error" }).keepIccProfile();

  if (willResize) {
    const dim =
      inMeta.width >= inMeta.height
        ? { width: opts.maxEdge }
        : { height: opts.maxEdge };
    pipeline = pipeline.resize({
      ...dim,
      withoutEnlargement: true,
      kernel: "lanczos3",
    });
  }

  // Flatten onto the page background unless explicitly disabled. A transparent
  // source becomes black in next/image's JPEG fallback (DEC-066); compositing
  // onto bone is identical on the always-bone page and correct in every format.
  if (flatten) {
    pipeline = pipeline.flatten({ background: opts.background });
  }

  if (opts.format === "webp") {
    // Lossy WebP. alphaQuality only bites when --background none keeps alpha;
    // by default the image is already flattened opaque onto bone.
    pipeline = pipeline.webp({
      quality: opts.quality,
      alphaQuality: opts.alphaQuality,
      effort: opts.effort,
      smartSubsample: true,
    });
  } else if (opts.format === "avif") {
    pipeline = pipeline.avif({
      quality: opts.quality,
      effort: Math.min(opts.effort, 6),
      chromaSubsampling: "4:2:0",
    });
  } else {
    // PNG fallback — palette quantization. Documented as banding-prone for
    // high-entropy illustrations; provided only for the fallback ladder.
    pipeline = pipeline.png({
      palette: true,
      quality: opts.quality,
      effort: 10,
      dither: 1.0,
      compressionLevel: 9,
    });
  }

  await pipeline.toFile(out);

  const outSize = (await stat(out)).size;
  const outMeta = await sharp(out).metadata();
  const change = ((outSize - inSize) / inSize) * 100;
  const over = outSize > opts.maxBytes;

  console.log(`\n=== optimize-illustration ===`);
  console.log(
    `input : ${opts.input}   ${fmtBytes(inSize)}   ${inMeta.width}×${inMeta.height}   ${inMeta.format}${inMeta.hasAlpha ? " RGBA" : ""}`,
  );
  console.log(
    `output: ${out}   ${fmtBytes(outSize)}   ${outMeta.width}×${outMeta.height}   ${opts.format} (q${opts.quality} e${opts.effort})   ${outMeta.hasAlpha ? "+alpha" : `opaque/${opts.background}`}`,
  );
  console.log(
    `change: ${change.toFixed(1)}%   (${fmtBytesShort(inSize - outSize)} saved)`,
  );
  if (over) {
    console.log(
      `budget: ${Math.round(opts.maxBytes / 1000)} KB → OVER by ${fmtBytes(outSize - opts.maxBytes)} — lower --quality or set --max-edge`,
    );
    return 1;
  }
  console.log(
    `budget: ${Math.round(opts.maxBytes / 1000)} KB → OK   (${fmtBytes(opts.maxBytes - outSize)} under)`,
  );
  return 0;
}

const code = await main().catch((err) => {
  console.error(`optimize-illustration: ${err.message}`);
  return 1;
});
process.exit(code);
