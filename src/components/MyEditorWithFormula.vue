<template>
    <div>
        <p>wangEditor with formula</p>
        <div style="border: 1px solid #ccc;">
            <!-- 工具栏 -->
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :defaultConfig="toolbarConfig"
            />
            <!-- 编辑器 -->
            <Editor
                style="height: 500px"
                :editor="editor"
                v-model="html"
                :defaultConfig="editorConfig"
                @onChange="onChange"
                @onCreated="onCreated"
            />
            <!-- 初始化内容， defaultHtml 和 defaultContent ，二选一 -->
        </div>
    </div>
</template>

<script>
import { Boot } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import formulaModule from '@wangeditor/plugin-formula'
// console.log('formulaModule', formulaModule)
Boot.registerModule(formulaModule)

export default {
    name: 'MyEditor',
    components: { Editor, Toolbar },
    data() {
        return {
            editor: null,
            html: '<p>hello</p>',
            toolbarConfig: {
                // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
                // excludeKeys: [ /* 隐藏哪些菜单 */ ],
                insertKeys: {
                    index: 0,
                    keys: [
                        'insertFormula', // “插入公式”菜单
                        // 'editFormula' // “编辑公式”菜单
                    ],
                },
            },
            editorConfig: {
                placeholder: '请输入内容...',
                // autoFocus: false,

                // 所有的菜单配置，都要在 MENU_CONF 属性下
                MENU_CONF: {},

                hoverbarKeys: {
                    formula: {
                        menuKeys: ['editFormula'], // “编辑公式”菜单
                    },
                },
            },
        }
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
        },
        onChange(editor) {
            console.log('onChange', editor.getHtml()) // onChange 时获取编辑器最新内容
        },
        getEditorText() {
            const editor = this.editor
            if (editor == null) return

            console.log(editor.getText()) // 执行 editor API
        }
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
    },
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
