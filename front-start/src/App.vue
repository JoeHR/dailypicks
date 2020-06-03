<template>
  <div id="app">
    <imooc-header></imooc-header>
    <router-view></router-view>
    <imooc-footer></imooc-footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
export default {
  name: 'app',
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer
  }
};
</script>

<style lang="scss">
@import "assets/css/global.css";

// 公用样式
.svg {
  position: relative;
  top: -4px;
}
.gray {
  color: #999;
}
// .pd20{
//   padding: 20px;
// }
@for $i from 0 through 5 {
  .pd#{$i}{
    padding: $i*10 + px;
  }
  .pl#{$i}{
    padding-left:$i*10 + px ;
  }
  .pt#{$i}{
    padding-top:$i*10 + px ;
  }
  .pr#{$i}{
    padding-right:$i*10 + px ;
  }
  .pb#{$i}{
    padding-bottom:$i*10 + px ;
  }
}
.mt20{
  margin-top: -20px;
}
.pl0{
  padding-left: 0px;
}
.text-center{
  text-align: center;
}
.text-left{
  text-align: left;
}
.text-right{
  text-align: right;
}
.pr0{
  padding-right: 0px;
}

</style>
