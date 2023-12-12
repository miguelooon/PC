const { exec } = require('child_process');

const startApplication = () => {
  console.log('Inicializando NestJS...');

  const nestProcess = exec('npm run start:dev', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar 'npm run start:dev': ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  });

  // Escuchar la salida estándar y errores del proceso hijo
  nestProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  nestProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
};

module.exports = {
  startApplication
};

