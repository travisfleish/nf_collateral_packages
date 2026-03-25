/**
 * PDF (first page) → PNG → 1500×2100 → AVIF. Uses macOS `sips`.
 * Used to rebuild hero AVIFs when originals are missing from git.
 * Normalizes the lighter navy “rectangle” to the main artboard (see `avif-rect-to-bg.mjs`).
 */
import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { replaceRectangleWithBackground } from './avif-rect-to-bg.mjs';

const W = 1500;
const H = 2100;

async function pdfToAvif(pdfPath, outAvif) {
  const dir = mkdtempSync(join(tmpdir(), 'avif-'));
  const png1 = join(dir, 'a.png');
  const png2 = join(dir, 'b.png');
  try {
    execFileSync('sips', ['-s', 'format', 'png', pdfPath, '--out', png1], { stdio: 'pipe' });
    execFileSync('sips', ['-z', String(H), String(W), png1, '--out', png2], { stdio: 'pipe' });
    const buf = readFileSync(png2);
    const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    replaceRectangleWithBackground(data, info.channels);
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels,
      },
    })
      .avif({ quality: 75, effort: 4 })
      .toFile(outAvif);
  } finally {
    try {
      rmSync(dir, { recursive: true });
    } catch {
      /* ignore */
    }
  }
}

// Top-level await
const mapping = [
  ['public/pdfs/BarTableTopper_WorldCup_5x7.pdf', 'public/pdfs/world-cup.avif'],
  ['public/pdfs/BarTableTopper_Football_5x7.pdf', 'public/pdfs/football.avif'],
  ['public/pdfs/BarTableTopper_Basketball_5x7.pdf', 'public/pdfs/basketball.avif'],
  ['public/pdfs/BarTableTopper_Soccer_5x7.pdf', 'public/pdfs/soccer.avif'],
  ['public/pdfs/BarTableTopper_Augmentation_5x7.pdf', 'public/pdfs/augmentation.avif'],
];

const root = process.cwd();
for (const [pdf, out] of mapping) {
  await pdfToAvif(join(root, pdf), join(root, out));
  console.log('wrote', out);
}

