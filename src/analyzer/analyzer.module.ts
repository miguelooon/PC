import { Module } from '@nestjs/common';
import { AnalyzerController } from './analyzer.controller';
import { AnalyzerService } from './analyzer.service';
import { DbconnectModule } from '../dbconnect/dbconnect.module';
@Module({
  imports: [DbconnectModule],
  controllers: [AnalyzerController],
  providers: [AnalyzerService]
})
export class AnalyzerModule {}
