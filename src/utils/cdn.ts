/**
 * Utility to resolve media (video & image) URLs dynamically.
 * 
 * Logic:
 * - If VITE_SPACES_CDN_BASE_URL is set (via GitHub Actions secret or local .env),
 *   it serves media directly from the DigitalOcean Spaces CDN (Cloudflare Edge with 1-year cache).
 * - If no CDN URL / keys are configured, it seamlessly falls back to the locally bundled asset.
 */
const rawCdnBase = (import.meta.env.VITE_SPACES_CDN_BASE_URL as string | undefined)?.trim() || '';

function getRootCdn(): string {
  if (!rawCdnBase) return '';
  return rawCdnBase.replace(/\/+$/, '').replace(/\/my-portfolio(\/(videos|images))?$/, '');
}

export function getCdnVideoUrl(localFallback: string, filename: string): string {
  const root = getRootCdn();
  if (!root) return localFallback;
  return `${root}/my-portfolio/videos/${filename}`;
}

export function getCdnImageUrl(localFallback: string, filename: string): string {
  const root = getRootCdn();
  if (!root) return localFallback;
  return `${root}/my-portfolio/images/${filename}`;
}
