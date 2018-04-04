<template>
	<div class="category-container">
		<div class="category-menu">
			<span
				v-for="item in data.channel"
				class="category-menu-item">
				{{item}} >
			</span>
		</div>
		<div
			v-for="item in data.item"
			class="category-item">
			<span class="category-item-key">{{Object.keys(item)[0]}} ></span>
			<div class="category-item-value-container">
				<span
					v-for="value in Object.values(item)[0]"
					class="category-item-value">
					|  {{value}}
				</span>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: {
			data: Object,
		},
	};
</script>
<style type="text/css" scoped>
	.category-container{
		width: 700px;
		height: 500px;
		padding: 5px 10px;
		background: #fff;
		border-radius: 6px;
		box-shadow: 3px 3px 1px rgba(0,0,0,.2);
	}
	.category-menu{
		padding-bottom: 12px;
	}
	.category-menu-item{
		cursor: pointer;
		background: black;
		color: white;
		padding: 5px 10px;
		margin-right: 10px;
		font-size: 12px;
	}
	.category-menu-item:hover{
		background: gray;
	}
	.category-item{
		padding-bottom: 10px;
	}
	.category-item span{
		cursor: pointer;
	}
	.category-item span:hover{
		color: #2d8cf0;
	}
	.category-item-key{
		display: inline-block;
		float: left;
		width: 10%;
		padding: 3px 3px;
		text-align: right;
		font-size: 12px;
		font-weight: bold;
	}
	.category-item-value-container{
		display: inline-block;
		width: 90%;
	}
	.category-item-value{
		display: inline-block;
		padding: 0px 5px;
		font-size: 12px;
	}
</style>