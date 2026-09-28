// TODO(real): înlocuiește cu fotografii proprii ale clientului (optimizate local, AVIF/WebP).
export const unsplash = (id: string, w = 1200, h?: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=75`;
