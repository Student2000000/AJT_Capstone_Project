import { Text, Table } from '@mantine/core'

// Default details by category
const categoryDetails = {
    apparel: {
        'Material': '80% Cotton, 20% Polyester',
        'Fit': 'Regular Fit',
        'Care': 'Machine wash cold'
    },
    accessories: {
        'Material': 'Various',
        'Care': 'See product label'
    },
    stationery: {
        'Material': 'Paper/Plastic',
        'Care': 'Keep dry'
    }
}

function ProductDetails({ product, selectedVariant }) {
    // Get default details based on category
    const defaults = categoryDetails[product.category] || {}

    // Build details object - add SKU if a variant is selected
    const details = {
        ...defaults,
        ...(selectedVariant?.sku && { 'SKU': selectedVariant.sku })
    }

    return (
        <div>
            <Text fw={500} mb="sm">Product Details</Text>

            {/* Table displays details in a clean two-column format */}
            <Table>
                <Table.Tbody>
                    {Object.entries(details).map(([label, value]) => (
                        <Table.Tr key={label}>
                            {/* First column: label */}
                            <Table.Td style={{ width: '120px' }}>
                                <Text c="dimmed" size="sm">{label}</Text>
                            </Table.Td>
                            {/* Second column: value */}
                            <Table.Td>
                                <Text size="sm">{value}</Text>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </div>
    )
}

export default ProductDetails