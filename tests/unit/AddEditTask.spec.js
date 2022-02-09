import { shallowMount } from '@vue/test-utils';
import AddEditTask from '@/components/AddEditTask.vue';
import { StatusOperation } from '@/types/task.interface';
describe('AddEditTask.vue', () => {
    const wrapper = shallowMount(AddEditTask);
    it('test buttonCaption computed', () => {
        expect(wrapper.vm.$data.statusOper).toBe(StatusOperation.Add);
        wrapper.setData({ statusOper: StatusOperation.Edit });
        expect(wrapper.vm.$data.statusOper).toBe(StatusOperation.Edit);
    });
});
// import { shallowMount } from '@vue/test-utils';
// import HelloWorld from '@/components/HelloWorld.vue';
// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message';
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg },
//     });
//     expect(wrapper.text()).toMatch(msg);
//   });
// });
//# sourceMappingURL=AddEditTask.spec.js.map