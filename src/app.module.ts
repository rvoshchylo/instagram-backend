import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { InstagramController } from './instagram/instagram.controller';
import { InstagramService } from './instagram/instagram.service';
import { FacebookStrategy } from './auth/facebook.strategy';
import { InstagramModule } from './instagram/instagram.module';
import { FacebookTokenMiddleware } from './instagram/middleware/facebook-token.middleware';

@Module({
  imports: [ConfigModule.forRoot(), InstagramModule],
  controllers: [AuthController, InstagramController],
  providers: [FacebookStrategy, InstagramService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FacebookTokenMiddleware)
      .forRoutes(
        { path: 'instagram/*', method: RequestMethod.ALL },
        { path: 'auth/logout', method: RequestMethod.POST },
      );
  }
}
