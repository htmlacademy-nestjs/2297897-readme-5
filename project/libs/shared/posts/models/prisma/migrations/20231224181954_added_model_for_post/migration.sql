-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "post_state" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "link" TEXT,
    "description" TEXT,
    "photo_url" TEXT,
    "quote_text" TEXT,
    "quote_author" TEXT,
    "title" TEXT,
    "announcement" TEXT,
    "post_text" TEXT,
    "video_link" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
