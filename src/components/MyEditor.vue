<template>
    <div style="border: 1px solid #ccc;" v-if="isAjaxDone">
        <!-- 工具栏 -->
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editorId="editorId"
            :defaultConfig="toolbarConfig"
        />
        <!-- 编辑器 -->
        <Editor
            style="height: 500px"
            :editorId="editorId"
            :defaultConfig="editorConfig"
            :defaultContent="defaultContent"
            @onChange="onChange"
        />
        <!-- 初始化内容， defaultHtml 和 defaultContent ，二选一 -->
    </div>
    <div v-else>loading...</div>
</template>

<script>
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import cloneDeep from 'lodash.clonedeep'

export default {
    name: 'MyEditor',
    components: { Editor, Toolbar },
    data() {
        return {
            editorId: 'wangEditor-1', // 定义一个编辑器 id ，要求：全局唯一且不变！！！
            defaultContent: [], // 编辑器的默认内容，只在初始化时使用
            // defaultHtml: '<p>hello</p>',
            latestContent: [], // 用于存储编辑器最新的内容，onChange 时修改
            toolbarConfig: {
                // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
                // excludeKeys: [ /* 隐藏哪些菜单 */ ],
            },
            editorConfig: {
                placeholder: '请输入内容...',

                // 所有的菜单配置，都要在 MENU_CONF 属性下
                MENU_CONF: {}
            },

            isAjaxDone: false
        }
    },
    computed: {
        getDefaultContent() {
            return cloneDeep(this.defaultContent) // 深拷贝，重要！！！
        }
    },
    methods: {
        onChange(editor) {
            console.log('onChange', editor.children) // onChange 时获取编辑器最新内容
            this.latestContent = editor.children
        },
        getEditorText() {
            const editor = getEditor(this.editorId)
            if (editor == null) return

            console.log(editor.getText()) // 执行 editor API
        }
    },
    mounted() {
        // 模拟 ajax 请求，异步渲染编辑器
        setTimeout(() => {
            this.defaultContent = [
                {
                    type: 'paragraph',
                    children: [{ text: 'ajax 异步获取的内容' }],
                }
            ]
            // this.defaultHtml = '<p>hello&nbsp;<strong>world</strong>.</p>'
            this.isAjaxDone = true
        }, 1500)

        // this.$nextTick(() => {
        //     const editor = getEditor(this.editorId)
        //     if (editor == null) return
        //     console.log('getEditor - mounted', editor)
        // })
    },
    beforeDestroy() {
        const editor = getEditor(this.editorId)
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
        removeEditor(this.editorId)
    },
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
