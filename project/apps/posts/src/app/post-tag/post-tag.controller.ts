import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import { PostTagService } from './post-tag.service';
import { CreatePostTagDTO } from './dto/create-post-tag.dto';
import {fillDTO} from '@project/libs/shared/helpers';
import { PostTagRDO } from './rdo/post-tag.rdo';
import { UpdatePostTagDTO } from './dto/update-post-tag.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('PostTags')
@Controller('tags')
export class PostTagController {
  constructor(
    private readonly postTagService: PostTagService,
  ) { }

  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Tag with this title already exists'
  })
  @ApiResponse({
    type: PostTagRDO,
    status: HttpStatus.CREATED,
    description: 'The new tag has been successfully created.'
  })
  @Post('/')
  public async create(@Body() dto: CreatePostTagDTO) {
    const newPostTag = await this.postTagService.createPostTag(dto);
    return fillDTO(PostTagRDO, newPostTag.serialize());
  }

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tag with this id not found'
  })
  @ApiResponse({
    type: PostTagRDO,
    status: HttpStatus.OK,
    description: 'Tag has been found'
  })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const postTag = await this.postTagService.getPostTagById(id);
    return fillDTO(PostTagRDO, postTag.serialize());
  }

  @ApiResponse({
    type: [PostTagRDO],
    status: HttpStatus.OK,
    description: 'All founded tags'
  })
  @Get('/')
  public async index() {
    const allPostTags = await this.postTagService.getAllPostTags();
    return fillDTO(PostTagRDO, allPostTags.map((postTag) => postTag.serialize()));
  }

  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Tag with this title already exists'
  })
  @ApiResponse({
    type: PostTagRDO,
    status: HttpStatus.OK,
    description: 'The tag has been successfully updated'
  })
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostTagDTO) {
    const updatedPostTag = await this.postTagService.updatePostTag(id, dto);
    return fillDTO(PostTagRDO, updatedPostTag.serialize());
  }

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tag with this id not found'
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The tag has been successfully removed'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.postTagService.deletePostTag(id);
  }
}
