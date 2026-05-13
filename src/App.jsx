import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductView from './pages/ProductView'

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
                <Route path="/product/:id" element={<ProductView />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App