/*
 * @Author: rh
 * @Date: 2020-06-17 20:40:24
 * @LastEditTime: 2020-07-06 17:11:40
 * @LastEditors: rh
 * @Description: 命名规范
 * @变量: - 小驼峰式命名法（前缀应当是名词）
 * @常量: - 全大写（使用大写字母和下划线来组合命名，下划线用以分割单词）
 * @函数:  - 小驼峰式命名法（前缀应当为动词）
 * @这不是一个 bug，这只是一个未列出来的特性
 */
import { getValue } from '../config/RedisConfig'
import config from '../config/index'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const getJWTPayload = token => {
  return jwt.verify(token.split(' ')[1], config.JWT_SECRET)
}

const checkCode = async (key, value) => {
  const redisData = await getValue(key)
  if (redisData != null) {
    if (redisData.toLowerCase() === value.toLowerCase()) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

const getStats = (path) => {
  return new Promise(resolve => {
    fs.stat(path, (err, stats) => err ? resolve(err) : resolve(stats))
  })
}

const mkdir = dir => {
  return new Promise(resolve => {
    fs.mkdir(dir, err => err ? resolve(false) : resolve(true))
  })
}

// 循环遍历，递归判断如果上级不存在，择产生上级目录
const dirExists = async (dir) => {
  const isExists = await getStats(dir)
  // 如果该路径存在且不是文件，返回 true
  if (isExists && isExists.isDirector()) {
    return true
  } else if (isExists) {
    return false
  }
  // 如果该路径不存在
  const tempDir = path.parse(dir).dir
  // 循环遍历，递归判断如果上级目录不存在，则产生上级目录
  const status = await dirExists(tempDir)
  if (status) {
    const result = await mkdir(dir)
    console.log('dirExists -> result', result)
    return result
  } else {
    return false
  }
}

export { checkCode, getJWTPayload, dirExists }
