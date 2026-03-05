import axios from 'axios'

const BASE_URL = 'http://192.168.0.10:5000/api'

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

export async function getFeedback() {
  const res = await apiClient.get('/feedback/get')
  return res.data.data || []
}

// Add this function to your existing apiClient.js file

export async function sendContactEmail({ name, email, description, file }) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("description", description);
  if (file) {
    formData.append("file", file);
  }

  const res = await apiClient.post("/email/solidlabs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export const getClients = async () => {
  const res = await apiClient.get("/clients/list");
  return res.data.data || res.data || [];
};

export default apiClient