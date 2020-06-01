<template>
  <div class="fly-panel" v-show="lists.length>0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #FF5722;"
      >去签到</a>
    </div>
    <list-item :lists="lists" :isShow="false"></list-item>
  </div>
</template>

<script>
import ListItem from './ListItem';
export default {
  name: 'top',
  data () {
    return {
      page: 0,
      limit: 20,
      lists: []
    };
  },
  components: {
    ListItem
  }
};
</script>

<style lang="scss" scoped>
</style>
