import { Injectable } from '@nestjs/common';
import { DbService } from '../dbconnect/dbconnect.service';

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
}
