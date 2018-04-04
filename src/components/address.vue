<template>
	<div class="address">
		<div class="address-control">
			<Cascader
				class="address-control-cascader"
				v-model="address1"
				:data="cityList"
				:load-data="loadData"
				filterable
				style="width: 20%; padding: 12px 0;"></Cascader>
			<Input
				class="address-control-input"
				v-model="address2"
				placeholder="详细地址"
				style="width: 40%;"
				clearable></Input>
			<Button
				class="address-control-button"
				type="primary"
				@click.native="handleAddAddress">添加</Button>
		</div>
		<div class="address-list" v-if="addressList.length">
			<div class="address-list-desc">
				<span>地址列表:</span>
			</div>
			<RadioGroup v-model="receivedAddress">
				<template v-for="(item, index) in addressList">
					<div class="address-list-item">
						<Radio :label="item" class="address-list-item">
							<span class="address-list-item-desc">{{item}}</span>
						</Radio>
						<span
							class="address-list-item-delete"
							@click="handleShowModal(index)">删除</span>
					</div>
				</template>
			</RadioGroup>
			<Modal
				v-model="showModal"
				@on-ok="handleDeleteAddress(deleteItem)">
					<p>确定删除该地址吗？</p>
			</Modal>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {instance as ajax, cityList as city_list} from '../data/address.js';
	export default{
		data(){
			return {
				cityList: city_list,
				address: '',
				address1: ['广东', '广州', '从化'],
				address2: '',
				addressList: [],
				receivedAddress: '',
				showModal: false,
				deleteItem: -1,
			}
		},
		methods: {
			handleAddAddress(){
				let ad = '';
				if (this.address1.length === 2) {
					ad = this.address1[0] + '市' + this.address2;
				}else{
					ad = this.address1[0] + '省  '
						+ this.address1[1] + '市  '
						+ this.address1[2] + '区（县）  '
						+ this.address2;
				}
				if (!this.addressList.includes(ad)) {
					this.addressList.push(ad);
				}
				this.address = ad;
			},
			handleShowModal(index){
				this.deleteItem = index;
				this.showModal = true;
			},
			handleDeleteAddress(index){
				this.addressList.splice(index, 1);
			},
			loadData(item, callback){
				item.loading = true;
				console.log('id is ', item.id);
				if (item.id.length > 2) {
					ajax.get('provshi/' + item.id + '.html')
						.then( res => {
							console.log(res);
							let children = [];
							for (let key of Object.keys(res)){
								if (key === '00') {
									children.push({
										id: key,
										value: res[key],
										label: res[key],
										province: item.id
									});
								}else{
									children.push({
										id: key,
										value: res[key],
										label: res[key],
										children: [],
										loading: false,
										province: item.id
									});
								}
							}
							item.children = children;
						})
						.catch( error => console.log(error));
				}else{
					ajax.get('station/' + item.province + item.id + '.html')
						.then( res => {
							console.log('county', res);
							let children = [];
							for (let key of Object.keys(res)){
								children.push({
									id: key,
									value: res[key],
									label: res[key]
								});
							}
							item.children = children;
						})
						.catch( error => console.log(error));
				}
				item.loading = false;
				callback();
			}
		}
	};
</script>
<style type="text/css" scoped>
.address-control,
.address-list{
	padding: 16px 0;
}
.address-list-desc{
	padding-bottom: 16px;
}
.address-list-item{
	padding-bottom: 10px;
}
.address-list-item-delete{
	position: relative;
	color: #2d8cf0;
	margin-left: 24px;
	top: -5px;
	cursor: pointer;
}
</style>