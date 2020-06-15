import combineRoutes from 'koa-combine-routers'
// import requireContext from 'require-context'
// import publicRouter from './publicRouter'
// import loginRouter from './loginRouter'
// import userRouter from './userRouter'

const moduleFiles = require.context('./modules', true, /\.js$/)
// const moduleFiles = requireContext('./modules', true, /\.js$/)

const modules = moduleFiles.keys().reduce((items, path) => {
  const value = moduleFiles(path)
  console.log('value', value)
  items.push(value.default)
  return items
}, [])

console.log('modules', modules)
export default combineRoutes(
  // publicRouter,
  // loginRouter,
  // userRouter
  modules
)
