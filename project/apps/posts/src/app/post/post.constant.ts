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
