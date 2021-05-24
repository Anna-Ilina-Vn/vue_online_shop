<template>
  <div class='v-catalog-item'>

    <v-popup
        v-if="isInfoPopupVisible"
        rightBtnTitle="Додати до кошика"
        :popupTitle="product_data.title"
        @closePopup="closeInfoPopup"
        @rightBtnAction="addToCart"
    >
      <div>
        <p class="v-catalog-item__name">Колір: {{product_data.color}}</p>
        <p class="v-catalog-item__price">Ціна: {{product_data.price | toFix | formattedPrice}}</p>
        <img class="v-catalog-item__image" :src="product_data.img" alt="">
      </div>
    </v-popup>

    <p class="v-catalog-item__name">{{product_data.title}}</p>
    <img class="v-catalog-item__image" :src="product_data.img" alt="" @click="productClick">
    <p class="v-catalog-item__price">Ціна: {{product_data.price | toFix | formattedPrice}}</p>
    <div>
      <button
          class="v-catalog-item__show-info btn"
          @click="showPopupInfo"
      >
        Детальніше
      </button>
      <button
          class="v-catalog-item__add_to_cart_btn btn"
          @click="addToCart"
      >Додати до кошика
      </button>
    </div>
  </div>
</template>

<script>
  import vPopup from '../popup/v-popup'
  import toFix from '../../filters/toFix'
  import formattedPrice from "../../filters/price-format";

  export default {
    name: "v-catalog-item",
    components: {
      vPopup
    },
    props: {
      product_data: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    data() {
      return {
        isInfoPopupVisible: false
      }
    },
    filters: {
      toFix,
      formattedPrice
    },
    computed: {},
    methods: {
      productClick() {
        this.$emit('productClick', this.product_data.key)
      },
      showPopupInfo() {
        this.isInfoPopupVisible = true;
      },
      closeInfoPopup() {
        this.isInfoPopupVisible = false;
      },
      addToCart() {
        this.$emit('addToCart', this.product_data);
      }
    },
    mounted() {
      this.$set(this.product_data, 'quantity', 1)
    }
  }
</script>

<style lang="scss">
  .v-catalog-item {
    flex-basis: 25%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    padding: 26px;
    margin: 25px;
    height: 370px;

    &__image {
      width: 96%;
      margin: 0 auto;
      flex: 1 1 auto;
    }

    &__name {
      flex: 0 1 60px;
    }

  }
  .v-catalog-item__show-info {
    margin: 10px auto;
    background: $main-bg-hover !important;
    width: 100%;
  }
  .v-catalog-item__add_to_cart_btn {
    width: 100%;
  }
</style>
