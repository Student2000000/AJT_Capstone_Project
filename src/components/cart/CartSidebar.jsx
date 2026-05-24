import { useEffect, useState } from 'react';
import { Drawer, Stack, Text, Button } from '@mantine/core';

import { getCartItems } from '../../services/cart';

export default function CartSidebar({ opened, onClose }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (opened) {
            loadCart();
        }
    }, [opened]);

    async function loadCart() {
        const data = await getCartItems();
        setItems(data || []);
    }

    return (
        <>
            <Drawer
                opened={opened}
                onClose={onClose}
                title="Your Cart"
                position='left'
                padding={"md"}
            >
            </Drawer>
        </>
    )
}

