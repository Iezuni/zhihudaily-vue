import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';

import {
	Button,
	Container,
	Header,
	DatePicker,
	Main,
	Tooltip,
	Table,
	TableColumn,
	Link,
	Footer,
	Loading,
	Message,
} from 'element-ui';

Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(DatePicker);
Vue.use(Main);
Vue.use(Tooltip);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Link);
Vue.use(Footer);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.config.productionTip = false;

const app = new Vue({
	render: (h) => h(App),
}).$mount('#app');

export default {
	app: app,
	Message: Message,
};
