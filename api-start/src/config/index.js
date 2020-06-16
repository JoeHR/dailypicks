const DB_URL = 'mongodb://test:123456@116.62.114.170:27017/testdb'
const REDIS = {
  host: '116.62.114.170',
  port: 15001,
  password: '123456'
}

const JWT_SECRET = 'a&*38QthAKuiRwISGLotgq^3%^$zvA3A6Hfr8MF$jM*HY4*dWcwAW&9NGp7*b53!'

const baseUrl = process.env.NODE_ENV === 'production' ? 'http://www.toimc.com' : 'http://localhost:3000'

export default {
  DB_URL,
  REDIS,
  JWT_SECRET,
  baseUrl
}
