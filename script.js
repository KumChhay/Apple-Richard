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

// --- Site search: suggestions while typing, navigation only on Enter (or picking a suggestion) ---
const siteSearchIndex = [
  { group: "Pages", title: "Home", detail: "Richard.LLC home", url: "index.html", keywords: "home overview start main front" },
  { group: "Pages", title: "Mac", detail: "Shop every Mac", url: "Mac.html", keywords: "mac macbook laptop computer notebook" },
  { group: "Pages", title: "iPad", detail: "Shop every iPad", url: "iPad.html", keywords: "ipad tablet" },
  { group: "Pages", title: "iPhone", detail: "Shop every iPhone", url: "iPhone.html", keywords: "iphone phone smartphone mobile" },
  { group: "Pages", title: "Support", detail: "Product guide, tips, and contact", url: "support.html", keywords: "support help guide tips contact" },
  { group: "Pages", title: "Shopping bag", detail: "Review your items", action: "bag", url: "Mac.html#shopping-bag", keywords: "bag cart basket checkout order" },

  { group: "Products", title: "Richard's Special Mac", detail: "Mac · From $3,999", url: "Mac.html#mac-special-heading", keywords: "special richard r1 pro max tandem oled premium macbook laptop" },
  { group: "Products", title: "MacBook Air", detail: "Mac · From $1,299", url: "Mac.html#macbook-air", keywords: "macbook air m5 laptop 13 15 inch" },
  { group: "Products", title: "MacBook Pro", detail: "Mac · From $1,999", url: "Mac.html#macbook-pro", keywords: "macbook pro m5 max laptop 14 16 inch" },
  { group: "Products", title: "MacBook Neo", detail: "Mac · From $699", url: "Mac.html#macbook-neo", keywords: "macbook neo laptop colorful student cheap budget" },
  { group: "Products", title: "iPad", detail: "iPad · From $349", url: "iPad.html#ipad", keywords: "ipad tablet 11 inch colorful" },
  { group: "Products", title: "iPad Air", detail: "iPad · From $599", url: "iPad.html#ipad-air", keywords: "ipad air tablet 11 13 inch" },
  { group: "Products", title: "iPad mini", detail: "iPad · From $499", url: "iPad.html#ipad-mini", keywords: "ipad mini tablet small 8.3 inch" },
  { group: "Products", title: "iPad Pro", detail: "iPad · From $999", url: "iPad.html#ipad-pro", keywords: "ipad pro tablet 11 13 inch oled" },
  { group: "Products", title: "Apple Pencil", detail: "iPad accessory · $129", url: "iPad.html#ipad-essentials-heading", keywords: "apple pencil stylus draw pen accessory" },
  { group: "Products", title: "Magic Keyboard", detail: "iPad accessory · $349", url: "iPad.html#ipad-essentials-heading", keywords: "magic keyboard trackpad typing accessory" },
  { group: "Products", title: "iPhone Duo", detail: "iPhone · From $1,999", url: "iPhone.html#iphone-duo", keywords: "iphone duo foldable fold phone" },
  { group: "Products", title: "iPhone 18 Pro", detail: "iPhone · From $1,099", url: "iPhone.html#iphone-18-pro", keywords: "iphone 18 pro max phone camera" },
  { group: "Products", title: "iPhone Air", detail: "iPhone · From $999", url: "iPhone.html#iphone-air", keywords: "iphone air thin light phone" },
  { group: "Products", title: "iPhone 17", detail: "iPhone · From $799", url: "iPhone.html#iphone-17", keywords: "iphone 17 phone" },
  { group: "Products", title: "iPhone 17e", detail: "iPhone · From $599", url: "iPhone.html#iphone-17e", keywords: "iphone 17e phone cheap budget" },
  { group: "Products", title: "MagSafe Charger", detail: "iPhone accessory · $49", url: "iPhone.html#iphone-essentials-heading", keywords: "magsafe charger wireless charging accessory" },
  { group: "Products", title: "AirPods", detail: "iPhone accessory · $179", url: "iPhone.html#iphone-essentials-heading", keywords: "airpods headphones earbuds music audio accessory" },

  { group: "Support", title: "Contact support", detail: "Call or email a person", url: "support.html#support-contact", keywords: "contact call phone email talk person help number" },
  { group: "Support", title: "Having trouble charging?", detail: "Quick tip", url: "support.html#support-tip-charging", keywords: "charging charge battery cable adapter power not charging" },
  { group: "Support", title: "Keep your software current", detail: "Quick tip", url: "support.html#support-tip-software", keywords: "software update ios macos ipados upgrade settings" },
  { group: "Support", title: "Before service or setup", detail: "Quick tip", url: "support.html#support-tip-setup", keywords: "service setup repair backup back up apple account model number" },
  { group: "Support", title: "Mac guide", detail: "Support · Specs and highlights", url: "support.html#support-mac", keywords: "mac macbook guide support help specs" },
  { group: "Support", title: "iPad guide", detail: "Support · Specs and highlights", url: "support.html#support-ipad", keywords: "ipad guide support help specs" },
  { group: "Support", title: "iPhone guide", detail: "Support · Specs and highlights", url: "support.html#support-iphone", keywords: "iphone guide support help specs" },
  { group: "Support", title: "Help me choose a Mac", detail: "Answer a few questions", url: "Mac.html#mac-chooser-heading", keywords: "help choose quiz recommend which mac compare" },
  { group: "Support", title: "Help me choose an iPad", detail: "Answer a few questions", url: "iPad.html#ipad-chooser-heading", keywords: "help choose quiz recommend which ipad compare" },
  { group: "Support", title: "Help me choose an iPhone", detail: "Answer a few questions", url: "iPhone.html#iphone-chooser-heading", keywords: "help choose quiz recommend which iphone compare" },
  { group: "Support", title: "Trade in and switch to Mac", detail: "Mac", url: "Mac.html#mac-switch-heading", keywords: "trade in trade-in switch windows pc move" },
];
const siteSearchGroups = ["Pages", "Products", "Support"];
const siteSearchItem = searchInput?.closest(".search-item");

