/* ============================================================
   个人主页 · 页面渲染与交互
   内容全部来自 content.js，本文件只负责结构与行为。
   ============================================================ */

(function () {
  "use strict";

  var site = window.SITE;
  if (!site) return;

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (selector, context) {
    return (context || document).querySelector(selector);
  };
  var $$ = function (selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  };

  var HTML_ESCAPES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return HTML_ESCAPES[char];
    });
  }

  function reveal(delay) {
    return 'data-reveal style="--reveal-delay:' + (delay || 0) + 'ms"';
  }

  function isPlaceholder(href) {
    return !href || href === "#";
  }

  function linkAttributes(href) {
    var target = href || "#";
    var attrs = 'href="' + esc(target) + '"';
    if (isPlaceholder(target)) attrs += ' data-placeholder="true"';
    return attrs;
  }

  function pad(number) {
    return String(number).padStart(2, "0");
  }

  function sealMarkup(text, id, extraClass) {
    return (
      '<div class="seal ' + (extraClass || "") + '" aria-hidden="true">' +
        '<svg class="seal-svg" viewBox="0 0 120 120">' +
          '<defs><path id="' + id + '" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>' +
          '<text><textPath href="#' + id + '" startOffset="0">' + esc(text) + "</textPath></text>" +
        "</svg>" +
        '<span class="seal-star">✳</span>' +
      "</div>"
    );
  }

  function sunIcon() {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="4.2"></circle>' +
        '<path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7L5.3 5.3"></path>' +
      "</svg>"
    );
  }

  function moonIcon() {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">' +
        '<path d="M20.2 14.5A8.4 8.4 0 0 1 9.5 3.8a8.4 8.4 0 1 0 10.7 10.7Z"></path>' +
      "</svg>"
    );
  }

  /* ----------------------------------------------------------
     页头
     ---------------------------------------------------------- */

  var masthead = $("#masthead");
  masthead.innerHTML =
    '<div class="masthead-inner">' +
      '<a class="brand" href="#top" aria-label="回到卷首">' +
        '<span class="brand-mark">' + esc(site.meta.monogram) + "</span>" +
        '<span class="brand-copy">' +
          '<span class="brand-name">' + esc(site.meta.name) + "</span>" +
          '<span class="brand-sub">个人志 · FIELD NOTES</span>' +
        "</span>" +
      "</a>" +
      '<p class="masthead-issue">ISSUE ' + esc(site.meta.issue) + " — " + esc(site.meta.year) +
        "<br><span>" + esc(site.meta.locationEn) + "</span></p>" +
      '<nav class="site-nav" aria-label="主导航">' +
        site.nav.map(function (item, index) {
          return '<a href="' + esc(item.href) + '" data-nav="' + esc(item.href.replace("#", "")) + '">' +
            '<span class="nav-index">' + pad(index + 1) + "</span>" +
            "<span>" + esc(item.label) + "</span>" +
          "</a>";
        }).join("") +
      "</nav>" +
      '<button class="theme-toggle" type="button" aria-pressed="false">' +
        '<span class="theme-icon"></span>' +
        '<span class="theme-label">夜读版</span>' +
      "</button>" +
    "</div>" +
    '<div class="progress" aria-hidden="true"><span id="progress-bar"></span></div>';

  /* ----------------------------------------------------------
     卷首
     ---------------------------------------------------------- */

  var hero = site.hero;
  var portrait = hero.plate.portrait
    ? '<img class="plate-image" src="' + esc(hero.plate.portrait) + '" alt="' + esc(hero.plate.alt) + '">'
    : '<span class="plate-sun"></span>' +
      '<span class="plate-rings"></span>' +
      '<span class="plate-glyph" aria-hidden="true">' + esc(hero.plate.glyph || site.meta.name.slice(0, 1)) + "</span>" +
      '<span class="plate-halftone"></span>' +
      '<span class="plate-stamp">PORTRAIT<br>IN PROGRESS</span>';

  var coverHTML =
    '<section class="cover" id="top">' +
      '<div class="cover-rail" aria-hidden="true">' +
        '<span>FIELD NOTES / 个人志</span>' +
        '<span class="rail-line"></span>' +
        '<span>VOL. ' + esc(site.meta.issue) + " — " + esc(site.meta.year) + "</span>" +
      "</div>" +

      '<div class="cover-main">' +
        '<div class="cover-kicker" ' + reveal(0) + ">" +
          '<span class="eyebrow"><span class="eyebrow-dot"></span>' + esc(hero.kicker) + "</span>" +
          '<span class="kicker-divider" aria-hidden="true"></span>' +
          '<span class="availability-inline"><span class="status-dot"></span>' + esc(site.meta.availability) + "</span>" +
        "</div>" +

        '<h1 class="cover-title" ' + reveal(90) + ">" +
          '<span class="title-cn">' + esc(site.meta.name) + '<span class="title-dot" aria-hidden="true">.</span></span>' +
          '<span class="title-en"><em>' + esc(site.meta.latinFirst) + "</em> " + esc(site.meta.latinLast) + "</span>" +
        "</h1>" +

        '<div class="cover-deck-row" ' + reveal(190) + ">" +
          '<p class="cover-deck">' + hero.deck + "</p>" +
          '<p class="cover-intro">' + esc(hero.intro) + "</p>" +
        "</div>" +

        '<div class="cover-actions" ' + reveal(280) + ">" +
          '<a class="button button--solid" href="' + esc(hero.primary.href) + '">' +
            "<span>" + esc(hero.primary.label) + '</span><span class="button-arrow" aria-hidden="true">↘</span>' +
          "</a>" +
          '<a class="button button--text" href="' + esc(hero.secondary.href) + '">' +
            esc(hero.secondary.label) + '<span aria-hidden="true"> →</span>' +
          "</a>" +
        "</div>" +
      "</div>" +

      '<div class="cover-plate" ' + reveal(220) + ">" +
        '<div class="plate-tilt">' +
          '<figure class="plate-frame">' +
            '<div class="plate-art">' + portrait +
              '<span class="plate-vertical">' + esc(hero.plate.vertical) + "</span>" +
            "</div>" +
          "</figure>" +
        "</div>" +
        '<p class="plate-caption"><span>' + esc(hero.plate.caption) + '</span><span aria-hidden="true">FIG. 01</span></p>' +
        sealMarkup(hero.seal, "seal-cover", "seal--cover") +
      "</div>" +

      '<div class="cover-foot" ' + reveal(340) + ">" +
        '<dl class="cover-facts">' +
          hero.facts.map(function (fact) {
            return "<div><dt>" + esc(fact.label) + "</dt><dd>" + esc(fact.value) + "</dd></div>";
          }).join("") +
        "</dl>" +
        '<div class="cover-foot-right">' +
          '<span class="cover-clock">SHANGHAI <time data-clock>--:--</time></span>' +
          '<a class="scroll-cue" href="#about"><span class="scroll-line" aria-hidden="true"></span><span>' + esc(hero.scroll) + "</span></a>" +
        "</div>" +
      "</div>" +
    "</section>";

  var tickerHTML =
    '<div class="ticker" aria-hidden="true">' +
      '<div class="ticker-track">' +
        site.ticker.concat(site.ticker).map(function (item) {
          return '<span class="ticker-item">' + esc(item) + '<span class="ticker-star">✳</span></span>';
        }).join("") +
      "</div>" +
    "</div>" +
    '<p class="sr-only">专长：' + esc(site.ticker.join("、")) + "。</p>";

  /* ----------------------------------------------------------
     分节标题
     ---------------------------------------------------------- */

  function sectionHead(data) {
    return (
      '<header class="section-head" ' + reveal() + ">" +
        '<p class="section-index">' +
          '<span class="section-index-no">' + esc(data.index) + "</span>" +
          '<span class="section-index-line" aria-hidden="true"></span>' +
          '<span class="section-index-label">' + esc(data.latin.toUpperCase()) + "</span>" +
        "</p>" +
        '<h2 class="section-title">' + esc(data.title) +
          '<span class="section-latin">' + esc(data.latin) + "</span>" +
        "</h2>" +
        '<p class="section-sub">' + esc(data.sub) + "</p>" +
      "</header>"
    );
  }

  /* ----------------------------------------------------------
     编辑手记
     ---------------------------------------------------------- */

  var about = site.about;
  var aboutHTML =
    '<section class="section section--about" id="about">' +
      '<div class="section-inner">' +
        sectionHead(about) +
        '<div class="about-grid">' +
          '<div class="about-main" ' + reveal() + ">" +
            '<blockquote class="pullquote">' +
              '<span class="quote-mark" aria-hidden="true">“</span>' +
              about.quoteLines.map(function (line, index) {
                var accent = index === about.quoteLines.length - 1 ? " quote-line--accent" : "";
                return '<span class="quote-line' + accent + '">' + esc(line) + "</span>";
              }).join("") +
            "</blockquote>" +
            '<div class="about-text">' +
              '<p class="about-lede">' + esc(about.lede) + "</p>" +
              about.paragraphs.map(function (paragraph) {
                return "<p>" + esc(paragraph) + "</p>";
              }).join("") +
            "</div>" +
          "</div>" +

          '<aside class="about-aside" ' + reveal(120) + ">" +
            '<dl class="fact-list">' +
              about.facts.map(function (fact) {
                return '<div class="fact"><dt>' + esc(fact.label) + "</dt><dd>" + esc(fact.value) + "</dd></div>";
              }).join("") +
            "</dl>" +
            '<div class="marginalia">' +
              '<p class="marginalia-label">' + esc(about.marginaliaLabel) + "</p>" +
              '<p class="marginalia-text">' + esc(about.marginalia) + "</p>" +
            "</div>" +
            '<p class="signature" aria-label="签名">' + esc(about.signature) + "</p>" +
          "</aside>" +
        "</div>" +

        '<div class="now-strip" ' + reveal() + ">" +
          '<p class="now-label">' + esc(about.nowLabel) + "</p>" +
          '<div class="now-items">' +
            about.now.map(function (item) {
              return '<div class="now-item"><span>' + esc(item.label) + "</span><p>" + esc(item.value) + "</p></div>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</div>" +
    "</section>";

  /* ----------------------------------------------------------
     精选作品
     ---------------------------------------------------------- */

  var work = site.work;

  function projectMarkup(project, index) {
    var placeholder = isPlaceholder(project.href);
    return (
      '<a class="project-row" ' + linkAttributes(project.href) + ' data-project="' + index + '" ' +
        reveal(index * 60) + " " +
        'aria-label="' + esc(project.title) + "，" + esc(project.category) + "，" + esc(project.year) +
        (placeholder ? "（占位链接）" : "") + '">' +
        '<span class="project-no">' + pad(index + 1) + "</span>" +
        '<span class="project-main">' +
          '<span class="project-title">' + esc(project.title) + "</span>" +
          '<span class="project-en">' + esc(project.en) + " / " + esc(project.role) + "</span>" +
          '<span class="project-meta-mobile">' + esc(project.category) + " · " + esc(project.year) + "</span>" +
          '<span class="project-summary">' + esc(project.summary) + "</span>" +
        "</span>" +
        '<span class="project-cat">' + esc(project.category) + "</span>" +
        '<span class="project-year">' + esc(project.year) + "</span>" +
        '<span class="project-arrow" aria-hidden="true">↗</span>' +
      "</a>"
    );
  }

  var workHTML =
    '<section class="section section--work" id="work">' +
      '<div class="section-inner">' +
        sectionHead(work) +
        '<div class="work-intro-row" ' + reveal() + ">" +
          '<p class="work-intro">' + esc(work.intro) + "</p>" +
          '<p class="work-count">' + pad(work.projects.length) + " PROJECTS <span>2024 — 2026</span></p>" +
        "</div>" +
        '<div class="work-table-head" aria-hidden="true">' +
          "<span>NO.</span><span>PROJECT</span><span>DISCIPLINE</span><span>YEAR</span><span></span>" +
        "</div>" +
        '<div class="project-list">' +
          work.projects.map(projectMarkup).join("") +
        "</div>" +
        '<footer class="work-foot" ' + reveal() + ">" +
          '<p class="work-foot-note">' + esc(work.footNote) + "</p>" +
          '<a class="text-link" ' + linkAttributes(work.archiveHref) + ">" +
            esc(work.archiveLabel) + '<span aria-hidden="true"> ↗</span>' +
          "</a>" +
        "</footer>" +
      "</div>" +
    "</section>";

  /* ----------------------------------------------------------
     案头随笔
     ---------------------------------------------------------- */

  var notes = site.notes;
  var notesHTML =
    '<section class="section section--notes" id="notes">' +
      '<div class="section-inner">' +
        sectionHead(notes) +
        '<div class="notes-grid">' +
          notes.items.map(function (note, index) {
            return (
              '<a class="note" ' + linkAttributes(note.href) + " " + reveal(index * 90) + ">" +
                '<div class="note-top">' +
                  '<span class="note-no">NOTE ' + pad(index + 1) + "</span>" +
                  '<time class="note-date">' + esc(note.date) + "</time>" +
                "</div>" +
                "<h3>" + esc(note.title) + "</h3>" +
                '<p class="note-excerpt">' + esc(note.excerpt) + "</p>" +
                '<div class="note-foot">' +
                  '<span class="note-tag">' + esc(note.tag) + "</span>" +
                  '<span class="note-read">' + esc(note.read) + ' <span aria-hidden="true">↗</span></span>' +
                "</div>" +
              "</a>"
            );
          }).join("") +
        "</div>" +
        '<p class="notes-more" ' + reveal(160) + ">" + esc(notes.more) + "</p>" +
      "</div>" +
    "</section>";

  /* ----------------------------------------------------------
     联络
     ---------------------------------------------------------- */

  var contact = site.contact;
  var contactHTML =
    '<section class="contact" id="contact">' +
      '<div class="contact-ghost" aria-hidden="true">' + esc(contact.ghost) + "</div>" +
      '<div class="contact-inner">' +
        '<div class="contact-eyebrow" ' + reveal() + ">" +
          "<p><span>" + esc(contact.index) + "</span> / " + esc(contact.latin.toUpperCase()) + "</p>" +
          "<p>" + esc(site.meta.location) + " · <time data-clock>--:--</time></p>" +
        "</div>" +

        '<div class="contact-grid">' +
          '<div class="contact-heading" ' + reveal(80) + ">" +
            '<h2 class="contact-title">' +
              contact.headingLines.map(function (line, index) {
                return "<span" + (index > 0 ? ' class="contact-title-accent"' : "") + ">" + esc(line) + "</span>";
              }).join("") +
            "</h2>" +
            '<p class="contact-latin">' + esc(contact.headingLatin) + "</p>" +
          "</div>" +

          '<div class="contact-body" ' + reveal(180) + ">" +
            '<p class="contact-text">' + esc(contact.text) + "</p>" +
            '<a class="contact-email" href="mailto:' + esc(site.meta.email) + '">' +
              '<span class="contact-email-text">' + esc(site.meta.email) + "</span>" +
              '<span class="contact-email-arrow" aria-hidden="true">↗</span>' +
            "</a>" +
            '<p class="availability"><span class="status-dot"></span>' + esc(site.meta.availability) + "</p>" +
          "</div>" +
        "</div>" +

        '<div class="contact-bottom" ' + reveal(120) + ">" +
          '<ul class="socials">' +
            contact.socials.map(function (social) {
              return '<li><a ' + linkAttributes(social.href) + ">" + esc(social.label) + "</a></li>";
            }).join("") +
          "</ul>" +
          sealMarkup(contact.seal, "seal-contact", "seal--light") +
        "</div>" +
      "</div>" +
    "</section>";

  /* ----------------------------------------------------------
     页脚
     ---------------------------------------------------------- */

  var footer = site.footer;
  var footerHTML =
    '<div class="footer-top">' +
      '<div class="footer-brand" ' + reveal() + ">" +
        '<a class="brand" href="#top" aria-label="回到卷首">' +
          '<span class="brand-mark">' + esc(site.meta.monogram) + "</span>" +
          '<span class="brand-copy">' +
            '<span class="brand-name">' + esc(site.meta.name) + "</span>" +
            '<span class="brand-sub">个人志 · FIELD NOTES</span>' +
          "</span>" +
        "</a>" +
        '<p class="footer-statement">' + footer.statement + "</p>" +
      "</div>" +

      '<div class="footer-col" ' + reveal(80) + ">" +
        '<p class="footer-label">目录 / INDEX</p>' +
        '<div class="footer-links">' +
          site.nav.map(function (item) {
            return '<a href="' + esc(item.href) + '">' + esc(item.label) + '<span aria-hidden="true"> ↗</span></a>';
          }).join("") +
        "</div>" +
      "</div>" +

      '<div class="footer-col" ' + reveal(140) + ">" +
        '<p class="footer-label">通讯 / CONTACT</p>' +
        '<a class="footer-email" href="mailto:' + esc(site.meta.email) + '">' + esc(site.meta.email) + "</a>" +
        '<p class="footer-place">' + esc(site.meta.location) + "</p>" +
      "</div>" +

      '<div class="footer-col" ' + reveal(200) + ">" +
        '<p class="footer-label">此刻 / LOCAL TIME</p>' +
        '<p class="footer-clock">SHANGHAI <time data-clock>--:--</time></p>' +
        '<button class="back-top" type="button" data-back-top>' + esc(footer.backTop) + '<span aria-hidden="true"> ↑</span></button>' +
      "</div>" +
    "</div>" +

    '<div class="footer-bottom">' +
      "<p>" + esc(footer.copyright) + "</p>" +
      "<p>" + esc(footer.colophon) + "</p>" +
      "<p>" + esc(footer.typeNote) + "</p>" +
    "</div>" +

    '<div class="footer-ghost" aria-hidden="true"><span>' + esc(site.meta.name) + "</span></div>";

  /* ----------------------------------------------------------
     注入页面
     ---------------------------------------------------------- */

  $("#main").innerHTML = coverHTML + tickerHTML + aboutHTML + workHTML + notesHTML + contactHTML;
  $("#site-footer").innerHTML = footerHTML;
  document.title = site.meta.name + " · 个人主页";
  var description = $('meta[name="description"]');
  if (description) description.setAttribute("content", site.meta.description);

  // 四字及以上的姓名自动缩小标题，避免顶到右侧肖像
  var nameLength = Array.from(String(site.meta.name).replace(/\s/g, "")).length;
  if (nameLength >= 4) root.classList.add("name-long");
  if (nameLength >= 5) root.classList.add("name-xlong");

  /* ----------------------------------------------------------
     夜读版
     ---------------------------------------------------------- */

  var THEME_KEY = "fieldnotes-theme";
  var themeButton = $(".theme-toggle");
  var themeColorMeta = $('meta[name="theme-color"]');

  function applyTheme(theme, persist) {
    var night = theme === "night";
    if (night) {
      root.setAttribute("data-theme", "night");
    } else {
      root.removeAttribute("data-theme");
    }
    themeButton.setAttribute("aria-pressed", String(night));
    themeButton.setAttribute("title", night ? "切换到日间版" : "切换到夜读版");
    themeButton.setAttribute("aria-label", night ? "切换到日间版" : "切换到夜读版");
    $(".theme-icon", themeButton).innerHTML = night ? sunIcon() : moonIcon();
    $(".theme-label", themeButton).textContent = night ? "日间版" : "夜读版";
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", night ? "#151612" : "#f1ebdf");
    }
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (error) {
        /* 本地文件模式下个别浏览器会禁用存储，忽略即可 */
      }
    }
  }

  var savedTheme = "day";
  try {
    savedTheme = localStorage.getItem(THEME_KEY) || "day";
  } catch (error) {
    savedTheme = "day";
  }
  applyTheme(savedTheme === "night" ? "night" : "day", false);

  themeButton.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "night" ? "day" : "night";
    applyTheme(next, true);
  });

  /* ----------------------------------------------------------
     时间与滚动
     ---------------------------------------------------------- */

  function updateClock() {
    var time;
    try {
      time = new Intl.DateTimeFormat("en-GB", {
        timeZone: site.meta.timezone,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      }).format(new Date());
    } catch (error) {
      time = new Date().toTimeString().slice(0, 5);
    }
    $$("[data-clock]").forEach(function (node) {
      node.textContent = time;
    });
  }

  updateClock();
  window.setInterval(updateClock, 30000);

  var header = $("#masthead");
  var progressBar = $("#progress-bar");
  var ticking = false;

  // 让锚点落位与卷首高度跟随实际页头高度
  function syncHeaderHeight() {
    if (!header) return;
    var height = Math.ceil(header.getBoundingClientRect().height);
    if (height > 0) {
      root.style.setProperty("--header-h", height + "px");
    }
  }

  syncHeaderHeight();
  window.addEventListener("resize", syncHeaderHeight);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncHeaderHeight);
  }

  function onScroll() {
    var scrollTop = window.scrollY || window.pageYOffset;
    header.classList.toggle("is-scrolled", scrollTop > 16);
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var progress = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;
    progressBar.style.transform = "scaleX(" + progress + ")";
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  $$("[data-back-top]").forEach(function (button) {
    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  /* ----------------------------------------------------------
     入场与滚动显现
     ---------------------------------------------------------- */

  var coverRevealItems = $$(".cover [data-reveal]");
  var revealItems = $$("[data-reveal]").filter(function (item) {
    return !item.closest(".cover");
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    $$("[data-reveal]").forEach(function (item) {
      item.classList.add("is-revealed");
    });
  } else {
    // 卷首元素不依赖滚动观察，保证首屏页脚也不会缺席
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        coverRevealItems.forEach(function (item) {
          item.classList.add("is-revealed");
        });
      });
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  }

  /* ----------------------------------------------------------
     当前分节高亮
     ---------------------------------------------------------- */

  var navLinks = $$("[data-nav]");
  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var active = link.getAttribute("data-nav") === entry.target.id;
          link.classList.toggle("is-active", active);
          if (active) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, { rootMargin: "-28% 0px -62% 0px", threshold: 0 });
    ["about", "work", "notes", "contact"].forEach(function (id) {
      var section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }

  /* ----------------------------------------------------------
     作品预览卡（跟随指针）
     ---------------------------------------------------------- */

  var preview = $("#project-preview");
  var list = $(".project-list");
  var pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  if (preview && list && !reduceMotion) {
    document.addEventListener("pointermove", function (event) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }, { passive: true });

    function positionPreview() {
      var width = preview.offsetWidth;
      var height = preview.offsetHeight;
      var gap = 28;
      var pad = 18;
      var x = pointer.x + gap;
      var y = pointer.y - height / 2;

      if (x + width > window.innerWidth - pad) x = pointer.x - width - gap;
      x = Math.max(pad, x);
      y = Math.max(pad, Math.min(y, window.innerHeight - height - pad));
      preview.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
    }

    function previewMarkup(project, index) {
      var palette = project.palette || {};
      return (
        '<div class="preview-card" style="--p-bg:' + esc(palette.bg || "#ddd4c3") +
          ";--p-ink:" + esc(palette.ink || "#1c1b17") +
          ";--p-accent:" + esc(palette.accent || "#a93e2c") + '">' +
          '<div class="preview-art pattern-' + (index % 3) + '">' +
            '<span class="preview-kicker">SELECTED — ' + esc(project.year) + "</span>" +
            '<span class="preview-word">' + esc(project.word || project.en) + "</span>" +
            '<span class="preview-disc"></span>' +
            '<span class="preview-no">' + pad(index + 1) + "</span>" +
          "</div>" +
          '<div class="preview-meta">' +
            "<span>" + esc(project.title) + "</span>" +
            "<span>" + esc(project.category) + " / " + esc(project.year) + "</span>" +
          "</div>" +
          '<p class="preview-summary">' + esc(project.summary || "") + "</p>" +
        "</div>"
      );
    }

    $$(".project-row", list).forEach(function (row, index) {
      row.addEventListener("pointerenter", function (event) {
        if (event.pointerType !== "mouse") return;
        var project = site.work.projects[index];
        if (!project) return;
        preview.innerHTML = previewMarkup(project, index);
        positionPreview();
        preview.classList.add("is-visible");
        row.classList.add("is-hovered");
      });

      row.addEventListener("pointerleave", function () {
        preview.classList.remove("is-visible");
        row.classList.remove("is-hovered");
      });
    });

    list.addEventListener("pointermove", function (event) {
      if (event.pointerType !== "mouse" || !preview.classList.contains("is-visible")) return;
      window.requestAnimationFrame(positionPreview);
    });
  }

  /* ----------------------------------------------------------
     卷首肖像的轻微倾斜
     ---------------------------------------------------------- */

  var plate = $(".cover-plate");
  var plateFrame = $(".plate-frame");
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (plate && plateFrame && canHover && !reduceMotion) {
    plate.addEventListener("pointermove", function (event) {
      var rect = plate.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width - 0.5;
      var y = (event.clientY - rect.top) / rect.height - 0.5;
      plateFrame.style.transform =
        "perspective(1000px) rotateX(" + (-y * 4).toFixed(2) + "deg) rotateY(" + (x * 5).toFixed(2) + "deg)";
    });

    plate.addEventListener("pointerleave", function () {
      plateFrame.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  }

  /* ----------------------------------------------------------
     占位链接提示
     ---------------------------------------------------------- */

  var toast = $("#toast");
  var toastTimer = null;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3600);
  }

  document.addEventListener("click", function (event) {
    var placeholder = event.target.closest("a[data-placeholder]");
    if (!placeholder) return;
    event.preventDefault();
    showToast("这是占位链接 —— 在 content.js 里换成你的地址，就能抵达真正的目的地。");
  });

  /* 页内锚点在 sticky 页头下的落点由 CSS scroll-margin 处理 */
})();
