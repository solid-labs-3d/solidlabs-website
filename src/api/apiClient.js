import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'

// ─── Axios instance ──────────────────────────────────────────────────────────
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Products ────────────────────────────────────────────────────────────────

/**
 * GET /api/products/:id
 * Fetch a single product by its numeric ID
 * Response shape: { success: true, data: { id, sku, name, slug, description, price, category, material, stock, image_url } }
 * @param {number|string} id
 * @returns {Promise<Object>} product data object
 */
export async function getProductById(id) {
  const { data } = await apiClient.get(`/products/${id}`)
  return data.data
}

/**
 * GET /api/products
 * Fetch all products
 * @returns {Promise<Array>} array of product objects
 */
export async function getAllProducts() {
  const { data } = await apiClient.get('/products')
  return data.data
}

/**
 * GET /api/products?category=originals
 * Fetch products filtered by category
 * @param {string} category
 * @returns {Promise<Array>} filtered array of product objects
 */
export async function getProductsByCategory(category) {
  const res = await apiClient.get(`/products?category=${category}`)
  return res.data.data || []
}

export async function getProductsByCategoryName(category) {
  const res = await apiClient.get(`/products/category/${category}`)
  return res.data.data || []
}


// ─── CART ─────────────────────────────────────────

export async function createCart() {
  const { data } = await apiClient.post("/cart/carts/create")
  return data.data
}

export async function updateCart(cart_id, product_id, action) {
  const { data } = await apiClient.post("/cart/update", {
    cart_id,
    product_id,
    action
  })
  return data
}

export default apiClient