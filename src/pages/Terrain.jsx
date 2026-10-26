import { Link } from 'react-router-dom'
import { Video } from '../components/Layout.jsx'
import { featured, codeAccessMail, codeAccessNote } from '../data/site.js'

const normalsCode = `// Normal from the slope of the noise, not from the mesh,
// so neighbouring chunks agree on every shared edge.
float h_l = sn.fractal(octaves_, world_x - eps, world_z) * height_mult_;
float h_r = sn.fractal(octaves_, world_x + eps, world_z) * height_mult_;
float h_u = sn.fractal(octaves_, world_x, world_z - eps) * height_mult_;
float h_d = sn.fractal(octaves_, world_x, world_z + eps) * height_mult_;

float dh_dx = (h_r - h_l) / (2.0f * eps);
float dh_dz = (h_d - h_u) / (2.0f * eps);

ML::Vec3 n(-dh_dx, 1.0f, -dh_dz);
n = ML::Vec3Normalize(n);`

export default function Terrain() {
  return (
    <main className="case">
      <p className="back"><Link to="/#work">Back to all work</Link></p>

      <header className="case-head">
        <h1>Procedural terrain</h1>
        <p className="meta">C++, OpenGL, GLSL. My part of a three-person renderer, 2025/26.</p>
        <p className="lead">Endless terrain generated on the fly from layered Simplex noise, streamed in chunks around the player's boat and lit by my own shaders.</p>
      </header>

      <figure className="case-figure">
        <Video src={featured.video} poster={featured.poster} title="Procedural terrain demo" />
        <figcaption>Sailing through the terrain, then a wireframe view of the chunk grid.</figcaption>
      </figure>

      <div className="case-body">
        <h2>What I built</h2>
        <p>Everything on this page is mine: the heightmap generation, the chunk mesh, the chunk grid that makes the world endless, and the terrain shader. I also hooked the grid into the main loop so it follows the boat each frame. My two teammates built the rest of the scene around it.</p>

        <h2>How it works</h2>
        <p><strong>Height.</strong> Each vertex samples fractal Simplex noise at its world position: 4 octaves, base frequency 0.02, each octave doubling the frequency and halving the amplitude, scaled by 7 units. Because the input is the world position rather than the chunk-local one, any chunk generated anywhere lands on the same continuous landscape.</p>
        <p><strong>Mesh.</strong> A chunk is a 64 × 64 grid of cells, 100 units per side. The index buffer depends only on the grid size, so it is built and uploaded once. When a chunk moves, only its vertex buffer is recomputed and re-uploaded into the same GPU buffer, with no reallocation.</p>
        <p><strong>Normals.</strong> Instead of averaging triangle normals from the mesh, I take the slope of the noise function itself with central differences. A vertex on a chunk's edge gets the same normal as its twin in the next chunk, so lighting has no visible seam.</p>
        <pre><code>{normalsCode}</code></pre>
        <p><strong>Endless world.</strong> A 4 × 4 grid of chunks follows the boat and keeps it in the two central slots. When the boat crosses into a new chunk, the row or column left behind moves to the front and is regenerated in place. Only those 4 chunks are rebuilt; the other 12 stay untouched.</p>
        <p><strong>Shading.</strong> The fragment shader picks a colour from the world height and blends between water, sand, grass, forest, rock and snow with smoothstep, then applies Blinn-Phong lighting from up to 32 directional and spot lights.</p>

        <h2>Problem I had to solve</h2>
        <p>Seams between chunks were the hardest part, and they showed up in two ways.</p>
        <p><strong>Cracks in the geometry.</strong> Neighbouring chunks compute their shared edge separately, so any difference opens a gap you can see the sky through. Each chunk now caches its border heights, and new chunks copy their west and north edges from neighbours that already exist. That forced a build order, north to south and west to east.</p>
        <p><strong>Lines in the lighting.</strong> Even with matching heights, normals averaged from each chunk's own triangles disagree at the border, because each side only sees half the slope. Taking the normal from the noise function gives both sides the same answer.</p>

        <h2>Numbers</h2>
        <ul className="facts">
          <li>4,225 vertices and 8,192 triangles per chunk</li>
          <li>16 chunks visible: 400 × 400 world units, about 131,000 triangles</li>
          <li>4 chunks rebuilt when the boat crosses a chunk border</li>
          <li>About 60 FPS (15.8 ms per frame) on an RTX 2070 Super with the full scene</li>
        </ul>

        <h2>What I'd do next</h2>
        <ul className="facts">
          <li>Rebuild recycled chunks on a worker thread, so crossing a border never costs a frame.</li>
          <li>Lower-detail meshes for distant chunks, so the grid can grow well past 4 × 4.</li>
          <li>Move height sampling into the vertex shader and keep one flat grid mesh on the GPU.</li>
        </ul>

        <p className="actions">
          <a className="button" href={codeAccessMail('terrain renderer')}>Request code access</a>
        </p>
        <p className="note">{codeAccessNote}</p>
      </div>
    </main>
  )
}
