import { Controller, Post, Body, HttpException, HttpStatus ,Param, Get} from '@nestjs/common';
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

  @Get('parseSql/:procedureName')
  async parseSql(@Param('procedureName') procedureName: string) {
    try {
      const ast = await this.analyzerService.parseSqlFromProcedure(procedureName);
      if (!ast) {
        throw new HttpException('Consulta SQL no encontrada', HttpStatus.NOT_FOUND);
      }
      return ast; // Devolver directamente el AST
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('parameters')
  async handleData(@Body() data: Record<string, any>) {
    try {
      const { nombreProcedimiento, ...actorData } = data;

  
      const codigoGenerado = await this.analyzerService.generateNestJsCode(nombreProcedimiento, actorData);
      console.log("Código:");
      console.log(codigoGenerado)
  
      return {codigoGenerado};
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  


}
