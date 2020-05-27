<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a :class="{'layui-this': status===''&&tag===''}" @click.prevent="search()">综合</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status==='0'}" @click.prevent="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status==='1'}" @click.prevent="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this': status===''&&tag==='精华'}" @click.prevent="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{'layui-this': sort==='created'}" @click.prevent="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this': sort==='answer'}" @click.prevent="search(4)">按热议</a>
      </span>
    </div>
    <list-item :lists="lists" @nextpage="nextPage()" :isEnd="isEnd"></list-item>
  </div>
</template>

<script>
import {getList} from '@/api/content';
import ListItem from './ListItem';
export default {
  name: 'list',
  data () {
    return {
      isRepeat: false,
      current: '',
      status: '',
      tag: '精华',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: '',
      lists: [],
      isEnd: false
    };
  },
  components: {
    ListItem
  },
  watch: {
    current (newVal, oldVal) {
      this.init();
    },
    $route (newVal, oldVal) {
      let catalog = newVal.params.catalog;
      if(typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog;
      }
      this.init();
    }
  },
  mounted () {
    this.getLists();
  },
  methods: {
    init () {
      this.page = 0;
      this.lists = [];
      this.isEnd = false;
      this.getLists(0);
    },
    getLists () {
      // if(this.isRepeat) { return; };
      if(this.isEnd) { return; };
      this.isRepeat = true;
      let options = {
        catalog: this.catalog,
        isTop: 0,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      };
      getList(options).then(res => {
        this.isRepeat = false;
        console.log(res);
        // 对于异常的判断，res.code 非200，我们给用户一个提示
        // 判断是否lists 长度为0，如果为0即可以直接赋值
        // 当lists 长度不为0，后面请求的数据，加入到lists里面来
        this.lists = res.data;
        // if(res.code === 200) {
        //   // 判断res.data.长度，如果小于20条，则是最后一页
        //   if(res.data.length < this.limit) {
        //     this.isEnd = true;
        //   }
        //   if(this.lists.length === 0) {
        //     this.lists = res.data;
        //   } else {
        //     this.lists = this.lists.concat(res.data);
        //   }
        // }
      }).catch(err => {
        console.log(err);
        if(err) {
          this.$alert(err.msg);
        }
      });
    },
    nextPage () {
      this.page++;
      this.getLists();
    },
    search (val) {
      if(typeof val === 'undefined' && this.current === '') { return; }
      this.current = val;
      switch (val) {
        // 未结帖
        case 0:
          this.status = '0';
          this.tag = '';
          break;
          // 已结帖
        case 1:
          this.status = '1';
          this.tag = '';
          break;
          // 查询"精华"标签
        case 2:
          this.status = '';
          this.tag = '精华';
          break;
          // 按照时间去查询
        case 3:
          this.sort = 'created';
          break;
          // 按照评论去查询
        case 4:
          this.sort = 'answer';
          break;
          // 综合查询
        default :
          this.status = '';
          this.tag = '';
          this.current = '';
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
