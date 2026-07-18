export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-20'

// projectId and dataset are public values (they ship to the browser), so we
// keep hardcoded fallbacks here to guarantee the build works even when the
// env vars are not set in the deploy environment. Setting the env vars still
// overrides these (e.g. to point at a different project or dataset).
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'z7hlx5cz'
export const useCdn = false
