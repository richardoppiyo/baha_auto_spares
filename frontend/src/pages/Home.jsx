import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="page home-page">
      <section className="hero">
        <p className="eyebrow">Baha Auto Spares</p>
        <h1>Find the right part the first time.</h1>
        <p className="subtitle">
          Search by year, make/model, and part to quickly see what&apos;s in
          stock. Fast, reliable sourcing for workshops and DIY builds.
        </p>
        <div className="actions">
          <Link className="button primary" to="/inventory">
            Search Parts
          </Link>
          <a
            className="button ghost"
            href="mailto:parts@baha.example.com?subject=Parts%20Request"
          >
            Request a quote
          </a>
        </div>
        <div className="hero-card">
          <div>
            <p className="meta">Inventory coverage</p>
            <p className="metric">100K+ parts</p>
          </div>
          <div>
            <p className="meta">Fulfillment speed</p>
            <p className="metric">Same-day dispatch</p>
          </div>
          <div>
            <p className="meta">Fit guarantee</p>
            <p className="metric">VIN-matched lookup</p>
          </div>
        </div>
      </section>

      <section className="steps">
        <h2>How it works</h2>
        <div className="step-grid">
          <article>
            <p className="meta">Step 1</p>
            <h3>Describe the vehicle</h3>
            <p>Select year and make/model to narrow to exact fitment.</p>
          </article>
          <article>
            <p className="meta">Step 2</p>
            <h3>Pick the part</h3>
            <p>Choose the system or part you need—from brakes to lighting.</p>
          </article>
          <article>
            <p className="meta">Step 3</p>
            <h3>Review availability</h3>
            <p>See live stock, pricing, and options to reserve or ship.</p>
          </article>
        </div>
      </section>
    </div>
  )
}

export default Home
