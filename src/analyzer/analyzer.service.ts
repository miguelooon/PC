import { Injectable } from '@nestjs/common';
import { DbService } from '../dbconnect/dbconnect.service';
import { parse } from 'pgsql-ast-parser';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class AnalyzerService {
  constructor(private dbService: DbService) {}

  async analizarProcedimiento(nombre: string): Promise<{nombre: string, tipo: string}[]> {
    const metadatos = await this.dbService.obtenerMetadatosProcedimiento(nombre);

    if (!metadatos || !metadatos.args) {
      return [];
    }

    // Dividir los argumentos y filtrar solo los de entrada (IN)
    const args = metadatos.args.split(',').map(arg => arg.trim());
    const inArgs = args.filter(arg => arg.startsWith('IN')).map(arg => {
      // Extraer el nombre y el tipo de datos del argumento
      const partes = arg.split(' ');
      return {
        nombre: partes[1], // El nombre está en la segunda posición
        tipo: partes[2] // El tipo está en la tercera posición
      };
    });

    return inArgs;
  }


  async parseSqlFromProcedure(procedureName: string) {
    try {
      // Obtener la consulta SQL del procedimiento
      console.log([procedureName])
      const sqlQuery = await this.dbService.obtenerCodigoProcedimiento(procedureName);
      console.log(sqlQuery)
      
      // Analizar la consulta SQL
      const ast = parse(sqlQuery);
      return ast;
    } catch (error) {
      throw new Error(`Error al analizar la consulta SQL: ${error.message}`);
    }
  }

  async generateNestJsCode(nombreProcedimiento: string, data: Record<string, any>): Promise<string> {
    const consultaSQL = await this.dbService.obtenerCodigoProcedimiento(nombreProcedimiento);
  
    if (!consultaSQL) {
      throw new Error('No se pudo obtener el código del procedimiento.');
    }
  
    // Leer la plantilla
    let templateSource;
    try {
      templateSource = fs.readFileSync('select-template.hbs', 'utf8');
    } catch (error) {
      console.error('Error al leer el archivo de plantilla:', error);
      throw error; // Propagar el error
    }
  

    const template = Handlebars.compile(templateSource);
  

    const serviceCode = template({ actorData: data });

    const filePath = 'output.txt'; // Puedes cambiar la ruta y el nombre del archivo según sea necesario
    
    fs.writeFile(filePath, serviceCode, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo:', err);
        } else {
            console.log(`El código generado se ha guardado en ${filePath}`);
        }
    });



  
    return serviceCode;
  };
  

  
}



