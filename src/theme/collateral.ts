/**
 * Single source for UI shell + react-pdf `canvasBackground` / Page wrapper.
 * Must be one string everywhere or you get visible seams.
 *
 * Matches the full-artboard `<rect width="360" height="504">` fill in the BarTableTopper
 * SVGs (`#000c37`). Legacy PDFs may differ slightly inside the page; canvasBackground
 * still aligns the letterboxing to this surface.
 */
export const PDF_PAGE_BACKGROUND = '#000c37'
