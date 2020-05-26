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
    <list-item :lists="lists" @nextpage="nextPage()"></list-item>
  </div>
</template>

<script>
import {getList} from '@/api/content';
import ListItem from './ListItem';
export default {
  name: 'list',
  data () {
    return {
      status: '',
      tag: '精华',
      sort: 'created',
      page: 0,
      limit: 20,
      catalog: '',
      lists: [{
        uid: {
          name: 'imooc',
          isVip: 1
        },
        title: '大前端',
        content: '',
        created: '2020-05-26 01:00:00',
        catalog: 'ask',
        fav: 40,
        isEnd: 0,
        reads: 10,
        answer: 0,
        status: 0,
        isTop: 0,
        tags: [{
          name: '精华',
          class: 'layui-bg-red'
        }, {
          name: '热门',
          class: 'layui-bg-blue'
        }]
      }, {
        uid: {
          name: 'imooc',
          isVip: 1
        },
        title: '大前端',
        content: '',
        created: '2020-05-26 01:00:00',
        catalog: 'ask',
        fav: 40,
        isEnd: 0,
        reads: 10,
        answer: 0,
        status: 0,
        isTop: 0,
        tags: [{
          name: '精华',
          class: 'layui-bg-red'
        }, {
          name: '热门',
          class: 'layui-bg-blue'
        }]
      }, {
        uid: {
          name: 'imooc',
          isVip: 1
        },
        title: '大前端',
        content: '',
        created: '2020-05-26 01:00:00',
        catalog: 'ask',
        fav: 40,
        isEnd: 0,
        reads: 10,
        answer: 0,
        status: 0,
        isTop: 0,
        tags: [{
          name: '精华',
          class: 'layui-bg-red'
        }, {
          name: '热门',
          class: 'layui-bg-blue'
        }]
      }]
    };
  },
  components: {
    ListItem
  },
  mounted () {
    this.getLists();
  },
  methods: {
    getLists () {
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
        console.log(res);
        // 对于异常的判断，res.code 非200，我们给用户一个提示
        // 判断是否lists 长度为0，如果为0即可以直接赋值
        // 当lists 长度不为0，后面请求的数据，加入到lists里面来
        if(res.code === 200) {
          if(this.lists.length === 0) {
            this.lists = res.data;
          } else {
            this.lists = this.lists.concat(res.data);
          }
        }
      }).catch(err => {
        if(err) {
          this.$alert(err.msg);
        }
      });
    },
    nextPage () {
      this.page++;
    },
    search (val) {
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
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
