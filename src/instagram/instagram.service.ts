import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { appSecretProof } from 'src/helpers/createAppSecretProof';
import {
  CreateMediaResponse,
  PublishMediaResponse,
} from 'src/types/MediaCreate';

@Injectable()
export class InstagramService {
  async getInstagramPageData(pageId: string, token: string) {
    const proof = appSecretProof(token);

    const pageRes = await axios.get<{
      name: string;
      connected_instagram_account: { id: string };
    }>(`https://graph.facebook.com/v18.0/${pageId}`, {
      params: {
        fields: 'name,connected_instagram_account',
        access_token: token,
        appsecret_proof: proof,
      },
    });

    const pageName = pageRes.data.name;
    const instagramId = pageRes.data.connected_instagram_account?.id;

    if (!instagramId) {
      throw new Error('Instagram account not connected to this page');
    }

    const profileRes = await axios.get<{
      id: string;
      username: string;
      profile_picture_url: string;
    }>(`https://graph.facebook.com/v18.0/${instagramId}`, {
      params: {
        fields: 'id,username,profile_picture_url',
        access_token: token,
        appsecret_proof: proof,
      },
    });

    const mediaRes = await axios.get<{
      data: {
        id: string;
        caption?: string;
        media_type: string;
        media_url: string;
        permalink: string;
        timestamp: string;
        like_count?: number;
        comments_count?: number;
      }[];
    }>(`https://graph.facebook.com/v18.0/${instagramId}/media`, {
      params: {
        fields:
          'id,caption,like_count,comments_count,permalink,media_type,media_url,timestamp',
        limit: 10,
        access_token: token,
        appsecret_proof: proof,
      },
    });

    const posts = await Promise.all(
      mediaRes.data.data.map(async (item) => {
        let comments: {
          id: string;
          text: string;
          username: string;
          timestamp: string;
        }[] = [];

        try {
          const commentsRes = await axios.get<{
            data: typeof comments;
          }>(`https://graph.facebook.com/v18.0/${item.id}/comments`, {
            params: {
              fields: 'id,text,username,timestamp',
              access_token: token,
              appsecret_proof: proof,
              limit: 10,
            },
          });

          comments = commentsRes.data.data;
        } catch (e) {
          console.error('Error fetching comments:', e);
        }

        return {
          ...item,
          comments,
        };
      }),
    );

    return {
      pageName,
      instagramAccount: {
        id: instagramId,
        username: profileRes.data.username,
        profilePictureUrl: profileRes.data.profile_picture_url,
        posts,
      },
    };
  }

  async createPost({
    imageUrl,
    caption,
    token,
    userId,
  }: {
    imageUrl: string;
    caption?: string;
    token: string;
    userId: string;
  }): Promise<PublishMediaResponse> {
    const proof = appSecretProof(token);

    const createMediaRes = await axios.post<CreateMediaResponse>(
      `https://graph.facebook.com/v18.0/${userId}/media`,
      null,
      {
        params: {
          image_url: imageUrl,
          caption,
          access_token: token,
          appsecret_proof: proof,
        },
      },
    );

    const creationId = createMediaRes.data.id;

    const publishRes = await axios.post<PublishMediaResponse>(
      `https://graph.facebook.com/v18.0/${userId}/media_publish`,
      null,
      {
        params: {
          creation_id: creationId,
          access_token: token,
          appsecret_proof: proof,
        },
      },
    );

    return publishRes.data;
  }
}
