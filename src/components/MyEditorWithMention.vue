<template>
    <div>
        <p>wangEditor mention demo</p>
        <div style="border: 1px solid #ccc;">
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editorId="editorId"
                :defaultConfig="toolbarConfig"
            />
            <Editor
                style="height: 400px"
                :editorId="editorId"
                :defaultConfig="editorConfig"
                :defaultHtml="defaultHtml"
                @onChange="onChange"
            />
            <mention-modal
                v-if="isShowModal"
                @hideMentionModal="hideMentionModal"
                @insertMention="insertMention"
            ></mention-modal>
        </div>
        <div style="display: flex; margin-top: 10px;">
            <div style="flex: 1; margin-right: 5px;"><textarea v-model="curHtml" style="width: 100%; height: 500px;"></textarea></div>
            <div style="flex: 1; margin-left: 5px;"><textarea v-model="curContent" style="width: 100%; height: 500px;"></textarea></div>
        </div>
    </div>
</template>

<script>
import { Boot } from '@wangeditor/editor'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import mentionModule from '@wangeditor/plugin-mention'
import MentionModal from './MentionModal'

// 注册插件
Boot.registerModule(mentionModule)

export default {
    name: 'MyEditorWithMention',
    components: { Editor, Toolbar, MentionModal },
    data() {
        return {
            editorId: 'wangEditor-1', // 定义一个编辑器 id ，要求：全局唯一且不变！！！
            defaultHtml: '<p>你好<span data-w-e-type="mention" data-w-e-is-void data-w-e-is-inline data-value="A张三" data-info="%7B%22id%22%3A%22a%22%7D">@A张三</span></p>',
            toolbarConfig: {},
            editorConfig: {
                placeholder: '请输入内容...',

                EXTEND_CONF: {
                    mentionConfig: {
                        showModal: this.showMentionModal,
                        hideModal: this.hideMentionModal,
                    },
                },
            },
            curHtml: '',
            curContent: '',
            isShowModal: false
        }
    },
    methods: {
        onChange(editor) {
            this.curContent = JSON.stringify(editor.children, null, 2)
            this.curHtml = editor.getHtml()
        },
        showMentionModal() {
            this.isShowModal = true
        },
        hideMentionModal() {
            this.isShowModal = false
        },
        insertMention(id, name) {
            const mentionNode = {
                type: 'mention', // 必须是 'mention'
                value: name,
                info: { id },
                children: [{ text: '' }], // 必须有一个空 text 作为 children
            }
            const editor = getEditor(this.editorId)
            if (editor) {
                editor.restoreSelection() // 恢复选区
                editor.deleteBackward('character') // 删除 '@'
                editor.insertNode(mentionNode) // 插入 mention
                editor.move(1) // 移动光标
            }
        }
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
