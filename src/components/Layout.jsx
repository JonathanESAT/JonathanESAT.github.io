import { Link, NavLink } from 'react-router-dom'
import { profile } from '../data/site.js'

export function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="wordmark">{profile.name}</Link>
      <nav aria-label="Main">
        <NavLink to="/#work">Work</NavLink>
        <NavLink to="/#about">About</NavLink>
        <a href={profile.cv}>CV</a>
      </nav>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-lead">Let's talk.</p>
        <a className="footer-mail" href={`mailto:${profile.email}`}>{profile.email}</a>
        <ul className="footer-links">
          <li><a href={profile.github}>GitHub</a></li>
          <li><a href={profile.linkedin}>LinkedIn</a></li>
          <li><a href={profile.cv}>CV (PDF)</a></li>
        </ul>
        <p className="footer-small">{profile.name}, {profile.location}.</p>
      </div>
    </footer>
  )
}

export function Video({ src, poster, title }) {
  return (
    <div className="video">
      <video controls muted autoPlay loop playsInline preload="metadata" poster={poster} title={title}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}
