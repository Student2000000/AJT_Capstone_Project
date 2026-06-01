import { Autocomplete } from '@mantine/core';
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
        <Autocomplete shadow="sm" padding="lg" radius="md"
            /*for Cypress*/
            data-testid="search-bar"
            /*Search for products*/
            label="Search Products:"
            /*what will exist in the textbox before the use types anything.*/
            placeholder="Search..."
            /*Now using products from database instead of hardcoded list*/
            data={products.map(p => p.name)}
            /*Navigate to product page when selected*/
            onOptionSubmit={handleSelect}
            /*Makes sure that clicking the icon passes the focus through the input feild*/
            leftSectionPointerEvents="none"
            /*Somehow adds theme based med padding to the bottom only??*/
            pb="md"
            /*Limit dropdown to 5 suggestions*/
            limit={5}
        />
    );
}
export default SearchBar;