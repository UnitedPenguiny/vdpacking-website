(function () {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const siteNav = document.querySelector("[data-site-nav]");
  const header = document.querySelector("[data-header]");
  const navShell = header ? header.querySelector(".nav-shell") : null;
  const mobileActionbar = document.querySelector(".mobile-actionbar");

  if (navShell && menuToggle && mobileActionbar && mobileActionbar.parentElement !== navShell) {
    navShell.insertBefore(mobileActionbar, menuToggle);
  }

  const setMenuState = (isOpen) => {
    if (!menuToggle || !siteNav) return;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "ปิดเมนู" : "เปิดเมนู");
    siteNav.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  };

  const closeMenu = () => setMenuState(false);

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      setMenuState(!isOpen);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (siteNav.classList.contains("is-open") && header && !header.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1140) closeMenu();
    });

    setMenuState(menuToggle.getAttribute("aria-expanded") === "true");
  }

  const normalizePagePath = (path) => {
    const normalized = path.replace(/\/+$/, "") || "/";
    if (normalized === "/index.html") return "/";
    return normalized.replace(/\.html$/, "");
  };
  const currentPage = normalizePagePath(window.location.pathname);
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const target = normalizePagePath(new URL(link.getAttribute("data-nav") || "/", window.location.origin).pathname);
    if (target === currentPage) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });


  const lightboxItems = document.querySelectorAll("[data-lightbox]");
  const lightbox = document.querySelector("[data-lightbox-root]");
  const lightboxImage = lightbox ? lightbox.querySelector("[data-lightbox-image]") : null;
  const lightboxCaption = lightbox ? lightbox.querySelector("[data-lightbox-caption]") : null;
  const lightboxClose = lightbox ? lightbox.querySelector("[data-lightbox-close]") : null;
  let lightboxTrigger = null;

  const closeLightbox = () => {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    if (lightboxImage) {
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = "";
    }
    if (lightboxCaption) lightboxCaption.textContent = "";
    if (lightboxTrigger) {
      lightboxTrigger.focus();
      lightboxTrigger = null;
    }
  };

  const openLightbox = (trigger) => {
    if (!lightbox || !lightboxImage) return;
    const fullSrc = trigger.getAttribute("data-full");
    const alt = trigger.getAttribute("data-alt") || "";
    if (!fullSrc) return;

    lightboxTrigger = trigger;
    lightboxImage.src = fullSrc;
    lightboxImage.alt = alt;
    if (lightboxCaption) lightboxCaption.textContent = alt;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    if (lightboxClose) lightboxClose.focus();
  };

  lightboxItems.forEach((item) => {
    item.addEventListener("click", () => openLightbox(item));
  });

  if (lightbox) {
    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

})();


