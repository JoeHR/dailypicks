<!--
 * @Author: rh
 * @Date: 2020-06-17 20:40:25
 * @LastEditTime: 2020-07-06 16:35:27
 * @LastEditors: rh
 * @Description: 命名规范
 * @变量: - 小驼峰式命名法（前缀应当是名词）
 * @常量: - 全大写（使用大写字母和下划线来组合命名，下划线用以分割单词）
 * @函数:  - 小驼峰式命名法（前缀应当为动词）
 * @这不是一个 bug，这只是一个未列出来的特性
-->
<template>
  <div class="layui-container flex">
    <img src="../assets/img/icon-404.png" width="100px" alt="">
    <p>找不到页面了</p>
    <router-link class="layui-btn" to="/">回到首页</router-link>
  </div>
</template>

<script>
export default {
  name: '404'
};
</script>

<style lang="scss" scoped>
.flex{
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
p{
  padding-bottom: 15px;
  padding-top: 10px;
}
</style>