if (searchInput instanceof HTMLInputElement && siteSearchItem instanceof HTMLElement) {
  const suggestions = document.createElement("div");
  suggestions.className = "search-suggestions";
  suggestions.id = "search-suggestions";
  suggestions.setAttribute("role", "listbox");
  suggestions.setAttribute("aria-label", "Search suggestions");
  suggestions.hidden = true;
  siteSearchItem.append(suggestions);

  searchInput.setAttribute("role", "combobox");
  searchInput.setAttribute("aria-autocomplete", "list");
  searchInput.setAttribute("aria-controls", suggestions.id);
  searchInput.setAttribute("aria-expanded", "false");
  searchInput.setAttribute("autocomplete", "off");

  let visibleResults = [];
  let bestResult;
  let activeIndex = -1;

  // Every typed word must start one of the item's title or keyword words ("pro" matches "Pro", not "product")
  const scoreSearchItem = (item, query, words) => {
    const title = item.title.toLowerCase();
    const searchWords = `${title} ${item.keywords}`.split(/[\s'’·-]+/);
    if (!words.every((word) => searchWords.some((searchWord) => searchWord.startsWith(word)))) {
      return 0;
    }
    if (title === query) return 100;
    if (title.startsWith(query)) return 80;
    if (title.includes(query)) return 60;
    return 30 + words.filter((word) => title.includes(word)).length * 5;
  };

  const findSearchResults = (rawQuery) => {
    const query = rawQuery.trim().toLowerCase();
    bestResult = undefined;
    if (!query) {
      // Empty box: offer the main pages as quick links
      return siteSearchIndex.filter((item) => item.group === "Pages" && item.action !== "bag");
    }
    const words = query.split(/\s+/);
    const scored = siteSearchIndex
      .map((item) => ({ item, score: scoreSearchItem(item, query, words) }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score);
    bestResult = scored[0]?.item;
    // Up to 4 per group, groups kept in a fixed order
    return siteSearchGroups.flatMap((group) =>
      scored.filter((result) => result.item.group === group).slice(0, 4).map((result) => result.item)
    );
  };

  const setActiveSuggestion = (index) => {
    activeIndex = index;
    suggestions.querySelectorAll(".search-suggestion").forEach((option, optionIndex) => {
      const isActive = optionIndex === activeIndex;
      option.classList.toggle("is-active", isActive);
      option.setAttribute("aria-selected", String(isActive));
      if (isActive) {
        searchInput.setAttribute("aria-activedescendant", option.id);
        option.scrollIntoView({ block: "nearest" });
      }
    });
    if (activeIndex < 0) {
      searchInput.removeAttribute("aria-activedescendant");
    }
  };

  const closeSuggestions = () => {
    suggestions.hidden = true;
    searchInput.setAttribute("aria-expanded", "false");
    setActiveSuggestion(-1);
  };

  const renderSuggestions = () => {
    const query = searchInput.value.trim();
    visibleResults = findSearchResults(query);
    suggestions.replaceChildren();

    if (visibleResults.length === 0) {
      const empty = document.createElement("p");
      empty.className = "search-suggestions-empty";
      empty.textContent = `No results for “${query}”. Try a product name like “iPhone” or a topic like “charging”.`;
      suggestions.append(empty);
    }

    let lastGroup = "";
    visibleResults.forEach((item, index) => {
      const heading = query ? item.group : "Quick links";
      if (heading !== lastGroup) {
        const label = document.createElement("p");
        label.className = "search-suggestions-group";
        label.textContent = heading;
        suggestions.append(label);
        lastGroup = heading;
      }

      const option = document.createElement("a");
      option.className = "search-suggestion";
      option.id = `search-suggestion-${index}`;
      option.href = item.url;
      option.tabIndex = -1;
      option.setAttribute("role", "option");
      option.dataset.searchIndex = String(index);
      const title = document.createElement("span");
      title.className = "search-suggestion-title";
      title.textContent = item.title;
      const detail = document.createElement("span");
      detail.className = "search-suggestion-detail";
      detail.textContent = item.detail;
      option.append(title, detail);
      suggestions.append(option);
    });

    suggestions.hidden = false;
    searchInput.setAttribute("aria-expanded", "true");
    setActiveSuggestion(-1);
  };

  const openSearchResult = (item) => {
    closeSuggestions();
    searchInput.blur();
    const bagButton = document.querySelector("[data-open-mac-bag]");
    if (item.action === "bag" && bagButton instanceof HTMLButtonElement) {
      bagButton.click();
      return;
    }
    window.location.href = item.url;
  };

  searchInput.addEventListener("input", renderSuggestions);
  searchInput.addEventListener("focus", renderSuggestions);
  searchInput.addEventListener("keydown", (event) => {
    const optionCount = visibleResults.length;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (suggestions.hidden) {
        renderSuggestions();
      }
      if (optionCount > 0) {
        const step = event.key === "ArrowDown" ? 1 : -1;
        setActiveSuggestion((activeIndex + step + optionCount) % optionCount);
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      // Enter confirms: the highlighted suggestion, or the strongest match across all groups
      const result = visibleResults[activeIndex] ?? bestResult;
      if (result) {
        openSearchResult(result);
      } else {
        renderSuggestions();
      }
    } else if (event.key === "Escape" && !suggestions.hidden) {
      event.stopPropagation();
      closeSuggestions();
    }
  });

  // mousedown keeps focus in the box so the click below still lands
  suggestions.addEventListener("mousedown", (event) => event.preventDefault());
  suggestions.addEventListener("click", (event) => {
    const option = event.target instanceof Element ? event.target.closest(".search-suggestion") : null;
    const item = option ? visibleResults[Number(option.getAttribute("data-search-index"))] : undefined;
    if (item) {
      event.preventDefault();
      openSearchResult(item);
    }
  });
  suggestions.addEventListener("mousemove", (event) => {
    const option = event.target instanceof Element ? event.target.closest(".search-suggestion") : null;
    if (option) {
      setActiveSuggestion(Number(option.getAttribute("data-search-index")));
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target instanceof Node && !siteSearchItem.contains(event.target)) {
      closeSuggestions();
    }
  });
}

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

const initializeCardCarousel = (track, previousButton, nextButton, cardSelector, isActive = () => true) => {
  const updateControls = () => {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    previousButton.disabled = !isActive() || track.scrollLeft <= 1;
    nextButton.disabled = !isActive() || track.scrollLeft >= maxScrollLeft - 1;
  };

  const moveCards = (direction) => {
    if (!isActive()) {
      return;
    }

    const cards = Array.from(track.querySelectorAll(cardSelector));
    const trackLeft = track.getBoundingClientRect().left;
    const scrollPadding = cards[0].getBoundingClientRect().left - trackLeft + track.scrollLeft;
    const currentIndex = cards.reduce((closestIndex, card, index) => {
      const closestPosition = cards[closestIndex].getBoundingClientRect().left -
        trackLeft + track.scrollLeft - scrollPadding;
      const cardPosition = card.getBoundingClientRect().left -
        trackLeft + track.scrollLeft - scrollPadding;
      return Math.abs(cardPosition - track.scrollLeft) <
        Math.abs(closestPosition - track.scrollLeft)
        ? index
        : closestIndex;
    }, 0);
    const targetIndex = Math.max(0, Math.min(cards.length - 1, currentIndex + direction));
    const targetPosition = cards[targetIndex].getBoundingClientRect().left -
      trackLeft + track.scrollLeft - scrollPadding;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    track.scrollTo({ left: targetPosition, behavior });
  };

  previousButton.addEventListener("click", () => moveCards(-1));
  nextButton.addEventListener("click", () => moveCards(1));
  track.addEventListener("scroll", updateControls, { passive: true });
  track.addEventListener("keydown", (event) => {
    if (isActive() && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
      event.preventDefault();
      moveCards(event.key === "ArrowLeft" ? -1 : 1);
    }
  });
  window.addEventListener("resize", updateControls);
  window.matchMedia("(max-width: 760px)").addEventListener("change", updateControls);
  updateControls();
};

const macBenefitsTrack = document.querySelector(".mac-benefits-track");
const previousMacBenefitButton = document.querySelector(".mac-benefit-previous");
const nextMacBenefitButton = document.querySelector(".mac-benefit-next");
if (macBenefitsTrack && previousMacBenefitButton && nextMacBenefitButton) {
  initializeCardCarousel(
    macBenefitsTrack,
    previousMacBenefitButton,
    nextMacBenefitButton,
    ".mac-benefit-card",
  );
}

const ipadProductTrack = document.querySelector(".ipad-product-track");
const previousIpadProductButton = document.querySelector(".ipad-carousel-previous");
const nextIpadProductButton = document.querySelector(".ipad-carousel-next");
if (ipadProductTrack && previousIpadProductButton && nextIpadProductButton) {
  initializeCardCarousel(
    ipadProductTrack,
    previousIpadProductButton,
    nextIpadProductButton,
    ".mac-product-card",
  );
}

// Reflective cards: the specular highlight follows the pointer
document.querySelectorAll(".reflective-surface").forEach((card) => {
  if (!(card instanceof HTMLElement)) {
    return;
  }

  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--shine-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--shine-y", `${event.clientY - bounds.top}px`);
  });
  card.addEventListener("pointerleave", () => {
    card.style.removeProperty("--shine-x");
    card.style.removeProperty("--shine-y");
  });
});

const macProductTrack = document.querySelector(".mac-product-grid");
const previousMacProductButton = document.querySelector(".mac-product-previous");
const nextMacProductButton = document.querySelector(".mac-product-next");
if (macProductTrack && previousMacProductButton && nextMacProductButton) {
  const macMobileCarousel = window.matchMedia("(max-width: 760px)");
  initializeCardCarousel(
    macProductTrack,
    previousMacProductButton,
    nextMacProductButton,
    ".mac-product-card",
    () => macMobileCarousel.matches,
  );
}

const macChooserDialog = document.querySelector(".mac-chooser-dialog");
const macChooserForm = document.querySelector(".mac-chooser-form");
const openMacChooserButton = document.querySelector("[data-open-mac-chooser]");
const previousMacStepButton = document.querySelector("[data-previous-mac-step]");
const confirmMacStepButton = document.querySelector("[data-confirm-mac-step]");
const macChooserSteps = Array.from(document.querySelectorAll(".mac-chooser-step"));
const macChooserProgress = document.querySelector(".mac-chooser-progress-bar");
const macChooserStepCount = document.querySelector(".mac-chooser-step-count");
const macChooserResult = document.querySelector("[data-mac-chooser-result]");
const macRecommendationTitle = document.querySelector("[data-mac-recommendation-title]");
const macRecommendationDescription = document.querySelector("[data-mac-recommendation-description]");
const macRecommendationImage = document.querySelector("[data-mac-recommendation-image]");
const macRecommendationLink = document.querySelector("[data-mac-recommendation-link]");

if (
  macChooserDialog instanceof HTMLDialogElement &&
  macChooserForm instanceof HTMLFormElement &&
  openMacChooserButton instanceof HTMLElement &&
  previousMacStepButton instanceof HTMLButtonElement &&
  confirmMacStepButton instanceof HTMLButtonElement &&
  macChooserProgress instanceof HTMLProgressElement &&
  macChooserStepCount instanceof HTMLElement &&
  macChooserSteps.length > 0 &&
  macChooserResult instanceof HTMLElement &&
  macRecommendationTitle instanceof HTMLElement &&
  macRecommendationDescription instanceof HTMLElement &&
  macRecommendationImage instanceof HTMLImageElement &&
  macRecommendationLink instanceof HTMLAnchorElement
) {
  let currentMacStep = 0;
  let showingMacRecommendation = false;

  const showMacStep = (stepIndex) => {
    currentMacStep = stepIndex;
    showingMacRecommendation = false;
    macChooserSteps.forEach((step, index) => {
      step.hidden = index !== currentMacStep;
    });
    macChooserResult.hidden = true;
    const stepCount = macChooserSteps.length;
    const questionNumber = currentMacStep + 1;
    macChooserProgress.max = stepCount;
    macChooserProgress.value = questionNumber;
    macChooserProgress.setAttribute("aria-label", `Question ${questionNumber} of ${stepCount}`);
    macChooserStepCount.textContent = `Question ${questionNumber} of ${stepCount}`;
    previousMacStepButton.hidden = currentMacStep === 0;
  };

  const recommendMac = () => {
    const answers = new FormData(macChooserForm);
    const budget = answers.get("budget");
    const use = answers.get("use");
    const priority = answers.get("essential");

    if (document.body.hasAttribute("data-iphone-page")) {
      const size = answers.get("size");

      if (budget === "1500-plus" && (size === "foldable" || use === "multitask")) {
        return {
          title: "iPhone Duo",
          description: "The largest iPhone display ever, in a thin design that folds open when you need more room.",
          image: "iPhone images/nav_iphone_duo.jpg",
          alt: "iPhone Duo unfolded beside its back with a dual camera",
          href: "#iphone-duo",
        };
      }

      if (budget === "under-700") {
        return {
          title: "iPhone 17e",
          description: "All the essentials with long battery life and a great camera, at a great price.",
          image: "iPhone images/nav_iphone_17e.jpg",
          alt: "iPhone 17e, front and back",
          href: "#iphone-17e",
        };
      }

      if (
        (budget === "1000-1499" || budget === "1500-plus") &&
        (use === "creative" || priority === "camera" || size === "large" || budget === "1500-plus")
      ) {
        return {
          title: "iPhone 18 Pro",
          description: "Pro cameras, a big leap in battery life, and the power to do it all. Only for Pros.",
          image: "iPhone images/nav_iphone_18_pro.jpg",
          alt: "iPhone 18 Pro in burgundy, front and back",
          href: "#iphone-18-pro",
        };
      }

      if (priority === "light" || budget === "1000-1499") {
        return {
          title: "iPhone Air",
          description: "Incredibly thin and light, with serious power inside for everything you do.",
          image: "iPhone images/nav_iphone_air.jpg",
          alt: "iPhone Air, front and back",
          href: "#iphone-air",
        };
      }

      return {
        title: "iPhone 17",
        description: "A brilliant display, a great camera for selfies, and five gorgeous colors.",
        image: "iPhone images/nav_iphone_17.jpg",
        alt: "iPhone 17 in lavender, front and back",
        href: "#iphone-17",
      };
    }

    if (document.body.hasAttribute("data-ipad-page")) {
      if (budget === "under-500") {
        return priority === "portable"
          ? {
              title: "iPad mini",
              description: "A full iPad experience in a compact size that's easy to take anywhere.",
              image: "Ipad images/nav_ipad_mini.png",
              alt: "Two iPad mini models with vivid displays",
              href: "#ipad-mini",
            }
          : {
              title: "iPad",
              description: "A colorful, capable iPad for everyday tasks, school, and entertainment.",
              image: "Ipad images/nav_ipad.png",
              alt: "iPad with a colorful display",
              href: "#ipad",
            };
      }

      if (budget === "800-1199" || budget === "1200-plus") {
        if (use === "professional" || priority === "performance") {
          return {
            title: "iPad Pro",
            description: "The ultimate iPad experience for demanding creative and professional work.",
            image: "Ipad images/nav_ipad_pro.png",
            alt: "iPad Pro models with an edge-to-edge display",
            href: "#ipad-pro",
          };
        }
      }

      if (budget === "500-799" || budget === "800-1199" || budget === "1200-plus") {
        return {
          title: "iPad Air",
          description: "Powerful performance in a thin, light design for school, work, and creativity.",
          image: "Ipad images/nav_ipad_air.png",
          alt: "iPad Air held in one hand",
          href: "#ipad-air",
        };
      }
    }

    if (budget === "under-1000" || (budget === "1000-1500" && use === "everyday")) {
      return {
        title: "MacBook Neo",
        description: "A colorful, capable Mac for everyday tasks, school, and getting started.",
        image: "why mac images/nav_mbn.jpg",
        alt: "MacBook Neo laptops in several colors",
        href: "#macbook-neo",
      };
    }

    if (
      (use === "professional" || priority === "performance") &&
      (budget === "1500-2000" || budget === "over-2000")
    ) {
      return {
        title: "MacBook Pro",
        description: "Powerful performance and a brilliant display for demanding creative and professional work.",
        image: "images/nav_mbp.jpg",
        alt: "MacBook Pro laptops with a dark abstract display",
        href: "#macbook-pro",
      };
    }

    return {
      title: "MacBook Air",
      description: "A great balance of speed, portability, and battery life for school, work, and creative projects.",
      image: "images/nav_mba.jpg",
      alt: "MacBook Air laptops with blue and gold displays",
      href: "#macbook-air",
    };
  };

  const showMacRecommendation = () => {
    const recommendation = recommendMac();
    const matchLabel = document.body.hasAttribute("data-iphone-page")
      ? "Your iPhone match"
      : document.body.hasAttribute("data-ipad-page") ? "Your iPad match" : "Your Mac match";
    currentMacStep = macChooserSteps.length - 1;
    showingMacRecommendation = true;
    macChooserSteps.forEach((step) => {
      step.hidden = true;
    });
    macChooserResult.hidden = false;
    macRecommendationTitle.textContent = recommendation.title;
    macRecommendationDescription.textContent = recommendation.description;
    macRecommendationImage.src = recommendation.image;
    macRecommendationImage.alt = recommendation.alt;
    macRecommendationLink.href = recommendation.href;
    macChooserProgress.max = macChooserSteps.length;
    macChooserProgress.value = macChooserSteps.length;
    macChooserProgress.setAttribute("aria-label", matchLabel);
    macChooserStepCount.textContent = matchLabel;
    previousMacStepButton.hidden = false;
    macRecommendationLink.focus();
  };

  const advanceMacStep = () => {
    const activeStep = macChooserSteps[currentMacStep];
    const input = activeStep.querySelector("select");
    if (!(input instanceof HTMLSelectElement) || !input.reportValidity()) {
      return;
    }

    if (currentMacStep === macChooserSteps.length - 1) {
      showMacRecommendation();
      return;
    }

    showMacStep(currentMacStep + 1);
    macChooserSteps[currentMacStep].querySelector("select")?.focus();
  };

  const openMacChooser = () => {
    macChooserDialog.showModal();
    macChooserSteps[currentMacStep].querySelector("select")?.focus();
  };

  openMacChooserButton.addEventListener("click", openMacChooser);
  openMacChooserButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMacChooser();
    }
  });
  previousMacStepButton.addEventListener("click", () => {
    if (showingMacRecommendation) {
      showMacStep(macChooserSteps.length - 1);
    } else {
      showMacStep(Math.max(currentMacStep - 1, 0));
    }
    macChooserSteps[currentMacStep].querySelector("select")?.focus();
  });
  macChooserForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (showingMacRecommendation) {
      macChooserDialog.close();
      return;
    }

    advanceMacStep();
  });
  macChooserDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      macChooserDialog.close();
    }
  });
  macChooserDialog.addEventListener("click", (event) => {
    if (event.target === macChooserDialog) {
      macChooserDialog.close();
    }
  });
  macChooserDialog.addEventListener("close", () => {
    macChooserForm.reset();
    showMacStep(0);
  });
  macRecommendationLink.addEventListener("click", () => {
    macChooserDialog.close();
  });
  showMacStep(0);
}