// Google Ads conversion tracking for VD Packing's LINE Official destination
(function () {
  const lineOfficialUrl = "https://line.me/R/ti/p/%40vdbox";
  const lineConversionSendTo = "AW-753832907/soFJCLXxo-IcEMunuucC";
  const lineConversionFallbackMs = 250;
  const lineOfficialDestination = new URL(lineOfficialUrl);
  const trackingInitializedKey = "__vdPackingLineConversionTrackingInitialized";

  if (window[trackingInitializedKey]) return;
  window[trackingInitializedKey] = true;

  const isLineOfficialLink = (link) => {
    if (!link || !link.href) return false;

    try {
      const destination = new URL(link.href, document.baseURI);
      return destination.origin === lineOfficialDestination.origin
        && destination.pathname === lineOfficialDestination.pathname
        && destination.search === lineOfficialDestination.search;
    } catch (error) {
      return false;
    }
  };

  const sendLineConversion = () => {
    if (typeof window.gtag !== "function") return false;

    try {
      window.gtag("event", "conversion", {
        send_to: lineConversionSendTo
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const navigateAfterLineConversion = (url) => {
    let hasNavigated = false;
    let fallbackTimer = null;

    const navigate = () => {
      if (hasNavigated) return;
      hasNavigated = true;
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      window.location.assign(url);
    };

    if (typeof window.gtag !== "function") {
      navigate();
      return;
    }

    fallbackTimer = window.setTimeout(navigate, lineConversionFallbackMs);

    try {
      window.gtag("event", "conversion", {
        send_to: lineConversionSendTo,
        event_callback: navigate,
        event_timeout: lineConversionFallbackMs
      });
    } catch (error) {
      navigate();
    }
  };

  const isSameTabTarget = (link) => {
    const target = (link.getAttribute("target") || "").trim().toLowerCase();
    return !target || target === "_self" || target === "_parent" || target === "_top";
  };

  const handleLineClick = (event) => {
    if (event.type === "click" && event.button !== 0) return;
    if (event.type === "auxclick" && event.button !== 1) return;

    const target = event.target;
    const link = target instanceof Element ? target.closest("a") : null;
    if (!isLineOfficialLink(link)) return;

    const preserveNativeBehavior = event.defaultPrevented
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
      || event.type === "auxclick"
      || !isSameTabTarget(link);

    if (preserveNativeBehavior) {
      sendLineConversion();
      return;
    }

    event.preventDefault();
    navigateAfterLineConversion(link.href);
  };

  document.addEventListener("click", handleLineClick);
  document.addEventListener("auxclick", handleLineClick);
})();


// Compact rotating homepage portfolio
(function () {
  const showcase = document.querySelector("[data-showcase]");
  const slots = showcase ? Array.from(showcase.querySelectorAll("[data-showcase-slot]")) : [];
  const mainSlot = slots[0] || null;
  const thumbSlots = slots.slice(1);
  const isMobileShowcase = () => window.matchMedia && window.matchMedia("(max-width: 640px)").matches;
  const getActiveThumbSlots = () => thumbSlots.filter((slot) => !slot.hasAttribute("data-showcase-mobile-only") || isMobileShowcase());
  const sourceItems = Array.from(document.querySelectorAll(".portfolio-all-item[data-lightbox]")).map((item) => {
    const image = item.querySelector("img");
    return {
      full: item.getAttribute("data-full") || "",
      alt: item.getAttribute("data-alt") || "",
      src: image ? image.getAttribute("src") || "" : ""
    };
  });
  const prevButton = document.querySelector("[data-showcase-prev]");
  const nextButton = document.querySelector("[data-showcase-next]");
  const counter = document.querySelector("[data-showcase-counter]");
  const progress = document.querySelector("[data-showcase-progress]");
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let currentIndex = 0;
  let thumbStartIndex = sourceItems.length > 1 ? 1 : 0;
  let timer = null;

  const setSlotItem = (slot, itemIndex, isMain = false) => {
    if (!slot || !sourceItems.length) return;
    const item = sourceItems[itemIndex];
    const image = slot.querySelector("img");
    slot.setAttribute("data-showcase-index", String(itemIndex));
    slot.setAttribute("data-full", item.full);
    slot.setAttribute("data-alt", item.alt);
    slot.setAttribute("aria-label", isMain ? `ดู${item.alt}ขนาดใหญ่` : `แสดง${item.alt}ในภาพใหญ่`);
    slot.classList.toggle("is-current", itemIndex === currentIndex);
    if (image) {
      image.src = item.src;
      image.alt = item.alt;
    }
    if (isMain) slot.classList.add("is-current");
  };

  const isInThumbWindow = (index) => {
    const activeThumbSlots = getActiveThumbSlots();
    if (!sourceItems.length || !activeThumbSlots.length) return false;
    const offset = (index - thumbStartIndex + sourceItems.length) % sourceItems.length;
    return offset < activeThumbSlots.length;
  };

  const keepCurrentVisibleInThumbs = (direction = 0) => {
    const activeThumbSlots = getActiveThumbSlots();
    if (!sourceItems.length || !activeThumbSlots.length || isInThumbWindow(currentIndex)) return;

    if (direction > 0) {
      thumbStartIndex = (thumbStartIndex + 1) % sourceItems.length;
    } else if (direction < 0) {
      thumbStartIndex = (thumbStartIndex - 1 + sourceItems.length) % sourceItems.length;
    } else {
      thumbStartIndex = (currentIndex + 1) % sourceItems.length;
    }
  };

  const renderShowcase = () => {
    if (!showcase || !mainSlot || !sourceItems.length) return;
    const total = sourceItems.length;

    setSlotItem(mainSlot, currentIndex, true);

    getActiveThumbSlots().forEach((slot, slotIndex) => {
      const itemIndex = (thumbStartIndex + slotIndex) % total;
      setSlotItem(slot, itemIndex);
    });

    if (counter) {
      counter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${total} รูป`;
    }

    if (progress) {
      const width = Math.min(100, ((currentIndex + 1) / total) * 100);
      progress.style.width = `${Math.max(8, width)}%`;
    }
  };

  const updateShowcase = (direction = 0) => {
    if (!showcase || !mainSlot || !sourceItems.length || !direction) return;
    const total = sourceItems.length;
    currentIndex = (currentIndex + direction + total) % total;
    keepCurrentVisibleInThumbs(direction);

    const stage = showcase.querySelector(".portfolio-stage");
    if (stage) stage.classList.add("is-changing");

    window.setTimeout(() => {
      renderShowcase();
      if (stage) stage.classList.remove("is-changing");
    }, reducedMotion ? 0 : 150);
  };

  const selectShowcaseIndex = (itemIndex) => {
    if (!showcase || !mainSlot || !sourceItems.length) return;
    if (!Number.isInteger(itemIndex) || itemIndex < 0 || itemIndex >= sourceItems.length) return;

    currentIndex = itemIndex;
    if (!isInThumbWindow(currentIndex)) thumbStartIndex = currentIndex;

    const stage = showcase.querySelector(".portfolio-stage");
    if (stage) stage.classList.add("is-changing");
    window.setTimeout(() => {
      renderShowcase();
      if (stage) stage.classList.remove("is-changing");
    }, reducedMotion ? 0 : 150);
  };

  const stopTimer = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const startTimer = () => {
    stopTimer();
    if (!reducedMotion && sourceItems.length > 1) {
      timer = window.setInterval(() => updateShowcase(1), 5600);
    }
  };

  if (mainSlot && sourceItems.length) {
    renderShowcase();
    if (prevButton) prevButton.addEventListener("click", () => {
      updateShowcase(-1);
      startTimer();
    });
    if (nextButton) nextButton.addEventListener("click", () => {
      updateShowcase(1);
      startTimer();
    });
    thumbSlots.forEach((slot) => {
      slot.addEventListener("click", () => {
        const itemIndex = Number.parseInt(slot.getAttribute("data-showcase-index") || "", 10);
        if (Number.isInteger(itemIndex)) {
          selectShowcaseIndex(itemIndex);
          startTimer();
        }
      });
    });
    showcase.addEventListener("mouseenter", stopTimer);
    showcase.addEventListener("mouseleave", startTimer);
    showcase.addEventListener("focusin", stopTimer);
    showcase.addEventListener("focusout", startTimer);
    window.addEventListener("resize", renderShowcase, { passive: true });
    startTimer();
  }

  const galleryModal = document.querySelector("[data-gallery-modal]");
  const galleryOpen = document.querySelector("[data-gallery-open]");
  const galleryClose = document.querySelector("[data-gallery-close]");
  let galleryTrigger = null;

  const openGallery = () => {
    if (!galleryModal) return;
    galleryTrigger = document.activeElement;
    galleryModal.hidden = false;
    document.body.classList.add("portfolio-all-open");
    stopTimer();
    if (galleryClose) galleryClose.focus();
  };

  const closeGallery = () => {
    if (!galleryModal || galleryModal.hidden) return;
    galleryModal.hidden = true;
    document.body.classList.remove("portfolio-all-open");
    startTimer();
    if (galleryTrigger && typeof galleryTrigger.focus === "function") galleryTrigger.focus();
    galleryTrigger = null;
  };

  if (galleryOpen) galleryOpen.addEventListener("click", openGallery);
  if (galleryClose) galleryClose.addEventListener("click", closeGallery);
  if (galleryModal) {
    galleryModal.addEventListener("click", (event) => {
      if (event.target === galleryModal) closeGallery();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || galleryModal.hidden) return;
      const lightbox = document.querySelector("[data-lightbox-root]");
      if (lightbox && !lightbox.hidden) return;
      closeGallery();
    }, true);
  }
})();
