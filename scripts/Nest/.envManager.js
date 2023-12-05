const fs = require('fs');
const path = require('path');

const envFilePath = path.join(__dirname, '../../.env');



// Valores que tomara si se deja el campo vacio.
const defaultValues = {
  POSTGRES_DATABASE: 'example_db_2',
  POSTGRES_USERNAME: 'postgres',
  POSTGRES_PASSWORD: 'postgres'
    
};

// Funcion que actualiza los valores del .env
const updateEnvVariables = (variables) => {
  
  let envLines = [];


  if (fs.existsSync(envFilePath)) {
    const currentEnv = fs.readFileSync(envFilePath, 'utf8');
    envLines = currentEnv.split('\n');
  }

  Object.keys(variables).forEach(key => {
    let value = variables[key];
    // Si el valor está vacío, utiliza el valor predeterminado
    if (!value) {
      value = defaultValues[key];
    }

    const lineIndex = envLines.findIndex(line => line.startsWith(`${key}=`));
    if (lineIndex !== -1) {
      envLines[lineIndex] = `${key}=${value}`;
    } else {
      envLines.push(`${key}=${value}`);
    }
  });

  fs.writeFileSync(envFilePath, envLines.join('\n'));
};





// Funcion que verifica si las variables existen en el archivo .env
const checkEnvVariablesExist = () => {
    if (fs.existsSync(envFilePath)) {
      const currentEnv = fs.readFileSync(envFilePath, 'utf8');
      const envLines = currentEnv.split('\n');
  
      const requiredKeys = ['POSTGRES_DATABASE', 'POSTGRES_USERNAME', 'POSTGRES_PASSWORD'];
      return requiredKeys.every(key => envLines.some(line => line.startsWith(`${key}=`)));
    }
  
    return false;
};
  



module.exports = {
  updateEnvVariables,
  checkEnvVariablesExist
};