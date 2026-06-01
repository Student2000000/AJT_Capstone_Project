import { supabase } from '../lib/supabase'
import { getCartItems, clearCart, calculateCartTotal } from './cart'

// Create a new order from current cart (guest checkout - no auth required)
export async function createOrder() {
    // Get current cart items
    const cartItems = await getCartItems()

    if (!cartItems || cartItems.length === 0) {
        throw new Error('Cart is empty')
    }

    // Calculate total
    const total = calculateCartTotal(cartItems)

    // Create the order (user_id is null for guest checkout)
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            user_id: null,
            total: total,
            status: 'paid'
        })
        .select()
        .single()

    if (orderError) throw orderError

    // Create order items (includes variant_id for size/color tracking)
    const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        price_at_purchase: item.products.price
    }))

    const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

    if (itemsError) throw itemsError

    // Decrement inventory for each purchased item
    for (const item of cartItems) {
        const newCount = item.product_variants.inventory_count - item.quantity
        await supabase
            .from('product_variants')
            .update({ inventory_count: newCount })
            .eq('id', item.variant_id)
    }

    // Clear the cart after successful order
    await clearCart()

    return order
}

// Get all orders (for admin/testing - no auth filter)
export async function getOrders() {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            id,
            status,
            total,
            pickup_confirmed,
            created_at,
            order_items (
                id,
                quantity,
                price_at_purchase,
                variant_id,
                products (
                    name,
                    image_url
                ),
                product_variants (
                    size,
                    color
                )
            )
        `)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

// Get single order by ID
export async function getOrderById(orderId) {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            id,
            status,
            total,
            pickup_confirmed,
            created_at,
            order_items (
                id,
                quantity,
                price_at_purchase,
                variant_id,
                products (
                    name,
                    image_url
                ),
                product_variants (
                    size,
                    color
                )
            )
        `)
        .eq('id', orderId)
        .single()

    if (error) throw error
    return data
}