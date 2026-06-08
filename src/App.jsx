import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Home from './pages/Home'
import ProductView from './pages/ProductView'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import OrderHistory from './pages/OrderHistory'
import Navbar from './components/common/Navbar'

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
            {/* Navbar appears on all pages */}
            <Navbar />

            {/* Routes contains all route definitions */}
            <Routes>
                {/* Route maps a URL path to a component */}
                {/* path="/" means the home page */}
                <Route path="/" element={<Home />} />

                {/* :id is a URL parameter - captures the product ID */}
                {/* e.g., /product/abc-123 makes id="abc-123" */}
                <Route path="/product/:id" element={<ProductViewWrapper />} />

                {/* Checkout page */}
                <Route path="/checkout" element={<Checkout />} />

                {/* Order Confirmation page */}
                <Route path="/order-confirmation" element={<OrderConfirmation />} />

                {/* Order History page */}
                <Route path="/orders" element={<OrderHistory />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App