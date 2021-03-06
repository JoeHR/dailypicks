/*
 * @Author: rh
 * @Date: 2020-07-04 15:34:32
 * @LastEditTime: 2020-07-06 16:59:05
 * @LastEditors: rh
 * @Description: 命名规范
 * @变量: - 小驼峰式命名法（前缀应当是名词）
 * @常量: - 全大写（使用大写字母和下划线来组合命名，下划线用以分割单词）
 * @函数:  - 小驼峰式命名法（前缀应当为动词）
 * @这不是一个 bug，这只是一个未列出来的特性
 */
import Post from '../model/Post'
import Links from '../model/Links'
import fs, { read } from 'fs'
import { v4 as uuid } from 'uuid'
import moment from 'dayjs'
import config from '../config'
// method 1
// import { dirExists } from '../common/utils'
import mkdir from 'make-dir'

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
    const dir = `${config.uploadPath}/img/${moment().format('YYYYMMDD')}`
    // console.log(ext, dir)
    // 判断路径是否存在，不存在则创建
    // await dirExists(dir)
    await mkdir(dir)
    // 存储文件到指定的路径
    // 给文件一个唯一的名称
    const picname = uuid()
    const destPath = `${dir}/${picname}.${ext}`
    const reader = fs.createReadStream(file.path)
    // const reader = fs.createReadStream(file.path, {
    //   highWaterMark: 1 * 1024
    // })
    const upStream = fs.createWriteStream(destPath)
    const filePath = `/img/${moment().format('YYYYMMDD')}/${picname}.${ext}`
    // method1
    reader.pipe(upStream)
    ctx.body = {
      code: 200,
      msg: '图片上传成功',
      data: filePath
    }
    // method 2
    // const stat = fs.statSync(file.path)
    // console.log('ContentController -> uploadImg -> stat', stat.size)
    // let totalLength = 0 // 读取的文件总长度
    // reader.on('data', (chunk) => {
    //   totalLength += chunk.length
    //   console.log('ContentController -> uploadImg -> totalLength', totalLength)
    //   if (upStream.write(chunk) === false) {
    //     reader.pause()
    //   }
    // })

    // reader.on('drain', () => {
    //   reader.resume()
    // })

    // reader.on('end', () => {
    //   upStream.end()
    // })

    // ctx.body = {
    //   code: 200,
    //   msg: '图片上传成功',
    //   data: filePath
    // }
  }
}

export default new ContentController()
