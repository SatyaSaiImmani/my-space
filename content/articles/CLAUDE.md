# content/articles/

Raw markdown source for the Articles section. Not served directly — read at build/request time via `fs/promises` by `lib/articles.ts` (see `getArticleContent`), then rendered through `components/MarkdownContent.tsx`.

Files here are plain markdown bodies with **no frontmatter** — title, short description, and posted date live in the metadata array in `lib/articles.ts`, keyed by `id`/`filename`. To add a new article: drop a `.md` file here, then add a matching entry to `lib/articles.ts`.

## Files

### `centos-dual-boot-windows.md`
Write-up on PXE-booting a CentOS Stream 10 installer from a MacBook to build a portable dual-boot workstation on an external SSD. Moved here from `public/` — it was previously an undocumented loose asset.
