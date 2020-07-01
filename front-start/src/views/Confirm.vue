import { updateUserInfo } from '@/api/user';
<template>
  <div class="layui-container flex">
    <div class="layui-row font pb3">确定更新账号为{{username}}吗</div>
    <div class="layui-row">
      <button type="button" class="layui-btn" :class="{'layui-btn-disabled':isSend}"    @click="submit()">确定更新</button>
    <router-link class="layui-btn layui-btn-primary" to="/">返回首页</router-link>
    </div>

  </div>
</template>

<script>
import {updateUsername} from '@/api/user';
export default {
  name: 'Confirm',
  data () {
    return {
      username: '',
      queryObj: {},
      isSend: false
    };
  },
  mounted () {
    let queryStr = window.location.href.replace(/.*\?/, '');
    let obj = Object.fromEntries(queryStr.split('&').map(v => v.split('=')));
    obj.username = decodeURIComponent(obj.username);
    this.queryObj = obj;
    this.username = obj.username;
  },
  methods: {
    submit () {
      updateUsername(this.queryObj).then(res => {
        if(res.code === 200) {
          this.isSend = true;
          this.$alert(res.msg);
          setTimeout(() => {
            this.$router.push('/');
          }, 1000);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.flex{
  display: flex;
  flex-flow:column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 260px;
}
.font{
  font-size: 16px;
  color:#333;
}
</style>
