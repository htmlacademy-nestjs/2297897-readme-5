import { PostType } from '@project/libs/shared/types';

export const POST_VALIDATION_MESSAGE = {
  USER_ID: {
    NOT_VALID: 'User ID must be valid mongo ID',
  },
  VIDEO_LINK: {
    NOT_VALID: 'The link to the video must be a valid url',
  },
  LINK: {
    NOT_VALID: 'The link must be a valid url',
  },
  POST_TYPE: {
    NOT_VALID: `The type of post can be as follows: ${Object.values(PostType).join(', ')}`,
  },
  TITLE: {
    MIN_LENGTH: 'Min title length is 20 chars',
    MAX_LENGTH: 'Max title length is 50 chars',
  },
  TAGS: {
    NOT_VALID: 'Tags must be valid UUID',
    COUNT_NOT_VALID: 'Max number of tags for one publication: 8',
  },
  ANNOUNCEMENT: {
    MIN_LENGTH: 'Min announcement length is 50 chars',
    MAX_LENGTH: 'Max announcement length is 255 chars',
  },
  POST_TEXT: {
    MIN_LENGTH: 'Min post text length is 100 chars',
    MAX_LENGTH: 'Max post text length is 1024 chars',
  },
  QUOTE_TEXT: {
    MIN_LENGTH: 'Min quote text length is 20 chars',
    MAX_LENGTH: 'Max quote text length is 300 chars',
  },
  QUOTE_AUTHOR: {
    MIN_LENGTH: 'Min quote author length is 3 chars',
    MAX_LENGTH: 'Max quote author length is 50 chars',
  },
  DESCRIPTION: {
    MAX_LENGTH: 'Max description length is 300 chars',
  },
} as const;
