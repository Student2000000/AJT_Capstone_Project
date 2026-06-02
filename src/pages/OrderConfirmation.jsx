import { Container, Title, Text, Button, Center, Stack } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'

function OrderConfirmation() {
    const navigate = useNavigate()

    return (
        <Container size="sm" py="xl">
            <Center>
                <Stack align="center" gap="md">
                    <FaCheckCircle size={64} color="green" />
                    <Title order={1}>Order Confirmed!</Title>
                    <Text c="dimmed" ta="center">
                        Thank you for your purchase. You'll receive a confirmation email shortly.
                    </Text>
                    <Button onClick={() => navigate('/')}>
                        Continue Shopping
                    </Button>
                </Stack>
            </Center>
        </Container>
    )
}

export default OrderConfirmation