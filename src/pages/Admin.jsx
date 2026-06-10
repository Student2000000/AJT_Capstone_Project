import { useEffect, useState } from 'react'
import {
    Container, Title, Text, Loader, Center, Button, Table,
    Tabs, Group, Card, Modal, TextInput, NumberInput
} from '@mantine/core'
import { getProducts } from '../services/products'

function Admin() {

    /**
     * ---------------------------------------------------------
     * STATE MANAGEMENT
     * ---------------------------------------------------------
     */

    // Real product data from Supabase
    const [products, setProducts] = useState([])

    // Loading + error states for initial fetch
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Which admin tab is active
    const [activeTab, setActiveTab] = useState("overview")

    // Modal visibility states
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    // Form state for create/edit
    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        category: ""
    })

    // Track which product is being edited or deleted
    const [selectedProduct, setSelectedProduct] = useState(null)


    /**
     * ---------------------------------------------------------
     * FETCH PRODUCTS ON PAGE LOAD
     * ---------------------------------------------------------
     */
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts()
                setProducts(data)
            } catch (err) {
                setError(err.message)
            }
            setLoading(false)
        }

        fetchProducts()
    }, [])


    /**
     * ---------------------------------------------------------
     * LOADING + ERROR STATES
     * ---------------------------------------------------------
     */
    if (loading) {
        return (
            <Center h={400}>
                <Loader size="lg" />
            </Center>
        )
    }

    if (error) {
        return (
            <Container size="lg" py="xl">
                <Text c="red">Error: {error}</Text>
            </Container>
        )
    }


    /**
     * ---------------------------------------------------------
     * MOCK CRUD HANDLERS
     * ---------------------------------------------------------
     *
     * These DO NOT talk to Supabase.
     * They only update local state for demo purposes.
     */

    // CREATE PRODUCT (mock)
    const handleCreateProduct = () => {
        const newProduct = {
            id: crypto.randomUUID(),
            ...formData
        }

        setProducts([...products, newProduct])
        setCreateModalOpen(false)
        setFormData({ name: "", price: 0, category: "" })
    }

    // OPEN EDIT MODAL
    const openEditModal = (product) => {
        setSelectedProduct(product)
        setFormData(product)
        setEditModalOpen(true)
    }

    // EDIT PRODUCT (mock)
    const handleEditProduct = () => {
        const updated = products.map((p) =>
            p.id === selectedProduct.id ? { ...p, ...formData } : p
        )

        setProducts(updated)
        setEditModalOpen(false)
    }

    // DELETE PRODUCT (mock)
    const handleDeleteProduct = () => {
        const filtered = products.filter((p) => p.id !== selectedProduct.id)
        setProducts(filtered)
        setDeleteModalOpen(false)
    }

    // Shared style for primary dark text
    const primaryDarkStyle = { color: 'var(--color-primary-dark)' }

    /**
     * ---------------------------------------------------------
     * MAIN ADMIN UI
     * ---------------------------------------------------------
     */
    return (
        <Container size="lg" py="xl">

            <Title order={1} mb="xs" style={primaryDarkStyle}>Admin Dashboard</Title>
            <Text c="dimmed" mb="xl">Manage your store</Text>

            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List mb="lg">
                    <Tabs.Tab value="overview" style={primaryDarkStyle}>Overview</Tabs.Tab>
                    <Tabs.Tab value="products" style={primaryDarkStyle}>Products</Tabs.Tab>
                    <Tabs.Tab value="users" style={primaryDarkStyle}>Users</Tabs.Tab>
                    <Tabs.Tab value="settings" style={primaryDarkStyle}>Settings</Tabs.Tab>
                </Tabs.List>


                {/* ---------------------------------------------------------
                    OVERVIEW TAB
                --------------------------------------------------------- */}
                <Tabs.Panel value="overview">
                    <Title order={2} mb="md" style={primaryDarkStyle}>Overview</Title>
                    <Text mb="lg" style={primaryDarkStyle}>Quick stats about your store (mock data).</Text>

                    <Group grow>
                        <Card shadow="md" p="lg">
                            <Title order={3} style={primaryDarkStyle}>42</Title>
                            <Text style={primaryDarkStyle}>Total Products</Text>
                        </Card>

                        <Card shadow="md" p="lg">
                            <Title order={3} style={primaryDarkStyle}>17</Title>
                            <Text style={primaryDarkStyle}>Pending Orders</Text>
                        </Card>

                        <Card shadow="md" p="lg">
                            <Title order={3} style={primaryDarkStyle}>128</Title>
                            <Text style={primaryDarkStyle}>Registered Users</Text>
                        </Card>
                    </Group>
                </Tabs.Panel>


                {/* ---------------------------------------------------------
                    PRODUCTS TAB (REAL DATA + MOCK CRUD)
                --------------------------------------------------------- */}
                <Tabs.Panel value="products">
                    <Title order={2} mb="md" style={primaryDarkStyle}>Product Management</Title>

                    <Button mb="lg" onClick={() => setCreateModalOpen(true)}>
                        Add New Product
                    </Button>

                    <Table striped highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th style={primaryDarkStyle}>Name</Table.Th>
                                <Table.Th style={primaryDarkStyle}>Price</Table.Th>
                                <Table.Th style={primaryDarkStyle}>Category</Table.Th>
                                <Table.Th style={primaryDarkStyle}>Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>

                        <Table.Tbody>
                            {products.map((p) => (
                                <Table.Tr key={p.id}>
                                    <Table.Td style={primaryDarkStyle}>{p.name}</Table.Td>
                                    <Table.Td style={primaryDarkStyle}>${p.price}</Table.Td>
                                    <Table.Td style={primaryDarkStyle}>{p.category}</Table.Td>

                                    <Table.Td>
                                        <Button
                                            size="xs"
                                            mr="sm"
                                            variant="light"
                                            onClick={() => openEditModal(p)}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            size="xs"
                                            variant="filled"
                                            styles={{ root: { backgroundColor: 'var(--color-out-of-stock)' } }}
                                            onClick={() => {
                                                setSelectedProduct(p)
                                                setDeleteModalOpen(true)
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Tabs.Panel>

                {/* ---------------------------------------------------------
                    USERS TAB (MOCK)
                --------------------------------------------------------- */}
                <Tabs.Panel value="users">
                    <Title order={2} mb="md" style={primaryDarkStyle}>Users</Title>
                    <Text mb="lg" style={primaryDarkStyle}>Mock user list.</Text>

                    <Table striped highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th style={primaryDarkStyle}>User ID</Table.Th>
                                <Table.Th style={primaryDarkStyle}>Name</Table.Th>
                                <Table.Th style={primaryDarkStyle}>Email</Table.Th>
                                <Table.Th style={primaryDarkStyle}>Role</Table.Th>
                            </Table.Tr>
                        </Table.Thead>

                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td style={primaryDarkStyle}>#1</Table.Td>
                                <Table.Td style={primaryDarkStyle}>John Doe</Table.Td>
                                <Table.Td style={primaryDarkStyle}>john@example.com</Table.Td>
                                <Table.Td style={primaryDarkStyle}>Admin</Table.Td>
                            </Table.Tr>

                            <Table.Tr>
                                <Table.Td style={primaryDarkStyle}>#2</Table.Td>
                                <Table.Td style={primaryDarkStyle}>Jane Smith</Table.Td>
                                <Table.Td style={primaryDarkStyle}>jane@example.com</Table.Td>
                                <Table.Td style={primaryDarkStyle}>User</Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Tabs.Panel>


                {/* ---------------------------------------------------------
                    SETTINGS TAB (MOCK)
                --------------------------------------------------------- */}
                <Tabs.Panel value="settings">
                    <Title order={2} mb="md" style={primaryDarkStyle}>Settings</Title>
                    <Text mb="lg" style={primaryDarkStyle}>Store configuration (mock data).</Text>

                    <Card shadow="md" p="lg" mb="lg">
                        <Title order={4} mb="sm" style={primaryDarkStyle}>Store Information</Title>
                        <Text style={primaryDarkStyle}>Name: Mock Store</Text>
                        <Text style={primaryDarkStyle}>Email: support@mockstore.com</Text>
                        <Button mt="md" variant="light">Edit Store Info</Button>
                    </Card>

                    <Card shadow="md" p="lg" mb="lg">
                        <Title order={4} mb="sm" style={primaryDarkStyle}>Appearance</Title>
                        <Text style={primaryDarkStyle}>Theme: Light</Text>
                        <Button mt="md" variant="light">Change Theme</Button>
                    </Card>

                    <Card shadow="md" p="lg">
                        <Title order={4} mb="sm" style={primaryDarkStyle}>Currency & Pricing</Title>
                        <Text style={primaryDarkStyle}>Default Currency: USD</Text>
                        <Text style={primaryDarkStyle}>Tax Rate: 8.5%</Text>
                        <Button mt="md" variant="light">Edit Pricing Settings</Button>
                    </Card>
                </Tabs.Panel>

            </Tabs>


            {/**
             * ---------------------------------------------------------
             * CREATE PRODUCT MODAL
             * ---------------------------------------------------------
             */}
            <Modal
                opened={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                title={<Text fw={700} style={primaryDarkStyle}>Create Product</Text>}
            >
                <TextInput
                    label="Product Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    mb="md"
                    styles={{ label: primaryDarkStyle }}
                />

                <NumberInput
                    label="Price"
                    value={formData.price}
                    onChange={(value) => setFormData({ ...formData, price: value })}
                    mb="md"
                    styles={{ label: primaryDarkStyle }}
                />

                <TextInput
                    label="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    mb="md"
                    styles={{ label: primaryDarkStyle }}
                />

                <Button fullWidth onClick={handleCreateProduct}>
                    Create Product
                </Button>
            </Modal>


            {/**
             * ---------------------------------------------------------
             * EDIT PRODUCT MODAL
             * ---------------------------------------------------------
             */}
            <Modal
                opened={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                title={<Text fw={700} style={primaryDarkStyle}>Edit Product</Text>}
            >
                <TextInput
                    label="Product Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    mb="md"
                    styles={{ label: primaryDarkStyle }}
                />

                <NumberInput
                    label="Price"
                    value={formData.price}
                    onChange={(value) => setFormData({ ...formData, price: value })}
                    mb="md"
                    styles={{ label: primaryDarkStyle }}
                />

                <TextInput
                    label="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    mb="md"
                    styles={{ label: primaryDarkStyle }}
                />

                <Button fullWidth onClick={handleEditProduct}>
                    Save Changes
                </Button>
            </Modal>


            {/**
             * ---------------------------------------------------------
             * DELETE CONFIRMATION MODAL
             * ---------------------------------------------------------
             */}
            <Modal
                opened={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title={<Text fw={700} style={primaryDarkStyle}>Delete Product</Text>}
            >
                <Text mb="md" style={primaryDarkStyle}>
                    Are you sure you want to delete{" "}
                    <strong>{selectedProduct?.name}</strong>?
                </Text>

                <Button
                    fullWidth
                    styles={{ root: { backgroundColor: 'var(--color-out-of-stock)' } }}
                    onClick={handleDeleteProduct}
                >
                    Delete
                </Button>
            </Modal>

        </Container>
    )
}

export default Admin