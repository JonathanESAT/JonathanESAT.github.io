# Portfolio — Jonathan Peris Beltrán

React + Vite. Se despliega solo en GitHub Pages con cada `git push` a `main`.

## Editar el contenido

Todo el texto está en `src/data/site.js`: perfil, proyecto destacado, más trabajos, lo que estás haciendo ahora y el "about". Los componentes solo lo maquetan.

| Archivo | Qué es |
| --- | --- |
| `src/data/site.js` | Todo el contenido |
| `src/pages/Home.jsx` | Portada |
| `src/pages/Terrain.jsx` | Case study del terreno |
| `src/components/ContourField.jsx` | Mapa de curvas de nivel del hero |
| `src/styles.css` | Estilos (colores y tipografía arriba, en `:root`) |
| `public/assets/` | Vídeo y portada del vídeo |
| `public/Jonathan_Peris_CV.pdf` | Tu CV (añádelo tú) |

Para un case study nuevo: copia `Terrain.jsx`, cambia el contenido y añade su ruta en `src/App.jsx`.

## Trabajar en local

```
npm install
npm run dev
```

Abre la dirección que te da (normalmente http://localhost:5173).

## Publicar

Una sola vez: en el repo de GitHub, Settings → Pages → Source: **GitHub Actions**.

Después, cada `git push` a `main` construye y publica la web (pestaña Actions del repo).
