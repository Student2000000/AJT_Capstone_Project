import { Group, ActionIcon, Container, Title, Box } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaReceipt } from 'react-icons/fa'
import { useState } from 'react'
import CartSidebar from '../cart/CartSidebar'

function Navbar() {
    const navigate = useNavigate()
    const [cartOpened, setCartOpened] = useState(false)

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

                            {/* Cart button */}
                            <ActionIcon
                                variant="filled"
                                size="lg"
                                onClick={() => setCartOpened(true)}
                                title="Cart"
                                data-testid="cart-button"
                            >
                                <FaShoppingCart size={18} />
                            </ActionIcon>
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