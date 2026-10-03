// Runtime media URLs must respect the deployment subdirectory (GitHub Pages).
export function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
