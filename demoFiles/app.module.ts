import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// We need to add this code manually
//import { ConfigModule } from '@nestjs/config';
//import config, { validate } from './config/configuration';

@Module({
  imports: [
    // We need to add this code manually
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   load: [config],
    //   validate,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
