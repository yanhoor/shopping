<template>
  <div>
    <div class="header">
      <router-link
        to="/list"
        class="header-title">电商网站示例</router-link>
      <div class="search-bar">
        <i-input
          v-model="searchVal"
          placeholder="搜索商品名称"
          clearable
          style="width: 70%"></i-input>
        <Icon type="search" size="24" @click.native="handleSearch"></Icon>
      </div>
      <div class="header-menu">
          <router-link to="/cart" class="header-menu-cart">
            购物车
            <span v-if="cartList.length">{{ cartList.length }}</span>
          </router-link>
          <small-cart class="header-menu-small-cart"></small-cart>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
    import smallCart from './components/smallCart.vue';
    export default {
      data(){
        return {
          searchVal: ''
        }
      },
      components: {
        smallCart,
      },
      computed: {
        cartList(){
          return this.$store.state.cartList;
        }
      },
      watch: {
        searchVal(){
          if (!this.searchVal) {
            this.handleSearch();
            console.log('handleSearch...');
          }
        }
      },
      methods: {
        handleSearch(){
          this.$bus.emit('search', this.searchVal);
          if (this.$route.path === '/cart') {
            this.$router.push('/list');
            this.$bus.emit('search', this.searchVal);
            console.log('handleSearch');
          }
        }
      }
    }
</script>
