const { startSpinnerAndExecute } = require('./spinnerManager');


const startApplication = () => {
    console.log('Iniciando aplicacion PCF');
  
    setTimeout(() => {
  
      startSpinnerAndExecute('npm run start:dev', (stdout, stderr) => {
        console.log(stdout);
        console.error(stderr);
      }, (error) => {
        console.error(`Error al ejecutar 'npm run start:dev': ${error}`);
      });
    }, 3000);
  
  
  };
  

module.exports = {
  startApplication
};