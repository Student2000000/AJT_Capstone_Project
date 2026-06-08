import { useState } from 'react'
import { Image, Group, Box, Stack } from '@mantine/core'

function ProductGallery({ product }) {
    // Build array of images from product data
    // Only include valid URLs (not null, undefined, or empty strings)
    const images = [
        product.image_url,
        product.image_url_2,
        product.image_url_3,
        product.image_url_4
    ].filter(img => img && typeof img === 'string' && img.trim() !== '')

    const [selectedIndex, setSelectedIndex] = useState(0)

    // If no valid images, just show the main one with fallback
    if (images.length === 0) {
        return (
            <Box>
                <Image
                    src={product.image_url}
                    alt={product.name}
                    height={400}
                    fit="contain"
                    radius="md"
                    fallbackSrc="https://placehold.co/400x400?text=No+Image"
                    style={{ border: '1px solid #dee2e6' }}
                />
            </Box>
        )
    }

    return (
        <Group align="flex-start" gap="md">
            {/* Thumbnail column - only show if multiple valid images exist */}
            {images.length > 1 && (
                <Stack gap="xs">
                    {images.map((img, index) => (
                        <Image
                            key={index}
                            src={img}
                            alt={`${product.name} view ${index + 1}`}
                            height={70}
                            width={70}
                            radius="sm"
                            fit="contain"
                            style={{
                                cursor: 'pointer',
                                border: selectedIndex === index
                                    ? '2px solid #228be6'
                                    : '1px solid #dee2e6',
                                opacity: selectedIndex === index ? 1 : 0.7
                            }}
                            onClick={() => setSelectedIndex(index)}
                        />
                    ))}
                </Stack>
            )}

            {/* Main image display */}
            <Box style={{ flex: 1 }}>
                <Image
                    src={images[selectedIndex]}
                    alt={product.name}
                    height={400}
                    fit="contain"
                    radius="md"
                    fallbackSrc="https://placehold.co/400x400?text=No+Image"
                    style={{ border: '1px solid #dee2e6' }}
                />
            </Box>
        </Group>
    )
}

export default ProductGallery