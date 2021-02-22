# liff-app

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## ローカルのHTTPS化
サーバー証明書は自前。
下記コマンドで証明を作る。
ルートディレクトリのcertフォルダに適切な証明書があれば、httpsとして立ち上がる。

```bash
$ touch cert
$ cd cert
$ npx mkcert create-ca
$ npx mkcert create-cert
```

## LIFF Appの設定
LIFFアプリとしてリダイレクトを受ける為、LINE DevelopersページでエンドポイントURLを設定する必要がある。
**エンドポイントURL**の項目に`https://192.168.1.1:4000`みたいな感じで自分のローカルIPとポートを書く。

## nuxt.config.jsの設定
nuxt.config.jsの一番上に設定一式するSettings変数があるので、そこも編集する。
設定したLIFFアプリのLIFF IDとPortを合わせる。

試してないけど多分Herokuならデプロイかけても動く。
<<<<<<< HEAD
その場合は環境変数**API_URL_BROWSER**にデプロイ後のホストURLを設定する必要がある。
=======
>>>>>>> aeeee80479cad1934207721dff1a988b6c14555c
