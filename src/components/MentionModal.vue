<template>
    <div id="mention-modal" :style="{ top: top, left: left }">
        <input id="mention-input" v-model="searchVal" ref="input" @keyup="inputKeyupHandler">
        <ul id="mention-list">
            <li
                v-for="item in searchedList"
                :key="item.id"
                @click="insertMentionHandler(item.id, item.name)"
            >{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'MentionModal',
    data() {
        return {
            // 定位信息
            top: '',
            left: '',

            // list 信息
            searchVal: '',
            list: [
                { id: 'a', name: 'A张三' },
                { id: 'b', name: 'B李四' },
                { id: 'c', name: 'C小明' },
                { id: 'd', name: 'D小李' },
                { id: 'e', name: 'E小红' },
            ]
        }
    },
    computed: {
        // 根据 <input> value 筛选 list
        searchedList() {
            const searchVal = this.searchVal.trim().toLowerCase()
            return this.list.filter(item => {
                const name = item.name.toLowerCase()
                if (name.indexOf(searchVal) >= 0) {
                    return true
                }
                return false
            })
        }
    },
    methods: {
        inputKeyupHandler(event) {
            // esc - 隐藏 modal
            if (event.key === 'Escape') {
                this.$emit('hideMentionModal')
            }

            // enter - 插入 mention node
            if (event.key === 'Enter') {
                // 插入第一个
                const firstOne = this.searchedList[0]
                if (firstOne) {
                    const { id, name } = firstOne
                    this.insertMentionHandler(id, name)
                }
            }
        },
        insertMentionHandler(id, name) {
            this.$emit('insertMention', id, name)
            this.$emit('hideMentionModal') // 隐藏 modal
        }
    },
    mounted() {
        // 获取光标位置
        const domSelection = document.getSelection()
        const domRange = domSelection?.getRangeAt(0)
        if (domRange == null) return
        const rect = domRange.getBoundingClientRect()

        // 定位 modal
        this.top = `${rect.top + 20}px`
        this.left = `${rect.left + 5}px`

        // focus input
        this.$refs.input.focus()
    },

}
</script>

<style>
#mention-modal {
    position: absolute;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 5px;
}

#mention-modal input {
    width: 100px;
    outline: none;
}

#mention-modal ul {
    padding: 0;
    margin: 0;
}

#mention-modal ul li {
    list-style: none;
    cursor: pointer;
    padding: 3px 0;
    text-align: left;
}

#mention-modal ul li:hover {
    text-decoration: underline;
}
</style>
