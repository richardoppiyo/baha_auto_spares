import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import Results from './pages/Results'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="navbar">
          <Link to="/" className="brand">
            Baha Auto Spares
          </Link>
          <div className="nav-actions">
            <Link className="link" to="/inventory">
              Inventory
            </Link>
            <Link className="button small" to="/inventory">
              Search Parts
            </Link>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/results" element={<Results />} />
          </Routes>
        </main>

        <footer className="footer">
          <p className="brandmark">Baha Auto Spares</p>
          <p className="muted">
            Built with React and Redux. Backend API will be powered by Rails +
            PostgreSQL.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
