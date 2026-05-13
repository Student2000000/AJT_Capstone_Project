import { useEffect, useState } from 'react'
import { Title, SimpleGrid } from '@mantine/core'
import { getProductsByCategory } from '../../services/products'
import ProductCard from './ProductCard'

function RelatedProducts({ category, excludeId }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const data = await getProductsByCategory(category, excludeId)
                setProducts(data)
            } catch (err) {
                console.error('Error fetching related products:', err)
            }
            setLoading(false)
        }

        fetchRelated()
    }, [category, excludeId])

    // Don't render section if no related products found
    if (loading || products.length === 0) {
        return null
    }

    return (
        <div>
            <Title order={3} mb="lg">You May Also Like</Title>

            {/* SimpleGrid displays products in a responsive row */}
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing="lg"
            >
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </SimpleGrid>
        </div>
    )
}

export default RelatedProducts