import { Controller, Get, Param, Res} from '@nestjs/common';
import { DbService } from './dbconnect.service';
import { Response } from 'express';

@Controller('dbconnect')
export class DbconnectController {
  constructor(private readonly dbService: DbService) {}

  @Get('obtenerProcedimiento/:nombre')
  async obtenerProcedimiento(@Param('nombre') nombreProcedimiento: string, @Res() res: Response) {
    try {
      const codigo = await this.dbService.obtenerCodigoProcedimiento(nombreProcedimiento);
      if (codigo) {
        res.json({ codigo }); // Enviar respuesta JSON
      } else {
        res.status(404).json({ mensaje: 'Procedimiento no encontrado' }); // Enviar un error 404
      }
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al recuperar el procedimiento', error: error.message }); // Enviar un error 500
    }
  }

  @Get('obtenerProcedimientoArgs/:nombre')
  async obtenerProcedimientoArgs(@Param('nombre') nombreProcedimiento: string, @Res() res: Response) {
    try {
      const codigo = await this.dbService.obtenerMetadatosProcedimiento(nombreProcedimiento);
      if (codigo) {
        res.json({ codigo }); // Enviar respuesta JSON
      } else {
        res.status(404).json({ mensaje: 'Procedimiento no encontrado' }); // Enviar un error 404
      }
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al recuperar el procedimiento', error: error.message }); // Enviar un error 500
    }
  }

  


}
