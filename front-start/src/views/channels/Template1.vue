<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <list></list>
      </div>
      <div class="layui-col-md4">
        <hot-list></hot-list>
        <ads></ads>
        <links></links>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from '@/components/sidebar/HotList';
import ADS from '@/components/sidebar/Ads';
import Links from '@/components/sidebar/Links';
import List from '@/components/contents/List';
export default {
  name: 'Template',
  components: {
    hotList: HotList,
    ads: ADS,
    links: Links,
    list: List
  }
};
</script>

<style lang="scss" scoped>
</style>
