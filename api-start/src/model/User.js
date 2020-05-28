import mongoose from '../config/DBHelpler'
import { moment } from 'dayjs'

const Schema = mongoose.Schema

const UserSchema = new Schema({
// 字段注释： 用户名，邮件账号
  username: { type: String, index: { unique: true }, sparse: true },
  // 字段注释： 密码
  password: { type: String },
  // 字段注释： 昵称
  name: { type: String },
  // 字段注释： 注册时间
  created: { type: Date },
  // 字段注释： 用户积分
  favs: { type: Number, default: 100 },
  // 字段注释： 更新时间
  updated: { type: Date },
  // 字段注释： 0-男 1-女
  gender: { type: String, default: '' },
  // 字段注释： user角色 user-普通用户，admin-管理员
  roles: { type: Array, default: ['user'] },
  // 字段注释： 用户头像
  pic: { type: String, default: '/img/avart.JPG' },
  // 字段注释： 手机号码
  mobile: { type: String, match: /^1[3-9](\d{9})$/, default: '' },
  // 字段注释： 0是否被禁用 0-正常 1-禁言 2-账号禁用
  status: { type: String, default: '0' },
  // 字段注释：个性签名
  regmark: { type: String, default: '' },
  // 字段注释： 城市
  location: { type: String, default: '' },
  // 字段注释： 是否Vip,0-普通用户，1-会员用户，2-7定义成vip的等级
  isVip: { type: String, default: '0' },
  // 字段注释： 0签到次数
  count: { type: Number, default: 0 }
})

UserSchema.pre('save', function (next) {
  this.created = moment.format('YYYY-MM-DD HH:mm:ss')
  next()
})

UserSchema.pre('update', function (next) {
  this.updated = moment.format('YYYY-MM-DD HH:mm:ss')
  next()
})
UserSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Error:Mongoose has a duplicate key.'))
  } else {
    next(error)
  }
})

UserSchema.statics = {
  findByID: function (id) {
    return this.findOne({ _id: id }, {
      password: 0, // 为0 表示排除这些敏感信息
      username: 0, // 为0 表示排除这些敏感信息
      mobile: 0 // 为0 表示排除这些敏感信息
    })
  }
}

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
