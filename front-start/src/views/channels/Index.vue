<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <top></top>
        <list></list>
      </div>
      <div class="layui-col-md4">
        <tips></tips>
        <sign></sign>
        <hot-list></hot-list>
        <ads></ads>
        <links></links>
      </div>
    </div>
  </div>
</template>

<script>
import Tips from '@/components/sidebar/Tips';
import Sign from '@/components/sidebar/Sign';
import HotList from '@/components/sidebar/HotList';
import ADS from '@/components/sidebar/Ads';
import Links from '@/components/sidebar/Links';
import List from '@/components/contents/List';
import Top from '@/components/contents/Top';
export default {
  name: 'index',
  components: {
    tips: Tips,
    sign: Sign,
    hotList: HotList,
    ads: ADS,
    links: Links,
    list: List,
    top: Top
  }
};
</script>

<style lang="scss" scoped>
</style>