// --- Product catalogue (used by the buy dialogs and the shopping bag on every page) ---
// Each option group lists its choices with the price difference from the base price.
const buyOption = (id, label, choices, layout = "grid") => ({
  id,
  label,
  layout,
  choices: choices.map(([name, price = 0]) => ({ name, price })),
});
const buyFinish = (name, color, image) => ({ name, color, image: `buy images/${image}.jpg` });

const macBuyProducts = {
  special: {
    title: "Richard's Special Mac",
    image: "images/C on MacBook.jpeg",
    alt: "Richard's Special Mac, a one-of-a-kind hand-painted MacBook",
    basePrice: 3999,
    monthly: true,
    // Dark, full-frame photo: shown edge to edge instead of on the grey product frame
    fullBleed: true,
    finishes: [],
    options: [
      buyOption("chip", "Chip", [
        ["R1 Pro with 18-core CPU, 24-core GPU"],
        ["R1 Max with 18-core CPU, 40-core GPU", 1000],
      ], "list"),
      buyOption("memory", "Memory", [["24GB"], ["48GB", 400], ["64GB", 600], ["128GB", 1600], ["256GB", 3600]]),
      buyOption("storage", "Storage", [["512GB"], ["1TB", 200], ["2TB", 600], ["4TB", 1200], ["8TB", 2400]]),
      buyOption("display", "Display", [
        ["16-inch Tandem OLED Ultra Retina XDR, standard glass"],
        ["16-inch Tandem OLED Ultra Retina XDR, nano-texture glass", 150],
      ], "list"),
      buyOption("adapter", "Power Adapter", [["140W USB-C Power Adapter"]], "list"),
    ],
  },
  air: {
    title: "MacBook Air",
    image: "images/nav_mba.jpg",
    alt: "MacBook Air",
    basePrice: 1299,
    monthly: true,
    finishes: [
      buyFinish("Sky blue", "#c4d9e0", "macbook-air-skyblue"),
      buyFinish("Silver", "#e5e5e5", "macbook-air-silver"),
      buyFinish("Starlight", "#f2e7d4", "macbook-air-starlight"),
      buyFinish("Midnight", "#30343d", "macbook-air-midnight"),
    ],
    options: [
      buyOption("size", "Size", [["13-inch"], ["15-inch", 200]]),
      buyOption("chip", "Chip", [
        ["M5 with 10-core CPU, 8-core GPU"],
        ["M5 with 10-core CPU, 10-core GPU", 100],
      ], "list"),
      buyOption("memory", "Memory", [["16GB"], ["24GB", 200], ["32GB", 400]]),
      buyOption("storage", "Storage", [["256GB"], ["512GB", 200], ["1TB", 400], ["2TB", 800]]),
      buyOption("adapter", "Power Adapter", [
        ["30W USB-C Power Adapter"],
        ["35W Dual USB-C Port Compact Power Adapter", 20],
        ["70W USB-C Power Adapter", 40],
      ], "list"),
    ],
  },
  pro: {
    title: "MacBook Pro",
    image: "images/nav_mbp.jpg",
    alt: "MacBook Pro",
    basePrice: 1999,
    monthly: true,
    finishes: [
      buyFinish("Space black", "#25272c", "macbook-pro-spaceblack"),
      buyFinish("Silver", "#e5e5e5", "macbook-pro-silver"),
    ],
    options: [
      buyOption("size", "Size", [["14-inch"], ["16-inch", 500]]),
      buyOption("chip", "Chip", [
        ["M5 with 10-core CPU, 10-core GPU"],
        ["M5 Pro with 18-core CPU, 20-core GPU", 400],
        ["M5 Max with 18-core CPU, 32-core GPU", 1200],
        ["M5 Max with 18-core CPU, 40-core GPU", 1500],
      ], "list"),
      buyOption("memory", "Memory", [["16GB"], ["24GB", 200], ["48GB", 600], ["64GB", 1000]]),
      buyOption("storage", "Storage", [["512GB"], ["1TB", 200], ["2TB", 600], ["4TB", 1200]]),
      buyOption("adapter", "Power Adapter", [
        ["70W USB-C Power Adapter"],
        ["96W USB-C Power Adapter", 20],
        ["140W USB-C Power Adapter", 40],
      ], "list"),
    ],
  },
  neo: {
    title: "MacBook Neo",
    image: "why mac images/nav_mbn.jpg",
    alt: "MacBook Neo",
    basePrice: 699,
    monthly: true,
    finishes: [
      buyFinish("Silver", "#e3e4e5", "macbook-neo-silver"),
      buyFinish("Blush", "#f2c3c9", "macbook-neo-blush"),
      buyFinish("Citrus", "#e9df76", "macbook-neo-citrus"),
      buyFinish("Indigo", "#4b5a8a", "macbook-neo-indigo"),
    ],
    options: [
      buyOption("chip", "Chip", [
        ["6-core CPU, 5-core GPU"],
        ["6-core CPU, 6-core GPU", 100],
      ], "list"),
      buyOption("memory", "Memory", [["8GB"], ["16GB", 200]]),
      buyOption("storage", "Storage", [["256GB"], ["512GB", 200], ["1TB", 400]]),
      buyOption("adapter", "Power Adapter", [
        ["20W USB-C Power Adapter"],
        ["30W USB-C Power Adapter", 20],
      ], "list"),
    ],
  },
  ipad: {
    title: "iPad",
    image: "Ipad images/nav_ipad.png",
    alt: "iPad",
    basePrice: 349,
    finishes: [
      buyFinish("Blue", "#9bb7d4", "ipad-blue"),
      buyFinish("Pink", "#edc6c5", "ipad-pink"),
      buyFinish("Silver", "#e5e5e5", "ipad-silver"),
      buyFinish("Yellow", "#efe6a2", "ipad-yellow"),
    ],
    options: [
      buyOption("storage", "Storage", [["128GB"], ["256GB", 100], ["512GB", 300]]),
    ],
  },
  "ipad-air": {
    title: "iPad Air",
    image: "Ipad images/nav_ipad_air.png",
    alt: "iPad Air",
    basePrice: 599,
    finishes: [
      buyFinish("Blue", "#9bb7d4", "ipad-air-blue"),
      buyFinish("Purple", "#a879e8", "ipad-air-purple"),
      buyFinish("Starlight", "#f2e7d4", "ipad-air-starlight"),
      buyFinish("Space gray", "#77777b", "ipad-air-spacegray"),
    ],
    options: [
      buyOption("size", "Size", [["11-inch"], ["13-inch", 200]]),
      buyOption("storage", "Storage", [["128GB"], ["256GB", 100], ["512GB", 300], ["1TB", 500]]),
    ],
  },
  "ipad-mini": {
    title: "iPad mini",
    image: "Ipad images/nav_ipad_mini.png",
    alt: "iPad mini",
    basePrice: 499,
    finishes: [
      buyFinish("Blue", "#9bb7d4", "ipad-mini-blue"),
      buyFinish("Purple", "#a879e8", "ipad-mini-purple"),
      buyFinish("Starlight", "#f2e7d4", "ipad-mini-starlight"),
      buyFinish("Space gray", "#77777b", "ipad-mini-spacegray"),
    ],
    options: [
      buyOption("storage", "Storage", [["128GB"], ["256GB", 100], ["512GB", 300]]),
    ],
  },
  "ipad-pro": {
    title: "iPad Pro",
    image: "Ipad images/nav_ipad_pro.png",
    alt: "iPad Pro",
    basePrice: 999,
    finishes: [
      buyFinish("Space black", "#25272c", "ipad-pro-spaceblack"),
      buyFinish("Silver", "#e5e5e5", "ipad-pro-silver"),
    ],
    options: [
      buyOption("size", "Size", [["11-inch"], ["13-inch", 300]]),
      buyOption("storage", "Storage", [["256GB"], ["512GB", 200], ["1TB", 600], ["2TB", 1000]]),
    ],
  },
  "apple-pencil": {
    title: "Apple Pencil",
    image: "why ipad images/Apple Pencile.png",
    alt: "Apple Pencil with an iPad displaying colorful notes",
    basePrice: 129,
    finishes: [],
    options: [],
  },
  "magic-keyboard": {
    title: "Magic Keyboard",
    image: "why ipad images/Magic keyboard.png",
    alt: "Magic Keyboard connected to an iPad",
    basePrice: 349,
    finishes: [],
    options: [],
  },
  "iphone-duo": {
    title: "iPhone Duo",
    image: "iPhone images/nav_iphone_duo.jpg",
    alt: "iPhone Duo",
    basePrice: 1999,
    finishes: [
      buyFinish("Night sky", "#2b2f3a", "iphone-duo-night-sky"),
      buyFinish("Star white", "#efede6", "iphone-duo-star-white"),
    ],
    options: [
      buyOption("storage", "Storage", [["256GB"], ["512GB", 200], ["1TB", 400]]),
    ],
  },
  "iphone-18-pro": {
    title: "iPhone 18 Pro",
    image: "iPhone images/nav_iphone_18_pro.jpg",
    alt: "iPhone 18 Pro",
    basePrice: 1099,
    finishes: [
      buyFinish("Burgundy", "#6b2a37", "iphone-18-pro-burgundy"),
      buyFinish("Glacier", "#c9dbe6", "iphone-18-pro-glacier"),
      buyFinish("Silver", "#e5e5e5", "iphone-18-pro-silver"),
      buyFinish("Black", "#25272c", "iphone-18-pro-black"),
    ],
    options: [
      buyOption("size", "Size", [["6.3-inch"], ["6.9-inch", 100]]),
      buyOption("storage", "Storage", [["256GB"], ["512GB", 200], ["1TB", 400], ["2TB", 800]]),
    ],
  },
  "iphone-air": {
    title: "iPhone Air",
    image: "iPhone images/nav_iphone_air.jpg",
    alt: "iPhone Air",
    basePrice: 999,
    finishes: [
      buyFinish("Sky blue", "#c4d9e0", "iphone-air-skyblue"),
      buyFinish("Light gold", "#eadcc0", "iphone-air-lightgold"),
      buyFinish("Cloud white", "#f4f4f0", "iphone-air-cloudwhite"),
      buyFinish("Space black", "#25272c", "iphone-air-spaceblack"),
    ],
    options: [
      buyOption("storage", "Storage", [["256GB"], ["512GB", 200], ["1TB", 400]]),
    ],
  },
  "iphone-17": {
    title: "iPhone 17",
    image: "iPhone images/nav_iphone_17.jpg",
    alt: "iPhone 17",
    basePrice: 799,
    finishes: [
      buyFinish("Lavender", "#d8c8ea", "iphone-17-lavender"),
      buyFinish("Mist blue", "#a9bccd", "iphone-17-mistblue"),
      buyFinish("Sage", "#b4bea2", "iphone-17-sage"),
      buyFinish("White", "#f5f5f5", "iphone-17-white"),
      buyFinish("Black", "#2f3033", "iphone-17-black"),
    ],
    options: [
      buyOption("storage", "Storage", [["256GB"], ["512GB", 200]]),
    ],
  },
  "iphone-17e": {
    title: "iPhone 17e",
    image: "iPhone images/nav_iphone_17e.jpg",
    alt: "iPhone 17e",
    basePrice: 599,
    finishes: [
      buyFinish("Soft pink", "#f2d4d6", "iphone-17e-softpink"),
      buyFinish("White", "#f5f5f5", "iphone-17e-white"),
      buyFinish("Black", "#2f3033", "iphone-17e-black"),
    ],
    options: [
      buyOption("storage", "Storage", [["256GB"], ["512GB", 200]]),
    ],
  },
  "magsafe-charger": {
    title: "MagSafe Charger",
    image: "why iphone images/MagSafe.jpg",
    alt: "iPhone models with a MagSafe charger, wallet, and case",
    basePrice: 49,
    finishes: [],
    options: [],
  },
  airpods: {
    title: "AirPods",
    image: "why iphone images/AirPods product.jpg",
    alt: "AirPods in their open charging case",
    basePrice: 179,
    finishes: [],
    options: [],
  },
};

