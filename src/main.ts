import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';

// 创建vue实例
const app = createApp(App);

app.use(store);
app.use(router);

// 挂载实例
app.mount('#app');
