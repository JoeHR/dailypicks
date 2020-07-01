import Post from '../model/Post'
import Links from '../model/Links'
import fs from 'fs'
import { v4 as uuid } from 'uuid'
import moment from 'dayjs'
import config from '../config'

class ContentController {
  async getPostList (ctx) {
    const body = ctx.query

    // 测试数据
    // const post = new Post({
    //   title: 'test title',
    //   content: 'test content',
    //   catalog: 'advise',
    //   fav: 20,
    //   isEnd: '0',
    //   reads: 0,
    //   answer: 0,
    //   status: 0,
    //   isTop: 0,
    //   sort: '0',
    //   tags: []
    // })

    // const tmp = await post.save()
    // console.log('ContentController -> getPostList -> tmp', tmp)

    const sort = body.sort ? body.sort : 'created'
    const page = body.page ? parseInt(body.page) : 0
    const limit = body.limit ? parseInt(body.limit) : 20

    const options = {}

    if (typeof body.catalog !== 'undefined' && body.catalog !== '') {
      options.catalog = body.catalog
    }
    if (typeof body.isTop !== 'undefined' && body.isTop !== '') {
      options.isTop = body.isTop
    }
    if (typeof body.status !== 'undefined' && body.status !== '') {
      options.status = body.status
    }
    if (typeof body.isEnd !== 'undefined' && body.isEnd !== '') {
      options.isEnd = body.isEnd
    }
    if (typeof body.tag !== 'undefined' && body.tag !== '') {
      options.tags = { $elemMatch: { name: body.tag } }
    }
    const result = await Post.getList(options, sort, page, limit)
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取文章列表成功'
    }
  }

  // 友情链接
  async getLinks (ctx) {
    const result = await Links.find({ type: 'links' })
    ctx.body = {
      code: 200,
      data: result
    }
  }

  // 温馨提醒
  async getTips (ctx) {
    const result = await Links.find({ type: 'tips' })
    ctx.body = {
      code: 200,
      data: result
    }
  }

  async getTopWeeks (ctx) {
    const result = await Post.getTopWeek()
    ctx.body = {
      code: 200,
      data: result
    }
  }

  // 上传图片
  async uploadImg (ctx) {
    const file = ctx.request.files.file
    // 图片名称，图片格式，存储的位置，返回前台可以读取的路径
    const ext = file.name.split('.').pop()
    const dir = `${config.uploadPath}/${moment().format('YYYYMMDD')}`
    console.log(ext, dir)
  }
}

export default new ContentController()
