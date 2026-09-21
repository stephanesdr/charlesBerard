# PP Neue Montreal

Place licensed files here, then switch `src/app/layout.tsx` to `next/font/local`:

- `PPNeueMontreal-Regular.woff2` (or Book)
- `PPNeueMontreal-Bold.woff2` (or Medium)

Until those files exist, the CSS stack is `"PP Neue Montreal", Inter Tight`: machines with the desktop font installed (FontBase) render PP Neue Montreal, everyone else gets Inter Tight.

Do not put the `.otf` desktop files in this folder: the desktop licence does not cover web embedding — use the webfont (`.woff2`) files from the Pangram Pangram web licence.

Note: avoid a family named plain `"Neue Montreal"` in the stack — on this Mac that name resolves to an italic-only local family.
