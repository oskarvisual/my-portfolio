/**
 * Utility to resolve video URLs dynamically.
 * 
 * Logic:
 * - If VITE_SPACES_CDN_BASE_URL is set (via GitHub Actions secret or local .env),
 *   it serves the video directly from the DigitalOcean Spaces CDN (Cloudflare Edge with 1-year cache).
 * - If no CDN URL / keys are configured, it seamlessly falls back to the locally bundled MP4 asset.
 */
const rawCdnBase = (import.meta.env.VITE_SPACES_CDN_BASE_URL as string | undefined)?.trim() || '';

export function getCdnVideoUrl(localFallback: string, filename: string): string {
  if (!rawCdnBase) {
    return localFallback;
  }

  const base = rawCdnBase.replace(/\/+$/, '');

  // If the base URL already includes the target destination path
  if (base.endsWith('my-portfolio/videos')) {
    return `${base}/${filename}`;
  }

  // If the base is only origin (e.g. https://bucket.sfo3.cdn.digitaloceanspaces.com)
  return `${base}/my-portfolio/videos/${filename}`;
}
