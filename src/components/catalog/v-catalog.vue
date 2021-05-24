<template>
  <div class='v-catalog'>

    <v-notification
        :messages="messages"
        style="z-index: 200;"
    />

    <router-link :to="{name: 'cart', params: {cart_data: CART}}">
      <div class="v-catalog__link_to_cart">
        <p>Кошик</p>
        <span>{{CART.length}}</span>
        <img src="../../assets/shopping-cart.png"/>
      </div>
    </router-link>
    <div class="d3"><h3><span>Каталог товарів</span></h3></div>
    <div class="main">
      <div class="filters">
        <label>Фільтр по категоріям</label>
        <select v-model="selectCategory">
          <option value="0">Всі категорії</option>
            <option v-for="(category, id) in categories" :key="id" :value="category">{{ category }}</option>
        </select>
        <br>
        <label>Фільтр по ціні</label>
        <span style="text-align: left">Мінімальна ціна</span>
        <input v-model.number="minPrice" type="number" />
        <span style="text-align: left">Максимальна ціна</span>
        <input v-model.number="maxPrice" type="number" />
            <br>
        <label>Фільтр по брендам</label>
        <select v-model="selectBrand">
            <option value="0">Всі бренди</option>
            <option v-for="(brand, id) in brands" :key="id" :value="brand">{{ brand }}</option>
        </select>
            <br>
        <label>Пошук по назві</label>
        <input v-model.trim="inputSearch" type="text" placeholder="MacBook Air" />
            <br>
        <button @click="clear" class="primary btn-clean">Скинути фільтри</button>
      </div>
      <div class="v-catalog__list">
        <v-catalog-item
            v-for="product in filteredPr"
            :key="product.key"
            :product_data="product"
            @addToCart="addToCart"
            @productClick="productClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import vCatalogItem from './v-catalog-item'
  import {mapActions, mapGetters} from 'vuex'
  import vNotification from '../notifications/v-notification'

  export default {
    name: "v-catalog",
    components: {
      vCatalogItem,
      vNotification,
    },
    props: {},
    data() {
      return {
        categories: [],
        sortedProducts: [],
        minPrice: 0,
        maxPrice: 10000,
        messages: [],
        brands: [],
        inputSearch: '',
      }
    },
    computed: {
      ...mapGetters([
        'PRODUCTS',
        'CART',
        'IS_MOBILE',
        'IS_DESKTOP',
        'SEARCH_VALUE',
      ]),
      filteredPr: function() {

        var filtered = [...this.PRODUCTS]

          .filter(product => {
            return this.selectCategory == 0 || product.category == this.selectCategory;
          })

          .filter(product => {
            return this.selectBrand == 0 || product.brand == this.selectBrand;
          })

          .filter(product => {
            return Number(product.price) >= this.minPrice && Number(product.price) <= this.maxPrice;
          })
          
          .filter(product => {
            return this.inputSearch == '' || product.title.toLowerCase().indexOf(this.inputSearch.toLowerCase()) !== -1;
          })
          
          return filtered
      },
    },
    methods: {
      ...mapActions([
        'GET_PRODUCTS_FROM_API',
        'ADD_TO_CART'
      ]),
      productClick(key) {
        this.$router.push( {name: 'product', query: { 'product': key }})
      },
      addToCart(data) {
        this.ADD_TO_CART(data)
          .then(() => {
            let timeStamp = Date.now().toLocaleString();
            this.messages.unshift(
              {name: 'Товар додано до кошика', icon: 'check_circle', id: timeStamp}
            )
          })
      },
      sortProductsBySearchValue(value) {
        this.sortedProducts = [...this.PRODUCTS]
        if (value) {
          this.sortedProducts = this.sortedProducts.filter(function (item) {
            return item.title.toLowerCase().includes(value.toLowerCase())
          })
        } else {
          this.sortedProducts = this.PRODUCTS;
        }
      },
        getMinPrice: function() {
          return this.sortedProducts.map((item) => {
            return item.price })
        },
        getMaxPrice: function() {
          return this.sortedProducts.map((item) => {
            return item.price })
        },
        getBrands: function() {
          return this.sortedProducts.map((item) => {
            return item.brand })
        },
        getCategory: function() {
          return this.sortedProducts.map((item) => {
            return item.category })
        },
        clear: function() {
            this.inputSearch = '';
            this.selectCategory = 0;
            this.selectBrand = 0;
            this.minPrice = Math.min.apply(Math, this.getMinPrice());
            this.maxPrice = Math.max.apply(Math, this.getMaxPrice());
        },
        unique: function(arr) {
          let result = [];
          for (let str of arr) {
            if (!result.includes(str)) {
              result.push(str);
            }
          }
          return result;
        }
    },
    watch: {
      SEARCH_VALUE() {
        this.sortProductsBySearchValue(this.SEARCH_VALUE);
      },
    },
    mounted() {
      this.GET_PRODUCTS_FROM_API()
        .then((response) => {
          if (response.data) {
            this.sortProductsBySearchValue(this.SEARCH_VALUE)
            this.minPrice = Math.min.apply(Math, this.getMinPrice())
            this.maxPrice = Math.max.apply(Math, this.getMaxPrice())
            this.brands = this.unique(this.getBrands())
            this.categories = this.unique(this.getCategory())
          }
        })
    }
  }
