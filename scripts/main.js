#!/usr/bin/env node
const { checkEnvVariablesExist } = require('./Nest/.envManager');
const { menuDatabase,modifyDatabaseConfig} = require('./Database/menuDatabase');
const { startApplication } = require('./Nest/startApp');
const { enviarNombreProcedimiento } = require('./Procedure/sendProcedure');
const  {menuProcedure} = require('./Procedure/menuProcedure')



const mainMenu = async () => {

  if (!checkEnvVariablesExist()) {

    // Si iniciamos por primera vez, abrimos el menu.
    console.log('Es necesario configurar las variables de la base de datos por primera vez.');
    await menuDatabase();  


  } 
  else {

    //Preguntamos si queremos modificar la base de datos.
    const modifyConfig = await modifyDatabaseConfig(); 
    
    //Si elegimos opcion si , abrimos el menu.
    if (modifyConfig) {
      await menuDatabase(); 
    } 
    //Si elegimos opcion no , no abrimos el menu.
    else {
      console.log('No se realizaron cambios en la configuración.');
    }
  }

  //Iniciamos NestJs.
  await startApplication();


  setTimeout(async () => {


    const nombreProcedimiento = process.argv[2];
    if (nombreProcedimiento) {

      const tipos = await enviarNombreProcedimiento(nombreProcedimiento);


      if (tipos.length > 0) {
        const respuestas = await menuProcedure(tipos);

        //MOMENTANEO!
        console.log('Respuestas del usuario:', respuestas);



      } else {
        console.log('El procedimiento no contiene parametros de entrada, ejecutando.');
        
      }
    } else {
      console.log('Por favor, proporciona el nombre del procedimiento almacenado.');
      process.exit(0);
    }



  }, 10000);


};

mainMenu();