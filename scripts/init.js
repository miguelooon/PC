const readline = require('readline');
const { updateEnvVariables, checkEnvVariablesExist } = require('./.envManager');
const { startSpinnerAndExecute } = require('./spinnerManager');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));




const modifyDatabaseConfig = async () => {
  const dbName = await askQuestion('Ingrese el nombre de la base de datos (deje en blanco para el valor predeterminado): ');
  const username = await askQuestion('Ingrese el nombre de usuario de PostgreSQL (deje en blanco para el valor predeterminado): ');
  const password = await askQuestion('Ingrese la contraseña de PostgreSQL (deje en blanco para el valor predeterminado): ');

  updateEnvVariables({
    POSTGRES_DATABASE: dbName ,
    POSTGRES_USERNAME: username ,
    POSTGRES_PASSWORD: password 
  });

  console.log('Configuración actualizada.');
};

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

const mainMenu = async () => {
  if (!checkEnvVariablesExist()) {
    console.log('Es necesario configurar las variables de la base de datos por primera vez.');
    await modifyDatabaseConfig();
  } else {
    const answer = await askQuestion('¿Desea modificar la configuración de la base de datos? (sí/no): ');

    if (answer.toLowerCase() === 'sí' || answer.toLowerCase() === 'si') {
      await modifyDatabaseConfig();
    } else {
      console.log('No se realizaron cambios en la configuración.');
    }
  }

  startApplication();
  rl.close();
};

mainMenu();