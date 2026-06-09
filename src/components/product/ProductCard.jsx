import { Card, Text, Badge, Image } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { isCompletelyOutOfStock } from '../../services/products'

function ProductCard({ product }) {
    // useNavigate hook for programmatic navigation
    const navigate = useNavigate()

    // Check if product is completely out of stock (all variants have 0 inventory)
    const outOfStock = isCompletelyOutOfStock(product)

    // Handle card click - navigate to product detail page
    const handleClick = () => {
        navigate(`/product/${product.id}`)
    }

    return (
        // shadow="sm" adds subtle box shadow, padding="lg" adds inner spacing
        // radius="md" rounds corners, withBorder adds 1px border
        <Card
            shadow="md"
            padding="lg"
            radius="md"
            withBorder
            data-testid="product-card"
            style={{ cursor: 'pointer' }}
            onClick={handleClick}
        >
            {/* Product image */}
            {/* Card.Section makes content span full card width (no padding) */}
            <Card.Section>
                {/* height={200} sets fixed image height */}
                {/* fallbackSrc displays if image_url fails to load */}
                <Image
                    src={product.image_url}
                    alt={product.name}
                    height={200}
                    fit="contain"
                    fallbackSrc="https://placehold.co/400x400?text=No+Image"
                />
            </Card.Section>

            {/* Category label */}
            {/* c="dimmed" sets gray text color, size="xs" makes text small */}
            {/* tt="uppercase" transforms text to uppercase, mt="md" adds margin-top */}
            <Text c="dimmed" size="xs" tt="uppercase" mt="md" data-testid="product-category">
                {product.category}
            </Text>

            {/* Product name */}
            {/* fw={500} sets font-weight (medium bold) */}
            <Text fw={500} size="lg" mt={4} data-testid="product-name" style={{ color: 'var(--color-primary-dark)' }}>
                {product.name}
            </Text>

            {/* Price */}
            {/* mt={4} adds 4px margin-top (can use numbers or size strings) */}
            <Text size="md" mt={4} data-testid="product-price" style={{ color: 'var(--color-primary-dark)' }}>
                ${product.price}
            </Text>

            {/* Stock badge - only show if completely out of stock */}
            {outOfStock && (
                <Badge mt="sm" style={{ backgroundColor: 'var(--color-out-of-stock)' }} data-testid="stock-badge">
                    Out of Stock
                </Badge>
            )}
        </Card>
    )
}

export default ProductCard