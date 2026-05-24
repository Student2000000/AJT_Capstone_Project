import { useEffect, useState } from 'react';
import { Drawer, Stack, Text } from '@mantine/core';

import { getCartItems } from '../../services/cart';
import CartCard from './CartCard';

export default function CartSidebar({ opened, onClose }) {
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

    return (
            <Drawer
                opened={opened}
                onClose={onClose}
                title="Your Cart"
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
                            />
                        ))
                    )}
                </Stack>
            </Drawer>
    );
}

