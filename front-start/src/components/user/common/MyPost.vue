<template>
  <div>
    <table class="layui-table" cellspacing="0" cellpadding="0">
      <thead>
        <tr class="text-center">
          <th>
            <div class="layui-table-cell pl0"><span>帖子标题</span></div>
          </th>
          <th>
            <div class="layui-table-cell"><span>状态</span></div>
          </th>
          <th>
            <div class="layui-table-cell"><span>结帖</span></div>
          </th>
          <th>
            <div class="layui-table-cell"><span>发表时间</span></div>
          </th>
          <th>
            <div class="layui-table-cell"><span>数据</span></div>
          </th>
          <th>
            <div class="layui-table-cell"><span>操作</span></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center">
          <td class="text-left">文章的测试标题123</td>
          <td>打开</td>
          <td>未结</td>
          <td>2019-01-01</td>
          <td>10阅/2答</td>
          <td>
            <div class="layui-btn layui-btn-xs">编辑</div>
             <div class="layui-btn layui-btn-xs layui-btn-danger">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'my-post'
};
</script>

<style lang="scss" scoped>

</style>
