import storage from 'bright-block-auth/src/services/storage'
import moment from 'moment'
var _ = require('lodash')

const MY_ROOT_FILE = 'articles.json'

const articlesService = {
  articles: undefined,
  fetch: function () {
    return new Promise(resolve => {
      storage.getFile(MY_ROOT_FILE).then((articles) => {
        if (articles && articles.errorMessage) {
          resolve(false)
        } else {
          this.articles = articles
          resolve(articles)
        }
      }).catch(e => {
        console.log('articles: e : ', e)
        resolve(false)
      })
    })
  },
  delete: function (articleId) {
    _.remove(this.articles, {
      articleId: articleId
    })
    return new Promise(resolve => {
      storage.putFile(this.articles).then((articles) => {
        this.articles = articles
        resolve(articles)
      }).catch(e => {
        console.log('articles: e : ', e)
        resolve(false)
      })
    })
  },
  saveOrUpdate: function (uiObject) {
    let myObject = this.getArticle(uiObject.articleId)
    if (myObject) {
      myObject.updated = moment.now()
      myObject.name = uiObject.name
      myObject.description = uiObject.description
    } else {
      uiObject.articleId = moment.now()
      uiObject.updated = moment.now()
      if (!this.articles) {
        this.articles = []
      }
      this.articles.push(uiObject)
    }
    return new Promise(resolve => {
      storage.putFile(this.articles).then((articles) => {
        this.articles = articles
        resolve(articles)
      }).catch(e => {
        console.log('articles: e : ', e)
        resolve(false)
      })
    })
  },
  getArticle: function (articleId) {
    let myObject
    if (articleId) {
      _.forEach(this.articles, function (article) {
        if (article.articleId === articleId) {
          myObject = article
        }
      })
    }
    return myObject
  }
}
export default articlesService
