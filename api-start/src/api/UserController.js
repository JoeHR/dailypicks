import SignRecord from '../model/SignRecord'
import { getJWTPayload } from '../common/utils'
import User from '../model/User'
import moment from 'dayjs'

class UserController {
  // 用户签到接口
  async userSign (ctx) {
    // 去用户的ID
    const obj = await getJWTPayload(ctx.header.authorization)
    // 查询用户上一次签到记录
    const record = await SignRecord.findByUid(obj._id)
    let newRecord = {}
    let result = null
    // 判断签到逻辑
    if (record !== null) {
      // 有历史的签到数据
    } else {
      // 无签到数据，就生成一条签到数据，并初始化积分和签到次数
      await User.updateOne({ _id: obj._id }, {
        $set: { count: 1 },
        $inc: { favs: 5 }
      })
      newRecord = new SignRecord({
        uid: obj._id,
        favs: 5,
        lastSign: moment().format('YYYY-MM-DD HH:mm:ss')
      })
      await newRecord.save()
      result = { favs: 5, count: 1 }
    }
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: { ...result }
    }
  }
}

export default new UserController()
