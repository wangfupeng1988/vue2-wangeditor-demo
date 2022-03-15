<template>
  <div id="app">
    <!-- <button @click="dialogVisible = !dialogVisible">show/hide</button>
    <hr> -->

    <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    <el-dialog
      title="editor"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <my-editor></my-editor>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->

    <!-- <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <my-editor></my-editor>
    </el-card> -->

    <my-editor></my-editor>
    <!-- <MyEditorWithFormula></MyEditorWithFormula> -->
    <!-- <my-editor-with-mention></my-editor-with-mention> -->
  </div>
</template>

<script>
import MyEditor from './components/MyEditor.vue'
// import MyEditorWithFormula from './components/MyEditorWithFormula'
// import MyEditorWithMention from './components/MyEditorWithMention'

export default {
  name: 'App',
  components: {
    MyEditor,
    // MyEditorWithFormula,
    // MyEditorWithMention
  },
  // data() {
  //     return {
  //       dialogVisible: false
  //     }
  // },
}
</script>

<style>
.box-card {
  width: 800px;
}
</style>
