// Runs after `vite build`.
// GitHub Pages only serves real files, so every route needs its own index.html
// (with its own preview tags for LinkedIn and other sites). 404.html catches the rest.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const SITE = 'https://jonathanesat.github.io'
const base = readFileSync('dist/index.html', 'utf8')

const pages = [
  {
    path: 'projects/terrain',
    title: 'Procedural terrain — Jonathan Peris Beltrán',
    description: 'Endless procedural terrain with seamless chunk streaming. C++, OpenGL, GLSL.',
  },
]

const withMeta = (html, { path, title, description }) =>
  html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${title}"`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${description}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${description}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${SITE}/${path}"`)

writeFileSync('dist/404.html', base)
for (const page of pages) {
  mkdirSync(`dist/${page.path}`, { recursive: true })
  writeFileSync(`dist/${page.path}/index.html`, withMeta(base, page))
}
console.log(`postbuild: 404.html + ${pages.length} page(s)`)
