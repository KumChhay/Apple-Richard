const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".mobile-menu-toggle");
const searchToggle = document.querySelector(".search-toggle");
const searchInput = document.querySelector("#site-search");

menuToggle.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("menu-open");
  navbar.classList.remove("search-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  searchToggle.setAttribute("aria-expanded", "false");
  searchToggle.setAttribute("aria-label", "Open search");
});

searchToggle.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("search-open");
  navbar.classList.remove("menu-open");
  searchToggle.setAttribute("aria-expanded", String(isOpen));
  searchToggle.setAttribute("aria-label", isOpen ? "Close search" : "Open search");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");

  if (isOpen) {
    setTimeout(() => searchInput.focus(), 0);
  }
});

navbar.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    navbar.classList.remove("menu-open", "search-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    searchToggle.setAttribute("aria-expanded", "false");
    searchToggle.setAttribute("aria-label", "Open search");
  }
});

const momentsTrack = document.querySelector(".moments-track");
const previousPhotosButton = document.querySelector(".carousel-previous");
const nextPhotosButton = document.querySelector(".carousel-next");

if (momentsTrack && previousPhotosButton && nextPhotosButton) {
  const originalCards = Array.from(momentsTrack.querySelectorAll(".moment-card"));
  const makeClone = (card) => {
    const clone = card.cloneNode(true);
    clone.classList.add("moment-card-clone");
    clone.setAttribute("aria-hidden", "true");
    clone.querySelector("img").alt = "";
    clone.querySelector(".moment-link").tabIndex = -1;
    return clone;
  };

  originalCards.forEach((card, index) => {
    card.dataset.carouselIndex = String(index);
    card.dataset.carouselCopy = "0";
  });
  const makeRepeatedRun = (copyIndex) => {
    const fragment = document.createDocumentFragment();
    originalCards.forEach((card, index) => {
      const clone = makeClone(card);
      clone.dataset.carouselIndex = String(index);
      clone.dataset.carouselCopy = String(copyIndex);
      fragment.append(clone);
    });
    return fragment;
  };

  momentsTrack.prepend(makeRepeatedRun(-1));
  momentsTrack.append(makeRepeatedRun(1));
  const allCards = Array.from(momentsTrack.querySelectorAll(".moment-card"));
  let currentIndex = 0;

  const getCenteredCard = () => {
    const trackCenter = momentsTrack.getBoundingClientRect().left + momentsTrack.clientWidth / 2;
    return allCards.reduce((closest, card) => {
      const cardCenter = card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2;
      const closestCenter = closest.getBoundingClientRect().left + closest.getBoundingClientRect().width / 2;
      return Math.abs(cardCenter - trackCenter) < Math.abs(closestCenter - trackCenter) ? card : closest;
    });
  };

  const updateActiveCard = () => {
    const centeredCard = getCenteredCard();
    currentIndex = Number(centeredCard.dataset.carouselIndex);
    allCards.forEach((card) => {
      card.classList.toggle("is-active", card === centeredCard);
    });
    return centeredCard;
  };

  const centerCard = (card, behavior) => {
    const trackCenter = momentsTrack.getBoundingClientRect().left + momentsTrack.clientWidth / 2;
    const cardCenter = card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2;
    momentsTrack.scrollTo({
      left: momentsTrack.scrollLeft + cardCenter - trackCenter,
      behavior,
    });
  };

  let scrollEndTimeout;
  const finishScrolling = () => {
    window.clearTimeout(scrollEndTimeout);
    scrollEndTimeout = undefined;
    const centeredCard = getCenteredCard();
    if (centeredCard.dataset.carouselCopy !== "0") {
      const originalCard = originalCards[Number(centeredCard.dataset.carouselIndex)];
      const trackCenter = momentsTrack.getBoundingClientRect().left + momentsTrack.clientWidth / 2;
      const cardCenter = originalCard.getBoundingClientRect().left + originalCard.getBoundingClientRect().width / 2;
      momentsTrack.scrollLeft += cardCenter - trackCenter;
    }
    updateActiveCard();
  };

  const handleScroll = () => {
    updateActiveCard();
    window.clearTimeout(scrollEndTimeout);
    scrollEndTimeout = window.setTimeout(finishScrolling, 120);
  };

  const moveCarousel = (direction) => {
    const centeredCard = getCenteredCard();
    const targetCard = allCards[allCards.indexOf(centeredCard) + direction];
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    currentIndex = Number(targetCard.dataset.carouselIndex);
    centerCard(targetCard, behavior);
  };

  previousPhotosButton.addEventListener("click", () => moveCarousel(-1));
  nextPhotosButton.addEventListener("click", () => moveCarousel(1));
  momentsTrack.addEventListener("scroll", handleScroll, { passive: true });
  momentsTrack.addEventListener("scrollend", finishScrolling);
  momentsTrack.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      moveCarousel(event.key === "ArrowLeft" ? -1 : 1);
    }
  });
  window.addEventListener("resize", () => centerCard(originalCards[currentIndex], "auto"));

  centerCard(originalCards[0], "instant");
  updateActiveCard();
}
