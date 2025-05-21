import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { InstagramService } from './instagram.service';
import { RequestWithFbToken } from 'src/types/RequestWithFbToken';
import { CreateInstagramPostDto } from './dto/create-instagram-post.dto';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

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
}
