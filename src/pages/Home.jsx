import { useEffect, useState, useMemo } from 'react'
import { Container, Title, Text, Loader, Center, Group } from '@mantine/core'
import { getProducts } from '../services/products'
import ProductGrid from '../components/product/ProductGrid'
import CategoryFilter from '../components/common/CategoryFilter'
import SearchBar from '../components/common/SearchBar'

function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Filter state - 'all' shows all products
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Fetch products from Supabase on page load
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts()
                setProducts(data)
            } catch (err) {
                setError(err.message)
            }
            setLoading(false)
        }

        fetchProducts()
    }, [])

    // Filter products by selected category
    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'all') {
            return products;
        }
        return products.filter(product => product.category === selectedCategory);
    }, [products, selectedCategory]);

    // Show loading spinner while fetching
    if (loading) {
        return (
            // Center positions children in middle of container
            // h={400} sets height to 400px
            <Center h={400}>
                {/* size="lg" makes the spinner larger */}
                <Loader size="lg" data-testid="loader" />
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
            <Text c="dimmed" mb="xl">Shop our exclusive collection</Text>

            {/* Filter and Search row */}
            <Group justify="space-between" align="center" mb="lg">
                <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
                <SearchBar products={products} />
            </Group>

            {/* Product grid */}
            <ProductGrid products={filteredProducts} />
        </Container>
    )
}

export default Home