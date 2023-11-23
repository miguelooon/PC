import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DbconnectController } from './dbconnect.controller';
import { DbService } from './dbconnect.service';
@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'example_db_2',
        entities: [],
        synchronize: true,
        autoLoadEntities: true,
      }),
    ],
    controllers: [DbconnectController],
    providers: [DbService],
  
  })
  
export class DbconnectModule {}