const formatBuyPrice = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
const formatBuyPriceDelta = (amount) => (amount > 0 ? `+ ${formatBuyPrice(amount)}` : "");
const getBuyConfigPrice = (product, options) => product.options.reduce((total, group) => {
  const choice = group.choices.find((item) => item.name === options[group.id]);
  return total + (choice ? choice.price : 0);
}, product.basePrice);
const getBuyFinishImage = (product, finishName) =>
  product.finishes.find((finish) => finish.name === finishName)?.image ?? product.image;
const getBuyImageAlt = (product, finishName) => (finishName ? `${product.title} in ${finishName}` : product.alt);
const getBuyDefaultOptions = (product) =>
  Object.fromEntries(product.options.map((group) => [group.id, group.choices[0].name]));

const macBuyDialog = document.querySelector(".mac-buy-dialog");
const macBuyButtons = Array.from(document.querySelectorAll("[data-buy-mac]"));
const macBuyTitle = document.querySelector("[data-mac-buy-title]");
const macBuyPrice = document.querySelector("[data-mac-buy-price]");
const macBuyImage = document.querySelector("[data-mac-buy-image]");
const macBuyFinishFieldset = document.querySelector("[data-mac-buy-finishes]");
const macBuyOptionGroups = document.querySelector("[data-mac-buy-option-groups]");
const macBuyTotal = document.querySelector("[data-mac-buy-total]");
const macBuyFinishOptions = document.querySelector("[data-mac-buy-finish-options]");
const macBuySelectedFinish = document.querySelector("[data-mac-buy-selected-finish]");
const macBuyForm = document.querySelector("[data-mac-buy-form]");
const macBuyContent = document.querySelector("[data-mac-buy-content]");
const macBuyConfirmation = document.querySelector("[data-mac-buy-confirmation]");
const macBuySummary = document.querySelector("[data-mac-buy-summary]");

