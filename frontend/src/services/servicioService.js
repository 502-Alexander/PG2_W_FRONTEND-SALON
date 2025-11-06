// Servicio para manejar las operaciones de servicios con el backend
import axios from 'axios';

// Configuración base de axios
const API_BASE_URL = 'https://backend-14-zmcj.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  withCredentials: false,
  timeout: 15000 // Aumentamos el tiempo de espera
});

// Interceptor para manejar errores globalmente
api.interceptors.request.use(config => {
  console.log(`🛫 Enviando petición a: ${config.url}`);
  return config;
}, error => {
  console.error('❌ Error en la petición:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => {
    console.log(`✅ Respuesta recibida de: ${response.config.url}`, response.data);
    return response;
  },
  error => {
    if (error.response) {
      console.error('❌ Error de respuesta del servidor:', {
        status: error.response.status,
        url: error.config.url,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      console.error('❌ No se recibió respuesta del servidor:', {
        url: error.config?.url,
        message: error.message
      });
    } else {
      console.error('❌ Error al configurar la solicitud:', error.message);
    }
    return Promise.reject(error);
  }
);

// Servicio de servicios
export const servicioService = {
  // Obtener todos los servicios
  async obtenerServicios() {
    try {
      console.log('🔍 Solicitando servicios a la API...');
      // Intentamos primero la ruta /servicios
      let response;
      try {
        response = await api.get('/servicios');
      } catch (error) {
        console.log('⚠️ Intentando ruta alternativa /servicios/activos...');
        response = await api.get('/servicios/activos');
      }
      
      console.log('📡 Respuesta de la API (raw):', response.data);
      
      // Manejar diferentes formatos de respuesta
      let servicios = [];
      
      if (Array.isArray(response.data)) {
        servicios = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        servicios = response.data.data;
      } else if (response.data && response.data.servicios) {
        servicios = response.data.servicios;
      }
      
      console.log('✅ Servicios obtenidos:', servicios.length);
      return servicios;
    } catch (error) {
      console.error('❌ Error obteniendo servicios:', error);
      console.error('Detalles del error:', error.response?.data || error.message);
      return [];
    }
  },

  // Obtener todos los combos
  async obtenerCombos() {
    try {
      console.log('🔄 Solicitando combos a la API...');
      // Intentamos diferentes rutas posibles
      let response;
      try {
        response = await api.get('/combos');
      } catch (error) {
        console.log('⚠️ Intentando ruta alternativa /servicios/combos...');
        response = await api.get('/servicios/combos');
      }
      
      console.log('📡 Respuesta de combos:', response.data);
      
      // Manejar diferentes formatos de respuesta
      let combos = [];
      
      if (Array.isArray(response.data)) {
        combos = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        combos = response.data.data;
      } else if (response.data && response.data.combos) {
        combos = response.data.combos;
      }
      
      console.log('✅ Combos obtenidos:', combos.length);
      return combos;
    } catch (error) {
      console.error('❌ Error obteniendo combos:', error);
      console.error('Detalles del error:', error.response?.data || error.message);
      return [];
    }
  },

  // ... resto de las funciones se mantienen igual
};

export default servicioService;
