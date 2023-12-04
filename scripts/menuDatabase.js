const { updateEnvVariables} = require('./.envManager');
const inquirer = require('inquirer');



//Funcion que contiene el menu de database config.

const menuDatabase = async () => {


    // Menu de Preguntas
    const menuQuestion = [
      {
        type: 'list',
        name: 'configOption',
        message: 'Seleccione la configuración que desea modificar:',
        choices: ['Base de Datos', 'Usuario', 'Contraseña', 'Terminar']
      }
    ];
  
    let exitMenu = false;
  
    while (!exitMenu) {
      const menuAnswer = await inquirer.prompt(menuQuestion);
  
      switch (menuAnswer.configOption) {
        case 'Base de Datos':
          const db = await inquirer.prompt([
            {
              type: 'input',
              name: 'POSTGRES_DATABASE',
              message: 'Ingrese el nombre de la base de datos:'
            }
          ]);
          updateEnvVariables(db);
          break;
  
        case 'Usuario':
          const user = await inquirer.prompt([
            {
              type: 'input',
              name: 'POSTGRES_USERNAME',
              message: 'Ingrese el nombre de usuario de PostgreSQL:'
            }
          ]);
          updateEnvVariables(user);
          break;
  
        case 'Contraseña':
          const password = await inquirer.prompt([
            {
              type: 'password',
              name: 'POSTGRES_PASSWORD',
              message: 'Ingrese la contraseña de PostgreSQL:',
              mask: '*'
            }
          ]);
          updateEnvVariables(password);
          break;
  
        case 'Terminar':
          exitMenu = true;
          break;
      }
  
      if (!exitMenu) {
        console.log('Configuración actualizada.');
      }
    }
  
    if (exitMenu) {
      console.log('Configuración finalizada.');
    }
};



const modifyDatabaseConfig = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'modifyConfig',
      message: '¿Desea modificar la configuración de la base de datos?',
      default: true
    }
  ]);

  return answer.modifyConfig;
}

module.exports = {
  modifyDatabaseConfig,
  menuDatabase
};