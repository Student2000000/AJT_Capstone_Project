import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, Stack, Text, Button, Divider, Group } from '@mantine/core';

import { getCartItems, updateCartItemQuantity, removeFromCart, calculateCartTotal } from '../../services/cart';
import CartCard from './CartCard';

export default function CartSidebar({ opened, onClose }) {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchCart() {
            try {
                const data = await getCartItems();
                setItems(data || []);
            } catch (err) {
                console.error(err);
            }
        }

        if (opened) {
            fetchCart();
        }
    }, [opened]);

    // Handle quantity update
    const handleUpdateQuantity = async (cartItemId, newQuantity) => {
        try {
            await updateCartItemQuantity(cartItemId, newQuantity);
            setItems(items.map(item =>
                item.id === cartItemId
                    ? { ...item, quantity: newQuantity }
                    : item
            ));
            // Notify other components that cart changed
            window.dispatchEvent(new Event('cart-updated'));
        } catch (err) {
            console.error('Error updating quantity:', err);
        }
    };

    // Handle item removal
    const handleRemove = async (cartItemId) => {
        try {
            await removeFromCart(cartItemId);
            setItems(items.filter(item => item.id !== cartItemId));
            // Notify other components that cart changed
            window.dispatchEvent(new Event('cart-updated'));
        } catch (err) {
            console.error('Error removing item:', err);
        }
    };

    // Handle checkout navigation
    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    };

    // Calculate cart total
    const total = items.length > 0 ? calculateCartTotal(items) : 0;

    return (
            <Drawer
                opened={opened}
                onClose={onClose}
                title={<Text size="xl" fw={700} style={{ color: 'var(--color-primary-dark)' }}>Your Cart</Text>}
                position='right'
                padding={"md"}
            >
                <Stack>
                    {items.length === 0 ? (
                        <Text>Your cart is empty.</Text>
                    ) : (
                        items.map((item) => (
                            <CartCard
                                key={item.id}
                                item={item}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemove={handleRemove}
                            />
                        ))
                    )}
                </Stack>

                {/* Cart footer with total and checkout - added for checkout functionality */}
                {items.length > 0 && (
                    <>
                        <Divider my="sm" />
                        <Group justify="space-between" mb="md" style={{ color: 'var(--color-primary-dark)' }}>
                            <Text fw={700} size="lg">Total</Text>
                            <Text fw={700} size="lg">${total.toFixed(2)}</Text>
                        </Group>
                        <Button fullWidth onClick={handleCheckout}>
                            Proceed to Checkout
                        </Button>
                    </>
                )}
            </Drawer>
    );
}