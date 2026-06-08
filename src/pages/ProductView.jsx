import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Grid, Loader, Center, Text, Button, Badge, Group } from '@mantine/core'
import { getProductById, findVariant, getAvailableSizes, getAvailableColors } from '../services/products'
import { addToCart, getCartItems } from '../services/cart'
import ProductGallery from '../components/product/ProductGallery'
import ProductInfo from '../components/product/ProductInfo'
import ProductOptions from '../components/product/ProductOptions'
import ProductDetails from '../components/product/ProductDetails'
import RelatedProducts from '../components/product/RelatedProducts'

function ProductView() {
    // Get product ID from URL params (e.g., /product/abc-123)
    const { id } = useParams()

    // Product data state
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Selected variant state
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)

    // Cart action state
    const [adding, setAdding] = useState(false)
    const [addedMessage, setAddedMessage] = useState(null)

    // Cart items state - tracks what's already in cart
    const [cartItems, setCartItems] = useState([])

    // Fetch product data on mount
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id)
                setProduct(data)

                // Auto-select first available size and color
                const sizes = getAvailableSizes(data.variants)
                const colors = getAvailableColors(data.variants)

                if (sizes.length > 0) setSelectedSize(sizes[0])
                if (colors.length > 0) setSelectedColor(colors[0])
            } catch (err) {
                setError(err.message)
            }
            setLoading(false)
        }

        fetchProduct()
    }, [id])

    // Fetch cart items on mount to check existing quantities
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const items = await getCartItems()
                setCartItems(items || [])
            } catch (err) {
                console.error('Failed to fetch cart:', err)
            }
        }

        fetchCart()
    }, [])

    // Listen for cart updates from CartSidebar
    useEffect(() => {
        const handleCartUpdate = async () => {
            try {
                const items = await getCartItems()
                setCartItems(items || [])
            } catch (err) {
                console.error('Failed to fetch cart:', err)
            }
        }

        window.addEventListener('cart-updated', handleCartUpdate)
        return () => window.removeEventListener('cart-updated', handleCartUpdate)
    }, [])

    // useMemo caches the result and only recalculates when dependencies change
    // This avoids storing selectedVariant in state since it's derived from other state
    const selectedVariant = useMemo(() => {
        if (product && product.variants) {
            return findVariant(product.variants, selectedSize, selectedColor)
        }
        return null
    }, [product, selectedSize, selectedColor])

    // Get quantity of selected variant already in cart
    const quantityInCart = useMemo(() => {
        if (!selectedVariant) return 0
        const cartItem = cartItems.find(item => item.variant_id === selectedVariant.id)
        return cartItem ? cartItem.quantity : 0
    }, [selectedVariant, cartItems])

    // Check if adding one more would exceed inventory
    const canAddToCart = selectedVariant &&
        selectedVariant.inventory_count > 0 &&
        quantityInCart < selectedVariant.inventory_count

    // Handle add to cart
    const handleAddToCart = async () => {
        if (!selectedVariant || !canAddToCart) return

        setAdding(true)
        try {
            await addToCart(selectedVariant.id, product.id, 1)
            // Update local cart state to reflect the addition
            setCartItems(prev => {
                const existing = prev.find(item => item.variant_id === selectedVariant.id)
                if (existing) {
                    return prev.map(item =>
                        item.variant_id === selectedVariant.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                } else {
                    return [...prev, { variant_id: selectedVariant.id, quantity: 1 }]
                }
            })
            setAddedMessage('Added to cart!')
            // Clear message after 2 seconds
            setTimeout(() => setAddedMessage(null), 2000)
        } catch {
            setAddedMessage('Failed to add to cart')
        }
        setAdding(false)
    }

    // Get stock status for selected variant (shows actual inventory)
    const getStockStatus = () => {
        if (!selectedVariant) return null

        const stock = selectedVariant.inventory_count

        if (stock === 0) {
            return { color: 'red', label: 'Out of Stock' }
        } else if (!canAddToCart) {
            return { color: 'red', label: 'Max quantity in cart' }
        } else if (stock <= 5) {
            return { color: 'yellow', label: `Only ${stock} left` }
        }
        return null // In stock (6+), no badge needed
    }

    const stockStatus = getStockStatus()

    // Loading state
    if (loading) {
        return (
            <Center h={400}>
                <Loader size="lg" data-testid="loader" />
            </Center>
        )
    }

    // Error state
    if (error) {
        return (
            <Container size="lg" py="xl">
                <Text c="red">Error: {error}</Text>
            </Container>
        )
    }

    // Product not found
    if (!product) {
        return (
            <Container size="lg" py="xl">
                <Text>Product not found</Text>
            </Container>
        )
    }

    return (
        <Container size="lg" py="xl">
            {/* Main product section - two column layout */}
            <Grid gutter="xl">
                {/* Left column: Product Gallery */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <ProductGallery product={product} />
                </Grid.Col>

                {/* Right column: Product Info, Options, Details */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <ProductInfo product={product} />

                    {/* Variant selection */}
                    <div style={{ marginTop: '1.5rem' }}>
                        <ProductOptions
                            product={product}
                            selectedSize={selectedSize}
                            setSelectedSize={setSelectedSize}
                            selectedColor={selectedColor}
                            setSelectedColor={setSelectedColor}
                        />
                    </div>

                    {/* Stock indicator - only shows for low/out of stock */}
                    {stockStatus && (
                        <Badge color={stockStatus.color} size="lg" mt="md">
                            {stockStatus.label}
                        </Badge>
                    )}

                    {/* Add to Cart button */}
                    <Group mt="xl">
                        <Button
                            size="lg"
                            fullWidth
                            disabled={!canAddToCart}
                            loading={adding}
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </Button>
                    </Group>

                    {/* Added to cart confirmation */}
                    {addedMessage && (
                        <Text c="green" ta="center" mt="sm">{addedMessage}</Text>
                    )}

                    {/* Product details section */}
                    <div style={{ marginTop: '2rem' }}>
                        <ProductDetails product={product} selectedVariant={selectedVariant} />
                    </div>
                </Grid.Col>
            </Grid>

            {/* Related products section */}
            <div style={{ marginTop: '4rem' }}>
                <RelatedProducts category={product.category} excludeId={product.id} />
            </div>
        </Container>
    )
}

export default ProductView