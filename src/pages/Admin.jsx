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
   * These DO NOT talk to Supabase yet.
   * They only update local state.
   */

  // CREATE PRODUCT (mock)
  const handleCreateProduct = () => {
    const newProduct = {
      id: crypto.randomUUID(), // mock ID
      ...formData
    }

    setProducts([...products, newProduct])
    setCreateModalOpen(false)

    // Reset form
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


  /**
   * ---------------------------------------------------------
   * MAIN ADMIN UI
   * ---------------------------------------------------------
   */
  return (
    <Container size="lg" py="xl">

      <Title order={1} mb="xs">Admin Dashboard</Title>
      <Text c="dimmed" mb="xl">Manage your store</Text>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List mb="lg">
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="products">Products</Tabs.Tab>
          <Tabs.Tab value="orders">Orders</Tabs.Tab>
          <Tabs.Tab value="users">Users</Tabs.Tab>
          <Tabs.Tab value="settings">Settings</Tabs.Tab>
        </Tabs.List>


        {/* ---------------------------------------------------------
            OVERVIEW TAB
        --------------------------------------------------------- */}
        <Tabs.Panel value="overview">
          <Title order={2} mb="md">Overview</Title>
          <Text mb="lg">Quick stats about your store (mock data).</Text>

          <Group grow>
            <Card shadow="sm" p="lg">
              <Title order={3}>42</Title>
              <Text>Total Products</Text>
            </Card>

            <Card shadow="sm" p="lg">
              <Title order={3}>17</Title>
              <Text>Pending Orders</Text>
            </Card>

            <Card shadow="sm" p="lg">
              <Title order={3}>128</Title>
              <Text>Registered Users</Text>
            </Card>
          </Group>
        </Tabs.Panel>


        {/* ---------------------------------------------------------
            PRODUCTS TAB (REAL DATA + MOCK CRUD)
        --------------------------------------------------------- */}
        <Tabs.Panel value="products">
          <Title order={2} mb="md">Product Management</Title>

          <Button mb="lg" onClick={() => setCreateModalOpen(true)}>
            Add New Product
          </Button>

          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {products.map((p) => (
                <Table.Tr key={p.id}>
                  <Table.Td>{p.name}</Table.Td>
                  <Table.Td>${p.price}</Table.Td>
                  <Table.Td>{p.category}</Table.Td>

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
                      color="red"
                      variant="light"
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
            ORDERS TAB (MOCK)
        --------------------------------------------------------- */}
        <Tabs.Panel value="orders">
          <Title order={2} mb="md">Order Management</Title>
          <Text mb="lg">Mock order list.</Text>

          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Order ID</Table.Th>
                <Table.Th>Customer</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Total</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              <Table.Tr>
                <Table.Td>#1001</Table.Td>
                <Table.Td>John Doe</Table.Td>
                <Table.Td>Pending</Table.Td>
                <Table.Td>$89.99</Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>#1002</Table.Td>
                <Table.Td>Jane Smith</Table.Td>
                <Table.Td>Shipped</Table.Td>
                <Table.Td>$129.99</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Tabs.Panel>


        {/* ---------------------------------------------------------
            USERS TAB (MOCK)
        --------------------------------------------------------- */}
        <Tabs.Panel value="users">
          <Title order={2} mb="md">Users</Title>
          <Text mb="lg">Mock user list.</Text>

          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>User ID</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Role</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              <Table.Tr>
                <Table.Td>#1</Table.Td>
                <Table.Td>John Doe</Table.Td>
                <Table.Td>john@example.com</Table.Td>
                <Table.Td>Admin</Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>#2</Table.Td>
                <Table.Td>Jane Smith</Table.Td>
                <Table.Td>jane@example.com</Table.Td>
                <Table.Td>User</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Tabs.Panel>


        {/* ---------------------------------------------------------
            SETTINGS TAB (MOCK)
        --------------------------------------------------------- */}
        <Tabs.Panel value="settings">
          <Title order={2} mb="md">Settings</Title>
          <Text mb="lg">Store configuration (mock data).</Text>

          <Card shadow="sm" p="lg" mb="lg">
            <Title order={4} mb="sm">Store Information</Title>
            <Text>Name: Mock Store</Text>
            <Text>Email: support@mockstore.com</Text>
            <Button mt="md" variant="light">Edit Store Info</Button>
          </Card>

          <Card shadow="sm" p="lg" mb="lg">
            <Title order={4} mb="sm">Appearance</Title>
            <Text>Theme: Light</Text>
            <Button mt="md" variant="light">Change Theme</Button>
          </Card>

          <Card shadow="sm" p="lg">
            <Title order={4} mb="sm">Currency & Pricing</Title>
            <Text>Default Currency: USD</Text>
            <Text>Tax Rate: 8.5%</Text>
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
        title="Create Product"
      >
        <TextInput
          label="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          mb="md"
        />

        <NumberInput
          label="Price"
          value={formData.price}
          onChange={(value) => setFormData({ ...formData, price: value })}
          mb="md"
        />

        <TextInput
          label="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          mb="md"
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
        title="Edit Product"
      >
        <TextInput
          label="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          mb="md"
        />

        <NumberInput
          label="Price"
          value={formData.price}
          onChange={(value) => setFormData({ ...formData, price: value })}
          mb="md"
        />

        <TextInput
          label="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          mb="md"
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
        title="Delete Product"
      >
        <Text mb="md">
          Are you sure you want to delete{" "}
          <strong>{selectedProduct?.name}</strong>?
        </Text>

        <Button color="red" fullWidth onClick={handleDeleteProduct}>
          Delete
        </Button>
      </Modal>

    </Container>
  )
}

export default Admin
