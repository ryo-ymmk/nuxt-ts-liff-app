<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">liff-app</h1>
      <p>いぬのかわいさを享受しろ</p>
    </div>
    <div class="messages">
      <p>ﾄｸｰﾝ→{{ accessToken }}</p>
      <p>
        {{ errorCode }}
      </p>
      <p>
        {{ errorMessage }}
      </p>
    </div>
    <div class="control">
      <button @click="onApiTest">押すと、死ぬ。</button>
      <button @click="onLogout">ログアウト</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import liff from '@line/liff'

export default Vue.extend({
  data() {
    return {
      errorMessage: undefined,
      errorCode: undefined,
      accessToken: 'ないよ',
    }
  },

  async mounted() {
    // init処理はLiff/標準ブラウザ問わず実行、失敗したら何もかも終わり
    const err = await liff
      .init({ liffId: '1655655645-N7MQOMQj' })
      .catch((err) => err)
    if (err) {
      this.errorMessage = err.message
      this.errorCode = err.code
      return null
    }

    // 未ログインならLogin処理(liffブラウザならinit時にLoginされる)
    if (!liff.isLoggedIn()) {
      liff.login()
    } else {
      this.accessToken = liff.getAccessToken() || 'やっぱないわ'
    }
  },

  methods: {
    onLogout() {
      liff.logout()
    },

    async onApiTest() {
      const res = await this.$axios
        .$get('/api', {
          params: {
            token: this.accessToken,
          },
        })
        .catch((err) => err)
      if (res) {
        console.log(res)
      }
    },
  },
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
