import express from 'express'
import axios from 'axios'

const app = express()

app.get('/', async (req, res) => {
  const token = req.query.token

  // token検証
  const result = await axios
    .get('https://api.line.me/oauth2/v2.1/verify', {
      params: {
        access_token: token,
      },
    })
    .catch((err) => err)

  // OKならプロフィールを取得しにかかる
  if (result.status === 200) {
    // STUB 本当はここでclient_idが正しいかも見ないと駄目
    if (result.data.expires_in > 0) {
      const profile = await axios
        .get('https://api.line.me/v2/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch((err) => err)
      if (profile.status === 200) {
        res.status(200).send(profile.data)
      } else {
        res.status(500).send('profile取得失敗')
      }
    }
  }
})

export default app
