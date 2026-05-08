# Personal Website

Next.js 15 / React 19 / Tailwind CSS で作っているポートフォリオサイト

## Setup

依存関係をインストールして開発サーバを起動し, ブラウザで `http://localhost:3000` を確認

```bash
npm install
npm run dev
```

ビルド

```bash
npm run build
```

リント

```bash
npm run lint
npm run lint:fix
npm run format
```

## Project Structure

主要なファイル構成は以下の通り

```text
src/
  app/
    page.tsx
    layout.tsx
    globals.css
    publications/
      page.tsx
      [slug]/
        page.tsx
  components/
    home/
    layout/
    navigation/
    publications/
  data/
    aboutme.ts
    experience.ts
    experiences/
      <slug>.ts
    publication.ts
    publications/
      <category>/
        <slug>/
          metadata.ts
          content.md
    section-order.ts
    title-description.ts
public/
  portrait.png
  publications/
    <slug>/
      paper.pdf
      poster.pdf
      slides.pdf
```

## 更新手順

### プロフィールを変更する

1. プロフィール情報を `src/data/aboutme.ts` に記述

| Column                | Type       | Required | Description                                                                |
| --------------------- | ---------- | -------- | -------------------------------------------------------------------------- |
| `name`                | `string`   | yes      | 氏名                                                                       |
| `title`               | `string`   | yes      | 現在の肩書き                                                               |
| `institution`         | `string`   | yes      | 所属機関名                                                                 |
| `institutionURL`      | `string`   | no       | 所属機関の HP の URL                                                       |
| `institutionAddress`  | `string`   | no       | 所属機関の住所                                                             |
| `laboratoryName`      | `string`   | no       | 研究室名                                                                   |
| `laboratoryURL`       | `string`   | no       | 研究室の HP の URL                                                         |
| `email`               | `string`   | yes      | メールアドレス                                                             |
| `googleScholarURL`    | `string`   | no       | Google Scholar の URL                                                      |
| `githubUsername`      | `string`   | no       | GitHub のユーザー名                                                        |
| `linkedinUsername`    | `string`   | no       | LinkedIn のユーザー名                                                      |
| `twitterUsername`     | `string`   | no       | X / Twitter のユーザー名                                                   |
| `description`         | `string`   | yes      | Biography セクションに表示する自己紹介文                                   |
| `interests`           | `string[]` | no       | Biography セクションの Interests に表示する研究関心などのリスト            |
| `biographyHighlights` | `string[]` | no       | Biography セクションの Personality Traits に表示する補足説明. 先頭は絵文字 |

### Publication を追加する

1. Publication データを `src/data/publications/<category>/<slug>/metadata.ts` に記述
2. 詳細ページへ追記したい本文を `content.md` に記述
3. PDF などの静的ファイルを `public/publications/<slug>/` に配置

Publication の主なカラムは以下の通り

| Column       | Type                    | Required | Description                                   |
| ------------ | ----------------------- | -------- | --------------------------------------------- |
| `slug`       | `string`                | yes      | 詳細ページURLと静的ファイル配置に使う一意なID |
| `title`      | `string`                | yes      | タイトル                                      |
| `authors`    | `PublicationAuthor[]`   | no       | 著者. `equalContribution` も指定可能          |
| `date`       | `string`                | yes      | `YYYY-MM-DD` 形式の日付                       |
| `category`   | `PublicationCategory`   | yes      | カテゴリ                                      |
| `venueFull`  | `string`                | no       | 会議名やイベント名の正式名称                  |
| `venueShort` | `string`                | no       | 会議名やイベント名の短縮表記                  |
| `venueURL`   | `string`                | no       | 会議やイベントの URL                          |
| `keywords`   | `string[]`              | no       | キーワード                                    |
| `awards`     | `string[]`              | no       | 受賞情報                                      |
| `abstract`   | `string`                | no       | 概要                                          |
| `resources`  | `PublicationResource[]` | no       | Paper、Poster、Slides などのリンク            |

`category` に指定できる値は以下の通り

| Value                      | Description |
| -------------------------- | ----------- |
| `international-conference` | 国際会議    |
| `domestic-conference`      | 国内会議    |
| `article`                  | 記事        |
| `talk`                     | 登壇/講演   |

例:

```typescript
import type { Publication } from "@/data/publication";

export const kawada2026sciga: Publication = {
  slug: "kawada2026sciga",
  title: "SciGA: A Comprehensive ...",
  authors: [
    { name: "Takuro Kawada", equalContribution: true },
    { name: "Shunsuke Kitada", equalContribution: true },
    { name: "Sota Nemoto" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2026-06-03",
  category: "international-conference",
  venueFull: "the 2026 IEEE/CVF ...",
  venueShort: "CVPRF 2026",
  venueURL: "https://...",
  keywords: ["Natural Language Processing", ...],
  abstract: "Graphical Abstracts (GAs) play ...",
  resources: [
    {
      label: "arXiv",
      url: "https://arxiv.org/abs/2507.02212",
    },
    ...
  ],
};
```

### Experience を追加する

1. Experience データを `src/data//experiences/<slug>.ts` に記述

Experience の主なカラムは以下の通り

| Column            | Type       | Required | Description                                                     |
| ----------------- | ---------- | -------- | --------------------------------------------------------------- |
| `slug`            | `string`   | yes      | 一意なID。                                                      |
| `start`           | `string`   | yes      | 開始年月。`YYYY` または `YYYY-MM` 形式を想定しています。        |
| `end`             | `string`   | no       | 終了年月。未指定の場合は `Present` と表示されます。             |
| `organization`    | `string`   | yes      | 大学、企業、組織名。                                            |
| `organizationURL` | `string`   | no       | 組織へのリンクURL。                                             |
| `titles`          | `string[]` | yes      | 学位、役職、職種など。複数ある場合は `/` 区切りで表示されます。 |
| `meta`            | `string[]` | no       | 補足メタ情報。複数ある場合は `/` 区切りで表示されます。         |

例:

```typescript
import type { ExperienceItem } from "@/data/experience";

export const hosei2025master: ExperienceItem = {
  slug: "hosei2025master",
  start: "2025",
  organization: "Hosei University",
  organizationURL: "https://www.hosei.ac.jp/",
  titles: ["M.Eng. Student"],
  meta: ["Advisor: Prof. Hitoshi Iyatomi"],
};
```
