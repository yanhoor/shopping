<template>
	<div class="list-container" v-show="list.length">
		<div class="classify-container">
			<div class="classify-list">
				<div
					v-for="item in classifyList"
					class="classify-list-item">
					<div>
						<span
							v-for="desc in item.category"
							class="classify-list-item-desc">
							{{desc}}
						</span>
					</div>
					<Classify
						:data="item"
						class="classify-component"></Classify>
				</div>
			</div>
			<div class="classify-display">
				<Carousel autoplay loop trigger="hover">
					<CarouselItem v-for="(item, index) in displayList" :key="index">
						<router-link :to="'product/' + item.id">
							<div class="classify-display-item">
								<img :src="item.image">
								<span>{{item.name}}</span>
							</div>
						</router-link>
					</CarouselItem>
				</Carousel>
			</div>
		</div>
		<div class="list-control">
			<div class="list-control-filter">
				<span>品牌：</span>
				<span
					class="list-control-filter-item"
					:class="{ on: filterBrand.includes(item)}"
					v-for="item in brands"
					@click="handleFilterBrand(item)">{{ item}}</span>
			</div>
			<div class="list-control-filter">
				<span>颜色：</span>
				<span
					class="list-control-filter-item"
					:class="{ on: filterColor.includes(item)}"
					v-for="item in colors"
					@click="handleFilterColor(item)">{{ item}}</span>
			</div>
			<div class="list-control-order">
				<span>排序：</span>
				<span
					class="list-control-order-item"
					:class="{ on: order === ''}"
					@click="handleOrderDefault">默认</span>
				<span
					class="list-control-order-item"
					:class="{ on: order === 'sales'}"
					@click="handleOrderSales">
					销量
					<template v-if="order === 'sales'">⬇</template>
				</span>
				<span
					class="list-control-order-item"
					:class="{ on: order.indexOf('cost') > -1}"
					@click="handleOrderCost">
					价格
					<template v-if="order === 'cost-asc'">⬆</template>
					<template v-if="order === 'cost-desc'">⬇</template>
				</span>
			</div>
		</div>
		<Product
			v-for="item in filteredAndOrderedList"
			:info="item"
			:key="item.id"></Product>
		<div
			class="product-not-found"
			v-show="!filteredAndOrderedList.length">
			暂无相关商品
		</div>
		<BackTop></BackTop>
	</div>
</template>
<script>
	import Product from '../components/product.vue';
	import classify_data from '../data/classify.js';
	import Classify from '../components/classify.vue';
	export default{
		components: { 
			Product,
			Classify,
		},
		data(){
			return {
				order: '',
				filterBrand: [],
				filterColor: [],
				searchVal: '',
				classifyList: classify_data
			}
		},
		computed: {
			list(){
				return this.$store.state.productList;
			},
			displayList(){
				let list = this.$store.state.productList;
				return list;
			},
			brands(){
				return this.$store.getters.brands;
			},
			colors(){
				return this.$store.getters.colors;
			},
			filteredAndOrderedList(){
				let list = [...this.list];
				if (this.filterBrand.length) {
					list = list.filter( item => this.filterBrand.includes(item.brand));
				}
				if (this.filterColor.length) {
					list = list.filter( item => this.filterColor.includes(item.color));
				}
				if (this.order !== '') {
					switch(this.order){
						case 'sales':
							list = list.sort( (a, b) => b.sales - a.sales);
							break;
						case 'cost-desc':
							list = list.sort( (a, b) => b.cost - a.cost);
							break;
						case 'cost-asc':
							list = list.sort( (a, b) => a.cost - b.cost);
							break;
					}
				}
				if (this.searchVal) {
					console.log('searching');
					list = list.filter( item => item.name.includes(this.searchVal.trim()));
				}
				return list;
			},
		},
		methods: {
			handleOrderDefault(){
				this.order = '';
			},
			handleOrderSales(){
				this.order = 'sales';
			},
			handleOrderCost(){
				if(this.order === 'cost-desc'){
					this.order = 'cost-asc';
				}else{
					this.order = 'cost-desc';
				}
			},
			handleFilterBrand(brand){
				let index = this.filterBrand.findIndex( item => item === brand);
				if (index > -1) {
					this.filterBrand.splice(index, 1);
				}else{
					this.filterBrand.push(brand);
				}
			},
			handleFilterColor(color){
				let index = this.filterColor.findIndex( item => item === color);
				if (index > -1) {
					this.filterColor.splice(index, 1);
				}else{
					this.filterColor.push(color);
				}
			},
			handleSearch(searchVal){
				this.searchVal = searchVal;
			}
		},
		mounted(){
			this.$store.dispatch('getProductList');
		},
		created(){
			this.$bus.on('search', this.handleSearch);
		},
		beforeDestroy(){
			this.$bus.off('search', this.handleSearch);
		}
	}
</script>
<style scoped>
	.list-container{
		position: relative;
		top: 48px;
		font-size: 16px;
	}
	.product-not-found{
		text-align: center;
		padding: 32px;
	}
	.classify-container{
		background: #fff;
		border-radius: 6px;
		height: 500px;
		margin: 16px;
		position: relative;
		box-shadow: 0 1px 1px rgba(0,0,0,.2);
	}
	.classify-list{
		display: inline-block;
		width: 30%;
		height: 100%;
		float: left;
		box-shadow: 2px 2px 1px rgba(0,0,0,.2);
	}
	.classify-list-item{
		padding: 5px 16px;
	}
	.classify-list-item:hover{
		background: #d9d9d9;
	}
	.classify-list-item-desc:hover{
		cursor: pointer;
		color: #2d8cf0;
	}
	.classify-list-item:hover .classify-component{
		display: inline-block;
	}
	.classify-component{
		display: none;
		position: absolute;
		left: 30%;
		top: 0;
		z-index: 1;
	}
	.classify-display{
		display: inline-block;
		width: 40%;
		padding: 16px;
	}
	.classify-display-item{
		position: relative;
		color: #000;
	}
	.classify-display-item img{
		height: 480px;
	}
	.classify-display-item span{
		position: absolute;
		left: 5px;
		bottom: 5px;
	}
	.list-control{
		background: #fff;
		border-radius: 6px;
		margin: 16px;
		padding: 16px;
		box-shadow: 0 1px 1px rgba(0,0,0,.2);
	}
	.list-control-filter{
		margin-bottom: 16px;
	}
	.list-control-filter-item,
	.list-control-order-item{
		cursor: pointer;
		display: inline-block;
		border: 1px solid #e9eaec;
		border-radius: 4px;
		margin-right: 6px;
		padding: 2px 6px;
	}
	.list-control-filter-item.on,
	.list-control-order-item.on{
		background: #f2352e;
		border: 1px solid #f2352e;
		color: #fff;
	}
</style>