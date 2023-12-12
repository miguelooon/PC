import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class DbService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async obtenerCodigoProcedimiento(nombreProcedimiento: string): Promise<string> {
    const query = 
    `SELECT 
          prosrc 
     FROM 
          pg_proc 
     WHERE 
          proname = $1 AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')`;

    const resultado = await this.entityManager.query(query, [nombreProcedimiento]);
    return resultado.length > 0 ? resultado[0].prosrc : null;
  }

  async obtenerMetadatosProcedimiento(nombreProcedimiento: string): Promise<any> {
    const queryMetadatos = `
      SELECT 
          p.proname, 
          pg_catalog.pg_get_function_arguments(p.oid) AS args
      FROM 
          pg_catalog.pg_proc p
          JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
      WHERE 
          p.proname = $1 AND n.nspname = 'public';
    `;
    const resultadoMetadatos = await this.entityManager.query(queryMetadatos, [nombreProcedimiento]);
    return resultadoMetadatos.length > 0 ? resultadoMetadatos[0] : null;
  }


  async existeProcedimiento(nombreProcedimiento: string): Promise<boolean> {
    const query = `
      SELECT EXISTS (
        SELECT 1
        FROM pg_proc
        WHERE proname = $1 AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
      )`;

    const resultado = await this.entityManager.query(query, [nombreProcedimiento]);
    return resultado.length > 0 && resultado[0].exists;
  }
}
