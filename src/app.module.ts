import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { InstagramController } from './instagram/instagram.controller';
import { InstagramService } from './instagram/instagram.service';
import { FacebookStrategy } from './auth/facebook.strategy';
import { InstagramModule } from './instagram/instagram.module';

@Module({
  imports: [ConfigModule.forRoot(), InstagramModule],
  controllers: [AuthController, InstagramController],
  providers: [FacebookStrategy, InstagramService],
})
export class AppModule {}
