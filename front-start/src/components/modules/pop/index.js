import PopComponent from './Pop.vue';

const Pop = {};

Pop.install = (Vue) => {
  const PopConstructor = Vue.extend(PopComponent);
  const instance = new PopConstructor();
  instance.$mount(document.createElement('div'));
  document.body.appendChild(instance.$el);

  Vue.prototype.$pop = (type, msg) => {
    instance.type = type;
    instance.msg = msg;
    instance.isShow = true;
  };
};

export default Pop;
