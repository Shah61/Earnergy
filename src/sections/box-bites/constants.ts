export const VIDEO_SRC = '/animation7.mp4'
/**
 * Same intro as an animated WebP, already sped up to VIDEO_PLAYBACK_RATE and
 * set to play once. Images sit outside the media autoplay policy, so this is
 * the stand-in for devices that refuse to autoplay video (iOS Low Power Mode).
 * Only fetched when that actually happens.
 */
export const FALLBACK_ANIM_SRC = '/animation7-anim.webp'
/** Measured length of FALLBACK_ANIM_SRC (161 frames @ 24fps). */
export const FALLBACK_ANIM_MS = 6707
export const BACKGROUND_SRC = '/background2.webp'
export const BGMID_SRC = '/Image.webp'
export const TRANSITION_SRC = '/transition.mp4'

export const VIDEO_WIDTH = 1920
export const VIDEO_HEIGHT = 1080
export const VIDEO_PLAYBACK_RATE = 1.2

/** Last-frame still — same dimensions as the video */
export const BGMID_WIDTH = VIDEO_WIDTH
export const BGMID_HEIGHT = VIDEO_HEIGHT

export const ASSETS = {
  nodeProduct: '/box-bites/nodeProduct.webp',
  nodeOat: '/box-bites/nodeOat.webp',
  nodeChoc: '/box-bites/nodeChoc.webp',
  nodeHoodia: '/box-bites/nodeHoodia.webp',
  pouch: '/box-bites/pouchImg.webp',
} as const
