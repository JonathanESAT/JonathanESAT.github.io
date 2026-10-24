# Portfolio — Jonathan Peris Beltrán

Plantilla estática (HTML + CSS + JS, sin dependencias) para GitHub Pages.

## Estructura

```
index.html             Portada: hero con mapa de contornos, proyecto destacado, más trabajos, ahora, about
projects/terrain.html  Plantilla de case study (cópiala para cada pieza nueva del portfolio)
style.css              Estilos (colores y tipografías arriba, en :root)
script.js              Mapa de contornos del hero + embed automático de vídeos de YouTube
assets/                Aquí van el CV en PDF, vídeos/posters e imágenes
.nojekyll              Evita que GitHub Pages procese el sitio con Jekyll
```

## Publicarlo

1. Crea un repo **público** llamado exactamente `TU-USUARIO.github.io`.
2. Sube todo el contenido de esta carpeta a la raíz del repo.
3. En el repo: Settings → Pages → Source: "Deploy from a branch", rama `main`, carpeta `/ (root)`.
4. En uno o dos minutos estará en `https://TU-USUARIO.github.io`.

## Qué tienes que rellenar

- Email (jonathanperis.dev@gmail.com) y GitHub (JonathanESAT) ya puestos. Si cambias de usuario de GitHub, actualiza el enlace en index.html. LinkedIn: añádelo en `.hero-links` cuando lo tengas.
- Guarda el CV como `assets/Jonathan_Peris_CV.pdf`.
- **Vídeo del terreno:** súbelo a YouTube como *oculto* (unlisted) y pon su ID en `data-youtube=""`
  (en `index.html` y en `projects/terrain.html`). El ID es lo que va después de `v=` en la URL.
  Si prefieres alojarlo tú, en el comentario del HTML tienes la versión con `<video>` (máx. 100 MB por archivo en GitHub).
- En `projects/terrain.html`, sustituye cada recuadro discontinuo (`.placeholder`) por el texto real.

## Código privado

El repo del renderer no puede ser público porque incluye el EDK de ESAT. El botón "Request code access"
abre un email; cuando alguien te lo pida, invítale como colaborador de solo lectura al repo privado.
El fragmento de código del case study debe ser solo tuyo (terreno/shaders), nunca del framework.
