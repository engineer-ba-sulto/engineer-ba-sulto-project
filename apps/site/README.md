# apps/site — ポートフォリオサイト

リポジトリのモノレポ（`apps/site`）内で動く Astro アプリです。トップのポートフォリオ一覧と、コンテンツコレクション由来のプロジェクト詳細ページ（`/projects/[slug]`）を提供します。

## 技術スタック

- **Astro** 6.x（`@astrojs/cloudflare` で Cloudflare Workers 向けビルド）
- **Tailwind CSS** 4.x（`@tailwindcss/vite`）
- **GSAP**（トップなどのアニメーション）
- **Wrangler**（デプロイ・型生成）

## 前提

- **Node.js** >= 22.12.0（`package.json` の `engines`）
- **Bun**（ワークスペースのパッケージマネージャ）

## 開発サーバー

リポジトリルートからこのアプリだけ起動する場合:

```sh
bun --filter site dev
```

`apps/site` 直下で作業する場合:

```sh
cd apps/site && bun dev
```

既定では `http://localhost:4321` で表示されます。

## スクリプト（`apps/site` 内）

| コマンド | 内容 |
| :-- | :-- |
| `bun dev` | 開発サーバー（`astro dev`） |
| `bun build` | 本番ビルド（出力は `dist/`） |
| `bun preview` | `astro build` のあと `astro preview` でローカル確認 |
| `bun astro` | Astro CLI（例: `bun astro check`） |
| `bun run deploy` | ビルド後に `wrangler deploy`（Cloudflare へデプロイ） |
| `bun run generate-types` | `wrangler types`（`cf-typegen` と同じ） |

モノレポ全体の Lint / Format はリポジトリルートの `bun check` などを利用します。

## ディレクトリ構成（概要）

```text
apps/site/
├── docs/
│   └── PROJECTS_README.md    # プロジェクト Markdown の運用・frontmatter
├── public/                     # 静的アセット（favicon など）
├── src/
│   ├── components/             # Header, Footer, Portfolio, projects/*, ui/* など
│   ├── content/
│   │   └── projects/           # コンテンツコレクション（*.md / *.mdx）
│   ├── contents/               # サイト用の定数など（例: portfolio.ts）
│   ├── layouts/                # 共通レイアウト
│   ├── lib/                    # animations, icons, getCollection ラッパーなど
│   ├── pages/
│   │   ├── index.astro         # トップ（ポートフォリオ一覧）
│   │   └── projects/[slug].astro
│   ├── types/
│   └── content.config.ts       # `projects` コレクションのスキーマ定義
├── astro.config.mjs
├── wrangler.jsonc              # Cloudflare（アセットは dist/）
└── package.json
```

プロジェクト一覧のデータは `astro:content` の **`projects`** コレクション（`src/content/projects/`）から `getCollection` で読み込み、日付の新しい順に並べています（`src/lib/projects.ts`）。

## プロジェクト記事（コンテンツ）

各プロジェクトページ用 Markdown の **frontmatter の形・フィールドの意味・運用ルール** は [docs/PROJECTS_README.md](./docs/PROJECTS_README.md) にまとめています。新規追加や修正するときはそちらを参照してください。

スキーマのソース・オブ・トゥルースは `src/content.config.ts` です。

## デプロイ

`wrangler.jsonc` で Workers のエントリと `dist/` アセットを指定しています。本番反映は `bun run deploy` または同等のビルド＋ `wrangler deploy` フローになります。

## 参考リンク

- [Astro ドキュメント](https://docs.astro.build)
- [Cloudflare アダプター（Astro）](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
