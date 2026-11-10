# 绘商 · 个人主页（三联门版本）

原生 HTML / CSS / JavaScript，无构建步骤、无第三方脚本。当前是独立预览版，根目录旧站尚未替换。

## 本地预览

在仓库根目录运行：

```bash
python -m http.server 8000
```

然后打开：<http://127.0.0.1:8000/personal-site/>

也可以直接双击 `personal-site/index.html`。字体复用根目录的 `assets/fonts.css`，因此不要单独移动本目录。

## 内容在哪里：没有单独的配置文件

这一版为了保证关闭 JavaScript 也能完整阅读，**所有内容直接写在 `index.html`**，不经过 `content.js`、JSON 或构建步骤。修改后保存文件、刷新浏览器即可。

如果你更希望有一个单独的 `content.js` 配置入口，可以再做一版 JS 渲染或离线构建方案；当前版本优先保留静态可读性。

## 最常改的内容

| 想改什么 | 去哪里找 |
| --- | --- |
| 姓名「绘商」 | `index.html` 顶部 `<title>` / meta / 页头 `.brand` / 首页 `.home-intro` / 关于区 / 页脚。直接全局替换「绘商」即可；拉丁名 `Hui Shang` 在 `.profile-latin`，图标文字在 `assets/favicon.svg` |
| 年龄、单位、居住地、兵器 | `id="about"` → `.profile-data` → `.facts`，改对应的 `<dd>` |
| 邮箱 | 全局搜索 `3187534783@qq.com`。`index.html` 内共有 4 处：关于区与页脚各一组 `mailto:` 和可见文字 |
| 自我介绍 | `id="about"` → `.about-lede` |
| 一些心里话 | `id="about"` → `.thoughts`：大引语是 `.thought-quote`，两段正文在 `.thought-body` |
| 首页大标题 / 引导语 | `id="top"` → `.home-title`、`.home-intro` |
| 首页三道门 | `.doors` 里的三个 `<article class="door">`；改标题、门说明和「推门」文案，保留 `.door-hit` 链接与 `aria-labelledby` 关系 |
| 页脚 | `.site-footer`；含邮箱、姓名、版权与「回到开头」 |
| 页面标题和 SEO | `<head>` 内的 `<title>`、`meta name="description"`、`og:title`、`og:description` |

## 作品和信息源

### 我的作品集

在 `id="work"` 的 `.work-list` 中，每件作品是一个 `.work-card`：

- `.work-hit`：整块可点的外链。`href` 是真实地址，`aria-label` 是给屏读的链接名；两处都要改。
- `.work-plate img`：作品截图路径和 `alt`。
- `.work-type`：类型。
- `.work-title`：标题。
- `.work-summary`：概述。

目前三张作品截图是本地 SVG 示例，链接指向 `example.com` 占位。截图建议用 1600×1000（16:10）的 PNG、JPG、WebP 或 SVG；替换时保留 `width`、`height` 和 `alt`。

### 世界是信息差

在 `id="sources"` 的 `.source-list` 中，每一行是一个完整外链：

- `href`：真实链接。
- `.source-name`：信息源名。
- `.source-type`：信息类型。
- `.source-domain`：显示给访客看的域名。

所有外链使用 `target="_blank"` 和 `rel="noopener noreferrer"`，点击会在新标签页打开。

## 预审截图

`preview/` 里是当前内容的桌面与手机截图，只用于审阅：

- `preview/desktop-home.png`
- `preview/desktop-about.png`
- `preview/desktop-work.png`
- `preview/desktop-sources.png`
- `preview/mobile-home.png`

这些截图是静态文件，**不会随着 `index.html` 的内容修改自动更新**；定稿后以浏览器中的实际页面为准。

## 迁移到根目录时

当前字体引用是：

```html
<link rel="stylesheet" href="../assets/fonts.css">
```

提升到仓库根目录后改为：

```html
<link rel="stylesheet" href="assets/fonts.css">
```

并沿用根目录已有的 `assets/fonts.css`、`assets/fonts/`，不要重复下载字体。替换根站前建议先确认预览截图与浏览器页面一致。

## 行为与检查

- 正文静态可读；关闭 JavaScript 后仍可阅读，只缺少吸顶导航的当前项高亮。
- 三扇门和作品卡片整块可点，链接文字保持简短，键盘可聚焦。
- 直接带 `#about` / `#work` / `#sources` 打开时，字体加载后会重新校准落点，目标分区紧贴吸顶页头。
- 所有 hover 信息默认可见；`prefers-reduced-motion` 下关闭平滑滚动与过渡。
- 已检查 1440、1280、1024、834、390、320 六个宽度，以及键盘焦点、无 JavaScript、减少动态、外链和字体加载。
