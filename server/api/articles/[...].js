const router = createRouter()
import articlesPackage from "~/server/utils/articles/articlesPackage"


router.post('/get-articles', defineEventHandler(async(event) => {
  const body = await readBody(event);

  let articles
  if(body.type != 'popular') {
    articles = await articlesPackage.getArticles(body.category);
  } else {
    articles = await articlesPackage.getPopularArticles(body.category);
  }

  return articles;
}))

router.get('/get-article', defineEventHandler(async(event) => {

  const query = getQuery(event)
  let article = await articlesPackage.getArticle(query.url);
  articlesPackage.increaseArticleView(article[0].articleId);
  return article;
}))
  
  


export default useBase('/api/articles', router.handler)