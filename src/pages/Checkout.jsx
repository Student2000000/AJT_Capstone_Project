import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Title, Text, Loader, Center, Card, Stack, Group, Button, Divider } from '@mantine/core'
import { getCartItems, calculateCartTotal } from '../services/cart'

function Checkout() {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch cart items on page load
    useEffect(() => {
        async function fetchCart() {
            try {
                const data = await getCartItems()
                setCartItems(data || [])
            } catch (err) {
                setError(err.message)
            }
            setLoading(false)
        }

        fetchCart()
    }, [])

    // Calculate total
    const total = cartItems.length > 0 ? calculateCartTotal(cartItems) : 0

    // Loading state
    if (loading) {
        return (
            <Center h={400}>
                <Loader size="lg" />
            </Center>
        )
    }

    // Error state
    if (error) {
        return (
            <Container size="sm" py="xl">
                <Text c="red">Error: {error}</Text>
            </Container>
        )
    }

    // Empty cart
    if (cartItems.length === 0) {
        return (
            <Container size="sm" py="xl">
                <Title order={1} mb="md">Checkout</Title>
                <Text c="dimmed" mb="lg">Your cart is empty.</Text>
                <Button variant="outline" onClick={() => navigate('/')}>
                    Continue Shopping
                </Button>
            </Container>
        )
    }

    return (
        <Container size="sm" py="xl">
            <Title order={1} mb="xl">Checkout</Title>

            {/* Order Summary */}
            <Card withBorder padding="lg" radius="md" mb="lg">
                <Title order={3} mb="md">Order Summary</Title>

                <Stack gap="sm">
                    {cartItems.map(item => (
                        <Group key={item.id} justify="space-between">
                            <div>
                                <Text size="sm">{item.products.name}</Text>
                                <Text size="xs" c="dimmed">
                                    {item.product_variants.size && `Size: ${item.product_variants.size}`}
                                    {item.product_variants.size && item.product_variants.color && ' • '}
                                    {item.product_variants.color && `Color: ${item.product_variants.color}`}
                                    {' × '}{item.quantity}
                                </Text>
                            </div>
                            <Text size="sm">
                                ${(item.products.price * item.quantity).toFixed(2)}
                            </Text>
                        </Group>
                    ))}
                </Stack>

                <Divider my="md" />

                <Group justify="space-between">
                    <Text fw={600}>Total</Text>
                    <Text fw={700} size="lg">${total.toFixed(2)}</Text>
                </Group>
            </Card>

            {/* Payment section placeholder */}
            <Card withBorder padding="lg" radius="md" mb="lg">
                <Title order={3} mb="md">Payment</Title>
                <Text c="dimmed" size="sm">
                    Payment integration coming soon. This will use Stripe test mode.
                </Text>
            </Card>

            {/* Action buttons */}
            <Group justify="space-between">
                <Button variant="outline" onClick={() => navigate('/')}>
                    Continue Shopping
                </Button>
                <Button disabled>
                    Place Order
                </Button>
            </Group>
        </Container>
    )
}

export default Checkout