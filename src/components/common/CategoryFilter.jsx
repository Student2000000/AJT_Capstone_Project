import { Button, Group } from '@mantine/core'

function CategoryFilter({ selectedCategory, onCategoryChange }) {
    return(
        // Group of filter buttons - parent Group in Home.jsx handles alignment
        // Using Group instead of Grid so buttons size to content
        // Added onClick and variant for filtering functionality
        <Group gap="xs">
            <Button variant={selectedCategory === 'all' ? 'filled' : 'outline'} onClick={() => onCategoryChange('all')}>All</Button>
            <Button variant={selectedCategory === 'apparel' ? 'filled' : 'outline'} onClick={() => onCategoryChange('apparel')}>Apparel</Button>
            <Button variant={selectedCategory === 'accessories' ? 'filled' : 'outline'} onClick={() => onCategoryChange('accessories')}>Accessories</Button>
            <Button variant={selectedCategory === 'stationery' ? 'filled' : 'outline'} onClick={() => onCategoryChange('stationery')}>Stationery</Button>
        </Group>
    )
} 
export default CategoryFilter;