import axios from 'axios'

const api = axios.create({
    // baseURL:"http://ecomserver.structureinfotech.com",
    baseURL:"http://localhost:5000",
    headers:{
        Accept: "application/json",
        'Content-Type': 'application/json',
    },
    withCredentials:true
})

// ================== Auth ==================
export const login = (data) => api.post('/login',data);
export const userData = () => api.get('/user');
export const register = (data) => api.post('/register',data);
export const logout = () => api.get('/logout');
export const updateUser = (data) => api.post('/updateUser',data);

// ================= Categories & SubCategories ================
export const categories = () => api.get('/categories')
export const subcategories = (category) => api.get(`/subcategories/${category}`);

// ==================== Cart ==================
export const cartGet = (user) => api.get(`/cart/${user}`);
export const addToCart = (data) => api.post('/cart',data)
export const deleteCart = (data) => api.post('/deletecart',data)

// ======================== Products =========================
export const products = (subCategory,populer) => api.get(`/products/${subCategory}`)
export const product = (id) => api.get(`/product/${id}`)
export const Populerproducts = (toys) => api.get(`/populerProduct?toys=${toys}`)

// ========================== AddOreders ==========================
export const addOrder = (data) => api.post('/orders',data)
export const Orders = () => api.get('/orders')

// ===================== Countries =========================
export const countries = () => api.get('/countries')