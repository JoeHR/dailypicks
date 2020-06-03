<template>
  <div>
    <table class="layui-table" border="0">
      <thead>
        <tr>
          <th class="title"><div class="layui-table-cell pl0">帖子标题</div></th>
          <th><div class="layui-table-cell text-right pr0">搜藏时间</div></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>搜藏的帖子标题</td>
          <td class="text-right">2019-01-01</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'my-collection'
};
</script>

<style lang="scss" scoped>
.title{
  width: 70%;
}
</style>
