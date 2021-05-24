<template>
  <div class='v-cart'>

        <router-link :to="{name: 'catalog'}">
          <button
            class="v-cart__link_to_catalog"
          >
          <span class="material-icons">
          arrow_back
          </span>
          Назад до каталогу
          </button>
        </router-link>
    <h1>Кошик</h1>
    <div class="v-cart-body">
    <p v-if="!cart_data.length">Кошик пустий...</p>
    <v-cart-item
        v-for="(item, index) in cart_data"
        :key="item.key"
        :cart_item_data="item"
        @deleteFromCart="deleteFromCart(index)"
        @increment="increment(index)"
        @decrement="decrement(index)"
    />
    <div class="v-cart__total">
      <p class="total__name">Загалом:</p>
      <p>{{cartTotalCost | toFix | formattedPrice}}</p>
    </div> 
    </div>

  </div>
</template>

<script>
  import vCartItem from './v-cart-item'
  import toFix from "../../filters/toFix";
  import formattedPrice from "../../filters/price-format";
  import {mapActions} from 'vuex'

  export default {
    name: "v-cart",
    components: {
      vCartItem
    },
    props: {
      cart_data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
      }
    },
    filters: {
      formattedPrice,
      toFix
    },
    computed: {
      cartTotalCost() {
        let result = []

        if (this.cart_data.length) {
          for (let item of this.cart_data) {
            result.push(item.price * item.quantity)
          }

          result = result.reduce(function (sum, el) {
            return sum + el;
          })
          return result;
        } else {
          return 0
        }
      }
    },
    methods: {
      ...mapActions([
        'DELETE_FROM_CART',
        'INCREMENT_CART_ITEM',
        'DECREMENT_CART_ITEM'
      ]),
      increment(index) {
        this.INCREMENT_CART_ITEM(index)
      },
      decrement(index) {
        this.DECREMENT_CART_ITEM(index)
      },
      deleteFromCart(index) {
        this.DELETE_FROM_CART(index)
      }
    }
  }
</script>

<style lang="scss">
  .v-cart {
    margin-bottom: 80px;
    min-height: 50vh;

    &__total {
      position: relative;
      bottom: 0;
      right: 0;
      left: 0;
      padding: $padding*2 $padding*3;
      display: flex;
      justify-content: center;
      background: $main-bg;
      color: #ffffff;
      font-size: 20px;
    }

    .total__name {
      margin-right: $margin*2;
    }

    &-body {
      padding: 20px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
  }

  .v-cart__link_to_catalog {
    position: fixed;
    display: inline-block;
    width: 270px;
    line-height: 16px;
    padding: 8px;
    right: 0;
    color: lightsteelblue;
    background-color: white;
    top: 94px;
    border: none;

    span {
    position: absolute;
    left: 5px;
    top: 2px;
    }

    &:hover {
      color: white;
      background-color: lightgrey;
    }

    .v-cart__total {
      height: 130px;
    }
  }
</style>
