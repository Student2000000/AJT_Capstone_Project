import { Group, ActionIcon, Container, Title, Box, Indicator } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaReceipt } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import CartSidebar from '../cart/CartSidebar'
import { getCartItems } from '../../services/cart'

function Navbar() {
    const navigate = useNavigate()
    const [cartOpened, setCartOpened] = useState(false)
    const [cartCount, setCartCount] = useState(0)

    // Fetch cart count on mount
    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const items = await getCartItems()
                const count = items ? items.length : 0
                setCartCount(count)
            } catch (err) {
                console.error('Failed to fetch cart:', err)
            }
        }

        fetchCartCount()
    }, [])

    // Listen for cart updates
    useEffect(() => {
        const handleCartUpdate = async () => {
            try {
                const items = await getCartItems()
                const count = items ? items.length : 0
                setCartCount(count)
            } catch (err) {
                console.error('Failed to fetch cart:', err)
            }
        }

        window.addEventListener('cart-updated', handleCartUpdate)
        return () => window.removeEventListener('cart-updated', handleCartUpdate)
    }, [])

    return (
        <>
            <Box style={{
                borderBottom: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-navbar-bg)'
            }}>
                <Container size="lg" py="sm">
                    <Group justify="space-between">
                        {/* Store title - clickable to go home */}
                        <Title
                            order={3}
                            style={{ cursor: 'pointer', color: 'var(--color-primary-dark)' }}
                            onClick={() => navigate('/')}
                        >
                            L E A P
                        </Title>

                        {/* Navigation icons */}
                        <Group gap="sm">
                            {/* Order history button */}
                            <ActionIcon
                                variant="filled"
                                size="lg"
                                onClick={() => navigate('/orders')}
                                title="Order History"
                                data-testid="orders-button"
                            >
                                <FaReceipt size={18} />
                            </ActionIcon>

                            {/* Cart button with item count indicator */}
                            <Indicator
                                label={cartCount}
                                size={18}
                                disabled={cartCount === 0}
                                styles={{ indicator: { '--indicator-color': 'var(--color-cart-indicator)' } }}
                            >
                                <ActionIcon
                                    variant="filled"
                                    size="lg"
                                    onClick={() => setCartOpened(true)}
                                    title="Cart"
                                    data-testid="cart-button"
                                >
                                    <FaShoppingCart size={18} />
                                </ActionIcon>
                            </Indicator>
                        </Group>
                    </Group>
                </Container>
            </Box>

            {/* Cart sidebar */}
            <CartSidebar
                opened={cartOpened}
                onClose={() => setCartOpened(false)}
            />
        </>
    )
}

export default Navbar