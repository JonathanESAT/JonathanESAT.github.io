// Everything the site says lives here. Edit this file to update the portfolio;
// the components only lay it out.

export const profile = {
  name: 'Jonathan Peris Beltrán',
  role: 'Game programmer',
  intro: 'I write C++ for graphics, engine systems and gameplay AI.',
  location: 'Valencia, Spain',
  email: 'jonathanperis.dev@gmail.com',
  github: 'https://github.com/JonathanESAT',
  // Check this matches the URL of your LinkedIn profile.
  linkedin: 'https://www.linkedin.com/in/jonathan-peris-beltran',
  cv: '/Jonathan_Peris_CV.pdf',
}

export const featured = {
  slug: 'terrain',
  title: 'Procedural open-world renderer',
  meta: ['C++', 'OpenGL', 'GLSL', 'Team of three', '2025/26'],
  video: '/assets/terrain.mp4',
  poster: '/assets/terrain-poster.jpg',
  summary:
    'A real-time scene with endless terrain, an animated sea and a boat you can sail. I built the procedural terrain: heightmaps from layered Simplex noise, the mesh generation, the chunk grid that makes the world endless, and the shaders that light and colour it.',
  facts: [
    '4 × 4 chunk grid that follows the boat and rebuilds only the edge it leaves behind',
    'Seamless chunk borders, in both geometry and lighting',
    'About 60 FPS on an RTX 2070 Super with the full scene',
  ],
}

export const projects = [
  {
    title: 'Data structures & algorithms library',
    meta: 'C, ported to C++ · Team of two · 2025/26',
    text: 'Vector, linked lists, stack and queue over a shared memory node, plus Quicksort. I benchmarked each structure over 10,000+ runs per operation and found chained vector concatenation about three times slower than lists, because every concat reallocates.',
  },
  {
    title: 'Math library',
    meta: 'C++ · Solo · 2025/26',
    text: 'Vectors and matrices from 2D to 4D with inline operations for transforms, covered by its own unit-test project. The terrain renderer is built on it.',
  },
  {
    title: 'Blackjack & Parcheesi',
    meta: 'C++ · 2025/26',
    text: 'Both games are built on abstract interfaces, so players are compiled as separate static libraries that can be swapped at link time.',
  },
]

export const now = [
  {
    title: 'Final-year game in Unreal Engine 5',
    text: "A top-down puzzle game made in a multidisciplinary team. I own the aiming and weapon components, built so designers can tune them, and I'm moving on to enemy AI.",
  },
  {
    title: 'Custom engine',
    text: 'A C++ graphics engine built from scratch with a classmate. I wrote the first render path and the input system.',
  },
  {
    title: 'Learning home-automation agent',
    text: "A reinforcement-learning agent that learns a household's routine and balances comfort against energy use.",
  },
]

export const about = [
  "I'm in my third year of video game programming at ESAT in Valencia. Before that I spent a year building management software in Java and .NET for hospitality businesses, which taught me what it means to ship code other people rely on every day.",
  "I'm most interested in gameplay AI and in the low-level work that makes it fast. I speak Spanish and Catalan natively and English at B2.",
]

// Code lives in a private repo because it includes ESAT's licensed engine framework.
export const codeAccessNote =
  "Source code is in a private repository because it includes ESAT's licensed engine framework. I'm happy to grant read access."

export const codeAccessMail = (subject) =>
  `mailto:${profile.email}?subject=${encodeURIComponent(`Code access: ${subject}`)}`
