import { useEffect, useState } from 'react'
import { Container, Title, Text, Loader, Center } from '@mantine/core'
import { getProducts } from '../services/products'
import ProductGrid from '../components/product/ProductGrid'

function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch products from Supabase on page load
    useEffect(() => {
        getProducts()
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    // Show loading spinner while fetching
    if (loading) {
        return (
            // Center positions children in middle of container
            // h={400} sets height to 400px
            <Center h={400}>
                {/* size="lg" makes the spinner larger */}
                <Loader size="lg" />
            </Center>
        )
    }

    // Show error message if fetch failed
    if (error) {
        return (
            // size="lg" sets max-width, py="xl" adds vertical padding
            <Container size="lg" py="xl">
                {/* c="red" sets text color to red */}
                <Text c="red">Error: {error}</Text>
            </Container>
        )
    }

    return (
        <Container size="lg" py="xl">
            {/* order={1} renders as h1, mb="xs" adds small margin-bottom */}
            <Title order={1} mb="xs">Featured Products</Title>
            {/* c="dimmed" sets gray text, mb="xl" adds large margin-bottom */}
            <Text c="dimmed" mb="xl">Show your school spirit with our exclusive collection</Text>

            {/* Product grid */}
            <ProductGrid products={products} />
        </Container>
    )
}

export default Home
