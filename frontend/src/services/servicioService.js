// Servicio para manejar las operaciones de servicios con el backend
import axios from 'axios';

// ✅ URL base correcta (NO pongas /servicios aquí)
const API_BASE_URL = 'https://backend-14-zmcj.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
  timeout: 10000, // 10 segundos
});

// ===============================
// INTERCEPTOR DE ERRORES GLOBALES
// ===============================
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('❌ Error de respuesta del servidor:', {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error('⚠️ No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('⚙️ Error en la configuración de la solicitud:', error.message);
    }
    return Promise.reject(error);
  }
);

// ===============================
// SERVICIO PRINCIPAL
// ===============================
export const servicioService = {
  // Obtener todos los servicios
  async obtenerServicios() {
    try {
      console.log('📡 Solicitando servicios desde backend...');
      const response = await api.get('/servicios');
      console.log('✅ Respuesta servicios:', response.data);

      if (Array.isArray(response.data)) return response.data;
      if (response.data?.data && Array.isArray(response.data.data)) return response.data.data;
      if (response.data?.servicios) return response.data.servicios;

      console.warn('⚠️ Formato inesperado en servicios:', response.data);
      return [];
    } catch (error) {
      console.error('❌ Error obteniendo servicios:', error.message);
      return [];
    }
  },

  // Obtener servicio por ID
  async obtenerServicioPorId(id) {
    try {
      const response = await api.get(`/servicios/${id}`);
      return response.data?.data || null;
    } catch (error) {
      console.error('❌ Error obteniendo servicio por ID:', error.message);
      return null;
    }
  },

  // Obtener todos los combos
  async obtenerCombos() {
    try {
      console.log('📡 Solicitando combos desde backend...');
      const response = await api.get('/servicios/combos');
      console.log('✅ Respuesta combos:', response.data);

      if (Array.isArray(response.data)) return response.data;
      if (response.data?.data && Array.isArray(response.data.data)) return response.data.data;
      if (response.data?.combos) return response.data.combos;

      console.warn('⚠️ Formato inesperado en combos:', response.data);
      return [];
    } catch (error) {
      console.error('❌ Error obteniendo combos:', error.message);
      return [];
    }
  },

  // Obtener combo por ID
  async obtenerComboPorId(id) {
    try {
      const response = await api.get(`/servicios/combos/${id}`);
      return response.data?.data || null;
    } catch (error) {
      console.error('❌ Error obteniendo combo por ID:', error.message);
      return null;
    }
  },

  // CRUD adicional (admin)
  async crearServicio(servicioData) {
    const response = await api.post('/servicios', servicioData);
    return response.data;
  },

  async crearCombo(comboData) {
    const response = await api.post('/servicios/combos', comboData);
    return response.data;
  },

  async actualizarServicio(id, data) {
    const response = await api.put(`/servicios/${id}`, data);
    return response.data;
  },

  async actualizarCombo(id, data) {
    const response = await api.put(`/servicios/combos/${id}`, data);
    return response.data;
  },

  async eliminarServicio(id) {
    const response = await api.delete(`/servicios/${id}`);
    return response.data;
  },

  async eliminarCombo(id) {
    const response = await api.delete(`/servicios/combos/${id}`);
    return response.data;
  },
};

export default servicioService;

