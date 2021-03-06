import send from '../config/MailConfig'
import bcrypt from 'bcryptjs'
import moment from 'dayjs'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config/index'
import { checkCode } from '../common/utils'
import User from '../model/User'
import SignRecord from '../model/SignRecord'
class LoginController {
  async forget (ctx) {
    const { body } = ctx.request
    console.log(body)
    try {
      // body.username -> database -> email
      const result = await send({
        code: '1234',
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'Brian'
      })
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功'
      }
    } catch (e) {
      console.log(e)
    }
  }

  async login (ctx) {
    // 接收用户的数据

    // 返回token
    // console.log('Hello login')
    // let token = jsonwebtoken.sign(
    //   { _id: 'rh', exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24) },
    //   config.JWT_SECRET
    // )
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    // console.log(body)
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code)
    if (result) {
      // 验证用户账户密码是否正确
      let checkUserPasswd = false
      const user = await User.findOne({ username: body.username })
      if (await bcrypt.compare(body.password, user.password)) {
        checkUserPasswd = true
      }
      // mongoDB 查库
      if (checkUserPasswd) {
        const userObj = user.toJSON()
        const arr = ['password', 'username', 'roles']
        arr.map(item => {
          delete userObj[item]
        })
        // 验证通过 返回 token 数据
        const token = jsonwebtoken.sign({ _id: userObj._id }, config.JWT_SECRET, {
          expiresIn: '1d'
        })
        // 加入 isSign 属性
        const signRecord = await SignRecord.findByUid(userObj._id)
        if (signRecord !== null) {
          if (moment(signRecord.created).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
            userObj.isSign = true
          } else {
            userObj.isSign = false
          }
          userObj.lastSign = signRecord.created
        } else {
          // 用户无签到记录
          userObj.isSign = false
        }
        ctx.body = {
          code: 200,
          data: userObj,
          token: token
        }
      } else {
        // 用户名 密码 验证失败， 返回提示
        ctx.body = {
          code: 401,
          msg: '用户名或密码错误，请检查！'
        }
      }
    } else {
      ctx.body = {
        code: 401,
        msg: '图片验证码不正确，请检查！'
      }
    }
  }

  async reg (ctx) {
    // 接收客户端的数据
    const { body } = ctx.request
    // 校验验证码的内容（时效性，有效性）
    const sid = body.sid
    const code = body.code
    const msg = {}
    const result = await checkCode(sid, code)
    let check = true
    if (result) {
      // 查库 看 username 是否被注册
      const user1 = await User.findOne({ username: body.username })
      if (user1 !== null && typeof user1 !== 'undefined') {
        msg.username = ['此邮箱已注册，可通过邮箱找回密码']
        check = false
      }
      // 查库 看 name 是否被注册
      const user2 = await User.findOne({ name: body.name })
      if (user2 !== null && typeof user2 !== 'undefined') {
        msg.name = ['此昵称已经被注册，请修改']
        check = false
      }
      // 写入数据到数据库
      if (check) {
        body.password = await bcrypt.hash(body.password, 5)
        const user = new User({
          username: body.username,
          name: body.name,
          password: body.password,
          created: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        // console.log('reg -> moment()', moment().format('YYYY-MM-DD HH:mm:ss'))
        const result = await user.save()
        console.log(result)
        ctx.body = {
          code: 200,
          data: result,
          msg: '注册成功'
        }
      } else {
        ctx.body = {
          code: 500,
          msg: msg
        }
      }
    } else {
      msg.code = ['验证码已经失效，请重新获取']
      ctx.body = {
        code: 500,
        msg: msg
      }
    }
  }
}

export default new LoginController()
