import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AnalyzerService } from './analyzer.service';

@Controller('analyzer')
export class AnalyzerController {
  constructor(private readonly analyzerService: AnalyzerService) {}

  @Post('metadatos')
  async analizarProcedimiento(@Body('nombre') nombre: string) {
    try {
      const resultado = await this.analyzerService.analizarProcedimiento(nombre);
      if (!resultado) {
        throw new HttpException('Procedimiento no encontrado', HttpStatus.NOT_FOUND);
      }
      return resultado;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
