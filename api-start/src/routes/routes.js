import combineRoutes from 'koa-combine-routers'
// import requireContext from 'require-context'
import publicRouter from './modules/publicRouter'
import loginRouter from './modules/loginRouter'
import userRouter from './modules/userRouter'
import contentRouter from './modules/contentRouter'

// const moduleFiles = require.context('./modules', true, /\.js$/)
// const moduleFiles = requireContext('../../src/routes/modules', true, /\.js$/)

// const modules = moduleFiles.keys().reduce((items, path) => {
//   const value = moduleFiles(path)
//   console.log('value', value)
//   items.push(value.default)
//   return items
// }, [])

export default combineRoutes(
  publicRouter,
  loginRouter,
  userRouter,
  contentRouter
  // modules
)
