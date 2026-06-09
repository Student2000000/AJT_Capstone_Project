import { Card, Text, Group, ActionIcon } from '@mantine/core'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'

export default function CartCard({ item, onUpdateQuantity, onRemove }) {
    return (
        <Card
            shadow="md"
            padding="lg"
            radius="md"
            withBorder
            data-testid="cart-card"
        >

            {/* Cart Product name */}
            {/* fw={500} sets font-weight (medium bold) */}
            <Text fw={500} size="lg" mt={4} data-testid="cart-product-name" style={{ color: 'var(--color-primary-dark)' }}>
                {item.products.name}
            </Text>

            {/* Cart Product Price */}
            <Text size="md" mt={4} data-testid="cart-product-price" style={{ color: 'var(--color-primary-dark)' }}>
                ${item.products.price.toFixed(2)}
            </Text>

            {/* Line total - only show when qty > 1 */}
            {item.quantity > 1 && (
                <Text c="dimmed" size="sm">
                    ${(item.products.price * item.quantity).toFixed(2)} total
                </Text>
            )}

            {/* Cart Product Color - only show if exists */}
            {item.product_variants.color && (
                <Text size="md" mt={4} data-testid="cart-product-color" style={{ color: 'var(--color-primary-dark)' }}>
                    Color: {item.product_variants.color}
                </Text>
            )}

            {/* Cart Product Size - only show if exists */}
            {item.product_variants.size && (
                <Text size="md" mt={4} data-testid="cart-product-size" style={{ color: 'var(--color-primary-dark)' }}>
                    Size: {item.product_variants.size}
                </Text>
            )}

            {/* Quantity controls - added for cart functionality */}
            <Group mt="md" justify="space-between">
                <Group gap="xs">
                    <ActionIcon
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        <FaMinus size={10} />
                    </ActionIcon>

                    <Text size="sm" fw={500}>{item.quantity}</Text>

                    <ActionIcon
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product_variants.inventory_count}
                    >
                        <FaPlus size={10} />
                    </ActionIcon>
                </Group>

                <ActionIcon
                    size="sm"
                    variant="outline"
                    color="var(--color-out-of-stock)"
                    onClick={() => onRemove(item.id)}
                >
                    <FaTrash size={10} />
                </ActionIcon>
            </Group>

        </Card>
    )
}