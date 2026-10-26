import { Link } from 'react-router-dom'
import ContourField from '../components/ContourField.jsx'
import { Video } from '../components/Layout.jsx'
import { profile, featured, projects, now, about, codeAccessMail, codeAccessNote } from '../data/site.js'

export default function Home() {
  return (
    <main>
      <section className="hero">
        <ContourField className="hero-map" />
        <div className="hero-text">
          <h1>{profile.name}</h1>
          <p className="hero-role">{profile.role}. {profile.intro}</p>
          <p className="hero-links">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.github}>GitHub</a>
            <a href={profile.linkedin}>LinkedIn</a>
          </p>
        </div>
        <p className="hero-caption">The map is generated live, the same way my terrain system builds its heightmaps.</p>
      </section>

      <section id="work" className="section featured" aria-labelledby="featured-title">
        <Video src={featured.video} poster={featured.poster} title="Procedural terrain demo" />
        <div className="featured-body">
          <div>
            <h2 id="featured-title">{featured.title}</h2>
            <ul className="tags">{featured.meta.map((m) => <li key={m}>{m}</li>)}</ul>
          </div>
          <div>
            <p className="lead">{featured.summary}</p>
            <ul className="facts">{featured.facts.map((f) => <li key={f}>{f}</li>)}</ul>
            <p className="actions">
              <Link className="button" to={`/projects/${featured.slug}`}>Read how it works</Link>
              <a className="button ghost" href={codeAccessMail('terrain renderer')}>Request code access</a>
            </p>
            <p className="note">{codeAccessNote}</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="more-title">
        <h2 id="more-title" className="section-title">More work</h2>
        <div className="ledger">
          {projects.map((p) => (
            <article key={p.title} className="ledger-row">
              <h3>{p.title}</h3>
              <div>
                <p className="meta">{p.meta}</p>
                <p>{p.text}</p>
                <a href={codeAccessMail(p.title)}>Request code access</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section inverse" aria-labelledby="now-title">
        <h2 id="now-title" className="section-title">What I'm building now</h2>
        <div className="ledger">
          {now.map((n) => (
            <article key={n.title} className="ledger-row">
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="section about" aria-labelledby="about-title">
        <h2 id="about-title" className="section-title">About</h2>
        <div>
          {about.map((para) => <p key={para}>{para}</p>)}
          <p className="actions">
            <a className="button" href={profile.cv}>Download CV</a>
            <a className="button ghost" href={`mailto:${profile.email}`}>Email me</a>
          </p>
        </div>
      </section>
    </main>
  )
}
