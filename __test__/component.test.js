import { mount } from '@vue/test-utils'
import MyEditor from '../src/components/MyEditor.vue'
// import HelloWorld from '../src/components/HelloWorld.vue'

describe('Component', () => {
    it('editor is a Vue instance', () => {
      const editor = mount(MyEditor)
      expect(editor.vm).toBeTruthy()
    })
})

// describe('Component', () => {
//     it('hello is a Vue instance', () => {
//       const h = mount(HelloWorld)
//       expect(h.vm).toBeTruthy()
//     })
// })
