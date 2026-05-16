import { useState } from 'react'
import { Image, Group, Box } from '@mantine/core'

function ProductGallery({ product }) {
    // For now, we only have one image per product
    // This component is structured to support multiple images in the future
    const [selectedImage, setSelectedImage] = useState(product.image_url)

    // Placeholder for multiple images - future enhancement
    const images = [product.image_url].filter(Boolean)

    return (
        <Box>
            {/* Main image display */}
            <Image
                src={selectedImage}
                alt={product.name}
                height={400}
                radius="md"
                fallbackSrc="https://placehold.co/400x400?text=No+Image"
                style={{ border: '1px solid #dee2e6' }}
            />

            {/* Thumbnail strip - only show if multiple images exist */}
            {images.length > 1 && (
                <Group mt="md" gap="xs">
                    {images.map((img, index) => (
                        <Image
                            key={index}
                            src={img}
                            alt={`${product.name} view ${index + 1}`}
                            height={60}
                            width={60}
                            radius="sm"
                            style={{
                                cursor: 'pointer',
                                border: selectedImage === img
                                    ? '2px solid #228be6'
                                    : '1px solid #dee2e6',
                                opacity: selectedImage === img ? 1 : 0.7
                            }}
                            onClick={() => setSelectedImage(img)}
                        />
                    ))}
                </Group>
            )}
        </Box>
    )
}

export default ProductGallery