import SignRecord from '../model/SignRecord'
import { getJWTPayload } from '../common/utils'
import User from '../model/User'
import moment from 'dayjs'
import send from '../config/MailConfig'
import { v4 as uuid } from 'uuid'
import jsonwebtoken from 'jsonwebtoken'
import { setValue, getValue } from '../config/RedisConfig'
import config from '../config/index'

class UserController {
  // 用户签到接口
  async userSign (ctx) {
    // 去用户的ID
    const obj = await getJWTPayload(ctx.header.authorization)
    // 查询用户上一次签到记录
    const record = await SignRecord.findByUid(obj._id)
    const user = await User.findById(obj._id)
    let newRecord = {}
    let result = null
    // 判断签到逻辑
    if (record !== null) {
      // 有历史的签到数据
      // 判断用户上一次签到记录的created 时间是否与今天相同
      // 如果相同，代表用户实在连续签到
      // 如果当前时间的日期与用户上一次的签到日期相同，说明用户已经签到
      if (moment(record.created).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
        ctx.body = {
          code: 500,
          data: { favs: user.favs, count: user.count, lastSign: record.created },
          msg: '用户已经签到'
        }
        return
      } else {
        // 有上一次签到记录，并且不与今天相同，进行连续签到的判断
        // 如果相同，代表用户是在连续签到
        const count = user.count
        let fav = 0
        // 判断签到时间：用户上一次的签到时间等于当前时间的前一天，说明用户在连续签到
        if (moment(record.created).format('YYYY-MM-DD') === moment().subtract(1, 'days').format('YYYY-MM-DD')) {
          // 连续签到的积分获得逻辑
          if (count < 5) {
            fav = 5
          } else if (count >= 5 && count < 15) {
            fav = 10
          } else if (count >= 15 && count < 30) {
            fav = 15
          } else if (count >= 30 && count < 100) {
            fav = 20
          } else if (count >= 100 && count < 365) {
            fav = 30
          } else if (count >= 365) {
            fav = 50
          }
          await User.updateOne({ _id: obj._id }, {
            // user.favs += fav
            // user.count += 1
            $inc: { favs: fav, count: 1 }
          })
          result = {
            favs: user.favs + fav,
            count: user.count + 1
          }
        } else {
          // 用户中断了一次签到
          fav = 5
          await User.updateOne({ _id: obj._id }, {
            $set: { count: 1 },
            $inc: { favs: fav }
          })
          result = {
            favs: user.favs + fav,
            count: 1
          }
        }
        // 更新签到记录
        newRecord = new SignRecord({
          uid: obj._id,
          favs: fav
          // lastSign: record.created
        })
        await newRecord.save()
      }
    } else {
      // 无签到数据，就生成一条签到数据，并初始化积分和签到次数
      await User.updateOne({ _id: obj._id }, {
        $set: { count: 1 },
        $inc: { favs: 5 }
      })
      newRecord = new SignRecord({
        uid: obj._id,
        favs: 5
        // lastSign: moment().format('YYYY-MM-DD HH:mm:ss')
      })
      await newRecord.save()
      result = { favs: user.favs + 5, count: 1 }
    }
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: { ...result, lastSign: newRecord.created }
    }
  }

  // 更新用户基本信息接口
  async updateUserInfo (ctx) {
    const { body } = ctx.request
    const obj = await getJWTPayload(ctx.header.authorization)
    // 判断用户是否修改了邮箱
    const user = await User.findOne({ _id: obj._id })
    let msg = null
    if (body.username && body.username !== user.username) {
      // 用户修改了邮箱
      // 发送 reset 邮件
      // 判断用户的新邮箱是否已经有人注册
      const tempUser = await User.findOne({ username: body.username })
      if (tempUser && tempUser.password) {
        ctx.body = {
          code: 501,
          msg: '邮箱已经注册'
        }
        return
      }
      const key = uuid()
      setValue(key, jsonwebtoken.sign({ _id: obj._id }, config.JWT_SECRET, {
        expiresIn: '30m'
      }))
      await send({
        type: 'email',
        data: {
          username: body.username,
          key: key
        },
        code: '',
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: user.username,
        // email: '2452052376@qq.com',
        user: user.name
      })
      msg = '更新基本资料成功，账号修改需要邮件确认，请查收邮件！'
      // ctx.body = {
      //   code: 500,
      //   data: result,
      //   msg: '发送验证邮件成功,请点击链接确认修改邮件账号！'
      // }
    }
    // else {
    const arr = ['username', 'mobile', 'password']
    arr.map(v => delete body[v])
    const result = await User.updateOne({ _id: obj._id }, body)
    console.log('updateUserInfo -> result', result)
    if (result.n === 1 && result.ok === 1) {
      ctx.body = {
        code: 200,
        msg: msg || '更新成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '更新失败'
      }
    }
    // }
  }

  // 更新用户名
  async updateUserName (ctx) {
    const body = ctx.query
    if (body.key) {
      const token = await getValue(body.key)
      const obj = getJWTPayload('Bearer ' + token)
      await User.updateOne({ _id: obj._id }, {
        username: body.username
      })
      ctx.body = {
        code: 200,
        msg: '更新用户名成功'
      }
    }
  }
}

export default new UserController()
