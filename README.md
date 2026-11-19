# Matsudo Robot Events Landing Page

このリポジトリは、matsudoroboevents.info ドメインに対応するランディングページです。

## 構成

```
.
├── README.md            # このファイル（ドキュメント）
└── web/                 # Webサイトルート（GitHub Pagesで公開）
    ├── index.html           # メインのランディングページ
    ├── css/
    │   └── style.css        # スタイルシート（matsudo-robotics.github.io のデザインを参考）
    ├── js/
    │   └── app.js           # イベント情報の読み込みと表示処理
    ├── data/
    │   └── events.json      # イベント情報（JSON形式）
    └── images/
        ├── logo-mtic-full.png       # M-TIC ロゴ
        ├── logo-matsudorobo.png     # 松戸ロボット研究会ロゴ
        └── kv-sp.jpg                # キービジュアル背景画像
```

## イベント情報の追加方法

`web/data/events.json` ファイルを編集して、新しいイベント情報を追加してください。

### JSON フォーマット

```json
{
  "events": [
    {
      "subdomain": "mtl-winter2027",
      "titleJa": "松戸ロボットラボ 冬2027",
      "titleEng": "Matsudo Robot Lab Winter 2027",
      "dateFrom": "2027-02-15",
      "dateTo": "2027-02-15",
      "organization": "MatsuRobo",
      "description": "冬のロボットプログラミングイベント。新年の最初のプロジェクトに参加しよう。"
    },
    {
      "subdomain": "mtl-spring2027",
      "titleJa": "松戸ロボットラボ 春2027",
      "titleEng": "Matsudo Robot Lab Spring 2027",
      "dateFrom": "2027-04-10",
      "dateTo": "2027-04-12",
      "organization": "M-TIC",
      "description": "春のロボットコンテスト。全国から参加者が集結します。"
    }
  ]
}
```

### フィールドの説明

| フィールド | 型 | 説明 | 例 |
|-----------|----|----|-----|
| `subdomain` | string | イベントの サブドメイン（*.matsudoroboevents.info） | `"mtl-winter2027"` |
| `titleJa` | string | イベント名（日本語） | `"松戸ロボットラボ 冬2027"` |
| `titleEng` | string | イベント名（英語） | `"Matsudo Robot Lab Winter 2027"` |
| `dateFrom` | string | イベント開始日（YYYY-MM-DD形式） | `"2027-02-15"` |
| `dateTo` | string | イベント終了日（YYYY-MM-DD形式） | `"2027-02-15"` |
| `organization` | string | 主催団体 | `"MatsuRobo"` または `"M-TIC"` |
| `description` | string | イベントの簡単な説明 | `"冬のロボットプログラミングイベント..."` |

### イベントステータスの自動判定

JavaScriptによって、開催日時に基づいて自動的に以下のステータスが付与されます:

- **終了** (灰色): 開催終了日を過ぎている
- **開催中** (赤色・点滅): 本日が開催期間中
- **予定** (青色): これからの開催予定

## 日付の表示形式

- **1日イベント**: `2027年2月15日` のように表示されます
- **複数日イベント**: `2027年4月10日 ～ 4月12日` のように表示されます

## スタイルについて

スタイルシートは、[matsudo-robotics.github.io](https://matsudo-robotics.github.io/) のデザインをベースにしています。

### カラースキーム

- **主要色（PCB Blue）**: #0142A8
- **テキスト色**: #141A24
- **背景色**: #FAFAF7
- **アクセント色（Copper/Orange）**: #E06800 / #FF7701

## GitHub Pages への発行について

このリポジトリは GitHub Pages によって `matsudoroboevents.info` ドメインに発行されます。
（DNS設定とGitHub Pages設定は、リポジトリの管理者が行うものとします）

**重要**: GitHub Pages の設定では、ソースを `web/` ディレクトリに指定してください。
変更をコミットして `main` ブランチにプッシュすると、自動的にサイトが更新されます。

## ランディングページの要素

ページは以下の要素で構成されています:

1. **ヘッダー**: M-TIC ロゴ
2. **キービジュアル**: サイトの紹介とタイトル
3. **プロログ**: サイト説明
4. **イベント一覧**: JSON ファイルから自動的に読み込まれた一覧
5. **エピローグ**: 新規イベント情報の案内
6. **フッター**: リンク集

## テクニカルノート

- イベント情報は **クライアント側の JavaScript** で読み込まれます
- `web/data/events.json` ファイルをスタティックに配信するだけなので、サーバー処理は不要です
- ブラウザの互換性: 最新の主要ブラウザに対応しています
- レスポンシブデザイン対応
- アクセシビリティに配慮した実装

---

**最終更新**: 2026年11月19日