// --- Shopping bag: works on any page that includes the bag dialog markup ---
let addMacToBag;
const macBagItems = [];
const macBagStorageKey = "richard-llc-shopping-bag";
const macBagDialog = document.querySelector("[data-mac-bag-dialog]");
const openMacBagButton = document.querySelector("[data-open-mac-bag]");
const macBagCount = document.querySelector("[data-mac-bag-count]");
const macBagItemsContainer = document.querySelector("[data-mac-bag-items]");
const macBagEmptyMessage = document.querySelector("[data-mac-bag-empty]");
const macBagSummary = document.querySelector("[data-mac-bag-summary]");
const macBagSubtotal = document.querySelector("[data-mac-bag-subtotal]");
const macBagCheckoutButton = document.querySelector("[data-mac-bag-checkout]");
const macBagCheckoutMessage = document.querySelector("[data-mac-bag-checkout-message]");
const macBagStorageMessage = document.querySelector("[data-mac-bag-storage-message]");
const viewMacBagButton = document.querySelector("[data-view-mac-bag]");

if (
  macBagDialog instanceof HTMLDialogElement &&
  openMacBagButton instanceof HTMLButtonElement &&
  macBagCount instanceof HTMLElement &&
  macBagItemsContainer instanceof HTMLElement &&
  macBagEmptyMessage instanceof HTMLElement &&
  macBagStorageMessage instanceof HTMLElement &&
  macBagSummary instanceof HTMLElement &&
  macBagSubtotal instanceof HTMLElement &&
  macBagCheckoutButton instanceof HTMLButtonElement &&
  macBagCheckoutMessage instanceof HTMLElement
) {
  let macBagStorageError = "";

  // Fills in any missing or outdated choice (e.g. bags saved before specs existed) with the default.
  const normalizeBagOptions = (product, savedOptions, legacySize) => {
    const options = getBuyDefaultOptions(product);
    product.options.forEach((group) => {
      const saved = savedOptions?.[group.id] ?? (group.id === "size" ? legacySize : undefined);
      if (group.choices.some((choice) => choice.name === saved)) {
        options[group.id] = saved;
      }
    });
    return options;
  };

  const parseMacBag = (serializedBag) => {
    const parsedBag = JSON.parse(serializedBag);
    if (!Array.isArray(parsedBag)) {
      throw new Error("The saved shopping bag has an invalid format.");
    }

    return parsedBag.map((item) => {
      if (!item || typeof item !== "object" || typeof item.productKey !== "string") {
        throw new Error("The saved shopping bag contains an invalid item.");
      }
      const product = macBuyProducts[item.productKey];
      if (
        !product ||
        typeof item.finish !== "string" ||
        (item.options !== undefined && (typeof item.options !== "object" || item.options === null)) ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1
      ) {
        throw new Error("The saved shopping bag contains an invalid item.");
      }

      const finish = product.finishes.some((option) => option.name === item.finish)
        ? item.finish
        : product.finishes[0]?.name ?? "";

      return {
        productKey: item.productKey,
        product,
        finish,
        options: normalizeBagOptions(product, item.options, item.size),
        quantity: item.quantity,
      };
    });
  };

  const loadMacBag = () => {
    try {
      const serializedBag = window.localStorage.getItem(macBagStorageKey);
      macBagItems.splice(0, macBagItems.length, ...(serializedBag ? parseMacBag(serializedBag) : []));
      macBagStorageError = "";
    } catch (error) {
      macBagItems.splice(0);
      macBagStorageError = error instanceof Error
        ? `Your saved bag couldn't be loaded: ${error.message}`
        : "Your saved bag couldn't be loaded.";
    }
  };

  const saveMacBag = () => {
    try {
      window.localStorage.setItem(macBagStorageKey, JSON.stringify(macBagItems.map((item) => ({
        productKey: item.productKey,
        finish: item.finish,
        options: item.options,
        quantity: item.quantity,
      }))));
      macBagStorageError = "";
    } catch (error) {
      macBagStorageError = error instanceof Error
        ? `Your bag couldn't be saved on this device: ${error.message}`
        : "Your bag couldn't be saved on this device.";
    }
  };

  const createBagQuantityButton = (label, action, disabled = false) => {
    const button = document.createElement("button");
    button.className = "mac-bag-quantity-button";
    button.type = "button";
    button.textContent = label;
    button.setAttribute("aria-label", action === "increase" ? "Increase quantity" : "Decrease quantity");
    button.dataset.bagAction = action;
    button.disabled = disabled;
    return button;
  };

  const renderMacBag = () => {
    const totalQuantity = macBagItems.reduce((total, item) => total + item.quantity, 0);
    openMacBagButton.setAttribute(
      "aria-label",
      `Shopping bag, ${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`,
    );
    macBagCount.textContent = String(totalQuantity);
    macBagCount.hidden = totalQuantity === 0;
    macBagItemsContainer.replaceChildren();
    macBagEmptyMessage.hidden = totalQuantity !== 0;
    macBagSummary.hidden = totalQuantity === 0;
    macBagCheckoutMessage.hidden = true;
    macBagStorageMessage.textContent = macBagStorageError;
    macBagStorageMessage.hidden = !macBagStorageError;

    let subtotal = 0;
    macBagItems.forEach((item, index) => {
      const unitPrice = getBuyConfigPrice(item.product, item.options);
      const article = document.createElement("article");
      article.className = "mac-bag-item";

      const image = document.createElement("img");
      image.className = "mac-bag-item-image";
      image.classList.toggle("is-full-bleed", Boolean(item.product.fullBleed));
      image.src = getBuyFinishImage(item.product, item.finish);
      image.alt = getBuyImageAlt(item.product, item.finish);

      const details = document.createElement("div");
      details.className = "mac-bag-item-details";
      const title = document.createElement("h3");
      title.textContent = item.product.title;
      details.append(title);

      const specLines = [
        ...(item.finish ? [`Finish: ${item.finish}`] : []),
        ...item.product.options.map((group) => `${group.label}: ${item.options[group.id]}`),
      ];
      specLines.forEach((line) => {
        const spec = document.createElement("p");
        spec.textContent = line;
        details.append(spec);
      });

      const price = document.createElement("p");
      price.className = "mac-bag-item-price";
      price.textContent = `${formatBuyPrice(unitPrice)} each`;
      details.append(price);

      const controls = document.createElement("div");
      controls.className = "mac-bag-item-controls";
      const quantity = document.createElement("span");
      quantity.className = "mac-bag-quantity";
      quantity.textContent = String(item.quantity);
      quantity.setAttribute("aria-label", "Quantity");
      const remove = document.createElement("button");
      remove.className = "mac-bag-remove";
      remove.type = "button";
      remove.textContent = "Remove";
      remove.setAttribute("aria-label", `Remove ${item.product.title} from bag`);
      remove.dataset.bagAction = "remove";
      remove.dataset.bagIndex = String(index);
      const decrease = createBagQuantityButton("−", "decrease", item.quantity === 1);
      decrease.dataset.bagIndex = String(index);
      const increase = createBagQuantityButton("+", "increase");
      increase.dataset.bagIndex = String(index);
      controls.append(decrease, quantity, increase, remove);
      details.append(controls);

      const itemSubtotal = document.createElement("p");
      itemSubtotal.className = "mac-bag-item-price";
      itemSubtotal.textContent = formatBuyPrice(unitPrice * item.quantity);

      article.append(image, details, itemSubtotal);
      macBagItemsContainer.append(article);
      subtotal += unitPrice * item.quantity;
    });

    macBagSubtotal.textContent = formatBuyPrice(subtotal);
  };

  addMacToBag = (productKey, product, finish, options) => {
    const sameOptions = (a, b) => product.options.every((group) => a[group.id] === b[group.id]);
    const existingItem = macBagItems.find((item) =>
      item.productKey === productKey && item.finish === finish && sameOptions(item.options, options)
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      macBagItems.push({ productKey, product, finish, options, quantity: 1 });
    }

    saveMacBag();
    renderMacBag();
  };

  const openMacBag = () => {
    renderMacBag();
    macBagDialog.showModal();
    macBagDialog.querySelector("[data-close-mac-bag]")?.focus();
  };

  openMacBagButton.addEventListener("click", openMacBag);
  if (viewMacBagButton instanceof HTMLButtonElement) {
    viewMacBagButton.addEventListener("click", () => {
      if (macBuyDialog instanceof HTMLDialogElement) {
        macBuyDialog.close();
      }
      openMacBag();
    });
  }
  macBagDialog.querySelectorAll("[data-close-mac-bag]").forEach((button) => {
    button.addEventListener("click", () => macBagDialog.close());
  });
  macBagDialog.addEventListener("click", (event) => {
    if (event.target === macBagDialog) {
      macBagDialog.close();
    }
  });
  macBagItemsContainer.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const button = event.target.closest("button[data-bag-action]");
    const index = Number(button?.dataset.bagIndex);
    const item = macBagItems[index];
    if (!button || !item) {
      return;
    }

    switch (button.dataset.bagAction) {
      case "increase":
        item.quantity += 1;
        break;
      case "decrease":
        item.quantity = Math.max(1, item.quantity - 1);
        break;
      case "remove":
        macBagItems.splice(index, 1);
        break;
    }

    saveMacBag();
    renderMacBag();
  });
  window.addEventListener("storage", (event) => {
    if (event.key === macBagStorageKey || event.key === null) {
      loadMacBag();
      renderMacBag();
    }
  });
  macBagCheckoutButton.addEventListener("click", () => {
    macBagCheckoutMessage.textContent = "Checkout is a demo and isn't connected to a payment service.";
    macBagCheckoutMessage.hidden = false;
  });
  loadMacBag();
  renderMacBag();
  if (window.location.hash === "#shopping-bag") {
    openMacBag();
  }
}

