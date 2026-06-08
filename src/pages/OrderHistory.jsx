import { useEffect, useState } from 'react'
import { Container, Title, Text, Loader, Center, Card, Stack, Group, Badge, Image } from '@mantine/core'
import { getOrders } from '../services/orders'

function OrderHistory() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchOrders() {
            try {
                const data = await getOrders()
                setOrders(data || [])
            } catch (err) {
                setError(err.message)
            }
            setLoading(false)
        }

        fetchOrders()
    }, [])

    // Format date for display
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

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
            <Container size="md" py="xl">
                <Text c="red">Error: {error}</Text>
            </Container>
        )
    }

    return (
        <Container size="md" py="xl">
            <Title order={1} mb="xl">Order History</Title>

            {orders.length === 0 ? (
                <Text c="dimmed">No orders yet.</Text>
            ) : (
                <Stack gap="lg">
                    {orders.map(order => (
                        <Card
                            key={order.id}
                            withBorder
                            padding="lg"
                            radius="md"
                            shadow="sm"
                        >
                            {/* Order header */}
                            <Group justify="space-between" mb="md">
                                <div>
                                    <Text size="sm" c="dimmed">
                                        Order placed: {formatDate(order.created_at)}
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        Order #{order.id.slice(-8).toUpperCase()}
                                    </Text>
                                </div>
                                <Group gap="sm">
                                    <Badge color="green" size="lg">
                                        {order.status.toUpperCase()}
                                    </Badge>
                                    <Text fw={700} size="lg">
                                        ${order.total.toFixed(2)}
                                    </Text>
                                </Group>
                            </Group>

                            {/* Order items */}
                            <Stack gap="sm">
                                {order.order_items.map(item => (
                                    <Group key={item.id} gap="md">
                                        {/* Product image */}
                                        <Image
                                            src={item.products.image_url}
                                            alt={item.products.name}
                                            width={50}
                                            height={50}
                                            radius="sm"
                                            fit="contain"
                                            fallbackSrc="https://placehold.co/50x50?text=No+Image"
                                        />

                                        {/* Product details */}
                                        <div style={{ flex: 1 }}>
                                            <Text size="sm" fw={500}>
                                                {item.products.name}
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                {item.product_variants?.size && `Size: ${item.product_variants.size}`}
                                                {item.product_variants?.size && item.product_variants?.color && ' • '}
                                                {item.product_variants?.color && `Color: ${item.product_variants.color}`}
                                                {' × '}{item.quantity}
                                            </Text>
                                        </div>

                                        {/* Item price */}
                                        <Text size="sm">
                                            ${(item.price_at_purchase * item.quantity).toFixed(2)}
                                        </Text>
                                    </Group>
                                ))}
                            </Stack>
                        </Card>
                    ))}
                </Stack>
            )}
        </Container>
    )
}

export default OrderHistory