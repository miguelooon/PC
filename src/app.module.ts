import { Module } from '@nestjs/common';
import { DbconnectModule } from './dbconnect/dbconnect.module';
import { ConfigModule } from '@nestjs/config';
import { AnalyzerModule } from './analyzer/analyzer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbconnectModule,
    AnalyzerModule],
  controllers: [],
  providers: [],

})
export class AppModule {}
