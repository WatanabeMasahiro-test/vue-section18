<template>
  <div class="container mt-4 border border-3">
    <header class="text-center mt-4">
      <template v-if="isAuthenticated">
        <router-link to="/"         class="mx-3 header-item">掲示板</router-link>
      </template>
      <template v-if="isAuthenticated">
        <span class="mx-3 header-item text-primary text-decoration-underline" 
          @click="logout()">ログアウト</span>
      </template>
      <template v-if="!isAuthenticated">
        <router-link to="/login"    class="mx-3 header-item">ログイン</router-link>
        <router-link to="/register" class="mx-3 header-item">登録</router-link>
      </template>
    </header>
    <router-view></router-view>
  </div>

</template>

<script>
  export default {
    computed: {
      isAuthenticated() {
        return this.$store.getters.idToken !== null;
      },
    },
    methods: {
      logout () {
        this.$store.dispatch('logout');
      },
    },
  }
</script>

<style scoped>
  .header-item {
    padding : 5px;
    cursor  : pointer;
  }

  .border {
    background-color: ghostwhite;
  }

  .board-div {
    width   : 300px;
    margin: 0 auto;
  }

  .content-pre {
    word-break: break-all;
    white-space: pre;           /* CSS 2.0 */
    white-space: pre-wrap;      /* CSS 2.1 */
    white-space: pre-line;      /* CSS 3.0 */
    white-space: -pre-wrap;     /* Opera 4-6 */
    white-space: -o-pre-wrap;   /* Opera 7 */
    white-space: -moz-pre-wrap; /* Mozilla */
    white-space: -hp-pre-wrap;  /* HP Printers */
    word-wrap: break-word;      /* IE 5+ */
  }

  /* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  } */
</style>
