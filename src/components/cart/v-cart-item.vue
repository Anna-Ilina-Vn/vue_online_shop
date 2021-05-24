<template>
  <div class='v-cart-item'>
    <img class="v-cart-item__image" :src="cart_item_data.img" alt="">
    <div class="v-cart-item__info">
      <p>{{cart_item_data.title}}</p>
      <p>{{cart_item_data.price | toFix | formattedPrice}}</p>
      <p>{{cart_item_data.article}}</p>
    </div>
    <div class="v-cart-item__quantity">
      <p>Кількість:</p>
      <div class="quantity__tools">
        <span class="quantity__btn" @click="decrementItem"><span class="material-icons">
        remove
        </span></span>
        <p>{{cart_item_data.quantity}}</p>
        <span class="quantity__btn" @click="incrementItem"><span class="material-icons">
        add
        </span></span>
      </div>
    </div>
    <button @click="deleteFromCart" class=" btn">Видалити</button>
  </div>
</template>

<script>
import toFix from '../../filters/toFix'
import formattedPrice from "../../filters/price-format";


  export default {
    name: "v-cart-item",
    props: {
      cart_item_data: {
        type: Object,
        default() {
          return {}
        }
        }
    },
    data() {
      return {}
    },
    filters: {
      toFix,
      formattedPrice
    },
    computed: {},
    methods: {
      decrementItem() {
        this.$emit('decrement')
      },
      incrementItem() {
        this.$emit('increment')
      },
      deleteFromCart() {
        this.$emit('deleteFromCart')
      }
    }
  }
</script>

<style lang="scss">
  .v-cart-item {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 10px 20px;
    margin: 15px auto;
    font-size: 20px;

    .quantity__btn {
      cursor: pointer;
    }

    .quantity__tools {
      user-select: none;
      line-height: 24px;

      p {
        display: inline-block;
        font-size: 24px;
        margin: 0 10px;
      }

      .quantity__btn {
        margin-top: 100px;
      }
    }

    .btn {
      background-color: sandybrown;
    }

    .v-cart-item__image {
      height: 180px;
      width: auto;
    }
  }
</style>