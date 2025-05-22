import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { InstagramService } from './instagram.service';
import { RequestWithFbToken } from 'src/types/RequestWithFbToken';
import { CreateInstagramPostDto } from './dto/create-instagram-post.dto';
import { UploadImageInterceptor } from 'src/common/interseptors/file.interceptor';
import { ConfigService } from '@nestjs/config';

@Controller('instagram')
export class InstagramController {
  constructor(
    private readonly instagramService: InstagramService,
    private readonly configService: ConfigService,
  ) {}

  @Get('profile')
  async getProfile(
    @Req() req: RequestWithFbToken,
    @Query('pageId') pageId: string,
  ) {
    return this.instagramService.getInstagramPageData(pageId, req.fbToken);
  }

  @Post('posts')
  async createPost(
    @Req() req: RequestWithFbToken,
    @Body() body: CreateInstagramPostDto,
  ) {
    const { imageUrl, caption, userId } = body;

    return this.instagramService.createPost({
      imageUrl,
      caption,
      userId,
      token: req.fbToken,
    });
  }

  @Post('upload')
  @UseInterceptors(UploadImageInterceptor())
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      url: this.configService.getOrThrow<string>('UPLOAD_URL') + file.filename,
    };
  }
}
