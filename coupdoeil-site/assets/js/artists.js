const ARTISTS = [
  {
    name: "Leelou",
    category: "illustration",
    events: ["saint-valentin"],
    bio: "Concept artiste et illustratrice, Leelou crée des univers colorés et expressifs mêlant personnages et émotions.",
    tags: ["concept art", "illustration"],
    link: "https://www.instagram.com/leeloush__/",
    img: "assets/img/artists/Leelou/Leelou.jpg",
    gallery: [
      "assets/img/artists/Leelou/image_123650291 (2).JPG",
      "assets/img/artists/Leelou/IMG_8532.jpeg",
    ],
  },
  {
    name: "Atelier Maple",
    category: "artisanat",
    events: ["saint-valentin"],
    bio: "Créatrice de bougies artisanales aux parfums soigneusement composés, Atelier Maple propose des pièces uniques coulées à la main.",
    tags: ["bougies", "fait main"],
    link: "https://www.instagram.com/bougies_atelier_maple/",
    img: "assets/img/artists/AtelierMaple/Atelier_maple.jpg",
    gallery: [
      "assets/img/artists/AtelierMaple/4-POST#2-JENNIFER-ATELIER MAPLE.png",
      "assets/img/artists/AtelierMaple/4-POST#3-JENNIFER-ATELIER MAPLE.png",
      "assets/img/artists/AtelierMaple/4-POST#4-JENNIFER-ATELIER MAPLE.png",
      "assets/img/artists/AtelierMaple/4-POST#5-JENNIFER-ATELIER MAPLE.png",
      "assets/img/artists/AtelierMaple/4-POST#6-JENNIFER-ATELIER MAPLE.png",
      "assets/img/artists/AtelierMaple/4-POST#7-JENNIFER-ATELIER MAPLE.png",
    ],
  },
  {
    name: "Aela Byrinthe",
    category: "illustration",
    events: ["saint-valentin"],
    bio: "Illustratrice engagée, Aela Byrinthe dessine des univers sensibles et inclusifs, entre BD et illustration traditionnelle.",
    tags: ["illustration", "BD"],
    link: "https://www.instagram.com/aela.byrinthe/",
    img: "assets/img/artists/AelaByrinthe/Aela_Byrinthe.jpg",
    gallery: [
      "assets/img/artists/AelaByrinthe/Aela-Byrinthe_oeuvres2.jpeg",
      "assets/img/artists/AelaByrinthe/BD-pride_aela-byrinthe-A5.jpeg",
    ],
  },
  {
    name: "Petit bout de goût",
    category: "bijoux",
    events: ["saint-valentin"],
    bio: "Créatrice de micro-bijoux gourmands faits main en pâte polymère : colliers, boucles d'oreilles et breloques qui croquent la vie.",
    tags: ["micro-bijoux", "fait main"],
    link: "https://www.instagram.com/petit.bout.de.gout/",
    img: "assets/img/artists/PetitBoutDeGout/Petit_bout-de-gout.jpg",
    gallery: [
      "assets/img/artists/PetitBoutDeGout/4-POST#2-PBDG.jpg",
      "assets/img/artists/PetitBoutDeGout/4-POST#3-PBDG.jpg",
      "assets/img/artists/PetitBoutDeGout/4-POST#4-PBDG.jpg",
      "assets/img/artists/PetitBoutDeGout/4-POST#5-PBDG.jpg",
      "assets/img/artists/PetitBoutDeGout/4-POST#6-PBDG.jpg",
      "assets/img/artists/PetitBoutDeGout/4-POST#7-PBDG.jpg",
      "assets/img/artists/PetitBoutDeGout/4-POST#8-PBDG.jpg",
      "assets/img/artists/PetitBoutDeGout/4-POST#9-PBDG.jpg",
      "assets/img/artists/PetitBoutDeGout/4-POST#10-PBDG.jpg",
      "assets/img/artists/PetitBoutDeGout/4-POST#11-PBDG.jpg",
    ],
  },
  {
    name: "Luzartwork",
    category: "peinture",
    events: ["saint-valentin"],
    bio: "Peintre et illustratrice, Luzartwork réalise des toiles et prints aux couleurs vibrantes, entre aquarelle, acrylique et illustrations oniriques.",
    tags: ["peinture", "illustration"],
    link: "https://www.instagram.com/luzartwork/",
    img: "assets/img/artists/Luzartwork/Luzartwork.jpg",
    gallery: [
      "assets/img/artists/Luzartwork/4-POST#2-MANON-VEROT.jpg",
      "assets/img/artists/Luzartwork/4-POST#3-MANON-VEROT.jpg",
    ],
  },
];

