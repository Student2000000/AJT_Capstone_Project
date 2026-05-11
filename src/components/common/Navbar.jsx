import { Grid, Button, Box, Text } from '@mantine/core'

function Navbar({}) {
    return(
        // pb="md" just makes the spacing match the style in theme.spcing
        <Box pb="md">
            {/*Just text, nothing special*/} 
            <Text size="sm" fw={500} ta="left">
                Filter by category:
            </Text>

            {/*manually construted a grid of buttons */}
            <Grid>
                <Grid.Col span={3.5}><Button fullWidth>Apperal</Button></Grid.Col>
                <Grid.Col span={4}><Button fullWidth>Accessories</Button></Grid.Col>
                <Grid.Col span={3.5}><Button fullWidth>Stationery</Button></Grid.Col>
            </Grid>

        </Box>

    )
} 

export default Navbar;
