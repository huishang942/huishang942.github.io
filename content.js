/* ============================================================
   个人主页 · 内容配置
   ------------------------------------------------------------
   这里集中存放页面上所有文字、链接和作品信息。
   直接修改本文件即可替换内容，不需要动 HTML / CSS / JS。

   小提示：
   · deck 等字段支持 <br>、<em> 等简单 HTML。
   · 标着「占位」的姓名、邮箱、社交链接和作品，都可以放心替换。
   · 想放真实头像时，把图片放到 assets/ 下，再填写 portrait 路径，
     例如 "assets/portrait.jpg"。
   ============================================================ */

window.SITE = {
  meta: {
    name: "沈知远",
    latinFirst: "Zhiyuan",
    latinLast: "Shen",
    monogram: "S/Z",
    issue: "01",
    year: "2026",
    location: "上海，中国",
    locationEn: "Shanghai, CN",
    timezone: "Asia/Shanghai",
    email: "hello@shenzhiyuan.example",
    availability: "接受 2026 Q4 项目委托",
    description: "沈知远的个人主页：在设计与代码之间，做有温度的数字产品。"
  },

  nav: [
    { label: "手记", en: "About", href: "#about" },
    { label: "作品", en: "Work", href: "#work" },
    { label: "随笔", en: "Notes", href: "#notes" },
    { label: "联络", en: "Contact", href: "#contact" }
  ],

  hero: {
    kicker: "独立设计师 & 创意开发者",
    deck: "在秩序与意外之间，<br><em>做有温度的数字产品。</em>",
    intro: "我是沈知远，一个在设计与代码之间来回踱步的人。相信准确，也相信意外；喜欢把复杂的事，讲得简单一点。",
    primary: { label: "翻看作品", href: "#work" },
    secondary: { label: "先认识一下", href: "#about" },
    plate: {
      // 填入图片路径即可替换右上角的抽象肖像，例如 "assets/portrait.jpg"
      // glyph 是抽象肖像里的大字，默认取名字第一个字；换名字后记得同步改这里
      portrait: "",
      glyph: "沈",
      vertical: "PORTRAIT — SHANGHAI / 2026",
      caption: "FIG. 01 — 一个把咖啡当燃料的人。",
      alt: "沈知远的肖像占位图"
    },
    seal: "OPEN FOR SELECT PROJECTS — 2026 — ",
    scroll: "向下阅读",
    facts: [
      { label: "BASE", value: "上海 · 31.23°N" },
      { label: "FOCUS", value: "品牌 / 网站 / 交互" },
      { label: "SINCE", value: "2019" }
    ]
  },

  ticker: [
    "品牌视觉", "网站设计", "创意开发", "交互原型",
    "字体排印", "艺术指导", "设计系统", "内容叙事"
  ],

  about: {
    index: "01",
    title: "编辑手记",
    latin: "Editor's Note",
    sub: "关于我，以及我为什么做这些。",
    quoteLines: ["好设计不是被看见，", "而是被记住。"],
    lede: "我是沈知远，一名常驻上海的独立设计师与创意开发者。",
    paragraphs: [
      "过去七年，我在品牌、产品与代码的交界处工作，帮团队把模糊的想法变成清晰、好用、让人愿意多看一眼的东西。",
      "我相信克制的力量：少一点装饰，多一点准确；少一点喧哗，多一点余味。但克制不等于无聊——在规矩之内，我总想藏一点意外。"
    ],
    facts: [
      { label: "现居", value: "上海，徐汇" },
      { label: "状态", value: "独立执业 / 第 3 年" },
      { label: "合作", value: "初创团队、文化机构、创作者" },
      { label: "兵器", value: "Figma、JavaScript、一支好写的笔" }
    ],
    marginaliaLabel: "MARGINALIA / 页边注",
    marginalia: "这个网站本身也是作品：没有模板、没有组件库，只有 HTML、CSS 和一点固执。",
    signature: "Zhiyuan",
    nowLabel: "此刻 / NOW",
    now: [
      { label: "在读", value: "《设计中的设计》 / 原研哉" },
      { label: "在听", value: "async / 坂本龍一" },
      { label: "在学", value: "Three.js 和西文排印" }
    ]
  },

  work: {
    index: "02",
    title: "精选作品",
    latin: "Selected Works",
    sub: "从品牌到界面，从想法到上线。",
    intro: "每个项目都从一个没被回答的问题开始。下面几个，是我最近几年比较满意的回答。",
    archiveLabel: "完整档案 / ARCHIVE",
    archiveHref: "#",
    footNote: "更多未公开项目与过程稿，可来信索取。",
    projects: [
      {
        title: "潮汐 · TIDE",
        en: "Tide",
        category: "品牌网站",
        year: "2026",
        role: "设计 & 开发",
        summary: "为独立香氛品牌做的一次从命名到上线的完整实验。潮汐的呼吸，被翻译成一套会缓慢移动的界面语言。",
        href: "#",
        word: "TIDE",
        palette: { bg: "#D8CBB4", ink: "#262119", accent: "#A93E2C" }
      },
      {
        title: "字里行间",
        en: "Between Lines",
        category: "数字出版",
        year: "2025",
        role: "产品设计",
        summary: "一个只做三件事的写作工具：写、读、放下。把干扰降到最低，让文字重新成为主角。",
        href: "#",
        word: "TYPE",
        palette: { bg: "#23342B", ink: "#F0E7D5", accent: "#C7A96F" }
      },
      {
        title: "第七码头",
        en: "Pier No.7",
        category: "空间视觉",
        year: "2025",
        role: "艺术指导",
        summary: "为滨江旧仓库改造的艺术空间建立导视系统与线上档案，在粗粝的混凝土里放进一套安静的字。",
        href: "#",
        word: "PIER 7",
        palette: { bg: "#B7C0C1", ink: "#182428", accent: "#31556A" }
      },
      {
        title: "慢速旅行",
        en: "Slow Journey",
        category: "独立出版",
        year: "2024",
        role: "编辑设计",
        summary: "一本关于步行、迷路与城市缝隙的年刊。每一期只讲一个街区，却总也讲不完。",
        href: "#",
        word: "WALK",
        palette: { bg: "#E0D3B7", ink: "#322A20", accent: "#657A4B" }
      },
      {
        title: "回声 · ECHO",
        en: "Echo",
        category: "交互实验",
        year: "2024",
        role: "创意开发",
        summary: "把声音变成可见的形状。一个可以玩十分钟、然后安静下来的小实验。",
        href: "#",
        word: "ECHO",
        palette: { bg: "#2B242C", ink: "#EEE4E3", accent: "#B85A49" }
      }
    ]
  },

  notes: {
    index: "03",
    title: "案头随笔",
    latin: "Field Notes",
    sub: "一些还没想明白，但想写下来的事。",
    more: "不定期更新，像所有值得等待的事。",
    items: [
      {
        date: "2026.02.18",
        tag: "设计札记",
        title: "留白不是空着，而是让呼吸发生",
        excerpt: "我们总是急着填满每一寸屏幕，却忘了留白本身也在说话。",
        read: "6 分钟",
        href: "#"
      },
      {
        date: "2026.01.07",
        tag: "工作方法",
        title: "给个人项目设一条停止线",
        excerpt: "热情可以开始一个项目，但只有边界能结束它。",
        read: "4 分钟",
        href: "#"
      },
      {
        date: "2025.11.23",
        tag: "生活切片",
        title: "一份不太极简的桌面清单",
        excerpt: "三支笔、两本书、一杯凉掉的咖啡，以及一块永远对不准的表。",
        read: "3 分钟",
        href: "#"
      }
    ]
  },

  contact: {
    index: "04",
    latin: "Get in Touch",
    headingLines: ["一起做点", "有意思的事。"],
    headingLatin: "Let's make something worth keeping.",
    text: "如果你正在酝酿一个项目，或者只是想说声你好，都欢迎写信给我。我通常会在两个工作日内回复。",
    seal: "SAY HELLO — WRITE SOON — 2026 — ",
    ghost: "HELLO",
    socials: [
      { label: "GitHub", href: "#" },
      { label: "Are.na", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "小红书", href: "#" }
    ]
  },

  footer: {
    statement: "用设计与代码，<br>做一点留得住的东西。",
    colophon: "本刊由 HTML、CSS 与一点固执手工排版。",
    typeNote: "字体：Instrument Serif / IBM Plex Mono / 宋体",
    copyright: "© 2026 沈知远。保留所有权利。",
    backTop: "回到卷首"
  }
};
