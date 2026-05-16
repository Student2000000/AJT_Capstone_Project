import { supabase } from '../lib/supabase'

// Get current user's cart items with product and variant details
export async function getCartItems() {
    const { data, error } = await supabase
        .from('cart_items')
        .select(`
            id,
            quantity,
            variant_id,
            product_id,
            products (
                id,
                name,
                price,
                image_url,
                category
            ),
            product_variants (
                id,
                size,
                color,
                inventory_count,
                sku
            )
        `)

    if (error) throw error
    return data
}

// Add item to cart by variant ID (or update quantity if already exists)
export async function addToCart(variantId, productId, quantity = 1) {
    // First check if this variant already exists in cart
    const { data: existingItem } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('variant_id', variantId)
        .single()

    if (existingItem) {
        // Update quantity
        const { data, error } = await supabase
            .from('cart_items')
            .update({ quantity: existingItem.quantity + quantity })
            .eq('id', existingItem.id)
            .select()

        if (error) throw error
        return data
    } else {
        // Insert new item
        const { data, error } = await supabase
            .from('cart_items')
            .insert({
                variant_id: variantId,
                product_id: productId,
                quantity
            })
            .select()

        if (error) throw error
        return data
    }
}

// Update cart item quantity
export async function updateCartItemQuantity(cartItemId, quantity) {
    if (quantity <= 0) {
        return removeFromCart(cartItemId)
    }

    const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId)
        .select()

    if (error) throw error
    return data
}

// Remove item from cart
export async function removeFromCart(cartItemId) {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId)

    if (error) throw error
    return true
}

// Clear entire cart
export async function clearCart() {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000')

    if (error) throw error
    return true
}

// Calculate cart total
export function calculateCartTotal(cartItems) {
    return cartItems.reduce((total, item) => {
        return total + (item.products.price * item.quantity)
    }, 0)
}

// Get cart item count (total number of items)
export function getCartItemCount(cartItems) {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
}