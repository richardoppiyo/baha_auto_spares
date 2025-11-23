import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Results = () => {
  const { results, filters, status } = useSelector((state) => state.search)

  const hasResults = results && results.length > 0

  return (
    <div className="page results-page">
      <header className="page-heading">
        <div>
          <p className="eyebrow">Search results</p>
          <h1>Parts for your selection</h1>
          <p className="subtitle">
            {filters.year && filters.makeModel && filters.part
              ? `${filters.year} · ${filters.makeModel} · ${filters.part}`
              : 'Complete a search to see matched parts.'}
          </p>
        </div>
        <Link className="button ghost" to="/inventory">
          New search
        </Link>
      </header>

      {status === 'loading' && (
        <p className="muted">Fetching inventory&hellip;</p>
      )}

      {!hasResults && status !== 'loading' && (
        <div className="empty">
          <p className="subtitle">
            No matching parts yet. Try adjusting the year, make/model, or part.
          </p>
          <Link className="button primary" to="/inventory">
            Back to search
          </Link>
        </div>
      )}

      {hasResults && (
        <div className="results-grid">
          {results.map((item) => (
            <article key={item.id} className="result-card">
              <div className="result-header">
                <p className="meta">{item.id}</p>
                <p className="tag">{item.availability}</p>
              </div>
              <h3>{item.part}</h3>
              <p className="muted">
                {item.makeModel} · {item.year}
              </p>
              <p className="price">${item.price}</p>
              <div className="actions">
                <button className="button ghost" type="button">
                  Reserve
                </button>
                <button className="button primary" type="button">
                  Request delivery
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Results
