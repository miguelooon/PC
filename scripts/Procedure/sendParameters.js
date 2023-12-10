// enviarParametros.js
const cliSpinners = require('cli-spinners');
const ora = require('ora'); // Ora es un paquete popular para mostrar spinners en la consola

const axios = require('axios');
const enviarParametros = async (respuestas) => {
  const spinner = ora({
    text: 'Generando Codigo...',
    spinner: 'dots',
    color: 'magenta'
  }).start();

  // Esperar 7 segundos
  await new Promise(resolve => setTimeout(resolve, 7000));

  spinner.stop();

  try {
    const response = await axios.post('http://localhost:3000/analyzer/parameters', respuestas);

  } catch (error) {
    console.error('Error al enviar datos:', error.message);
  }
};
module.exports = {
  enviarParametros
};

