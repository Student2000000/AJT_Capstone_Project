import { Card, Text } from '@mantine/core'

export default function CartCard({ item }) {
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
                ${item.products.price}
            </Text>

            {/* Cart Product Color*/}
            <Text c="dark" size="md" mt={4} data-testid="cart-product-price">
                Color: {item.product_variants.color}
            </Text>

            {/* Cart Product Size*/}
            <Text c="dark" size="md" mt={4} data-testid="cart-product-price">
                Size: {item.product_variants.size}
            </Text>
            
            

        </Card>
    )
}