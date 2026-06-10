import { supabase } from '../lib/supabase'

// Fetch all products with their variants
export async function getProducts() {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            variants:product_variants (
                id,
                size,
                color,
                inventory_count,
                sku
            )
        `)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

// Fetch a single product by ID with its variants
export async function getProductById(id) {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            variants:product_variants (
                id,
                size,
                color,
                inventory_count,
                sku
            )
        `)
        .eq('id', id)
        .single()

    if (error) throw error
    return data
}

// Fetch products by category with variants (for related products)
export async function getProductsByCategory(category, excludeId = null) {
    let query = supabase
        .from('products')
        .select(`
            *,
            variants:product_variants (
                id,
                size,
                color,
                inventory_count,
                sku
            )
        `)
        .eq('category', category)
        .order('created_at', { ascending: false })
        .limit(4)

    // Exclude current product when fetching related products
    if (excludeId) {
        query = query.neq('id', excludeId)
    }

    const { data, error } = await query

    if (error) throw error
    return data
}

// Check if ALL variants are out of stock (for Home page badge)
export function isCompletelyOutOfStock(product) {
    if (!product.variants || product.variants.length === 0) {
        // No variants means we can't determine stock
        return true
    }
    return product.variants.every(v => v.inventory_count === 0)
}

// Get unique sizes from variants (in increasing order)
export function getAvailableSizes(variants) {
    const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    const sizes = variants
        .filter(v => v.size !== null)
        .map(v => v.size)
    return [...new Set(sizes)].sort((a, b) =>
        sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
    )
}

// Get unique colors from variants
export function getAvailableColors(variants) {
    const colors = variants
        .filter(v => v.color !== null)
        .map(v => v.color)
    return [...new Set(colors)]
}

// Find a specific variant by size and color
export function findVariant(variants, size, color) {
    return variants.find(v =>
        (v.size === size || (v.size === null && size === null)) &&
        (v.color === color || (v.color === null && color === null))
    )
}