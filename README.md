# 李晋 · 个人博客

零构建、零依赖、零服务器成本。纯 HTML + CSS + 原生 JS，托管 GitHub Pages。

- **站点地址（上线后）**：https://fsloper-lijin.github.io
- **仓库地址**：https://github.com/fsloper-lijin/fsloper-lijin.github.io

---

## 一、本地预览

双击 `index.html` 即可。或起一个本地服务器（更接近线上环境）：

```bash
# 在本目录下
python -m http.server 8000
# 浏览器打开 http://127.0.0.1:8000
```

---

## 二、已为你配置好的内容

| 项目 | 状态 |
|---|---|
| 站点标题、导航、页脚署名 | 已填「李晋」 |
| Hero 文案（含 fsloper 的由来） | 已写 |
| GitHub 链接（页脚 / 关于页） | 指向 `fsloper-lijin` |
| 项目卡片 | 用旧账号 `FSloper` 下 4 个真实仓库 |
| RSS 域名 | `https://fsloper-lijin.github.io` |
| `.nojekyll` | 已放置 |
| 明暗主题、响应式、阅读进度、滚动动画 | 已内置 |

### 还需要你补的

1. **联系邮箱**——你还没提供，所以全站暂时没有邮件入口。给我地址，或自己替换这几处：
   在 `index.html` 与 `about.html` 的 `.footer-links` 里加回一行
   `<a href="mailto:你的邮箱">Email</a>`。
2. **文章正文**——`posts/` 下三篇是示例文章（内容完整，但写的是别人）。
   留一篇当模板，其余替换成你自己的。
3. **旧仓库迁移**——项目卡片现在指向 `https://github.com/FSloper/...`。
   等你用新账号 fork 或重建后，把 `index.html` 与 `about.html` 里的
   `FSloper` 批量替换成 `fsloper-lijin` 即可：

   ```bash
   grep -rl "FSloper/" . | xargs sed -i 's|FSloper/|fsloper-lijin/|g'
   ```

---

## 三、目录结构

```
blog/
├── index.html                  首页（Hero / 文章列表 / 关于 / 项目）
├── about.html                  关于页
├── feed.xml                    RSS 订阅源
├── .nojekyll                   告诉 GitHub Pages 跳过 Jekyll 处理
├── posts/
│   ├── 2026-11-10-hello.html
│   ├── 2026-10-28-static-site.html
│   └── 2026-10-15-focus.html
└── assets/
    ├── css/style.css           全站样式（明暗主题变量在文件顶部）
    └── js/main.js              主题切换 / 滚动动画 / 阅读进度
```

---

## 四、发一篇新文章

### 1. 复制一个已有文章

```bash
cp posts/2026-10-15-focus.html "posts/2026-12-01-我的新文章.html"
```

**命名规则**：`YYYY-MM-DD-英文短标题.html`。按文件名排序即按时间排序。

### 2. 改四处

1. `<title>` 与 `<meta name="description">`
2. `<h1 class="article-title">` 文章标题
3. `<div class="article-meta">` 日期、阅读时长、标签
4. `<div class="prose">` 正文

正文可用的标签：`<h2> <h3> <p> <ul> <ol> <li> <blockquote> <pre><code> <table> <hr> <img>`

### 3. 在首页加一条

打开 `index.html`，在 `<ul class="post-list">` 里把最新一条复制到最上面，改链接、日期、标题、摘要、标签。

### 4. 更新上下篇

新文章底部的 `<nav class="post-nav">` 里，「上一篇」指向前一篇；
再打开那篇文章，给它补一个「下一篇」指回来。

### 5. （可选）更新 feed.xml

复制一个 `<item>` 块，改标题、链接、日期。

---

## 五、部署到 GitHub Pages

仓库名必须是 `fsloper-lijin.github.io`，这样站点才能挂在根路径 `https://fsloper-lijin.github.io`。

```bash
cd blog
git init
git add .
git commit -m "init: personal blog"
git branch -M main
git remote add origin https://github.com/fsloper-lijin/fsloper-lijin.github.io.git
git push -u origin main
```

然后：仓库 → **Settings → Pages** → Source 选 `Deploy from a branch`，
Branch 选 `main` / `/ (root)`，Save。等 1–2 分钟即可访问。

> 仓库名若不是 `用户名.github.io`，站点会挂在 `/仓库名/` 子路径下。
> 本项目已全部使用**相对路径**，但仍请保持这个习惯，不要改成 `/` 开头的写法。

---

## 六、改外观

所有视觉参数集中在 `assets/css/style.css` 顶部的变量区：

```css
:root {
  --bg:     #fbfaf8;   /* 背景 */
  --text:   #17161a;   /* 正文色 */
  --accent: #b8451f;   /* 强调色：链接、标签、高亮 */
}
```

改 `--accent` 就能换掉整站强调色，深色模式在下方 `html[data-theme="dark"]` 里。

---

## 七、常见问题

**Q：文章列表能自动生成吗？**
纯静态下不能。一年二十来篇，手动改一次首页不到一分钟。
真要自动化，可上 GitHub Actions + 几十行脚本，代价是失去「推上去就能跑」的简洁。

**Q：要加评论吗？**
建议不加。真需要的话，Giscus（基于 GitHub Discussions）是唯一不引入追踪的方案。

**Q：绑定自己的域名？**
仓库 Settings → Pages → Custom domain 填域名，域名商处加 CNAME 记录指向
`fsloper-lijin.github.io`，并在仓库根目录放一个 `CNAME` 文件，内容为你的域名。

**Q：旧账号 FSloper 还能找回吗？**
先走 https://github.com/password_reset 用绑定邮箱重置。
如果邮箱也丢了，可以走 GitHub Support 的账号恢复流程（需提供注册邮箱、
历史支付记录、SSH 公钥等佐证）。旧账号的仓库是公开的，登不上的话，
用新账号 **Fork** 也能把代码复制走。
