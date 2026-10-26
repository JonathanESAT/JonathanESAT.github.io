import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header, Footer } from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Terrain from './pages/Terrain.jsx'

// Scroll to the top on page change, or to #section when the link has one.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/terrain" element={<Terrain />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}
