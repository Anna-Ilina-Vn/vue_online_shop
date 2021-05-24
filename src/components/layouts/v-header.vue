<template>
  <header>
  <div class='v-header'>
    <router-link :to="{name: 'mainPage'}">
      <div class="img"><img src="https://pngimg.com/uploads/ninja/ninja_PNG18.png" alt=""></div>
    </router-link>
    <div class="d1"><h1><span>MasterShop</span></h1></div>
    <div class="search-field">
      <input
          type="text"
          v-model="searchValue"
      >
      <button class="search_btn">
        <i class="material-icons" @click="search(searchValue)">search</i>
      </button>
      <button class="search_btn">
        <i class="material-icons" @click="clearSearchField">close</i>
      </button>
    </div>
    <div class="contacts">
        <i class="material-icons">phone</i>
        <a href="tel:123-456-7890">123-456-7890</a>
    </div>
  </div>
    <div class="nav">
      <router-link :to="{name: 'mainPage'}">
        Про нас
      </router-link>
      <router-link :to="{name: 'catalog'}">
        Каталог
      </router-link>
      <router-link :to="{name: 'mainPage'}">
        Блог
      </router-link>
      <router-link :to="{name: 'mainPage'}">
        Контакти
      </router-link>
    </div>
  </header>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "v-header",
    props: {},
    data() {
      return {
        searchValue: ''
      }
    },
    computed: {
      ...mapGetters([
        'SEARCH_VALUE'
      ])
    },
    methods: {
      ...mapActions([
        'GET_SEARCH_VALUE_TO_VUEX'
      ]),
      search(value) {
        this.GET_SEARCH_VALUE_TO_VUEX(value);
        if (this.$route.path !== '/catalog') {
          this.$router.push('/catalog')
        }
      },
      clearSearchField() {
        this.searchValue = ''
        this.GET_SEARCH_VALUE_TO_VUEX();
        if (this.$route.path !== '/catalog') {
          this.$router.push('/catalog')
        }
      }
    }
  }
</script>

<style lang="scss">
  header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
  }
.d1 h1 {
  color: #F16246;
  text-align: center;
  position: relative;
}
.d1 h1:after {
  content: "";
  position: absolute;
  top: 20px;
  left: -34px;
  height: 2px;
  width: 20%;
  background: sandybrown;
  z-index: 1;
}
.d1 h1:before {
  content: "";
  position: absolute;
  top: 20px;
  right: -32px;
  height: 2px;
  width: 20%;
  background: sandybrown;
  z-index: 1;
}
.d1 span {
  background: $main-bg;
  padding: 0 20px 0 20px;
  z-index: 2;
}
.contacts {
  position: relative;
  padding: 0 30px;

  a {
    line-height: 34px;
    font-size: 20px;
    font-family: 'Cormorant Garamond', serif;
    text-align: center;
    color: #E5EDEA;
    font-weight: bolder;
  }
  i {
    position: absolute;
    top: 4px;
    left: 0;
  }
}
  .v-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $main-bg;
    padding: 8px;
    width: 100%;

    .img {
      margin-left: 7vw;
      position: relative;

      img {
      width: 70px;
      position: absolute;
      top: -30px;
      left: 50px;
      z-index: 10;
      }
    }

    h1 {
      color: #d6d6d6;
      font-size: 26px;
      letter-spacing: 4px;
      word-spacing: 7px;
      text-shadow: 2px 2px 10px 5px white;
    }

    span {
      font-size: 30px;
      font-weight: bolder;
    }

    .search-field {
      position: relative;
      margin-right: 2vw;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20vw;

      input {
        width: 100%;
        line-height: 30px;
        border-radius: 20px;
        padding: 0 0 0 16px;

      }
    }

    .search_btn {
      margin-left: 16px;
      background: transparent;
      border: none;
      position: absolute;

      &:first-of-type {
        right: 24px;
        top: 5px;
      }

      &:last-of-type {
        right: 4px;
        top: 5px;
      }
    }

  }
    .nav {
      line-height: 34px;
      font-size: 20px;
      font-family: 'Cormorant Garamond', serif;
      background-color: #2c3e50;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 30vw;

      a {
        color: #E5EDEA;
        margin-right: 10px;
        text-transform: uppercase;
      }
    }
</style>
