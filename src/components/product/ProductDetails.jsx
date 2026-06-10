import { Text, Table } from '@mantine/core'

function ProductDetails({ product, selectedVariant }) {
    // Build details object from product data
    // Falls back to 'N/A' if no value exists in database
    const details = {
        'Material': product.material || 'N/A',
        'Care': product.care || 'N/A',
        // Add SKU if a variant is selected
        ...(selectedVariant?.sku && { 'SKU': selectedVariant.sku })
    }

    return (
        <div>
            <Text fw={500} mb="sm" style={{ color: 'var(--color-primary-dark)' }}>Product Details</Text>

            {/* Mantine Table structure: Table > Table.Tbody > Table.Tr > Table.Td */}
            {/* Tbody = table body, Tr = table row, Td = table cell */}
            <Table>
                <Table.Tbody>
                    {/* Loop through details object, each entry becomes a row */}
                    {/* Object.entries converts { Material: 'Cotton' } to ['Material', 'Cotton'] */}
                    {Object.entries(details).map(([label, value]) => (
                        <Table.Tr key={label}>
                            {/* Left cell: the label (Material, Care, SKU) */}
                            <Table.Td style={{ width: '120px' }}>
                                <Text c="dimmed" size="sm">{label}</Text>
                            </Table.Td>
                            {/* Right cell: the value */}
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