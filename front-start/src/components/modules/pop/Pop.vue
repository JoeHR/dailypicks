import Top from '@/components/contents/Top';
<template>
  <div class="tips animation" :class="{'shake':type==='shake'}" v-show="isShow" ref="tips">
    <div class="content">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'Pop',
  props: {
    type: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShow (newVal, oldVal) {
      if(newVal !== oldVal && newVal === true) {
        // 显示pop组件
        setTimeout(() => {
          let width = this.$refs.tips.clientWidth;
          let height = this.$refs.tips.clientHeight;
          this.$refs.tips.style.marginLeft = -width / 2 + 'px';
          this.$refs.tips.style.marginTop = -height / 2 + 'px';
        }, 0);

        setTimeout(() => {
          this.isShow = false;
          this.msg = '';
          this.type = '';
        }, 3000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes shake {
  0%,100%{
    transform: translateX(0);
  }
  10%,30%,50%,70%,90%{
      transform: translateX(-10px);
  }
  20%,40%,60%,80%{
      transform: translateX(-10px);
  }
}

.tips{
  position: fixed;
  left:50%;
  top:50%;
}

.animation{
  animation-fill-mode: both;
  animation-direction: .3s;
}

.content{
  background:rgba(0,0,0,.4) ;
  color: #fff;
  padding: 10px 15px;
  border-radius: 6px;
}

.shake{
  animation-name: shake;
}
</style>
