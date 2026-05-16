import { SimpleGrid } from '@mantine/core'
import ProductCard from './ProductCard'

function ProductGrid({ products }) {
    return (
        // cols sets base columns, spacing="lg" adds gap between cards
        // Responsive cols: 1 on mobile, 2 on small, 3 on medium+
        <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3 }}
            spacing="lg"
            data-testid="product-grid"
        >
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </SimpleGrid>
    )
}

export default ProductGrid