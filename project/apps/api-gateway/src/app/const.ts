import { PostProperty, PostType } from '@project/libs/shared/types';

export const POST_AVAILABLE_VALUE = {
  TITLE: {
    MIN_LENGTH: 20,
    MAX_LENGTH: 50,
  },
  ANNOUNCEMENT: {
    MIN_LENGTH: 50,
    MAX_LENGTH: 255,
  },
  POST_TEXT: {
    MIN_LENGTH: 100,
    MAX_LENGTH: 1024,
  },
  QUOTE_TEXT: {
    MIN_LENGTH: 20,
    MAX_LENGTH: 300,
  },
  QUOTE_AUTHOR: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
  DESCRIPTION: {
    MAX_LENGTH: 300,
  },
  TAGS: {
    MIN_COUNT: 0,
    MAX_COUNT: 8,
  },
  EXCLUDABLE_PROPERTIES: {
    [PostType.Video.toUpperCase()]: [
      PostProperty.Announcement, PostProperty.PostText, PostProperty.QuoteText,
      PostProperty.QuoteAuthor, PostProperty.PhotoUrl, PostProperty.Link,
      PostProperty.Description,
    ],
    [PostType.Text.toUpperCase()]: [
      PostProperty.VideoLink, PostProperty.QuoteText, PostProperty.QuoteAuthor,
      PostProperty.PhotoUrl, PostProperty.Link, PostProperty.Description,
    ],
    [PostType.Quote.toUpperCase()]: [
      PostProperty.Title, PostProperty.VideoLink, PostProperty.Announcement,
      PostProperty.PostText, PostProperty.PhotoUrl, PostProperty.Link,
      PostProperty.Description,
    ],
    [PostType.Photo.toUpperCase()]: [
      PostProperty.Title, PostProperty.VideoLink, PostProperty.Announcement,
      PostProperty.PostText, PostProperty.QuoteText, PostProperty.QuoteAuthor,
      PostProperty.Link, PostProperty.Description,
    ],
    [PostType.Link.toUpperCase()]: [
      PostProperty.Title, PostProperty.VideoLink, PostProperty.Announcement,
      PostProperty.PostText, PostProperty.QuoteText, PostProperty.QuoteAuthor,
      PostProperty.PhotoUrl,
    ],
  }
} as const;

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

export const USER_VALIDATON_MESSAGE = {
  EMAIL_NOT_VALID: 'The email is not valid',
  USER_NAME_NOT_VALID: {
    MIN_LENGTH: 'Min name length is 3 chars',
    MAX_LENGTH: 'Max name length is 50 chars',
  },
  PASSWORD_LENGTH_NOT_VALID: {
    MIN_LENGTH: 'Min password length is 6 chars',
    MAX_LENGTH: 'Max password length is 12 chars',
  }
} as const;

export const SALT_ROUNDS = 10;
export const USER_AVAILABLE_VALUE = {
  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 12,
  }
} as const;
