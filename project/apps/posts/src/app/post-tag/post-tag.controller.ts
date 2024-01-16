import { Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { PostTagService } from './post-tag.service';
import { CreatePostTagDTO } from './dto/create-post-tag.dto';
import {fillDTO} from '@project/libs/shared/helpers';
import { PostTagRDO } from './rdo/post-tag.rdo';
import { UpdatePostTagDTO } from './dto/update-post-tag.dto';

@Controller('tags')
export class PostTagController {
  constructor(
    private readonly postTagService: PostTagService,
  ) { }

  @Post('/')
  public async create(@Body() dto: CreatePostTagDTO) {
    const newPostTag = await this.postTagService.createPostTag(dto);
    return fillDTO(PostTagRDO, newPostTag.serialize());
  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const postTag = await this.postTagService.getPostTagById(id);
    return fillDTO(PostTagRDO, postTag.serialize());
  }

  @Get('/')
  public async index() {
    const allPostTags = await this.postTagService.getAllPostTags();
    return fillDTO(PostTagRDO, allPostTags.map((postTag) => postTag.serialize()));
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostTagDTO) {
    const updatedPostTag = await this.postTagService.updatePostTag(id, dto);
    return fillDTO(PostTagRDO, updatedPostTag.serialize());
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    await this.postTagService.deletePostTag(id);
  }
}
