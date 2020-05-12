import axios from "@/util/request";

/**
 * 获取验证码
 * @param {} sid
 */
const getCode = sid => {
  return axios.get("/public/getCaptcha", {
    params: { sid }
  });
};

/**
 * 找回密码
 * @param {*} option 用户信息（邮箱，验证码）
 */
const forget = async option => {
  return axios.post("/forget", {
    ...option
  });
};

/**
 *登录接口
 * @param {*} loginInfo 用户登录信息
 */
const login = loginInfo => {
  return axios.post("/login/login", { ...loginInfo });
};

export { getCode, forget, login };
