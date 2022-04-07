<template>
    <div>
        <p>wangEditor mention demo</p>
        <div style="border: 1px solid #ccc;">
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :defaultConfig="toolbarConfig"
            />
            <Editor
                style="height: 400px"
                v-model="html"
                :defaultConfig="editorConfig"
                @onChange="onChange"
                @onCreated="onCreated"
            />
            <mention-modal
                v-if="isShowModal"
                @hideMentionModal="hideMentionModal"
                @insertMention="insertMention"
            ></mention-modal>
        </div>
        <div style="margin-top: 10px;">
            <textarea v-model="html" style="width: 100%; height: 500px;"></textarea>
        </div>
    </div>
</template>

<script>
import { Boot } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import mentionModule from '@wangeditor/plugin-mention'
import MentionModal from './MentionModal'

// 注册插件
Boot.registerModule(mentionModule)

export default {
    name: 'MyEditorWithMention',
    components: { Editor, Toolbar, MentionModal },
    data() {
        return {
            editor: null,
            html: '<p>你好<span data-w-e-type="mention" data-w-e-is-void data-w-e-is-inline data-value="A张三" data-info="%7B%22id%22%3A%22a%22%7D">@A张三</span></p>',
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
            isShowModal: false
        }
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
        },
        onChange(editor) {
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
            const editor = this.editor
            if (editor) {
                editor.restoreSelection() // 恢复选区
                editor.deleteBackward('character') // 删除 '@'
                editor.insertNode(mentionNode) // 插入 mention
                editor.move(1) // 移动光标
            }
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
