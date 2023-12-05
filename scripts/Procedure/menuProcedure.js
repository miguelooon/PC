const inquirer = require('inquirer');



const validarBigint = valor => {
  if (!valor.trim()) return 'Este campo no puede estar vacío.';
  if (!/^-?\d+$/.test(valor)) return 'Ingrese un número entero válido.';
  return true;
};

const validarBoolean = valor => {
  if (!valor.trim()) return 'Este campo no puede estar vacío.';
  const val = valor.toLowerCase();
  if (!['true', 'false', '1', '0'].includes(val)) return 'Ingrese un valor booleano válido (true, false, 1, 0).';
  return true;
};


const validarInteger= (valor) => {
  if (!valor.trim()) {
    return 'Este campo no puede estar vacío.';
  }

  const numero = parseFloat(valor);

  if (isNaN(numero)) {
    return 'Por favor, ingrese un número válido.';
  }

  return true;
};


const validarReal = valor => {
  if (!valor.trim()) return 'Este campo no puede estar vacío.';
  if (isNaN(valor)) return 'Ingrese un número real válido.';
  return true;
};


const validarTimestamp = valor => {
  if (!valor.trim()) return 'Este campo no puede estar vacío.';
  if (isNaN(Date.parse(valor))) return 'Ingrese una fecha y hora válidas.';
  return true;
};

const validarCharacter = valor => {
  if (!valor.trim()) {
    return 'Este campo no puede estar vacío.';
  }

  // Comprobar si el valor es numérico
  if (!isNaN(valor)) {
    return 'Se espera una cadena de caracteres, no un número.';
  }

  return true;
};


// ... Más funciones de validación para otros tipos ...

const menuProcedure = async (parametros) => {
  const preguntas = parametros.map(param => {
    let validate;

    switch (param.tipo) {
      case 'bigint':
        validate = validarBigint;
        break;
      case 'boolean':
        validate = validarBoolean;
        break;
      case 'character':
        validate = validarCharacter;
        break;        
      case 'integer':
        validate = validarInteger;
        break;
      case 'real':
        validate = validarReal;
        break;
      case 'timestamp':
        validate = validarTimestamp;
        break;
      // Agrega más casos para otros tipos
      // ...
    }

    return {
      type: 'input',
      name: param.nombre,
      message: `Por favor, ingrese el parámetro de entrada ${param.nombre} (${param.tipo}):`,
      validate
    };
  });

  return inquirer.prompt(preguntas);
};

module.exports = {
  menuProcedure
};
