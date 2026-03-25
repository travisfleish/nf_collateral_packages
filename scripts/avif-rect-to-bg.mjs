/**
 * In AVIF exports of BarTableTopper PDFs, a lighter navy block (~#0e1c46) sits on the
 * main artboard (~#080f23). After rasterization the block reads as ~rgb(15,28,70) vs
 * ~rgb(8,15,34). Replace within tolerance so the rectangle matches the background.
 */
import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Typical “rectangle” fill after sips + AVIF (see sampling on world-cup.avif). */
const RECT_RGB = { r: 15, g: 28, b: 70 }
/** Main artboard fill to match (sampled from dominant bg pixels). */
const BG_RGB = { r: 8, g: 15, b: 34 }
/** Catches compression / anti-alias around the block without touching teal UI (#94…). */
const TOLERANCE = 22

export function replaceRectangleWithBackground(data, channels) {
  for (let i = 0; i < data.length; i += channels) {
    const d = Math.hypot(
      data[i] - RECT_RGB.r,
      data[i + 1] - RECT_RGB.g,
      data[i + 2] - RECT_RGB.b,
    )
    if (d <= TOLERANCE) {
      data[i] = BG_RGB.r
      data[i + 1] = BG_RGB.g
      data[i + 2] = BG_RGB.b
    }
  }
}

export async function normalizeAvifFile(avifPath) {
  const { data, info } = await sharp(avifPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  replaceRectangleWithBackground(data, info.channels)

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .avif({ quality: 75, effort: 4 })
    .toFile(avifPath)
}

/** Process every `.avif` in `public/pdfs/` (hero rasters). */
export async function normalizeAllPdfsAvifs(root = process.cwd()) {
  const dir = join(root, 'public/pdfs')
  const names = await readdir(dir)
  const avifs = names.filter((n) => n.endsWith('.avif'))
  for (const name of avifs) {
    const path = join(dir, name)
    await normalizeAvifFile(path)
    console.log('normalized', join('public/pdfs', name))
  }
}

const __filename = fileURLToPath(import.meta.url)
const isMain = process.argv[1] && resolve(process.argv[1]) === __filename
if (isMain) {
  await normalizeAllPdfsAvifs()
}
