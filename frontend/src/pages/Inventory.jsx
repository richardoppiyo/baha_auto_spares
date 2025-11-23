import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  resetResults,
  searchParts,
  updateFilter,
} from '../features/search/searchSlice'

const Inventory = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { filters, options, status, error } = useSelector(
    (state) => state.search,
  )
  const [formError, setFormError] = useState('')

  useEffect(() => {
    dispatch(resetResults())
  }, [dispatch])

  const handleChange = (key) => (event) => {
    setFormError('')
    dispatch(updateFilter({ key, value: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!filters.year || !filters.makeModel || !filters.part) {
      setFormError('Please choose a year, make/model, and part.')
      return
    }

    try {
      await dispatch(searchParts(filters)).unwrap()
      navigate('/inventory/results')
    } catch (err) {
      setFormError(err.message || 'Search failed. Try again.')
    }
  }

  return (
    <div className="page inventory-page">
      <header className="page-heading">
        <div>
          <p className="eyebrow">Inventory search</p>
          <h1>Pinpoint parts that fit.</h1>
          <p className="subtitle">
            Start with the vehicle year, pick the exact model, and choose the
            system or part to see what&apos;s available.
          </p>
        </div>
        <Link className="button ghost" to="/">
          Back to home
        </Link>
      </header>

      <section className="form-card">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="field">
            <label htmlFor="year">Select Year</label>
            <select
              id="year"
              value={filters.year}
              onChange={handleChange('year')}
            >
              <option value="">Choose a year</option>
              {options.years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="make">Select Make/Model</label>
            <select
              id="make"
              value={filters.makeModel}
              onChange={handleChange('makeModel')}
            >
              <option value="">Choose make/model</option>
              {options.makeModels.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="part">Select Part</label>
            <select
              id="part"
              value={filters.part}
              onChange={handleChange('part')}
            >
              <option value="">Choose a part</option>
              {options.parts.map((part) => (
                <option key={part} value={part}>
                  {part}
                </option>
              ))}
            </select>
          </div>

          {formError && <p className="form-error">{formError}</p>}
          {error && <p className="form-error">{error}</p>}

          <div className="actions">
            <button
              className="button primary"
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Searching...' : 'Search'}
            </button>
            <p className="hint">
              Data will be provided by the Rails API — mocked here until it is
              connected.
            </p>
          </div>
        </form>
      </section>

      <section className="helper">
        <h2>Looking up the right fit</h2>
        <div className="callouts">
          <article>
            <p className="meta">VIN lookup</p>
            <p>API hook for VIN decoding can slot in here.</p>
          </article>
          <article>
            <p className="meta">Stock signals</p>
            <p>Backend will return availability, price, and location.</p>
          </article>
          <article>
            <p className="meta">Order flow</p>
            <p>Add reserve/ship actions once search results are wired.</p>
          </article>
        </div>
      </section>
    </div>
  )
}

export default Inventory
