(() => {
  const THEME_KEY = "coupdoeil_theme";

  const setActiveNav = () => {
    let path = window.location.pathname.split("/").pop() || "index.html";
    if (!path.includes(".")) {
      path = "index.html";
    }
    document.querySelectorAll("nav a[data-page]").forEach((link) => {
      const page = link.getAttribute("data-page") || "";
      const normalizedPage = page.split("/").pop() || page;
      const isActive =
        path === page ||
        path === normalizedPage ||
        (!path && normalizedPage === "index.html");
      link.classList.toggle("active", Boolean(isActive));
    });
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    const toggleLabel = document.querySelector("[data-theme-label]");
    if (toggleLabel) {
      toggleLabel.textContent = theme === "dark" ? "Mode sombre" : "Mode clair";
    }
  };

  const initTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    applyTheme(theme);
    const toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", theme === "dark");
    toggle.addEventListener("click", () => {
      const next =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";
      applyTheme(next);
      toggle.setAttribute("aria-pressed", next === "dark");
    });
  };

  const updateAnalyticsConsent = (granted) => {
    if (typeof window.gtag !== "function") return;
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
    });
  };

  const initCookieBanner = () => {
    const saved = localStorage.getItem("coupdoeil_cookies");
    const banner = document.querySelector(".cookie-banner");
    if (saved === "accepted") updateAnalyticsConsent(true);
    if (!banner) return;
    if (saved) {
      banner.remove();
      return;
    }
    const accept = banner.querySelector('[data-action="accept"]');
    const deny = banner.querySelector('[data-action="deny"]');
    const persist = (value) => {
      localStorage.setItem("coupdoeil_cookies", value);
      updateAnalyticsConsent(value === "accepted");
      banner.classList.add("hide");
      setTimeout(() => banner.remove(), 300);
    };
    accept?.addEventListener("click", () => persist("accepted"));
    deny?.addEventListener("click", () => persist("refused"));
  };

  const initCookiesReset = () => {
    const btn = document.querySelector('[data-action="reset-cookies"]');
    if (!btn) return;
    btn.addEventListener("click", () => {
      localStorage.removeItem("coupdoeil_cookies");
      location.reload();
    });
  };

  const secureInput = (value) => value.replace(/[<>]/g, "").trim();

  const initNewsletter = () => {
    const form = document.querySelector("[data-newsletter]");
    if (!form) return;
    const status = form.querySelector("[data-status]");
    const endpoint = form.dataset.endpoint;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const email = secureInput(emailInput.value);
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Merci de saisir un email valide.";
        status.style.color = "#b02b2b";
        emailInput.classList.add("is-invalid");
        return;
      }
      if (!endpoint) return;
      status.textContent = "Inscription en cours...";
      status.style.color = "inherit";
      try {
        const body = new FormData(form);
        body.set("fields[email]", email);
        const response = await fetch(endpoint, {
          method: "POST",
          body,
        });
        if (!response.ok) throw new Error("send-failed");
        status.textContent =
          "Merci ! Vérifiez votre boîte mail pour confirmer votre inscription.";
        status.style.color = "inherit";
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
        localStorage.setItem("coupdoeil_newsletter", email);
        form.reset();
      } catch (error) {
        console.error("Newsletter subscription failed", error);
        status.textContent =
          "Impossible de vous inscrire pour le moment. Réessayez dans un instant.";
        status.style.color = "#b02b2b";
      }
    });
  };

  const initHeroBannerFade = () => {
    const banner = document.querySelector("[data-hero-banner]");
    if (!banner) return;
    let fadeDistance = Math.max(banner.offsetHeight * 0.85, 200);
    let ticking = false;

    const updateFade = () => {
      const progress = Math.min(window.scrollY / fadeDistance, 1);
      const opacity = Math.max(1 - progress, 0);
      banner.style.setProperty("--hero-opacity", opacity.toFixed(3));

      // Hide scroll indicator after scrolling starts
      const cue = banner.querySelector(".scroll-indicator, .hero-scroll-cue");
      if (cue) {
        cue.style.opacity = Math.max(1 - progress * 3, 0).toFixed(3);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateFade);
        ticking = true;
      }
    };

    const onResize = () => {
      fadeDistance = Math.max(banner.offsetHeight * 0.85, 200);
      updateFade();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    updateFade();
  };

  const initScrollHint = () => {
    const target = document.querySelector("[data-scroll-hint]");
    if (!target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let killed = false;
    let timer = null;
    const HINT_DISTANCE = 40; // px de descente
    const HINT_DURATION = 900; // ms aller-retour
    const HINT_INTERVAL = 3200; // ms entre chaque hint
    const FIRST_DELAY = 1800; // ms avant le premier hint

    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const animateBounce = () => {
      if (killed || window.scrollY > 5) return;
      const start = performance.now();
      const step = (now) => {
        if (killed) return;
        const elapsed = now - start;
        const progress = Math.min(elapsed / HINT_DURATION, 1);
        // aller (0 → 0.5) puis retour (0.5 → 1)
        const phase = progress < 0.5 ? easeInOut(progress * 2) : easeInOut((1 - progress) * 2);
        const y = phase * HINT_DISTANCE;
        window.scrollTo({ top: y, behavior: "instant" in window ? "instant" : "auto" });
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          window.scrollTo({ top: 0 });
        }
      };
      requestAnimationFrame(step);
    };

    const scheduleNext = () => {
      if (killed) return;
      timer = setTimeout(() => {
        animateBounce();
        scheduleNext();
      }, HINT_INTERVAL);
    };

    const kill = () => {
      if (killed) return;
      killed = true;
      clearTimeout(timer);
      window.removeEventListener("wheel", killOnUser, { passive: true });
      window.removeEventListener("touchstart", killOnUser, { passive: true });
      window.removeEventListener("keydown", killOnKey);
      window.removeEventListener("pointerdown", killOnUser, { passive: true });
    };

    const killOnUser = () => kill();
    const killOnKey = (e) => {
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space", " ", "End", "Home"];
      if (keys.includes(e.key)) kill();
    };

    window.addEventListener("wheel", killOnUser, { passive: true });
    window.addEventListener("touchstart", killOnUser, { passive: true });
    window.addEventListener("pointerdown", killOnUser, { passive: true });
    window.addEventListener("keydown", killOnKey);

    // premier hint après un délai
    setTimeout(() => {
      animateBounce();
      scheduleNext();
    }, FIRST_DELAY);
  };

  const initHeaderScroll = () => {
    const header = document.querySelector("header");
    const banner = document.querySelector("[data-hero-banner]");
    if (!header) return;

    // If no hero banner, show header immediately
    if (!banner) {
      header.classList.add("header--visible");
      return;
    }

    let ticking = false;
    const updateHeader = () => {
      const bannerBottom = banner.offsetHeight * 0.7;
      if (window.scrollY > bannerBottom) {
        header.classList.add("header--visible");
      } else {
        header.classList.remove("header--visible");
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateHeader();
  };

  const initImagePerformance = () => {
    const isFirstSlideImage = (img) => {
      const slide = img.closest('.hero-carousel-slide, .venue-slide');
      return Boolean(slide && slide.parentElement && slide.parentElement.firstElementChild === slide);
    };

    const isCriticalImage = (img) =>
      Boolean(
        img.closest('header .logo') ||
        img.closest('.hero') ||
        img.closest('.event-card__img') ||
        isFirstSlideImage(img)
      );

    const optimizeImage = (img) => {
      if (!(img instanceof HTMLImageElement)) return;

      if (!img.hasAttribute('decoding')) {
        img.decoding = 'async';
      }

      if (isCriticalImage(img)) {
        if (!img.hasAttribute('loading')) {
          img.loading = 'eager';
        }
        if (!img.hasAttribute('fetchpriority')) {
          img.fetchPriority = 'high';
        }
        return;
      }

      if (!img.hasAttribute('loading')) {
        img.loading = 'lazy';
      }
      if (!img.hasAttribute('fetchpriority')) {
        img.fetchPriority = 'low';
      }
    };

    document.querySelectorAll('img').forEach(optimizeImage);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node instanceof HTMLImageElement) {
            optimizeImage(node);
            return;
          }
          node.querySelectorAll?.('img').forEach(optimizeImage);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  };

  const initHeroCarousel = () => {
    const carousel = document.querySelector("[data-hero-carousel]");
    if (!carousel) return;
    const track = carousel.querySelector(".hero-carousel-track");
    const slides = track ? track.querySelectorAll(".hero-carousel-slide") : [];
    if (!slides.length) return;
    const dots = carousel.querySelectorAll(".carousel-dot");
    const prevBtn = carousel.querySelector(".carousel-btn--prev");
    const nextBtn = carousel.querySelector(".carousel-btn--next");
    let current = 0;
    let autoTimer = null;

    const updateSlideImagePriorities = () => {
      slides.forEach((slide, index) => {
        const img = slide.querySelector("img");
        if (!img) return;

        const distance = Math.min(
          Math.abs(index - current),
          slides.length - Math.abs(index - current)
        );
        const isCurrent = distance === 0;
        const isNearby = distance === 1;

        if (isCurrent || isNearby) {
          img.loading = "eager";
          img.fetchPriority = isCurrent ? "high" : "auto";
          return;
        }

        img.loading = "lazy";
        img.fetchPriority = "low";
      });
    };

    const goTo = (idx) => {
      current = (idx + slides.length) % slides.length;
      track.style.transform = `translate3d(-${current * carousel.clientWidth}px, 0, 0)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === current));
      updateSlideImagePriorities();
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    const resetAuto = () => {
      clearInterval(autoTimer);
      autoTimer = setInterval(next, 4500);
    };

    prevBtn?.addEventListener("click", () => { prev(); resetAuto(); });
    nextBtn?.addEventListener("click", () => { next(); resetAuto(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { goTo(i); resetAuto(); }));

    window.addEventListener("resize", () => goTo(current), { passive: true });

    carousel.addEventListener("mouseenter", () => clearInterval(autoTimer));
    carousel.addEventListener("mouseleave", resetAuto);

    let touchStartX = 0;
    carousel.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener("touchend", (e) => {
      const delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 40) { delta > 0 ? next() : prev(); resetAuto(); }
    }, { passive: true });

    goTo(0);
    resetAuto();
  };

  const initMobileNav = () => {
    const burger = document.querySelector("[data-nav-toggle]");
    const navbar = document.querySelector(".navbar");
    const nav = document.querySelector("header nav");
    if (!burger || !nav || !navbar) return;

    const toggle = (open) => {
      const isOpen = typeof open === "boolean" ? open : !nav.classList.contains("nav--open");
      nav.classList.toggle("nav--open", isOpen);
      navbar.classList.toggle("navbar--open", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
      burger.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    };

    burger.addEventListener("click", () => toggle());

    // Close on nav link click
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => toggle(false));
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("nav--open")) {
        toggle(false);
        burger.focus();
      }
    });

    // Close if viewport becomes wider than breakpoint
    const mq = window.matchMedia("(min-width: 901px)");
    mq.addEventListener("change", (e) => {
      if (e.matches) toggle(false);
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    setActiveNav();
    initTheme();
    initCookieBanner();
    initCookiesReset();
    initNewsletter();
    initHeroBannerFade();
    initHeaderScroll();
    initScrollHint();
    initImagePerformance();
    initHeroCarousel();
    initMobileNav();
  });
})();