const INSTAGRAM_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`;
const FEATURED_ARTISTS_ORDER = ["Luzartwork", "Petit bout de goût", "Aela Byrinthe"];
const artistNameSorter = new Intl.Collator("fr", {
  sensitivity: "base",
  ignorePunctuation: true,
});

const getArtistsSortedByName = (artists) =>
  [...artists].sort((a, b) => artistNameSorter.compare(a.name, b.name));

const getFeaturedArtists = () =>
  FEATURED_ARTISTS_ORDER.map((artistName) =>
    ARTISTS.find((artist) => artist.name === artistName)
  ).filter(Boolean);


(() => {
  const sanitize = (text) => text.replace(/[<>]/g, "");

  const basePath = window.location.pathname.includes("/pages/") ? "../" : "";

  const resolveImg = (img) =>
    basePath + img.replace(/#/g, "%23").replace(/ /g, "%20");

  const buildCarouselHTML = (artist) => {
    const allImages = [
      { src: artist.img, alt: `Portrait de ${sanitize(artist.name)}` },
      ...(artist.gallery || []).map((src, i) => ({
        src,
        alt: `Oeuvre ${i + 1} de ${sanitize(artist.name)}`,
      })),
    ];

    const imgsHTML = allImages
            .map(({ src, alt }, index) => {
        const loading = index === 0 ? "eager" : "lazy";
        const fetchpriority = index === 0 ? "auto" : "low";

        return `<img src="${resolveImg(src)}" alt="${alt}" loading="${loading}" decoding="async" fetchpriority="${fetchpriority}">`;
      })
      .join("");

    const hasMultiple = allImages.length > 1;
    const arrows = hasMultiple
      ? `<button class="carousel-btn carousel-btn--prev" aria-label="Image précédente">&#8249;</button>
         <button class="carousel-btn carousel-btn--next" aria-label="Image suivante">&#8250;</button>`
      : "";
    const dotsHTML = hasMultiple
      ? `<div class="carousel-dots">${allImages
          .map(
            (_, i) =>
              `<span class="carousel-dot${i === 0 ? " active" : ""}"></span>`
          )
          .join("")}</div>`
      : "";

    return `<div class="artist-carousel">
      <div class="carousel-track">${imgsHTML}</div>
      ${arrows}
      ${dotsHTML}
    </div>`;
  };

  const initCarousel = (card) => {
    const carousel = card.querySelector(".artist-carousel");
    if (!carousel) return;
    const track = carousel.querySelector(".carousel-track");
    const images = track ? track.querySelectorAll("img") : [];
    if (images.length <= 1) return;

    const prevBtn = carousel.querySelector(".carousel-btn--prev");
    const nextBtn = carousel.querySelector(".carousel-btn--next");
    const dots = carousel.querySelectorAll(".carousel-dot");
    const total = images.length;
    let current = 0;

    const goTo = (index) => {
      current = ((index % total) + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === current));
    };

    if (prevBtn)
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        goTo(current - 1);
      });
    if (nextBtn)
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        goTo(current + 1);
      });

    goTo(0);
  };

  const emptyState = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "card";
    wrapper.innerHTML =
      "<p>Aucun artiste ne correspond à votre recherche pour le moment.</p>";
    return wrapper;
  };

  const renderArtists = (list) => {
    const container = document.querySelector("[data-artists]");
    if (!container) return;
    container.innerHTML = "";
    if (!list.length) {
      container.appendChild(emptyState());
      return;
    }
    list.forEach((artist) => {
      const card = document.createElement("article");
      card.className = "card artist-card";
      card.innerHTML = `
        ${buildCarouselHTML(artist)}
        <h3>${sanitize(artist.name)}</h3>
        <div class="artist-meta">
          <span class="badge">${sanitize(artist.category)}</span>
          <a class="instagram-link" href="${sanitize(artist.link)}" target="_blank" rel="noopener" aria-label="Instagram de ${sanitize(artist.name)}">${INSTAGRAM_ICON}</a>
        </div>
        <p>${sanitize(artist.bio)}</p>
        <div class="tags">${artist.tags
          .map((tag) => `<span class="tag">${sanitize(tag)}</span>`)
          .join("")}</div>
      `;
      initCarousel(card);
      container.appendChild(card);
    });
  };

  const bindFilters = () => {
    const searchInput = document.querySelector("[data-search]");
    const categoryButtons = document.querySelectorAll("[data-filter]");
    const eventButtons = document.querySelectorAll("[data-event]");
    if (!searchInput || !categoryButtons.length) return;
    let currentCategory = "all";
    let currentEvent = "all";
    const update = () => {
      const query = searchInput.value.toLowerCase();
      const filtered = ARTISTS.filter((a) => {
        const matchesCat =
          currentCategory === "all" || a.category === currentCategory;
        const matchesEvent =
          currentEvent === "all" || (a.events || []).includes(currentEvent);
        const content = `${a.name.toLowerCase()} ${a.bio.toLowerCase()} ${a.tags
          .join(" ")
          .toLowerCase()}`;
        const matchesQuery = content.includes(query);
        return matchesCat && matchesEvent && matchesQuery;
      });
      renderArtists(getArtistsSortedByName(filtered));
    };
    categoryButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        currentCategory = btn.getAttribute("data-filter");
        categoryButtons.forEach((b) => b.classList.toggle("active", b === btn));
        update();
      });
    });
    eventButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (currentEvent === btn.getAttribute("data-event")) {
          currentEvent = "all";
          btn.classList.remove("active");
        } else {
          currentEvent = btn.getAttribute("data-event");
          eventButtons.forEach((b) => b.classList.toggle("active", b === btn));
        }
        update();
      });
    });
    searchInput.addEventListener("input", update);
    update();
  };

  const renderFeaturedArtists = () => {
    const container = document.querySelector("[data-featured-artists]");
    if (!container) return;

    const featured = getFeaturedArtists()
    container.innerHTML = "";

    featured.forEach((artist) => {
      const card = document.createElement("div");
      card.className = "card artist-card";
      card.innerHTML = `
        ${buildCarouselHTML(artist)}
        <h3>${sanitize(artist.name)}</h3>
        <div class="artist-meta">
          <span class="badge">${sanitize(artist.category)}</span>
          <a class="instagram-link" href="${sanitize(artist.link)}" target="_blank" rel="noopener" aria-label="Instagram de ${sanitize(artist.name)}">${INSTAGRAM_ICON}</a>
        </div>
        <p>${sanitize(artist.bio)}</p>
        <div class="tags">${artist.tags.slice(0, 2).map((tag) => `<span class="tag">${sanitize(tag)}</span>`).join("")}</div>
      `;
      initCarousel(card);
      container.appendChild(card);
    });
  };

  const renderEditionArtists = () => {
    const container = document.querySelector("[data-edition-artists]");
    if (!container) return;

    container.innerHTML = "";
    getArtistsSortedByName(ARTISTS).forEach((artist) => {
      const card = document.createElement("article");
      card.className = "card artist-card";
      card.innerHTML = `
        ${buildCarouselHTML(artist)}
        <h3>${sanitize(artist.name)}</h3>
        <div class="artist-meta">
          <span class="badge">${sanitize(artist.category)}</span>
          <a class="instagram-link" href="${sanitize(artist.link)}" target="_blank" rel="noopener" aria-label="Instagram de ${sanitize(artist.name)}">${INSTAGRAM_ICON}</a>
        </div>
        <p>${sanitize(artist.bio)}</p>
        <div class="tags">${artist.tags.map((tag) => `<span class="tag">${sanitize(tag)}</span>`).join("")}</div>
      `;
      initCarousel(card);
      container.appendChild(card);
    });
  };

  const initVenueCarousel = () => {
    const carousel = document.querySelector("[data-venue-carousel]");
    if (!carousel) return;
    const track = carousel.querySelector(".venue-track");
    const slides = track ? track.querySelectorAll(".venue-slide") : [];
    if (slides.length <= 1) return;

    const prevBtn = carousel.querySelector(".carousel-btn--prev");
    const nextBtn = carousel.querySelector(".carousel-btn--next");
    const dots = carousel.querySelectorAll(".carousel-dot");
    const total = slides.length;
    let current = 0;

    const goTo = (index) => {
      current = ((index % total) + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === current));
    };

    if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); goTo(current + 1); });

    goTo(0);
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderArtists(getArtistsSortedByName(ARTISTS));
    bindFilters();
    renderFeaturedArtists();
    renderEditionArtists();
    initVenueCarousel();
  });
})();
