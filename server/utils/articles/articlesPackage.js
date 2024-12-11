// import {users} from '~/server/utils/games/unturned/unturnedSchemas'

import {articles} from "~/server/utils/articles/articlesSchema";

import { eq, asc, inArray, and, like,sql, desc } from 'drizzle-orm';


import {db} from '~/server/utils/db'

const artcilesPackage = {

    getArticles: async function (category)  {
      const articlesList = await db.select({
        url: articles.url,
        name: articles.shortTitle,  
        actionText: articles.callBtn,
        imgRoot: articles.imgRoot,
        altImage: articles.altImage,
        description: articles.description,
      })
      .from(articles)
      .where(
        and(  
          eq(articles.enabled, 1),
          eq(articles.categoryId, category)
        )
      )
      .orderBy(asc(articles.dateCreated))
      return articlesList;
    },

    getPopularArticles: async function (category)  {
      const articlesList = await db.select({
        url: articles.url,
        name: articles.shortTitle,  
        actionText: articles.callBtn,
        imgRoot: articles.imgRoot,
        altImage: articles.altImage,
        description: articles.description,
      })
      .from(articles)
      .where(
        and(  
          eq(articles.enabled, 1),
          eq(articles.categoryId, category)
        )
      )
      .orderBy(desc(articles.views))
      .limit(5)
      
      return articlesList;
    },



    increaseArticleView: async function (articleId)  {
      await db.update(articles)
      .set({
        views: sql`${articles.views} + 1`,
      })
      .where(eq(articles.id, articleId));
    },


    getArticle: async function (articleUrl)  {
      const articlesList = await db.select({
        articleId: articles.id,
        name: articles.title,  
        headInfo: articles.headInfo,
        articleContent: articles.articleContent,
        tableContents: articles.tableContents,
        breadcrumb: articles.breadcrumb,
        embeddedVideoTitle: articles.embeddedVideoTitle,
        embeddedVideoLink: articles.embeddedVideoLink,
      })
      .from(articles)
      .where(
        and(
          eq(articles.url, articleUrl),   
          eq(articles.enabled, 1)  
        )
        
      )
      return articlesList;
    },

    


}

export default artcilesPackage