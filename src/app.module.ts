import { Module } from '@nestjs/common';
import { DbconnectModule } from './dbconnect/dbconnect.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbconnectModule],
  controllers: [],
  providers: [],

})
export class AppModule {}
