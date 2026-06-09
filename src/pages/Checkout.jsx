import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Title, Text, Loader, Center, Card, Stack, Group, Button, Divider, Alert } from '@mantine/core'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { getCartItems, calculateCartTotal } from '../services/cart'
import { createOrder } from '../services/orders'
import { supabase } from '../lib/supabase'

// Load Stripe outside of component to avoid recreating on every render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

// Payment form component - must be inside Elements provider
function PaymentForm({ total, onSuccess }) {
    const stripe = useStripe()
    const elements = useElements()
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) return

        setProcessing(true)
        setError(null)

        const { error: submitError } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        })

        if (submitError) {
            setError(submitError.message)
            setProcessing(false)
        } else {
            onSuccess()
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            {error && (
                <Alert color="red" mt="md">{error}</Alert>
            )}
            <Button
                type="submit"
                fullWidth
                mt="md"
                loading={processing}
                disabled={!stripe || !elements}
            >
                Pay ${total.toFixed(2)}
            </Button>
        </form>
    )
}

function Checkout() {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [clientSecret, setClientSecret] = useState(null)

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

    // Create PaymentIntent when cart is loaded
    useEffect(() => {
        async function createPaymentIntent() {
            if (total <= 0) return

            try {
                const { data, error } = await supabase.functions.invoke('create-payment-intent', {
                    body: { amount: total }
                })

                if (error) throw error
                setClientSecret(data.clientSecret)
            } catch (err) {
                setError('Failed to initialize payment: ' + err.message)
            }
        }

        if (!loading && cartItems.length > 0) {
            createPaymentIntent()
        }
    }, [loading, cartItems, total])

    // Handle successful payment
    const handlePaymentSuccess = async () => {
        try {
            await createOrder()
            navigate('/order-confirmation')
        } catch (err) {
            console.error('Failed to create order:', err)
            navigate('/order-confirmation')
        }
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
            <Title order={1} mb="xl" style={{ color: 'var(--color-primary-dark)' }}>Checkout</Title>

            {/* Order Summary */}
            <Card withBorder padding="lg" radius="md" mb="lg" shadow="md">
                <Title order={3} mb="md" style={{ color: 'var(--color-primary-dark)' }}>Order Summary</Title>

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
                    <Text fw={600} style={{ color: 'var(--color-primary-dark)' }}>Total</Text>
                    <Text fw={700} size="lg" style={{ color: 'var(--color-primary-dark)' }}>${total.toFixed(2)}</Text>
                </Group>
            </Card>

            {/* Payment section */}
            <Card withBorder padding="lg" radius="md" mb="lg" shadow="md">
                <Title order={3} mb="md" style={{ color: 'var(--color-primary-dark)' }}>Payment</Title>
                <Text c="dimmed" size="sm" mb="md">
                    Test mode — use card 4242 4242 4242 4242
                </Text>

                {clientSecret ? (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <PaymentForm total={total} onSuccess={handlePaymentSuccess} />
                    </Elements>
                ) : (
                    <Center>
                        <Loader size="sm" />
                    </Center>
                )}
            </Card>

            {/* Back button */}
            <Button variant="outline" onClick={() => navigate('/')}>
                Continue Shopping
            </Button>
        </Container>
    )
}

export default Checkout