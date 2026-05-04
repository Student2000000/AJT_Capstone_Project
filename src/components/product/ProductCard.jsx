import { Card, Text, Badge, Button, Image } from '@mantine/core'

function ProductCard({ product }) {
    const inStock = product.inventory_count > 0

    return (
        // shadow="sm" adds subtle box shadow, padding="lg" adds inner spacing
        // radius="md" rounds corners, withBorder adds 1px border
        <Card shadow="sm" padding="lg" radius="md" withBorder>
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

            {/* c="dimmed" sets gray text color, size="xs" makes text small */}
            {/* tt="uppercase" transforms text to uppercase, mt="md" adds margin-top */}
            <Text c="dimmed" size="xs" tt="uppercase" mt="md">
                {product.category}
            </Text>

            {/* fw={500} sets font-weight (medium bold) */}
            <Text fw={500} size="lg" mt={4}>
                {product.name}
            </Text>

            {/* mt={4} adds 4px margin-top (can use numbers or size strings) */}
            <Text c="dark" size="md" mt={4}>
                ${product.price}
            </Text>

            {/* color sets badge background color */}
            <Badge mt="sm" color={inStock ? 'green' : 'red'}>
                {inStock ? `${product.inventory_count} in stock` : 'Out of stock'}
            </Badge>

            {/* fullWidth stretches button to fill container */}
            {/* disabled grays out button and prevents clicks */}
            <Button fullWidth mt="md" disabled={!inStock}>
                Add to Cart
            </Button>
        </Card>
    )
}

export default ProductCard
