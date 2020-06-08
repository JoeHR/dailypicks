<template>
    <div class="modal" v-show="isShow">
      <div class="mask" @click="close"></div>
      <div class="layui-layer layui-layer-page" :class="{'active':isShow}">
        <div class="layui-layer-title">签到说明
          <i class="layui-icon layui-icon-close pull-right" @click="close"></i>
        </div>
        <div class="layui-layer-content">
          <div class="layui-text">
            <blockquote class="layui-elem-quote">
              "签到"可获得的社区积分，规则如下
            </blockquote>
            <table class="layui-table">
              <thead>
                <tr>
                  <th>连续签到天数</th>
                  <th>每天可获积分</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>&lt;5</th>
                  <th>5</th>
                </tr>
                <tr>
                  <th>&ge;5</th>
                  <th>10</th>
                </tr>
                <tr>
                  <th>&ge;15</th>
                  <th>15</th>
                </tr>
                <tr>
                  <th>&ge;30</th>
                  <th>20</th>
                </tr>
                <tr>
                  <th>&ge;100</th>
                  <th>30</th>
                </tr>
                <tr>
                  <th>&ge;365</th>
                  <th>50</th>
                </tr>
              </tbody>
            </table>
            <div>
              <p>中间若有间隔，则连续天数重新计算</p>
              <p class="orange">不可用程序自动签到</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'sign-info',
  props: {
    isShow: {
      default: false, type: Boolean
    }
  },
  methods: {
    close () {
      this.$emit('closeModal');
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
