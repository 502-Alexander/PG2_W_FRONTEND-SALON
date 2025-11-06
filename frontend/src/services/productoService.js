// Servicio para manejar las operaciones de productos con el backend
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://backend-pw-wh30.onrender.com/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Servicio de productos
export const productoService = {
  // Obtener todos los productos
  async obtenerProductos() {
    try {
      const response = await api.get('/productos')
      return response.data.data
    } catch (error) {
      throw new Error(error.response?.data?.mensaje || 'Error al obtener productos')
    }
  },

  // Obtener un producto por ID
  async obtenerProducto(id) {
    try {
      const response = await api.get(`/productos/${id}`)
      return response.data.data
    } catch (error) {
      throw new Error(error.response?.data?.mensaje || 'Error al obtener el producto')
    }
  },

  // Obtener categorías
  async obtenerCategorias() {
    try {
      const response = await api.get('/categorias')
      return response.data.data
    } catch (error) {
      throw new Error(error.response?.data?.mensaje || 'Error al obtener categorías')
    }
  }
}
