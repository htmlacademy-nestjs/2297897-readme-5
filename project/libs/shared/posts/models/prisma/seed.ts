import { PrismaClient } from '@prisma/client';
import { PostType, PostState, Comment, Tag } from '../../../types/src/index';

const FIRST_TAG_UUID = '39614113-7ad5-45b6-8093-06455437e1e2';
const SECOND_TAG_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea202';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_USER_ID = '657f5a1af43c40d66f59dceb';
const SECOND_USER_ID = '65952a8aa77b4d3bfe7af7e9';

function getTags(): Tag[] {
  return [
    { id: FIRST_TAG_UUID, title: 'Мудрость' },
    { id: SECOND_TAG_UUID, title: 'Искусство' },
  ]
}

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      postType: PostType.Quote,
      postState: PostState.Draft,
      userId: FIRST_USER_ID,
      quoteText: 'Кто чай не пьёт, тот мандарины чистит',
      quoteAuthor: 'Джейсон Стетхем',
      tags: {
        connect: [{ id: FIRST_TAG_UUID }],
      },
      comments: [
        { userId: FIRST_USER_ID, message: 'Вау! Никогда не видел такого ранее!' },
        { userId: SECOND_USER_ID, message: 'Ничего не понятно, но очень интересно...' },
      ]
    },
    {
      id: SECOND_POST_UUID,
      postType: PostType.Photo,
      postState: PostState.Draft,
      userId: SECOND_USER_ID,
      photoUrl: 'url/to/image',
      tags: {
        connect: [
          { id: FIRST_TAG_UUID },
          { id: SECOND_TAG_UUID }
        ],
      },
      comments: [
          { userId: FIRST_USER_ID, message: 'Очень красиво!' },
          { userId: SECOND_USER_ID, message: 'Ну и куда делся фокус с кадра...' },
        ],
    }
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockTags = getTags();

  for (const tag of mockTags) {
    await prismaClient.tag.upsert({
      where: { id: tag.id },
      update: {},
      create: {
        id: tag.id,
        title: tag.title,
      }
    });
  }

  const mockPosts = getPosts();

  for (const post of mockPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        userId: post.userId,
        postType: post.postType,
        postState: post.postState,
        tags: post.tags,
        comments: post.comments
          ? { create: post.comments }
          : undefined,
        quoteText: post.quoteText ?? null,
        quoteAuthor: post.quoteAuthor ?? null,
        photoUrl: post.photoUrl ?? null,
      }
    })
  }

  console.info('Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (err) {
    console.error(err);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
