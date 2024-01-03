# Scholar Sync: 学内手続プラットフォーム

## 概要

「Scholar Sync」は、学内で行われている、課題表紙提出や、その他各種手続きを Web ブラウザで簡単に行うことができるプラットフォームです。

[Scholar Sync を今すぐ試す](https://www.scholar-sync.systems/)

## 使用技術

### フロントエンド

- **デプロイ先**: Vercel
- **技術スタック**:
  - Material UI Lab: v5.0.0-alpha.153
  - Material UI: v5.14.0
  - Prettier: v2.8.8
  - ESLint: v8.42.0
  - Next.js(app router): v13.4.4
  - NextAuth: v4.22.3
  - zod: v3.21.4
  - react-hook-form: v7.49.2
  - React: v18.2.0
  - TypeScript: v5.1.3

### バックエンド(API サーバ)

[リポジトリはこちらから](https://github.com/naruto1031/ScholarSync-backend)

- **技術スタック**:

  - PHP: v8.1
  - Firebase/PHP-JWT: v6.8
  - GuzzleHttp/Guzzle: v7.2
  - Laravel/Framework: v10.10
  - Laravel/Tinker: v2.8
  - Opcodesio/Log-Viewer: v3.1
  - Owen-it/Laravel-Auditing: v13.6
  - Paragonie/Sodium_Compat: v1.20

- **クラウドサービス**:
  - **認証**: Microsoft Entra ID
  - **サーバ**: Azure App Service
  - **データベース**: Azure MySQL
