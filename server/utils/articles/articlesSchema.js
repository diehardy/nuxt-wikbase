import { varchar, integer, pgSchema, jsonb, real, date  } from 'drizzle-orm/pg-core';

  const articlesSchema = pgSchema('articles') 

  export const articles =  articlesSchema.table('articles', {
    id: integer('article_id').primaryKey(),
    headInfo: jsonb('head_info'),
    articleContent: jsonb('article_content'),
    url: varchar('url'),
    tableContents: jsonb('contents_table'),
    title: varchar('title'),
    breadcrumb: varchar('breadcrumb'),
    description: varchar('description'),
    shortTitle: varchar('short_title'),
    callBtn: varchar('call_btn'),
    imgRoot: varchar('image'),
    altImage: varchar('image_alt'),
    enabled: integer('enabled'),
    categoryId: integer('category_id'),
    views: integer('views'),
    dateCreated: date('date_created'),
    embeddedVideoLink: varchar('embedded_video_link'),
    embeddedVideoTitle: varchar('embedded_video_title'),
  })
