import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Home from './pages/Home'
import ProductView from './pages/ProductView'

// Wrapper component that passes the product ID as a key
// When the key changes, React fully remounts ProductView with fresh state
// This ensures no stale data persists when navigating between products
function ProductViewWrapper() {
    const { id } = useParams()
    return <ProductView key={id} />
}

function App() {
    return (
        // BrowserRouter enables client-side routing
        <BrowserRouter>
            {/* Routes contains all route definitions */}
            <Routes>
                {/* Route maps a URL path to a component */}
                {/* path="/" means the home page */}
                <Route path="/" element={<Home />} />

                {/* :id is a URL parameter - captures the product ID */}
                {/* e.g., /product/abc-123 makes id="abc-123" */}
                <Route path="/product/:id" element={<ProductViewWrapper />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App