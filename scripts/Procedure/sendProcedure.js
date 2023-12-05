
const axios = require('axios');


const verificarExistenciaProcedimiento = async (nombreProcedimiento) => {
  try {
    const response = await axios.get(`http://localhost:3000/dbconnect/existeProcedimiento/${nombreProcedimiento}`);
    return response.data; // Esto debería devolver true o false
  } catch (error) {
    console.error('Error al verificar la existencia del procedimiento:', error.message);
    return false;
  }
};

const enviarNombreProcedimiento = async (nombreProcedimiento) => {
  try {
    // Primero, verifica si el procedimiento existe
    const existe = await verificarExistenciaProcedimiento(nombreProcedimiento);
    if (!existe) {
      console.log('El procedimiento no existe, porfavor vuelve a ingresarlo.');
      process.exit(0);
    }

    // Si el procedimiento existe, obtén los metadatos
    const response = await axios.post('http://localhost:3000/analyzer/metadatos', { nombre: nombreProcedimiento });

    return response.data;

  } catch (error) {
    console.error('Error al enviar el nombre del procedimiento:', error.message);
    return null;
  }
};

  

  
module.exports = {
    enviarNombreProcedimiento,
    verificarExistenciaProcedimiento
  };
  