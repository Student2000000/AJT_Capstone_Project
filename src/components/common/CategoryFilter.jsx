import { Grid, Button, Box, Text } from '@mantine/core'

function CategoryFilter({ selectedCategory, onCategoryChange }) {
    return(
        // pb="md" just makes the spacing match the style in theme.spcing
        <Box pb="md">
            {/*Just text, nothing special*/}
            <Text size="sm" fw={500} ta="left">
                Filter by category:
            </Text>

            {/*manually construted a grid of buttons */}
            {/*Added onClick and variant for filtering functionality*/}
            <Grid>
                <Grid.Col span={2.5}>
                    <Button fullWidth variant={selectedCategory === 'all' ? 'filled' : 'outline'} onClick={() => onCategoryChange('all')}>All</Button>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Button fullWidth variant={selectedCategory === 'apparel' ? 'filled' : 'outline'} onClick={() => onCategoryChange('apparel')}>Apparel</Button>
                </Grid.Col>
                <Grid.Col span={3.5}>
                    <Button fullWidth variant={selectedCategory === 'accessories' ? 'filled' : 'outline'} onClick={() => onCategoryChange('accessories')}>Accessories</Button>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Button fullWidth variant={selectedCategory === 'stationery' ? 'filled' : 'outline'} onClick={() => onCategoryChange('stationery')}>Stationery</Button>
                </Grid.Col>
            </Grid>
        </Box>
    )
} 
export default CategoryFilter;