// Servicio para manejar las operaciones de servicios con el backend
import axios from 'axios';

// Configuración base de axios
const API_BASE_URL = 'https://backend-14-zmcj.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Importante para CORS
  timeout: 10000 // Tiempo de espera de 10 segundos
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // El servidor respondió con un estado de error
      console.error('Error de respuesta del servidor:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      // Algo sucedió en la configuración de la solicitud
      console.error('Error al configurar la solicitud:', error.message);
    }
    return Promise.reject(error);
  }
);

// Servicio de servicios
export const servicioService = {
  // Obtener todos los servicios
  async obtenerServicios() {
    try {
      console.log('🔍 Solicitando servicios a la API...')
      const response = await api.get('/servicios')
      console.log('📡 Respuesta de la API (raw):', response.data)
      
      // Manejar diferentes formatos de respuesta
      let servicios = [];
      
      if (Array.isArray(response.data)) {
        // Si la respuesta es un array directo
        servicios = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        // Si la respuesta es { data: [...] }
        servicios = response.data.data;
      } else if (response.data && response.data.servicios) {
        // Si la respuesta es { servicios: [...] }
        servicios = response.data.servicios;
      }
      
      console.log('✅ Servicios obtenidos:', servicios.length)
      return servicios;
    } catch (error) {
      console.error('❌ Error obteniendo servicios:', error);
      console.error('Detalles del error:', error.response?.data || error.message);
      return [];
    }
  },

  // Obtener servicio por ID
  async obtenerServicioPorId(id) {
    try {
      const response = await api.get(`/servicios/${id}`)
      return response.data.data
    } catch (error) {
      console.error('Error obteniendo servicio:', error.message)
      return null
    }
  },

  // Obtener todos los combos
  async obtenerCombos() {
    try {
      console.log('🔄 Solicitando combos a la API...');
      const response = await api.get('/servicios/combos', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      console.log('📡 Respuesta de combos:', response);
      
      // Manejar diferentes formatos de respuesta
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      } else if (response.data && response.data.combos) {
        return response.data.combos;
      }
      
      console.warn('⚠️ Formato de respuesta inesperado para combos:', response.data);
      return [];
    } catch (error) {
      console.error('❌ Error obteniendo combos:', error);
      console.error('Detalles del error:', error.response?.data || error.message);
      return [];
    }
  },

  // Obtener combo por ID
  async obtenerComboPorId(id) {
    try {
      const response = await api.get(`/servicios/combos/${id}`)
      return response.data.data
    } catch (error) {
      console.error('Error obteniendo combo:', error.message)
      return null
    }
  },

  // Crear servicio (solo admin)
  async crearServicio(servicioData) {
    try {
      const response = await api.post('/servicios', servicioData)
      return response.data
    } catch (error) {
      console.error('Error creando servicio:', error.message)
      throw error
    }
  },

  // Crear combo (solo admin)
  async crearCombo(comboData) {
    try {
      const response = await api.post('/servicios/combos', comboData)
      return response.data
    } catch (error) {
      console.error('Error creando combo:', error.message)
      throw error
    }
  },

  // Actualizar servicio (solo admin)
  async actualizarServicio(id, servicioData) {
    try {
      const response = await api.put(`/servicios/${id}`, servicioData)
      return response.data
    } catch (error) {
      console.error('Error actualizando servicio:', error.message)
      throw error
    }
  },

  // Actualizar combo (solo admin)
  async actualizarCombo(id, comboData) {
    try {
      const response = await api.put(`/servicios/combos/${id}`, comboData)
      return response.data
    } catch (error) {
      console.error('Error actualizando combo:', error.message)
      throw error
    }
  },

  // Eliminar servicio (solo admin)
  async eliminarServicio(id) {
    try {
      const response = await api.delete(`/servicios/${id}`)
      return response.data
    } catch (error) {
      console.error('Error eliminando servicio:', error.message)
      throw error
    }
  },

  // Eliminar combo (solo admin)
  async eliminarCombo(id) {
    try {
      const response = await api.delete(`/servicios/combos/${id}`)
      return response.data
    } catch (error) {
      console.error('Error eliminando combo:', error.message)
      throw error
    }
  }
}

export default servicioService
