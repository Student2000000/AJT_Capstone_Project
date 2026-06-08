import { Autocomplete, Text, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function SearchBar({ products }) {

    const navigate = useNavigate();

    // Handle when user selects a product from dropdown
    const handleSelect = (value) => {
        const selected = products.find(p => p.name === value);
        if (selected) {
            navigate(`/product/${selected.id}`);
        }
    };

    return (
        <Box pb="md">
            <Text size="sm" fw={500} ta="left">
                Search Products:
            </Text>
            <Autocomplete shadow="sm" padding="lg" radius="md"
            /*for Cypress*/
            data-testid="search-bar"
            /*what will exist in the textbox before the use types anything.*/
            placeholder="Search..."
            /*Now using products from database instead of hardcoded list*/
            data={(products || []).map(p => p.name)}
            /*Navigate to product page when selected*/
            onOptionSubmit={handleSelect}
            /*Makes sure that clicking the icon passes the focus through the input feild*/
            leftSectionPointerEvents="none"
            /*Only matches from start of words, not middle*/
            filter={({ options, search }) =>
                options.filter(option =>
                    option.value.toLowerCase().split(' ').some(word =>
                        word.startsWith(search.toLowerCase())
                    )
                )
            }
            /*Adds shadow to dropdown for better visibility*/
            comboboxProps={{ shadow: 'md' }}
        />
        </Box>
    );
}
export default SearchBar;