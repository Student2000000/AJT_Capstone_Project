import { Text, Title } from '@mantine/core'

function ProductInfo({ product }) {
    return (
        <div>
            {/* Category label */}
            {/* c="dimmed" sets gray color, tt="uppercase" transforms text */}
            <Text c="dimmed" size="sm" tt="uppercase">
                {product.category}
            </Text>

            {/* Product name */}
            {/* order={2} renders as h2, fw={600} sets font-weight */}
            <Title order={2} fw={600} mt="xs">
                {product.name}
            </Title>

            {/* Price */}
            {/* size="xl" makes it prominent, fw={500} medium weight */}
            <Text size="xl" fw={500} mt="sm">
                ${product.price}
            </Text>

            {/* Description */}
            <Text c="dimmed" mt="md">
                {product.description}
            </Text>
        </div>
    )
}

export default ProductInfo