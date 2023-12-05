const { exec } = require('child_process');
const fs = require('fs');

const startApplication = () => {
  console.log('Inicializando NestJS...');

  exec('npm run start:dev', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar 'npm run start:dev': ${error.message}`);
      return;
    }

    fs.writeFileSync('./Logs/out.log', stdout);
    fs.writeFileSync('./Logs/err.log', stderr);

    console.log('NestJS iniciado.');
  });
};

module.exports = {
  startApplication
};
