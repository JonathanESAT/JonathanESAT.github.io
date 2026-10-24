// Hero contour map: 3D value noise (x, y, time) -> heightfield -> marching squares iso-lines.
// It drifts slowly; with reduced motion it draws one still frame.
(() => {
  const canvas = document.getElementById('terrain');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- value noise ---
  const perm = new Uint8Array(512);
  {
    const p = Array.from({ length: 256 }, (_, i) => i);
    let seed = 1337;
    for (let i = 255; i > 0; i--) {
      seed = (seed * 16807) % 2147483647;
      const j = seed % (i + 1);
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  }
  const fade = t => t * t * (3 - 2 * t);
  const lerp = (a, b, t) => a + (b - a) * t;
  const hash = (x, y, z) => perm[(perm[(perm[x & 255] + y) & 255] + z) & 255] / 255;

  function noise(x, y, z) {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const xf = fade(x - xi), yf = fade(y - yi), zf = fade(z - zi);
    const c = (dx, dy, dz) => hash(xi + dx, yi + dy, zi + dz);
    return lerp(
      lerp(lerp(c(0,0,0), c(1,0,0), xf), lerp(c(0,1,0), c(1,1,0), xf), yf),
      lerp(lerp(c(0,0,1), c(1,0,1), xf), lerp(c(0,1,1), c(1,1,1), xf), yf),
      zf);
  }
  function fbm(x, y, z) {
    let sum = 0, amp = 0.5, freq = 1;
    for (let o = 0; o < 4; o++) {
      sum += amp * noise(x * freq, y * freq, z);
      amp *= 0.5; freq *= 2.03;
    }
    return sum / 0.9375;
  }

  // --- grid + contours ---
  const CELL = 9;           // px per sample
  const LEVELS = 11;
  let cols, rows, field, dpr, w, h;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / CELL) + 1;
    rows = Math.ceil(h / CELL) + 1;
    field = new Float32Array(cols * rows);
  }

  function sample(t) {
    const s = 0.0042;
    for (let j = 0; j < rows; j++)
      for (let i = 0; i < cols; i++)
        field[j * cols + i] = fbm(i * CELL * s, j * CELL * s, t);
  }

  function draw(t) {
    sample(t);
    ctx.clearRect(0, 0, w, h);
    for (let l = 1; l < LEVELS; l++) {
      const iso = 0.22 + (l / LEVELS) * 0.62;
      const major = l % 5 === 0;
      ctx.strokeStyle = major ? 'rgba(230,189,120,0.55)' : 'rgba(127,196,182,0.32)';
      ctx.lineWidth = major ? 1.4 : 0.9;
      ctx.beginPath();
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = field[j * cols + i], b = field[j * cols + i + 1];
          const c = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
          const idx = (a > iso) | ((b > iso) << 1) | ((c > iso) << 2) | ((d > iso) << 3);
          if (idx === 0 || idx === 15) continue;
          const x = i * CELL, y = j * CELL;
          const top = [x + CELL * (iso - a) / (b - a), y];
          const right = [x + CELL, y + CELL * (iso - b) / (c - b)];
          const bottom = [x + CELL * (iso - d) / (c - d), y + CELL];
          const left = [x, y + CELL * (iso - a) / (d - a)];
          const seg = (p, q) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
          switch (idx) {
            case 1: case 14: seg(left, top); break;
            case 2: case 13: seg(top, right); break;
            case 3: case 12: seg(left, right); break;
            case 4: case 11: seg(right, bottom); break;
            case 6: case 9:  seg(top, bottom); break;
            case 7: case 8:  seg(left, bottom); break;
            case 5:  seg(left, top); seg(right, bottom); break;
            case 10: seg(top, right); seg(left, bottom); break;
          }
        }
      }
      ctx.stroke();
    }
  }

  resize();
  window.addEventListener('resize', () => { resize(); if (still) draw(0.5); });

  if (still) { draw(0.5); return; }

  let last = 0, visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);
  function frame(now) {
    if (visible && now - last > 50) {   // ~20 fps is plenty for a slow drift
      draw(now * 0.00004);
      last = now;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// Featured video: builds the YouTube embed only when an ID is set in data-youtube.
document.querySelectorAll('.video[data-youtube]').forEach(box => {
  const id = box.dataset.youtube.trim();
  if (!id) return;
  const f = document.createElement('iframe');
  f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0`;
  f.title = box.dataset.title || 'Project video';
  f.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen';
  f.loading = 'lazy';
  box.innerHTML = '';
  box.appendChild(f);
});
