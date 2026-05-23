import { Autocomplete } from '@mantine/core';

function SearchBar() {

    return (
        <Autocomplete shadow="sm" padding="lg" radius="md"
            /*for Cypress*/
            data-testid="search-bar"
            /*Search for products*/
            label="Search Products:"
            /*what will exist in the textbox before the use types anything.*/
            placeholder="Search..."
            /*Entered everything manually for now*/
            data={['Classic Hoodie', 'Crewneck Sweatshirt', 'T-Shirt', 'Water Bottle', 'Laptop Sticker Pack', 'Lanyard', 'Tote Bag', 'Beanie', 'Baseball Cap', 'Notebook', 'Pen Set', 'Coffee Mug']}
            /*Makes sure that clicking the icon passes the focus through the input feild*/
            leftSectionPointerEvents="none"
            /*Somehow adds theme based med padding to the bottom only??*/
            pb="md"
        />
    );
}
export default SearchBar;