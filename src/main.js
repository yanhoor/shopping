// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import VueBus from '../libs/vue-bus.js';
import product_data from './data/product.js';
import Ajax from './data/address.js';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '../style.css';

Vue.config.productionTip = false;

Vue.use(router);
Vue.use(Vuex);
Vue.use(VueBus);
Vue.use(iView);

router.beforeEach( (to, from, next) => {
	window.document.title = to.meta.title;
	next();
});
router.afterEach( (to, from, next) => {
	window.scrollTo(0, 0);
});

const store = new Vuex.Store({
	state: {
		productList: [],
		cartList: []	//只有id和count
	},
	getters: {
		brands: state => {
			//取出每项的品牌,去重
			const brands = state.productList.map( item => item.brand);
			return [...new Set(brands)];
		},
		colors: state => {
			const colors = state.productList.map( item => item.color);
			return [...new Set(colors)];
		}
	},
	mutations: {
		setProductList(state, data){
			state.productList = data;
		},
		addCart(state, id){
			const isAdded = state.cartList.find( item => item.id === id);
			isAdded ? isAdded.count ++ : state.cartList.push({
				id: id,
				count: 1
			});
			localStorage.cartList = JSON.stringify(state.cartList);
		},
		editCartCount(state, payload){
			const product = state.cartList.find( item => item.id === payload.id);
			product.count += payload.count;
			localStorage.cartList = JSON.stringify(state.cartList);
		},
		deleteCart(state, id){
			const index = state.cartList.findIndex( item => item.id === id);
			state.cartList.splice(index, 1);
			localStorage.cartList = JSON.stringify(state.cartList);
		},
		emptyCart(state){
			state.cartList = [];
			localStorage.cartList = JSON.stringify(state.cartList);
		}
	},
	actions: {
		getProductList(context){
			setTimeout( ()=> {
				context.commit('setProductList', product_data);
			}, 500);
		},
		buy(context){
			return new Promise(resolve => {
				setTimeout( () => {
					context.commit('emptyCart');
					resolve();
				}, 500);
			});
		}
	},
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted(){
  	store.state.cartList = JSON.parse(localStorage.cartList);
  	console.log('getting status', store.state.cartList);
  }
});
