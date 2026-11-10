/* ============================================================
   绘商 · 个人主页
   只负责一件事：跟随滚动位置，标记当前章节。
   内容与链接不依赖本文件。
   ============================================================ */

(function () {
  "use strict";

  var sectionIds = ["about", "work", "sources"];
  var sections = sectionIds.map(function (id) {
    return document.getElementById(id);
  });
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".site-nav a[data-nav]")
  );
  var ticking = false;

  if (!navLinks.length) return;

  function setActive(id) {
    navLinks.forEach(function (link) {
      var active = link.getAttribute("data-nav") === id;
      link.classList.toggle("is-active", active);
      if (active) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function getCurrentSection() {
    var probe = window.innerHeight * 0.38;
    var current = null;

    sections.forEach(function (section) {
      if (!section) return;
      if (section.getBoundingClientRect().top <= probe) {
        current = section.id;
      }
    });

    var doc = document.documentElement;
    var atBottom =
      window.innerHeight + window.scrollY >= doc.scrollHeight - 4;

    if (atBottom) {
      current = sectionIds[sectionIds.length - 1];
    }

    return current;
  }

  function syncActive() {
    setActive(getCurrentSection());
    ticking = false;
  }

  function requestSync() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(syncActive);
  }

  // 直接带 #锚点 打开时，浏览器有时会在字体完成排版前就完成定位。
  // 字体加载后追加几次校准，让目标分区紧贴在吸顶页头下方。
  var initialHash = location.hash;
  var hashAlignmentAttempts = 0;

  function alignInitialHash() {
    if (!initialHash || location.hash !== initialHash) return;
    if (hashAlignmentAttempts >= 3) return;

    var target = document.getElementById(initialHash.slice(1));
    if (!target || !target.classList.contains("chapter")) return;

    var header = document.querySelector(".site-header");
    var offset = header ? header.getBoundingClientRect().height : 0;
    var desiredTop =
      window.scrollY + target.getBoundingClientRect().top - offset;

    if (Math.abs(desiredTop - window.scrollY) <= 2) return;

    hashAlignmentAttempts += 1;
    window.scrollTo({
      top: desiredTop,
      left: 0,
      behavior: "instant",
    });
    requestSync();
  }

  window.addEventListener("scroll", requestSync, { passive: true });
  window.addEventListener("resize", requestSync);
  window.addEventListener("hashchange", function () {
    window.requestAnimationFrame(syncActive);
    window.setTimeout(syncActive, 90);
  });

  requestSync();

  window.addEventListener("load", alignInitialHash, { once: true });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      alignInitialHash();
      window.setTimeout(alignInitialHash, 120);
      window.setTimeout(alignInitialHash, 480);
    });
  }
  window.setTimeout(alignInitialHash, 800);
})();