</script>

<style lang="scss">
  .v-catalog {
    .d3 {
      position: relative;
    }
    .d3 h3:before {
      content: "";
      position: absolute;
      top: calc(50% - 6px);
      left: 0;
      right: 0;
      height: 12px;
      margin: 0 10vw 0 30vw;
      background: sandybrown;
      z-index: -1;
    }
    .d3 span {
      background: white;
      padding: 0 15px;
      margin-left: 20px;
    }
    
    .main {
      display: flex;
      flex-flow: row;
    }


    &__list {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      align-items: center;
      flex: 3 1 auto;
      overflow-y: scroll;
      height: 550px;
    }
    .v-catalog-item {
      min-width: 300px;
    }
  }

  .filters {
    flex: 1 1 auto;
    max-width: 270px;
    padding: 30px 20px 0 20px;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    position: relative;

    label {
      line-height: 38px;
      text-align: left;
      text-transform: uppercase;
      font-family: 'Cormorant Garamond', serif;
      font-weight: bolder;
    }

    &::after {
      content: '';
      display: block;
      width: 2px;
      height: 100%;
      position: absolute; 
      right: 0;
      border-right: 1px solid #cccccc;
      box-shadow: 0 0 8px 0 #e0e0e0;
    }

    input, select {
      height: 34px;
      line-height: 34px;
      font-size: 20px;
      font-family: 'Cormorant Garamond', serif;
      padding: 0 10px;
      background: #ffffff;
      border: 1px solid #DDDDDD;
      color: #808080;
      outline: none;
    }


    input:focus, select:focus {
      border-color: sandybrown;
    }
  }

  .range-values {
    display: flex;
    justify-content: space-between;
  }

  .range-slider {
    margin: 20px auto;
    text-align: center;
    position: relative;
  }

.v-catalog__link_to_cart {
  position: fixed;
  width: 100px;
  right: 8px;
  top: 64px;
  padding: 0 0px;
  z-index: 120;

  img {
    display: block;
    width: 85px;
    height: 85px;
    position: absolute;
    top: 28px;
    right: -2px;
  }
  p {
    color: white;
    padding: 0 2px;
    font-size: 18px;
    text-transform: uppercase;
    z-index: 120;
  }
    span {
      margin: -13px 0 0 20%;
      width: 40px;
      padding: 22px 40px 10px 30px;
      display: block;
      background: white;
      color: black;
    }
}

.btn-clean {
  border: none; 
  padding: 12px 0; 
  border-radius: 5px; 
  color: white; 
  background-color: lightsteelblue;

  &:Hover {
    background-color: sandybrown;
  }
}
</style>
