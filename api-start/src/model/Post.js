import mongoose from '../config/DBHelpler'
import moment from 'dayjs'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  // 字段注释：用户ID
  uid: { type: String, ref: 'users' },

  // 字段注释：文章标题
  title: { type: String },

  // 字段注释：文章内容
  content: { type: String },

  // 字段注释：创建时间
  created: { type: Date },

  // 字段注释：帖子分类 index-全部， ask-提问， advise-建议，discuss-交流，share-分享，news-动态
  catalog: { type: String },

  // 字段注释：帖子积分
  fav: { type: String },

  // 字段注释：0-未结束，1-已结束
  isEnd: { type: String },

  // 字段注释：阅读计数
  reads: { type: Number },

  // 字段注释：回答计数
  answer: { type: Number },

  // 字段注释：0-打开回复，1-关闭回复
  status: { type: Number },

  // 字段注释：0-未置顶，1-已置顶
  isTop: { type: Number },

  // 字段注释：指定排序
  topNum: { type: String },

  // 字段注释：文章的标签，精华，加精，etc
  tags: { type: Array }

})

PostSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

PostSchema.statics = {
  /**
   * 获取文章列表数据
   * @param {*} options 筛选条件
   * @param {*} sort 排序方式
   * @param {*} page 分页页数
   * @param {*} limit 分页条数
   */
  getList: function (options, sort, page, limit) {
    return this.find(options)
      .sort({ [sort]: -1 })
      .skip(page * limit)
      .limit(limit)
      .populate({
        path: 'uid',
        select: 'name isVip pic'
      })
  },

  // 本周热议
  getTopWeek: function () {
    return this.find({
      created: {
        $gte: moment().subtract(7, 'days')
      }
    }, {
      answer: 1,
      title: 1
    }).sort({ answer: -1 }).limit(15)
  }
}

const PostModel = mongoose.model('post', PostSchema)

export default PostModel
