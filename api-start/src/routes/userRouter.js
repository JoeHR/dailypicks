import Router from 'koa-router'
import userController from '../api/UserController'

const router = new Router()

router.prefix('/user')

// 用户签到
router.get('/fav', userController.userSign)

export default router