// --- Buy dialogs (product pages) ---
if (
  macBuyDialog instanceof HTMLDialogElement &&
  macBuyButtons.length > 0 &&
  macBuyTitle instanceof HTMLElement &&
  macBuyPrice instanceof HTMLElement &&
  macBuyImage instanceof HTMLImageElement &&
  macBuyFinishFieldset instanceof HTMLFieldSetElement &&
  macBuyOptionGroups instanceof HTMLElement &&
  macBuyTotal instanceof HTMLElement &&
  macBuyFinishOptions instanceof HTMLElement &&
  macBuySelectedFinish instanceof HTMLElement &&
  macBuyForm instanceof HTMLFormElement &&
  macBuyContent instanceof HTMLElement &&
  macBuyConfirmation instanceof HTMLElement &&
  macBuySummary instanceof HTMLElement
) {
  let activeMacBuyProduct;
  let activeMacBuyProductKey;

  const createMacBuyRadio = (name, value, checked) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = value;
    input.required = true;
    input.checked = checked;
    return input;
  };

  const createMacBuyFinishChoice = (finish, selected) => {
    const label = document.createElement("label");
    label.className = "mac-buy-finish-choice";
    const swatch = document.createElement("span");
    swatch.className = "mac-buy-swatch";
    swatch.style.backgroundColor = finish.color;
    const text = document.createElement("span");
    text.textContent = finish.name;
    label.append(createMacBuyRadio("mac-buy-finish", finish.name, selected), swatch, text);
    return label;
  };

  const createMacBuyOptionGroup = (group) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "mac-buy-options";
    const legend = document.createElement("legend");
    legend.textContent = group.label;
    const choices = document.createElement("div");
    choices.className = `mac-buy-choice-list mac-buy-choice-list-${group.layout}`;

    group.choices.forEach((choice, index) => {
      const label = document.createElement("label");
      label.className = "mac-buy-spec-choice";
      const name = document.createElement("span");
      name.className = "mac-buy-spec-name";
      name.textContent = choice.name;
      const price = document.createElement("span");
      price.className = "mac-buy-spec-price";
      price.textContent = formatBuyPriceDelta(choice.price);
      label.append(createMacBuyRadio(`mac-buy-option-${group.id}`, choice.name, index === 0), name, price);
      choices.append(label);
    });

    fieldset.append(legend, choices);
    return fieldset;
  };

  const readMacBuyConfig = () => {
    const formData = new FormData(macBuyForm);
    const finish = formData.get("mac-buy-finish");
    const options = Object.fromEntries(activeMacBuyProduct.options.map((group) => {
      const value = formData.get(`mac-buy-option-${group.id}`);
      return [group.id, typeof value === "string" ? value : group.choices[0].name];
    }));
    return { finish: typeof finish === "string" ? finish : "", options };
  };

  const formatMacBuyPrice = (product, amount) =>
    product.monthly
      ? `${formatBuyPrice(amount)} or ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount / 12)}/mo. for 12 mo.*`
      : formatBuyPrice(amount);

  // Keeps the photo, selected-color label, and prices in sync with the current choices.
  const updateMacBuySelection = () => {
    if (!activeMacBuyProduct) {
      return;
    }

    const { finish, options } = readMacBuyConfig();
    const total = getBuyConfigPrice(activeMacBuyProduct, options);
    macBuyImage.src = getBuyFinishImage(activeMacBuyProduct, finish);
    macBuyImage.alt = getBuyImageAlt(activeMacBuyProduct, finish);
    macBuySelectedFinish.textContent = finish;
    macBuyPrice.textContent = formatMacBuyPrice(activeMacBuyProduct, total);
    macBuyTotal.textContent = `Total: ${formatBuyPrice(total)}`;
  };

  const openMacBuyDialog = (productKey) => {
    const product = macBuyProducts[productKey];
    if (!product) {
      return;
    }

    activeMacBuyProduct = product;
    activeMacBuyProductKey = productKey;
    macBuyTitle.textContent = product.title;
    macBuyImage.parentElement?.classList.toggle("is-full-bleed", Boolean(product.fullBleed));
    macBuyFinishFieldset.hidden = product.finishes.length === 0;
    macBuyFinishOptions.replaceChildren(
      ...product.finishes.map((finish, index) => createMacBuyFinishChoice(finish, index === 0)),
    );
    macBuyOptionGroups.replaceChildren(...product.options.map(createMacBuyOptionGroup));
    updateMacBuySelection();
    macBuyContent.hidden = false;
    macBuyConfirmation.hidden = true;
    macBuyDialog.showModal();
    macBuyDialog.scrollTop = 0;
    macBuyForm.querySelector("input")?.focus();
  };

  macBuyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openMacBuyDialog(button.dataset.buyMac);
    });
  });

  document.querySelectorAll("[data-buy-mac-card]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a, button")) {
        return;
      }

      openMacBuyDialog(card.dataset.buyMacCard);
    });
    card.addEventListener("keydown", (event) => {
      if (event.target === card && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        openMacBuyDialog(card.dataset.buyMacCard);
      }
    });
  });

  macBuyForm.addEventListener("change", updateMacBuySelection);

  macBuyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!activeMacBuyProduct || !macBuyForm.reportValidity()) {
      return;
    }

    const { finish, options } = readMacBuyConfig();
    const configuration = [finish, ...activeMacBuyProduct.options.map((group) => options[group.id])]
      .filter(Boolean)
      .join(", ");
    const total = getBuyConfigPrice(activeMacBuyProduct, options);
    macBuySummary.textContent = `${activeMacBuyProduct.title}${configuration ? ` (${configuration})` : ""} — ${formatBuyPrice(total)}`;
    if (!activeMacBuyProductKey ||
      (activeMacBuyProduct.finishes.length > 0 && !finish) ||
      typeof addMacToBag !== "function") {
      return;
    }
    addMacToBag(activeMacBuyProductKey, activeMacBuyProduct, finish, options);
    macBuyContent.hidden = true;
    macBuyConfirmation.hidden = false;
    macBuyConfirmation.querySelector("[data-view-mac-bag]")?.focus();
  });

  macBuyDialog.querySelectorAll("[data-close-mac-buy]").forEach((button) => {
    button.addEventListener("click", () => {
      macBuyDialog.close();
    });
  });

  macBuyDialog.addEventListener("click", (event) => {
    if (event.target === macBuyDialog) {
      macBuyDialog.close();
    }
  });

  macBuyDialog.addEventListener("close", () => {
    macBuyForm.reset();
    activeMacBuyProduct = undefined;
    activeMacBuyProductKey = undefined;
  });
}
