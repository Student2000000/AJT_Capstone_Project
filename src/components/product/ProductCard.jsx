import { Card, Text, Badge, Button, Image } from '@mantine/core'

function ProductCard({ product }) {
    const stock = product.inventory_count

    // Determine stock status and badge color
    const getStockBadge = () => {
        if (stock === 0) {
            return { color: 'red', label: 'Out of stock' }
        } else if (stock <= 5) {
            return { color: 'yellow', label: `Low stock (${stock} left)` }
        } else {
            return { color: 'green', label: `${stock} in stock` }
        }
    }

    const stockBadge = getStockBadge()

    return (
        // shadow="sm" adds subtle box shadow, padding="lg" adds inner spacing
        // radius="md" rounds corners, withBorder adds 1px border
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            {/* Product image */}
            {/* Card.Section makes content span full card width (no padding) */}
            <Card.Section>
                {/* height={200} sets fixed image height */}
                {/* fallbackSrc displays if image_url fails to load */}
                <Image
                    src={product.image_url}
                    alt={product.name}
                    height={200}
                    fallbackSrc="https://placehold.co/400x400?text=No+Image"
                />
            </Card.Section>

            {/* Category label */}
            {/* c="dimmed" sets gray text color, size="xs" makes text small */}
            {/* tt="uppercase" transforms text to uppercase, mt="md" adds margin-top */}
            <Text c="dimmed" size="xs" tt="uppercase" mt="md">
                {product.category}
            </Text>

            {/* Product name */}
            {/* fw={500} sets font-weight (medium bold) */}
            <Text fw={500} size="lg" mt={4}>
                {product.name}
            </Text>

            {/* Price */}
            {/* mt={4} adds 4px margin-top (can use numbers or size strings) */}
            <Text c="dark" size="md" mt={4}>
                ${product.price}
            </Text>

            {/* Stock badge */}
            {/* color sets badge background color (green, yellow, or red based on stock level) */}
            <Badge mt="sm" color={stockBadge.color}>
                {stockBadge.label}
            </Badge>

            {/* Add to cart button */}
            {/* fullWidth stretches button to fill container */}
            {/* disabled grays out button and prevents clicks */}
            <Button fullWidth mt="md" disabled={stock === 0}>
                Add to Cart
            </Button>
        </Card>
    )
}

export default ProductCard