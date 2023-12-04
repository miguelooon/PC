const { checkEnvVariablesExist } = require('./.envManager');
const { menuDatabase,modifyDatabaseConfig} = require('./menuDatabase');
const { startApplication } = require('./startApp');



const mainMenu = async () => {

  if (!checkEnvVariablesExist()) {
    console.log('Es necesario configurar las variables de la base de datos por primera vez.');

    await menuDatabase();  


  } 
  else {


    const modifyConfig = await modifyDatabaseConfig(); 
    
    //Si elegimos opcion si , abrimos nuevamente el menu
    if (modifyConfig) {
      await menuDatabase(); 
    } 
    //Si elegimos opcion no , mensaje no cambios.
    else {
      console.log('No se realizaron cambios en la configuración.');
    }
  }

  startApplication();
};

mainMenu();