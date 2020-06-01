import Router from 'koa-router'
import publicController from '../api/PublicController'
import contentController from '../api/ContentController'

const router = new Router()

router.prefix('/public')

// 获取图片验证码
router.get('/getCaptcha', publicController.getCaptcha)

// 获取文章列表
router.get('/list', contentController.getPostList)

// 温馨提醒
router.get('/tips', contentController.getTips)

// 友情链接
router.get('/links', contentController.getLinks)

// 回复周榜
router.get('/topWeek', contentController.getTopWeeks)

export default router
