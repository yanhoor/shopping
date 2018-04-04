<template>
	<div class="small-cart">
		<template v-if="cartList.length" v-for="item in cartList">
			<div class="container">
				<img :src="productDictList[item.id].image" class="cart-item-img">
				<div class="cart-item-desc">
					{{productDictList[item.id].name}} （{{productDictList[item.id].color}}）
				</div>
				<div class="cart-item-count">
					<span class="count">{{productDictList[item.id].cost}} × {{item.count}}</span>
					<span
						class="delete"
						@click="handleDelete(item.id)">删除</span>
				</div>
			</div>
		</template>
		<div v-if="cartList.length === 0">购物车为空</div>
	</div>
</template>
<script type="text/javascript">
	import product_data from '../data/product.js';
	export default {
		data(){
			return {
				productList: product_data
			}
		},
		computed: {
			cartList(){
				return this.$store.state.cartList;
			},
			productDictList(){
				const dict = {};
				this.productList.forEach( item => {
					dict[item.id] = item;
				});
				return dict;
			}
		},
		methods: {
			handleDelete(id){
				this.$store.commit('deleteCart', id);
			}
		}
	};
</script>
<style type="text/css" scoped>
	.small-cart{
		width: 420px;
		position: absolute;
		right: 0px;
		top: 48px;
		display: none;
		padding: 15px;
		background: #fff;
		box-shadow: 2px 2px 5px gray;
		color: black;
		border-radius: 5px;
		z-index: 1;
		max-height: 400px;
		overflow-y: auto;
	}
	.container{
		margin-top: 10px;
		display: flex;
		text-align: center;
		border-bottom: 1px solid #dddee1;
	}
	.cart-item-img{
		width: 30px;
		height: 30px;
	}
	.cart-item-desc{
		width: 200px;
		display: inline-block;
		font-size: 14px;
		margin-left: 15px;
		text-align: left;
		line-height: 110%;
	}
	.cart-item-count{
		flex: 1;
		display: inline-block;
		font-size: 14px;
		margin-left: 15px;
	}
	span.count{
		float: left;
	}
	span.delete{
		cursor: pointer;
		color: #2d8cf0;
		width: 45px;
		float: right;
		font-size: 12px;
		white-space: nowrap;
	}
</style>