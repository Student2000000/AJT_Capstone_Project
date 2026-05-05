import { SimpleGrid } from '@mantine/core'
import ProductCard from './ProductCard'

function ProductGrid({ products }) {
    return (
        // cols={3} sets 3 columns, spacing="lg" adds gap between cards
        // breakpoints adjust columns for smaller screens
        <SimpleGrid
            cols={3}
            spacing="lg"
            breakpoints={[
                { maxWidth: 'md', cols: 2 },
                { maxWidth: 'sm', cols: 1 }
            ]}
            data-testid="product-grid"
        >
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </SimpleGrid>
    )
}

export default ProductGrid
