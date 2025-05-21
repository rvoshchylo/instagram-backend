import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';
import { FacebookTokenMiddleware } from './middleware/facebook-token.middleware';

@Module({
  controllers: [InstagramController],
  providers: [InstagramService],
})
export class InstagramModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FacebookTokenMiddleware).forRoutes(InstagramController);
  }
}
