import { Card, Text, Group, ActionIcon } from '@mantine/core'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'

export default function CartCard({ item, onUpdateQuantity, onRemove }) {
    //abriveated formatting from ProductCard.jsx
    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            data-testid="cart-card"
        >

            {/* Cart Product name */}
            {/* fw={500} sets font-weight (medium bold) */}
            <Text fw={500} size="lg" mt={4} data-testid="cart-product-name">
                {item.products.name}
            </Text>

            {/* Cart Product Price */}
            {/* mt={4} adds 4px margin-top (can use numbers or size strings) */}
            <Text c="dark" size="md" mt={4} data-testid="cart-product-price">
                ${(item.products.price * item.quantity).toFixed(2)}
            </Text>

            {/* Cart Product Color*/}
            <Text c="dark" size="md" mt={4} data-testid="cart-product-color">
                Color: {item.product_variants.color}
            </Text>

            {/* Cart Product Size*/}
            <Text c="dark" size="md" mt={4} data-testid="cart-product-size">
                Size: {item.product_variants.size}
            </Text>

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
                    color="red"
                    onClick={() => onRemove(item.id)}
                >
                    <FaTrash size={10} />
                </ActionIcon>
            </Group>

        </Card>
    )
}