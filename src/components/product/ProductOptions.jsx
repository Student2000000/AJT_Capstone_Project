import { Button, Group, Text, ColorSwatch } from '@mantine/core'
import { getAvailableSizes, getAvailableColors } from '../../services/products'

// Map color names to hex values for the swatches
const colorMap = {
    'Navy': '#1a365d',
    'Gray': '#718096',
    'Black': '#1a202c',
    'White': '#ffffff',
    'Red': '#c53030',
    'Green': '#276749',
    'Natural': '#f5f0e6',
    'Blue Ink': '#2b6cb0',
    'Black Ink': '#1a202c',
    'Multicolor': 'linear-gradient(90deg, red, orange, yellow, green, blue, purple)'
}

function ProductOptions({ product, selectedSize, setSelectedSize, selectedColor, setSelectedColor }) {
    const sizes = getAvailableSizes(product.variants)
    const colors = getAvailableColors(product.variants)

    // Check if a size has ANY available color in stock
    const isSizeAvailable = (size) => {
        return product.variants.some(v =>
            v.size === size && v.inventory_count > 0
        )
    }

    // Check if a color has ANY available size in stock
    const isColorAvailable = (color) => {
        return product.variants.some(v =>
            v.color === color && v.inventory_count > 0
        )
    }

    return (
        <div>
            {/* Size selector - only show if product has size variants */}
            {sizes.length > 0 && (
                <div>
                    <Text fw={500} mb="xs">Size</Text>
                    {/* Group wraps buttons horizontally with spacing */}
                    <Group gap="xs" mb="md">
                        {sizes.map(size => (
                            <Button
                                key={size}
                                // variant changes style: filled (selected) vs outline (not selected)
                                variant={selectedSize === size ? 'filled' : 'outline'}
                                color="dark"
                                size="sm"
                                onClick={() => setSelectedSize(size)}
                                // Disable if no stock for this size in any color
                                disabled={!isSizeAvailable(size)}
                            >
                                {size}
                            </Button>
                        ))}
                    </Group>
                </div>
            )}

            {/* Color selector - only show if product has color variants */}
            {colors.length > 0 && (
                <div>
                    <Text fw={500} mb="xs">Color</Text>
                    <Group gap="xs" mb="md">
                        {colors.map(color => (
                            <ColorSwatch
                                key={color}
                                color={colorMap[color] || '#gray'}
                                size={36}
                                // Add border when selected
                                style={{
                                    cursor: isColorAvailable(color) ? 'pointer' : 'not-allowed',
                                    opacity: isColorAvailable(color) ? 1 : 0.4,
                                    border: selectedColor === color ? '3px solid #228be6' : '1px solid #dee2e6'
                                }}
                                onClick={() => {
                                    if (isColorAvailable(color)) {
                                        setSelectedColor(color)
                                    }
                                }}
                                title={color}
                            />
                        ))}
                    </Group>
                    {/* Show selected color name */}
                    {selectedColor && (
                        <Text size="sm" c="dimmed">{selectedColor}</Text>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProductOptions