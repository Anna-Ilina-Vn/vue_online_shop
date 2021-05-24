<template>
  <div class='v-product-page'>
        <v-notification
        :messages="messages"
        style="z-index: 200;"
    />
        <router-link :to="{name: 'catalog'}">
          <button
            class="v-catalog-item__go_to_catalog_btn btn"
          >
          <span class="material-icons">
          arrow_back
          </span>
          Назад до каталогу
          </button>
        </router-link>
    <h2>{{product.title}}</h2>
    <div class="v-product-page__body">
      <div>
      <div class="v-product-page__image-gallery">
        <img :src="product.img" alt="" class="v-product-page__image">
        <div class="v-product-page__images">
          <div v-for="(img,id) in product.gallery" :key="id">
            <img :src="img" alt="">
          </div>
        </div>
      </div>
      <div class="v-product-page__image-gallery v-product-page__similar-gallery">
        <div class="d3"><h3><span>Можливо Вас зацікавить?</span></h3></div>
        <div class="v-product-page__similar">
          <v-catalog-item
            v-for="product in similarProducts"
            :key="product.key"
            :product_data="product"
            @addToCart="addToCart"
            @productClick="productClick"
        />
        </div>
      </div>
      </div>
      <div class="v-product-page__descr">
        <h4> {{product.title}}</h4>
        <h4 class="item-price">Ціна: {{product.price | toFix | formattedPrice}}</h4>
        <button
            class="v-catalog-item__add_to_cart_btn btn"
            @click="addToCart"
        >Додати до кошика
        </button>
        <router-link :to="{name: 'cart'}">
          <button
             class="v-catalog-item__go_to_cart_btn btn"
            @click="addToCart"
          >Перейти до кошика
          </button>
        </router-link>
        <div class="v-product-page__features">
          <div class="v-product-page__features-title" @click="isFeatures = !isFeatures">
            <h3>Всі характеристики:</h3>
            <span class="material-icons" v-if="isFeatures">
              close
            </span>
            <span class="material-icons" v-else>
              keyboard_arrow_down
            </span>
          </div>
          <div class="v-product-page__features-body" :class="{ 'fetures-visible': !isFeatures}">
            <h5>Особливості</h5>
            <ul>
              <li>Колір:<span></span>{{product.color}}</li>
              <li>Бренд: <span></span>{{product.brand}}</li>
              <li>Країна виробництва: <span></span>{{product.country}}</li>
              <li>Особливості: <span></span>{{product.specifics}}</li>
              <li>Напрямок використання: <span></span>{{product.direction}}</li>
            </ul>
            <h5>Центральний процесор</h5>
            <ul>
              <li>Тип центрального процесора: <span></span>{{product.cpu.type}}</li>
              <li>Модель центрального процесора: <span></span>{{product.cpu.type}}</li>
              <li>Кількість ядер: <span></span>{{product.cpu.cores}}</li>
              <li>Частота центрального процесора: <span></span>{{product.cpu.frequency}}</li>
            </ul>
            <h5>Оперативна пам'ять</h5>
            <ul>
              <li>Об'єм ОЗУ: <span></span>{{product.ram.volume}}</li>
              <li>Тип оперативної пам'яті: <span></span>{{product.ram.type}}</li>
              <li>Частота оперативної пам'яті: <span></span>{{product.ram.frequency}}</li>
            </ul>
            <h5>Жорсткий диск</h5>
            <ul>
              <li>Об'єм накопичувача: <span></span>{{product.hardDrive.volume}}</li>
              <li>Тип накопичувача: <span></span>{{product.hardDrive.type}}</li>
            </ul>
            <h5>Відеокарта</h5>
            <ul>
              <li>Виробник відеокарти:<span></span>{{product.videoCard.brand}}</li>
              <li>Модель графічного процесора:<span></span>{{product.videoCard.model}}</li>
              <li>Обсяг відеопам'яті:<span></span>{{product.videoCard.volume}}</li>
              <li>Тип відеокарти:<span></span>{{product.videoCard.type}}</li>
            </ul>
            <h5>Операційна система</h5>
            <ul>
              <li>Операційна система:<span></span>{{product.os}}</li>
            </ul>
            <h5>Екран</h5>
            <ul>
              <li>Діагональ екрану:<span></span>{{product.display.diagonal}}</li>
              <li>Роздільна здатність екрану:<span></span>{{product.display.resolution}}</li>
              <li>Тип матриці:<span></span>{{product.display.matrix}}</li>
              <li>Покриття екрану:<span></span>{{product.display.coverage}}</li>
            </ul>
            <h5>Корпус</h5>
            <ul>
              <li>Товщина, мм:<span></span>{{product.size.thickness}}</li>
              <li>Ширина, мм:<span></span>{{product.size.width}}</li>
              <li>Глибина, мм:<span></span>{{product.size.depth}}</li>
              <li>Вага, кг:<span></span>{{product.size.weight}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import toFix from "../../filters/toFix";
  import formattedPrice from "../../filters/price-format";
  import vCatalogItem from './v-catalog-item'
  import vNotification from '../notifications/v-notification'

  export default {
    name: "v-product-page",
    components: {
      vCatalogItem,
      vNotification,
    },
    props: {},
    data() {
      return {
        isFeatures: true,
        messages: [],
      }
    },
    filters: {
      formattedPrice,
      toFix
    },
    computed: {
      ...mapGetters([
        'PRODUCTS'
      ]),
      product() {
        let result = {}
        let vm = this;
        this.PRODUCTS.find(function (item) {
          if (item.key === vm.$route.query.product) {
            result = item;
          }
        })
        return result;
      },
      similarProducts() {
        var filte =  [...this.PRODUCTS]
          
          .filter(product => {
            return product.brand == this.product.brand || product.direction == this.product.direction;
          })

          return filte.reverse()
      }
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
    },
    mounted() {
      if (!this.PRODUCTS.length) {
        this.GET_PRODUCTS_FROM_API()
      }
    }
  }
</script>

<style scoped lang='scss'>
  h2{ 
    margin: -30px 0 10px;
  }
.v-product-page__body {
  display: flex;
  padding: 10px 5vw;

  .v-product-page__descr {
    width: 40vw;
    text-align: left;
    margin-top: 30px;

  }

  .v-catalog-item__add_to_cart_btn  {
    background-color: sandybrown;
    margin: 0 20px 0px 12%;
  }

  .btn {
    width: 200px;
  }
}
.v-product-page__image-gallery {
  width: 44vw;
  max-height: 73vh;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 1%;
  margin: 0 20px 0 0;

  .v-product-page__image {
    width: 98%;
  }

  .v-product-page__images {
    display: flex;
    width: 98%;
    margin: 10px auto;
    overflow: scroll;
    justify-content: space-between;

    img {
      width: 40%;
    }
  }

}
.v-product-page__features-title {
  display: flex;
  justify-content: space-between;
  margin: 40px 10px;

  h3 {
    display: inline-block;
  }
}
.v-product-page__features-body {
  height: 100%;

  li {
    display: flex;

    span {
      flex: 1 1 auto;
      border-bottom: 1px dashed lightseagreen;
    }
  }
}

.fetures-visible {
  height: 0;
  overflow: hidden;
}

.v-catalog-item__go_to_catalog_btn {
  position: fixed;
  display: inline-block;
  width: 220px;
  line-height: 14px;
  right: 0;
  background-color: white;
  color: lightsteelblue;
  top: 94px;

  span {
  position: absolute;
  left: 5px;
  top: 2px;
  }

  &:hover {
    color: white;
  }
}

.item-price {
  font-weight: bolder;
  margin: 40px 0;
}

.v-catalog-item {
  max-width: 400px;
  margin: 20px auto;
}
.v-product-page__similar-gallery {
  overflow-y: scroll;
  padding: 20px 0;

    .d3 {
      position: relative;
    }
    .d3 h3:before {
      content: "";
      position: absolute;
      top: 50%;
      height: 6px;
      width: 40px;
      left: 100px;
      background: sandybrown;
    }
    .d3 h3:after{
      content: "";
      position: absolute;
      top: 50%;
      height: 6px;
      width: 90px;
      background: sandybrown;
    }
    .d3 span {
      background: white;
      padding: 0 15px;
      margin-left: 20px;
    }
}
.v-product-page__similar {
  display: flex;
  flex-direction: column;
}
</style>
