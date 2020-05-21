<template>
  <div>
    <div class="panel">
      <div class="layui-container">
        <ul>
          <li class="layui-hide-xs">
            <a href>首页</a>
          </li>
          <li>
            <a href>提问</a>
          </li>
          <li>
            <a href>分享</a>
          </li>
          <li>
            <a href>讨论</a>
          </li>
          <li>
            <a href>建议</a>
          </li>
          <li>
            <a href>公告</a>
          </li>
          <li>
            <a href>动态</a>
          </li>
          <li class="layui-hide-xs">
           <span class="line"></span>
          </li>
          <li class="layui-hide-xs">
            <a href>我发表的帖</a>
          </li>
          <li class="layui-hide-xs">
            <a href>我收藏的帖</a>
          </li>
        </ul>
        <div class="right layui-hide-xs">
          <span class="layui-icon layui-icon-search">
          </span>
           <a href="" class="layui-btn">发表新帖</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
};
</script>

<style lang="scss" scoped>
@media(max-width:768px) {
  .panel{
    height:auto !important;
  }
  ul{
    li{
      width: 33.3%;
    }
  }
}
.panel{
  position: relative;
  height: 50px;
  line-height: 50px;
  margin-bottom: 15px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
}
ul{
  li{
    display: inline-block;
    a{
      padding:0 20px;
    }
    .line{
      display: inline-block;
      height: 10px;
      width: 1px;
      background: #e2e2e2;
      vertical-align: middle;
      margin: 0 20px;
    }
  }
}
.right{
  position: absolute;
  right:0;
  top:0 ;
  .layui-icon-search{
    margin-right: 10px;
    font-size: 20px;
    &:hover{
      color:#5fb878;
      cursor: pointer;
    }
  }
}
</style>
