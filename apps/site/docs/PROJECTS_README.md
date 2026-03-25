# Projects Content README

このディレクトリの各プロジェクト記事は以下のfrontmatter構成で管理します。

## 基本構成

```md
---
slug: your-project-slug
title: Project Title
description: Short project description
image: https://example.com/cover-image.jpg
tags:
  - Tag1
  - Tag2
  - Tag3
date: "YYYY-MM-DD"
detail:
  heroImage: https://example.com/hero-image.jpg
  features:
    - title: Feature Title 1
      desc: Feature description 1
    - title: Feature Title 2
      desc: Feature description 2
  techStack:
    - Technology 1
    - Technology 2
    - Technology 3
  appStoreUrl: "#"
  lpUrl: "#"
---
```

## 項目説明

- `slug`: URLや識別子として使う一意の文字列
- `title`: プロジェクト名（一覧・詳細で表示）
- `description`: プロジェクト概要（カードやメタ情報に利用）
- `image`: 一覧カード用の画像URL
- `tags`: カテゴリ・技術タグ（複数可）
- `date`: 公開日（`YYYY-MM-DD` 形式）
- `detail.heroImage`: 詳細ページのメイン画像URL
- `detail.features`: 機能一覧（`title`と`desc`のセット）
- `detail.techStack`: 使用技術の配列
- `detail.appStoreUrl`: アプリストア URL（未設定時は`"#"`）
- `detail.lpUrl`: LP/WebサイトURL（未設定時は`"#"`）

## 運用ルール

- frontmatterはYAML形式を維持する
- `slug`は重複させない
- `date`は必ず`YYYY-MM-DD`形式で記述する
- 画像URLは公開アクセス可能なHTTPSを使う
