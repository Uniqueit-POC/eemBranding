var plexify = function () {
  "use strict";

  const isMobileSidebar = () => window.matchMedia("(max-width: 1279px)").matches;

  const refreshOpenSubmenuHeights = (root) => {
    if (!root) return;
    root.querySelectorAll(".sub-menu.sub-menu-open").forEach((menu) => {
      menu.style.setProperty("--sub-h", menu.scrollHeight + "px");
    });
  };

  const closeSubmenuBranch = (subMenu) => {
    if (!subMenu) return;
    subMenu.classList.remove("sub-menu-open");
    subMenu.style.removeProperty("--sub-h");
    subMenu.querySelectorAll("a.dz-open").forEach((openLink) => {
      openLink.classList.remove("dz-open");
    });
    // Also reset any chevron toggle buttons
    const parentLi = subMenu.parentElement;
    if (parentLi) {
      const toggleBtn = parentLi.querySelector(":scope > .sub-menu-toggle");
      if (toggleBtn) toggleBtn.classList.remove("dz-open");
    }
    subMenu.querySelectorAll(".sub-menu.sub-menu-open").forEach((nested) => {
      closeSubmenuBranch(nested);
    });
  };

  const closeAllMobileSubmenus = (root) => {
    if (!root) return;
    root.querySelectorAll("a.dz-open").forEach((openLink) => {
      openLink.classList.remove("dz-open");
    });
    root.querySelectorAll(".sub-menu.sub-menu-open").forEach((menu) => {
      closeSubmenuBranch(menu);
    });
  };

  const toggleMobileSubmenu = (link, subMenu) => {
    const isOpen = subMenu.classList.contains("sub-menu-open");
    const parentUl = link.parentElement?.parentElement;

    if (parentUl) {
      parentUl.querySelectorAll(":scope > li > a").forEach((siblingLink) => {
        if (siblingLink === link) return;
        siblingLink.classList.remove("dz-open");
        const siblingMenu = siblingLink.nextElementSibling;
        if (siblingMenu?.classList.contains("sub-menu")) {
          closeSubmenuBranch(siblingMenu);
        }
      });
    }

    if (isOpen) {
      link.classList.remove("dz-open");
      closeSubmenuBranch(subMenu);
    } else {
      link.classList.add("dz-open");
      subMenu.classList.add("sub-menu-open");
      subMenu.style.setProperty("--sub-h", subMenu.scrollHeight + "px");
    }

    requestAnimationFrame(() => refreshOpenSubmenuHeights(link.closest(".full-sidenav")));
  };

  const removeMobileSidebarChrome = (fullSidenav) => {
    if (!fullSidenav) return;
    fullSidenav.querySelector(".sidenav-close")?.remove();
    fullSidenav.querySelector(".sidenav-footer")?.remove();
    delete fullSidenav.dataset.sidenavEnhanced;
  };

  const injectMobileSidebarChrome = () => {
    const fullSidenav = document.querySelector(".full-sidenav");
    if (!fullSidenav) return;

    if (!isMobileSidebar()) {
      removeMobileSidebarChrome(fullSidenav);
      return;
    }

    if (fullSidenav.dataset.sidenavEnhanced === "1") return;
    fullSidenav.dataset.sidenavEnhanced = "1";

    // ── Inject chevron toggle buttons for real-href links that have sub-menus ──
    // These are links like <a href="services.html"> that sit next to a <ul class="sub-menu">
    fullSidenav.querySelectorAll("a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      // Skip void links — they already toggle via click
      if (href === "" || href === "#" || href.startsWith("javascript")) return;
      // Skip if already has a toggle button injected
      if (link.nextElementSibling && link.nextElementSibling.classList.contains("sub-menu-toggle")) return;

      const subMenu = link.nextElementSibling;
      if (!subMenu || (!subMenu.classList.contains("sub-menu") && !subMenu.classList.contains("mega-menu"))) return;

      // Inject a chevron button between the link and the sub-menu
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sub-menu-toggle";
      btn.setAttribute("aria-label", "Toggle submenu");
      btn.innerHTML = '<i class="fa fa-angle-down" aria-hidden="true"></i>';
      link.parentElement.insertBefore(btn, subMenu);
    });

    if (!fullSidenav.querySelector(".sidenav-close")) {
      const closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.className = "sidenav-close menu-close";
      closeBtn.setAttribute("aria-label", "Close menu");
      closeBtn.innerHTML = "&times;";
      fullSidenav.insertBefore(closeBtn, fullSidenav.firstChild);
    }

    fullSidenav.querySelectorAll(":scope > .sidenav-contact").forEach((el) => {
      if (!el.closest(".sidenav-footer")) el.remove();
    });

    if (!fullSidenav.querySelector(".sidenav-footer")) {
      const footer = document.createElement("div");
      footer.className = "sidenav-footer";
      footer.innerHTML =
        '<a href="contact-us.html" class="sidenav-contact-btn"><span>Contact Us</span></a>' +
        '<div class="sidenav-contact" aria-label="Contact information">' +
        '<p class="sidenav-contact__title">Get In Touch</p>' +
        '<a href="tel:+919081813238" class="sidenav-contact__item"><i class="fa fa-phone" aria-hidden="true"></i><span>+91 90818 13238</span></a>' +
        '<a href="tel:+919913535550" class="sidenav-contact__item"><i class="fa fa-phone" aria-hidden="true"></i><span>+91 99135 35550</span></a>' +
        '<a href="mailto:info@eembranding.com" class="sidenav-contact__item"><i class="fa fa-envelope" aria-hidden="true"></i><span>info@eembranding.com</span></a>' +
        '<a href="mailto:eembranding@gmail.com" class="sidenav-contact__item"><i class="fa fa-envelope" aria-hidden="true"></i><span>eembranding@gmail.com</span></a>' +
        '<div class="sidenav-contact__social">' +
        '<a href="https://www.instagram.com/eembranding/#" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="lab la-instagram"></i></a>' +
        '<a href="https://www.facebook.com/eembranding" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="lab la-facebook-f"></i></a>' +
        '<a href="https://www.linkedin.com/company/eem-branding/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="lab la-linkedin-in"></i></a>' +
        '<a href="http://in.pinterest.com/eembranding/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"><i class="lab la-pinterest"></i></a>' +
        "</div></div>";
      fullSidenav.appendChild(footer);
    }
  };

  let menuScrollY = 0;

  const lockBodyForMenu = () => {
    menuScrollY = window.scrollY || window.pageYOffset || 0;
    document.body.style.top = `-${menuScrollY}px`;
    document.body.classList.add("menu-btn-open");
  };

  const unlockBodyForMenu = () => {
    document.body.classList.remove("menu-btn-open");
    document.body.style.top = "";
    window.scrollTo(0, menuScrollY);
  };

  const handleSidebarMenu = () => {
    const menuBtn = document.querySelector(".menu-btn");
    const fullSidenav = document.querySelector(".full-sidenav");
    const mainBar = document.querySelector(".main-bar");
    const menuClose = document.querySelector(".menu-close");

    injectMobileSidebarChrome();

    const setMenuOpen = (open) => {
      if (menuBtn) menuBtn.classList.toggle("open", open);
      if (fullSidenav) fullSidenav.classList.toggle("show", open);
      if (mainBar) mainBar.classList.toggle("show", open);

      if (open && isMobileSidebar()) {
        lockBodyForMenu();
        requestAnimationFrame(() => {
          if (fullSidenav) fullSidenav.scrollTop = 0;
        });
      } else {
        unlockBodyForMenu();
        closeAllMobileSubmenus(fullSidenav);
      }
    };

    const onMenuBtnClick = function () {
      setMenuOpen(!this.classList.contains("open"));
    };

    const onMenuCloseClick = function () {
      setMenuOpen(false);
    };

    const onFullSidenavClick = function (e) {
      if (!isMobileSidebar()) return;

      // ── Case 1: click on an injected chevron toggle button ──
      const chevronBtn = e.target.closest(".sub-menu-toggle");
      if (chevronBtn && fullSidenav.contains(chevronBtn)) {
        e.preventDefault();
        e.stopPropagation();
        // The toggle button sits right before the sub-menu ul
        const subMenu = chevronBtn.nextElementSibling;
        const parentLink = chevronBtn.previousElementSibling;
        if (subMenu && (subMenu.classList.contains("sub-menu") || subMenu.classList.contains("mega-menu"))) {
          const isOpen = subMenu.classList.contains("sub-menu-open");
          toggleMobileSubmenu(parentLink || chevronBtn, subMenu);
          // Sync dz-open on the button itself for CSS chevron rotation
          chevronBtn.classList.toggle("dz-open", !isOpen);
        }
        return;
      }

      const link = e.target.closest("a");
      if (!link || !fullSidenav.contains(link)) return;
      if (link.classList.contains("sidenav-contact-btn")) return;

      const subMenu = link.nextElementSibling;
      if (
        !subMenu ||
        (!subMenu.classList.contains("sub-menu") &&
          !subMenu.classList.contains("mega-menu"))
      ) {
        return;
      }

      // ── Case 2: link is javascript:void(0) — toggle only, no navigation ──
      const href = link.getAttribute("href") || "";
      if (href === "" || href === "#" || href.startsWith("javascript")) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileSubmenu(link, subMenu);
        return;
      }

      // ── Case 3: link has a real href (e.g. services.html) ──
      // Let the click navigate normally — do NOT intercept.
      // The chevron button (injected below) handles dropdown toggling.
    };

    menuBtn?.addEventListener("click", onMenuBtnClick);
    document.querySelectorAll(".menu-close, .sidenav-close").forEach((btn) => {
      btn.addEventListener("click", onMenuCloseClick);
    });
    fullSidenav?.addEventListener("click", onFullSidenavClick, true);

    return function removeSidebarMenuListeners() {
      menuBtn?.removeEventListener("click", onMenuBtnClick);
      document.querySelectorAll(".menu-close, .sidenav-close").forEach((btn) => {
        btn.removeEventListener("click", onMenuCloseClick);
      });
      fullSidenav?.removeEventListener("click", onFullSidenavClick, true);
    };
  };

  const handleShopSidebar = () => {
    const shopSidebar = document.querySelector(".shop-sidebar");
    if (!shopSidebar) return;

    document.addEventListener("click", (e) => {
      const target = e.target;

      if (target.closest(".sidebar-open")) {
        shopSidebar.style.left = "0";
      }

      if (target.closest(".sidebar-close")) {
        shopSidebar.style.left = "-320px";
      }
    });
  };

  const handleWowAnimation = () => {
    if (document.querySelectorAll(".wow").length > 0) {
      const wow = new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 50,
        mobile: false,
      });
      wow.init();
    }
  };

  const handleAccordion = (container = document) => {
	  const accordionContainers = container.querySelectorAll(".myAccordion");

	  accordionContainers.forEach((accordion) => {
		if (accordion.dataset.bound === "true") return;
		accordion.dataset.bound = "true";

		accordion.addEventListener("click", function (e) {
		  const header = e.target.closest(".accordion-header");
		  if (!header || !accordion.contains(header)) return;

		  const item = header.parentElement;
		  const content = item.querySelector(".accordion-content");
		  const arrow = header.querySelector(".arrow");
		  const isOpen = header.classList.contains("open");

		  accordion.querySelectorAll(".accordion-header").forEach((h) => {
			if (h !== header) {
			  h.classList.remove("open");
			  h.querySelector(".arrow")?.classList.remove("active");
			  const c = h.parentElement.querySelector(".accordion-content");
			  if (c) c.style.maxHeight = null;
			}
		  });

		  if (!isOpen) {
			header.classList.add("open");
			content.style.maxHeight = content.scrollHeight + "px";
			arrow?.classList.add("active");
		  } else {
			header.classList.remove("open");
			content.style.maxHeight = null;
			arrow?.classList.remove("active");
		  }
		});
	  });

	  container.querySelectorAll(".accordion-header.open").forEach((header) => {
		const content = header.parentElement.querySelector(".accordion-content");
		const arrow = header.querySelector(".arrow");
		if (content) {
		  content.style.maxHeight = content.scrollHeight + "px";
		  arrow?.classList.add("active");
		}
	  });
	};

  const handleTextChar = () => {
    const wordRotateElements = document.querySelectorAll(".word-rotate");

    wordRotateElements.forEach((element) => {
      const text = element.textContent.trim();
      const chars = text.split("");
      const step = 360 / chars.length;
      const rotateBox = element.closest(".word-rotate-box");

      if (!rotateBox) return;

      rotateBox.querySelectorAll(".text-char").forEach(span => span.remove());

      chars.forEach((char, i) => {
        const span = document.createElement("span");
        span.className = "text-char";
        span.style.setProperty("--char-rotate", `${i * step}deg`);
        span.textContent = char;
        rotateBox.appendChild(span);
      });

      element.setAttribute("aria-hidden", "true");
      element.style.display = "none";
    });
  };

  const handlePriceSlider = () => {
    const setupSlider = (sliderId, minValueId, maxValueId) => {
      const slider = document.getElementById(sliderId);
      if (!slider) return;

      const formatForSlider = {
        from: (formattedValue) => Number(formattedValue),
        to: (numericValue) => Math.round(numericValue),
      };

      noUiSlider.create(slider, {
        start: [40, 346],
        connect: true,
        format: formatForSlider,
        tooltips: [wNumb({ decimals: 1 }), true],
        range: { min: 0, max: 400 },
      });

      const formatValues = [
        document.getElementById(minValueId),
        document.getElementById(maxValueId),
      ];

      slider.noUiSlider.on("update", (values) => {
        formatValues[0].innerHTML = "Min Price: $" + values[0];
        formatValues[1].innerHTML = "Max Price: $" + values[1];
      });
    };

    setupSlider(
      "slider-tooltips",
      "slider-margin-value-min",
      "slider-margin-value-max"
    );
    setupSlider(
      "slider-tooltips2",
      "slider-margin-value-min2",
      "slider-margin-value-max2"
    );
  };

  const handleColorFilter = () => {
    const colorsInput = document.querySelectorAll(
      ".color-filter .form-check-input"
    );

    colorsInput.forEach((item) => {
      const color = item.value;
      const formCheck = item.closest(".form-check");
      if (formCheck) {
        const span = formCheck.querySelector("span");
        if (span) {
          span.style.backgroundColor = color;
        }
      }
    });

  };

  const handleTabs = () => {
	  const tabContainers = document.querySelectorAll(".custom-tab");

	  tabContainers.forEach((container) => {
		const titles = container.querySelectorAll(".tab-title");
		const contents = container.querySelectorAll(".tab-content");

		titles[0]?.classList.add("active");
		contents[0]?.classList.add("active");
		handleAccordion(contents[0]);

		container.addEventListener("click", (e) => {
		  const clicked = e.target.closest(".tab-title");
		  if (!clicked || !container.contains(clicked)) return;

		  titles.forEach((t, i) => {
			const isActive = t === clicked;
			t.classList.toggle("active", isActive);
			contents[i].classList.toggle("active", isActive);

			if (isActive) {
			  handleAccordion(contents[i]);
			}
		  });
		});
	  });
	};

  const handleServiceCard = function () {
    const serviceCards = document.querySelectorAll(".service-card");
    serviceCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        serviceCards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
      });
    });
  };

  const handleCounterJS = function () {
    const counters = document.querySelectorAll(".value");
    const speed = 200;

    counters.forEach((counter) => {
      const animate = () => {
        const value = +counter.getAttribute("data-akhi");
        const data = +counter.innerText;

        const time = value / speed;
        if (data < value) {
          counter.innerText = Math.ceil(data + time);
          setTimeout(animate, 1);
        } else {
          counter.innerText = value;
        }
      };

      animate();
    });
  };

  const handleVedioPopupJS = function () {
    const buttons = document.querySelectorAll("button[data-type]");
    const dialog = document.getElementById("videoDialog");
    const container = document.getElementById("videoContainer");
    const closeBtn = document.getElementById("closeBtn");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const type = button.getAttribute("data-type");
        const src = button.getAttribute("data-src");
        openVideo(type, src);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeVideo);
    }

    function openVideo(type, src) {
      let videoHTML = "";

      if (type === "youtube" || type === "vimeo") {
        videoHTML = `<iframe src="${src}?autoplay=1" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;
      } else if (type === "mp4") {
        videoHTML = `<video controls autoplay><source src="${src}" type="video/mp4">Your browser does not support the video tag.</video>`;
      }

      container.innerHTML = videoHTML;
      dialog.style.display = "flex";
    }

    function closeVideo() {
      container.innerHTML = "";
      dialog.style.display = "none";
    }
  };

  // const handleSupport = () => {
  //   const script = document.createElement("script");
  //   script.id = "DZScript";
  //   script.src = "https://dzassets.s3.amazonaws.com/w3-global-2.0.js?token=W-b6a2811d6ab9b0aaf35f3d17ef168bd4";
  //   document.body.appendChild(script);
  // };

  const handleLightgallery = () => {
    const ids = [
      "lightgallery",
      "lightgallery2",
      "lightgallery3",
      "lightgallery4",
      "lightgallery5",
    ];

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        lightGallery(element, {
          plugins: [lgThumbnail, lgZoom],
          selector: ".lg-item",
          thumbnail: true,
          exThumbImage: "data-src",
        });
      }
    });
  };

  const handleTouchSpin = () => {
    function incrementValue(e) {
      e.preventDefault();
      const button = e.target.closest("[data-field]");
      const fieldName = button.getAttribute("data-field");

      const parent = button.closest("div") || button.closest("td");
      const input = parent.querySelector(`input[name="${fieldName}"]`);

      let currentVal = parseInt(input.value, 10);
      input.value = !isNaN(currentVal) ? currentVal + 1 : 0;
    }

    function decrementValue(e) {
      e.preventDefault();
      const button = e.target.closest("[data-field]");
      const fieldName = button.getAttribute("data-field");

      const parent = button.closest("div") || button.closest("td");
      const input = parent.querySelector(`input[name="${fieldName}"]`);

      let currentVal = parseInt(input.value, 10);
      input.value = !isNaN(currentVal) && currentVal > 0 ? currentVal - 1 : 0;
    }

    document.querySelectorAll(".input-group").forEach((group) => {
      group.addEventListener("click", function (e) {
        const target = e.target.closest(".button-plus, .button-minus");
        if (!target) return;

        if (target.classList.contains("button-plus")) {
          incrementValue(e);
        } else if (target.classList.contains("button-minus")) {
          decrementValue(e);
        }
      });
    });
  };

  const handleShowPass = () => {
    document.querySelectorAll(".show-pass").forEach((toggleBtn) => {
      toggleBtn.addEventListener("click", function () {
        const input = this.parentElement.querySelector(".dz-password");

        if (!input) return;

        if (input.type === "password") {
          input.type = "text";
          this.classList.add("active");
        } else {
          input.type = "password";
          this.classList.remove("active");
        }
      });
    });
  };

  const handleRemoveTag = () => {
    document.addEventListener("click", function (e) {
      const removeBtn = e.target.closest(".remove-tag");
      if (removeBtn) {
        const tag = removeBtn.closest(".tag");
        if (tag) {
          tag.style.transition = "opacity 0.3s ease, transform 0.3s ease";
          tag.style.opacity = "0";
          tag.style.transform = "scale(0.95)";

          setTimeout(() => tag.remove(), 300);
        }
      }
    });
  };

  const handleLoadmore = () => {
    const loadMoreBtn = document.querySelector(".dz-load-more");

    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const dzLoadMoreUrl = this.getAttribute("rel");

      const loadingIcon = document.createElement("i");
      loadingIcon.className = "fa fa-refresh";
      loadMoreBtn.appendChild(loadingIcon);

      fetch(dzLoadMoreUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/html",
        },
      })
        .then((response) => response.text())
        .then((data) => {
          const container = document.querySelector(".loadmore-content");
          if (container) {
            container.insertAdjacentHTML("beforeend", data);
          }
          loadMoreBtn.removeChild(loadingIcon);
        })
        .catch(() => {
          if (loadingIcon.parentNode === loadMoreBtn) {
            loadMoreBtn.removeChild(loadingIcon);
          }
        });
    });
  };

  const handleButtonAnimations = () => {
    const animatedButtons = new WeakSet();

    document.querySelectorAll(".btn").forEach((button) => {
      const textElement = button.querySelector(".pxl-button-text");
      if (!textElement) return;

      const originalText = textElement.textContent.trim();
      textElement.dataset.originalText = originalText;

      button.addEventListener("mouseenter", () => {
        if (animatedButtons.has(button)) return;
        animatedButtons.add(button);

        const wrappedText = [...originalText]
          .map((char) => `<span class="letter">${char === " " ? "&nbsp;" : char}</span>`)
          .join("");

        textElement.innerHTML = wrappedText;

        const letters = textElement.querySelectorAll(".letter");
        gsap.fromTo(
          letters,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power3.out",
          }
        );
      });

      button.addEventListener("mouseleave", () => {
        textElement.innerHTML = textElement.dataset.originalText;
        animatedButtons.delete(button);
      });
    });

    document.querySelectorAll(".btn-third").forEach((button) => {
      const textElement = button.querySelector(".pxl-button-text");
      if (!textElement) return;

      const originalText = textElement.textContent.trim();
      const wrappedText = [...originalText]
        .map((char) => `<span class="letter">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");

      textElement.innerHTML = wrappedText;

      const letters = textElement.querySelectorAll(".letter");
      letters.forEach((letter, index) => {
        letter.style.transitionDelay = `${index * 0.045}s`;
      });
    });
  };

  const handleHeaderOverlay = () => {
    const overlayNavbar = document.querySelector(".overlay-navbar");
    if (!overlayNavbar) return;

    const space = window.innerWidth < 1440 ? 22 : 12;
    const clipValue = overlayNavbar.offsetWidth / 2 + space;

    overlayNavbar.style.clipPath = `inset(0px 0px 0px ${clipValue}px)`;
  };

  const handleSetCurrentYear = () => {
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let elements = document.getElementsByClassName("current-year");

    for (const element of elements) {
      element.innerHTML = currentYear;
    }
  };

  const handleCustomSelects = () => {
    document.querySelectorAll(".dynamic-select").forEach((selectElement) => {
      createCustomSelectFromSelect(selectElement);
    });
  };

  const createCustomSelectFromSelect = (selectElement) => {
    const selectId = selectElement.id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const customSelectDiv = document.createElement("div");
    customSelectDiv.id = `custom-${selectId}`;
    customSelectDiv.className = "custom-select";

    const selectedDiv = document.createElement("div");
    selectedDiv.className = "select-selected";
    selectedDiv.textContent = (selectElement.querySelector("option[selected]") || selectElement.options[0]).textContent;

    const labelText = selectElement.parentElement?.dataset?.label || "";
    if (labelText) {
      const label = document.createElement("span");
      label.textContent = labelText;
      selectedDiv.appendChild(label);
    }

    customSelectDiv.appendChild(selectedDiv);

    const itemsDiv = document.createElement("div");
    itemsDiv.className = "select-items select-hide";
    customSelectDiv.appendChild(itemsDiv);

    Array.from(selectElement.options).forEach((option) => {
      const customOptionDiv = document.createElement("div");
      customOptionDiv.className = "select-item";
      customOptionDiv.setAttribute("data-value", option.value);
      customOptionDiv.textContent = option.textContent;
      if (option.selected) customOptionDiv.classList.add("active");

      customOptionDiv.addEventListener("click", function () {
        selectedDiv.childNodes[0].textContent = this.textContent;
        selectElement.value = this.getAttribute("data-value");
        selectElement.dispatchEvent(new Event("change"));
        selectElement.dispatchEvent(new Event("click"));

        itemsDiv.classList.add("select-hide");
        selectedDiv.classList.remove("select-active");

        itemsDiv.querySelectorAll(".select-item").forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
      });

      itemsDiv.appendChild(customOptionDiv);
    });

    selectElement.style.display = "none";
    selectElement.parentNode.insertBefore(customSelectDiv, selectElement.nextSibling);

    selectedDiv.addEventListener("click", function (e) {
      e.stopPropagation();
      itemsDiv.classList.toggle("select-hide");
      selectedDiv.classList.toggle("select-active");
    });

    document.addEventListener("click", function (e) {
      if (!customSelectDiv.contains(e.target)) {
        itemsDiv.classList.add("select-hide");
        selectedDiv.classList.remove("select-active");
      }
    });
  };

  const handleHoverActive = () => {

    const container = document.querySelectorAll(".hover-wrapper");
    if (!container) return;
    container.forEach((wrapper) => {
      wrapper.querySelector(".hover-active");

        wrapper.addEventListener("mouseover", (e) => {
          const target = e.target.closest(".hover-active");
          if (!target || !wrapper.contains(target)) return;

          wrapper.querySelectorAll(".hover-active.active").forEach((el) => {
            el.classList.remove("active");
          });

          target.classList.add("active");
        });
    });
  };

  const handleStarRating = () => {
    const starRatingElements = document.querySelectorAll(".star-rating-old");
    if (starRatingElements.length > 0) {
      new StarRating(".star-rating-old");
    }
  };

  // ── Client Logo Marquee Slider ──
  const handleClientLogoSwiper = () => {
    const wrapper = document.getElementById('scrollWrapper');
    const inner   = document.getElementById('marqueeInner');
    if (!wrapper || !inner) return;

    const SPEED_PX_SEC = 80;
    let currentX   = 0;
    let lastTime   = null;
    let paused     = false;
    let isDragging = false;
    let dragStartX = 0;
    let dragBaseX  = 0;
    let halfWidth  = 0;

    function measureHalf() {
      const firstSet = inner.querySelector('.flex.flex-shrink-0');
      halfWidth = firstSet ? firstSet.offsetWidth : inner.scrollWidth / 2;
    }

    function tick(ts) {
      if (!lastTime) lastTime = ts;
      const dt = ts - lastTime;
      lastTime = ts;
      if (!paused && !isDragging) {
        currentX -= SPEED_PX_SEC * (dt / 1000);
      }
      if (!halfWidth) measureHalf();
      if (halfWidth > 0) {
        if (currentX <= -halfWidth) currentX += halfWidth;
        if (currentX > 0)           currentX -= halfWidth;
      }
      inner.style.transform = `translateX(${currentX}px)`;
      inner.style.animation  = 'none';
      requestAnimationFrame(tick);
    }

    inner.style.animation = 'none';
    requestAnimationFrame(tick);

    wrapper.addEventListener('mouseenter', () => { paused = true;  lastTime = null; });
    wrapper.addEventListener('mouseleave', () => { paused = false; isDragging = false; lastTime = null; wrapper.style.cursor = 'grab'; });
    wrapper.addEventListener('mousedown',  (e) => { isDragging = true; dragStartX = e.clientX; dragBaseX = currentX; wrapper.style.cursor = 'grabbing'; e.preventDefault(); });
    window.addEventListener('mouseup',     ()  => { if (!isDragging) return; isDragging = false; lastTime = null; wrapper.style.cursor = 'grab'; });
    window.addEventListener('mousemove',   (e) => { if (!isDragging) return; currentX = dragBaseX + (e.clientX - dragStartX); });
    wrapper.addEventListener('wheel',      (e) => { e.preventDefault(); currentX -= e.deltaY * 0.6; }, { passive: false });
    wrapper.style.cursor = 'grab';
  };

  const handleFormRecaptcha = function () {
    const form = document.querySelector(".dz-form.footer-form");
    if (!form) return;

    const requiredInputs = form.querySelectorAll(
      'input[required]:not([type="hidden"]), textarea[required]'
    );
    const recaptchaContainer = form.querySelector(".input-recaptcha");

    if (!recaptchaContainer) return;

    recaptchaContainer.style.display = "none";

    function checkAllFieldsFilled() {
      let allFilled = true;

      requiredInputs.forEach((input) => {
        if (
          input.offsetParent !== null &&
          (!input.value || input.value.trim() === "")
        ) {
          allFilled = false;
        }
      });

      recaptchaContainer.style.display = allFilled ? "block" : "none";
      return allFilled;
    }

    requiredInputs.forEach((input) => {
      input.addEventListener("input", checkAllFieldsFilled);
      input.addEventListener("change", checkAllFieldsFilled);
    });

    form.addEventListener("submit", (e) => {
      if (!checkAllFieldsFilled()) {
        e.preventDefault(); // Stop the form from submitting
      }
    });

    checkAllFieldsFilled();
  };

  const handleAnimation = function () {
    window.addEventListener("load", () => {
      document.querySelectorAll(".image-zoom").forEach((el) => {
        el.classList.remove("scale-200");
      });
    });
  };

  return {
    init: function () {
      handleSidebarMenu();
      handleWowAnimation();
      handleAccordion();
      handleTextChar();
      handlePriceSlider();
      handleColorFilter();
      handleTabs();
      handleServiceCard();
      handleCounterJS();
      handleVedioPopupJS();
      handleLightgallery();
      handleTouchSpin();
      handleShowPass();
      handleRemoveTag();
      handleLoadmore();
      handleShopSidebar();
      setTimeout(() => {
        handleHeaderOverlay();
      }, 500);
      handleButtonAnimations();
      handleSetCurrentYear();
      handleCustomSelects();
      handleHoverActive();
      handleStarRating();
      handleClientLogoSwiper();
      handleFormRecaptcha();
      handleAnimation();
    },
    resize: function () {
      handleHeaderOverlay();
      injectMobileSidebarChrome();
    },
  };
};
window.addEventListener("load", function () {
  if (typeof plexify !== "undefined" && typeof plexify.load === "function") {
    plexify.load();
  }

  setTimeout(function () {
    const loadingArea = document.getElementById("loading-area");
    if (loadingArea) {
      loadingArea.remove();
    }
  }, 100);
});

window.addEventListener("scroll", function () {
  if (typeof plexify !== "undefined" && typeof plexify.scroll === "function") {
    plexify.scroll();
  }
});

window.addEventListener("resize", function () {
  plexify().resize();
});

document.addEventListener("DOMContentLoaded", function () {
  plexify().init();
});

// ============================================================
// FAQ Custom Accordion (.qa-accordion)
// Safe: only runs if .qa-accordion exists on the page
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  var accordions = document.querySelectorAll(".qa-accordion");
  if (!accordions.length) return;

  accordions.forEach(function (accordion) {
    var items = accordion.querySelectorAll(".qa-acc__item");

    items.forEach(function (item) {
      var trigger = item.querySelector(".qa-acc__trigger");
      var panel   = item.querySelector(".qa-acc__panel");
      if (!trigger || !panel) return;

      // Open default-active items on load
      if (item.classList.contains("qa-acc__item--active")) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }

      trigger.addEventListener("click", function () {
        var isActive = item.classList.contains("qa-acc__item--active");

        // Close all siblings
        items.forEach(function (sibling) {
          if (sibling !== item && sibling.classList.contains("qa-acc__item--active")) {
            sibling.classList.remove("qa-acc__item--active");
            var sibTrigger = sibling.querySelector(".qa-acc__trigger");
            var sibPanel   = sibling.querySelector(".qa-acc__panel");
            if (sibTrigger) sibTrigger.setAttribute("aria-expanded", "false");
            if (sibPanel)   sibPanel.style.maxHeight = null;
          }
        });

        // Toggle current
        if (isActive) {
          item.classList.remove("qa-acc__item--active");
          trigger.setAttribute("aria-expanded", "false");
          panel.style.maxHeight = null;
        } else {
          item.classList.add("qa-acc__item--active");
          trigger.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  });
});

// ============================================================
// EARS / EYES / MOUTH — GSAP ScrollTrigger Stack
// Safe: only runs if #eem-spacer exists (about-us page)
// ============================================================
(function () {
  function initEEM() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      return setTimeout(initEEM, 100);
    }
    gsap.registerPlugin(ScrollTrigger);

    var spacer = document.getElementById("eem-spacer");
    var sticky = document.getElementById("eem-sticky");
    var bar = document.getElementById("eem-bar");
    var c0 = document.getElementById("ec0");
    var c1 = document.getElementById("ec1");
    var c2 = document.getElementById("ec2");
    if (!spacer || !c0) return;

    var cards = [c0, c1, c2];
    var scroller = document.getElementById("smooth-wrapper") || window;

    function clearCardInlineStyles() {
      cards.forEach(function (c) {
        gsap.set(c, { clearProps: "transform,opacity,zIndex,scale,y" });
        c.style.transition = "";
        c.style.willChange = "";
      });
      if (bar) {
        bar.style.width = "";
        bar.style.display = "";
      }
    }

    function setStackedMode() {
      spacer.classList.add("eem--stacked");
      spacer.classList.remove("eem--pinned");
      clearCardInlineStyles();
      if (bar) bar.style.display = "none";
    }

    function setPinnedMode() {
      spacer.classList.remove("eem--stacked");
      spacer.classList.add("eem--pinned");

      cards.forEach(function (c) {
        c.style.transition = "none";
        c.style.willChange = "transform, opacity";
      });

      if (bar) bar.style.display = "";

      gsap.set(c0, { y: "0%", scale: 1, opacity: 1, zIndex: 3 });
      gsap.set(c1, { y: "100%", opacity: 0, zIndex: 4 });
      gsap.set(c2, { y: "100%", opacity: 0, zIndex: 5 });

      var tl = gsap.timeline({ defaults: { ease: "none" } });

      tl.to(c1, { y: "0%", opacity: 1, duration: 1 }, 0).to(
        c0,
        { y: "-4%", scale: 0.97, opacity: 0.15, duration: 1 },
        0
      );

      tl.to(c2, { y: "0%", opacity: 1, duration: 1 }, 1).to(
        c1,
        { y: "-4%", scale: 0.97, opacity: 0.15, duration: 1 },
        1
      );

      tl.fromTo(bar, { width: "0%" }, { width: "100%", duration: 2, ease: "none" }, 0);

      ScrollTrigger.create({
        trigger: spacer,
        start: "top top",
        end: "bottom bottom",
        pin: sticky,
        pinSpacing: false,
        scrub: 1.2,
        scroller: scroller,
        animation: tl,
        anticipatePin: 1,
        onUpdate: function (self) {
          if (bar) bar.style.width = self.progress * 100 + "%";
        },
      });
    }

    ScrollTrigger.matchMedia({
      "(max-width: 768px)": function () {
        setStackedMode();
        setTimeout(function () {
          ScrollTrigger.refresh();
        }, 100);
        return function () {
          spacer.classList.remove("eem--stacked", "eem--pinned");
          clearCardInlineStyles();
        };
      },
      "(min-width: 769px)": function () {
        setPinnedMode();
        setTimeout(function () {
          ScrollTrigger.refresh();
        }, 300);
        return function () {
          spacer.classList.remove("eem--stacked", "eem--pinned");
          clearCardInlineStyles();
        };
      },
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(initEEM, 200);
    });
  } else {
    setTimeout(initEEM, 200);
  }
})();

// ============================================================
// Home Page — Hero Banner Slider
// Safe: only runs if #hero-content exists (index page)
// ============================================================
(function () {
  var contentBox = document.getElementById("hero-content");
  if (!contentBox) return; // Not on home page — exit silently

  var INTRO_DURATION = 2000;
  var SLIDE_DURATION = 3000;
  var TRANSITION_MS  = 400;

  var introEl  = document.getElementById("hero-intro");
  var titlesEl = document.getElementById("hero-titles");
  var subEl    = document.getElementById("dynamic-sub");
  var mainEl   = document.getElementById("dynamic-main");
  var emojiEl  = document.getElementById("dynamic-emoji");
  var videoEl  = document.getElementById("main-hero-video");
  var gifEl    = document.getElementById("main-hero-gif");
  var buttons  = Array.from(document.querySelectorAll(".nav-btn"));

  var currentIndex = 0;
  var autoTimer    = null;
  var isAuto       = true;

  document.documentElement.style.setProperty("--slide-duration", (SLIDE_DURATION / 1000) + "s");

  function activateSlide(index, manual) {
    var btn = buttons[index];
    if (!btn) return;

    // Animate title out → in
    if (titlesEl) {
      titlesEl.classList.add("slide-out");
      setTimeout(function () {
        if (subEl)  subEl.textContent  = btn.getAttribute("data-sub");
        if (mainEl) mainEl.textContent = btn.getAttribute("data-main");
        if (emojiEl) {
          emojiEl.textContent = btn.getAttribute("data-emoji") || "";
          emojiEl.classList.remove("emoji-pop");
          void emojiEl.offsetWidth;
          emojiEl.classList.add("emoji-pop");
        }
        titlesEl.classList.remove("slide-out");
        titlesEl.classList.add("slide-in");
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { titlesEl.classList.add("active"); });
        });
        setTimeout(function () { titlesEl.classList.remove("slide-in", "active"); }, TRANSITION_MS + 50);
      }, TRANSITION_MS);
    }

    // Swap media (GIF or video)
    var newSrc = btn.getAttribute("data-video");
    if (newSrc) {
      var isGif = newSrc.toLowerCase().endsWith(".gif");
      if (isGif) {
        if (videoEl) videoEl.hidden = true;
        if (gifEl)   { gifEl.hidden = false; gifEl.src = newSrc; }
      } else {
        if (gifEl)   gifEl.hidden = true;
        if (videoEl) {
          videoEl.hidden = false;
          var source = videoEl.querySelector("source");
          if (source && source.src.split("/").pop() !== newSrc.split("/").pop()) {
            source.src = newSrc;
            videoEl.load();
            videoEl.play().catch(function () {});
          }
        }
      }
    }

    // Update button states
    buttons.forEach(function (b) { b.classList.remove("active", "manual-active"); });
    btn.classList.add(manual ? "manual-active" : "active");
    currentIndex = index;
  }

  function scheduleNext() {
    clearTimeout(autoTimer);
    autoTimer = setTimeout(function () {
      if (!isAuto) return;
      activateSlide((currentIndex + 1) % buttons.length, false);
      scheduleNext();
    }, SLIDE_DURATION);
  }

  // Manual button clicks
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      isAuto = false;
      clearTimeout(autoTimer);
      activateSlide(parseInt(btn.getAttribute("data-index"), 10), true);
    });
  });

  function shouldPlayIntroSplash() {
    return window.matchMedia("(min-width: 1280px)").matches;
  }

  function startHeroSequence() {
    contentBox.classList.add("visible");
    if (emojiEl && buttons[0]) {
      emojiEl.textContent = buttons[0].getAttribute("data-emoji") || "";
      emojiEl.classList.remove("emoji-pop");
      void emojiEl.offsetWidth;
      emojiEl.classList.add("emoji-pop");
    }
    activateSlide(0, false);
    scheduleNext();
  }

  if (shouldPlayIntroSplash() && introEl) {
    setTimeout(function () {
      introEl.classList.add("fade-out");
      startHeroSequence();
      setTimeout(function () { introEl.classList.add("hidden"); }, 850);
    }, INTRO_DURATION);
  } else {
    if (introEl) introEl.classList.add("hidden");
    startHeroSequence();
  }
})();

// ============================================================
// Portfolio Page — Filter Tabs
// Safe: only runs if .tab elements exist
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  var tabs = document.querySelectorAll(".tab");
  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");
    });
  });
});

// ============================================================
// Blog Details Page — Reading Progress Bar
// Safe: only runs if #reading-progress exists
// ============================================================
(function () {
  var progressBar = document.getElementById("reading-progress");
  if (!progressBar) return;

  window.addEventListener("scroll", function () {
    var doc          = document.documentElement;
    var scrollTop    = doc.scrollTop || document.body.scrollTop;
    var scrollHeight = doc.scrollHeight - doc.clientHeight;
    if (scrollHeight <= 0) return;
    progressBar.style.width = ((scrollTop / scrollHeight) * 100) + "%";
  }, { passive: true });
})();


// ============================================================
// Drag-to-scroll for tab nav and tab content grids
// Works on both desktop (mouse) and mobile (touch)
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

  function addDragScroll(el) {
    if (!el) return;

    var isDown     = false;
    var startX     = 0;
    var startScroll = 0;
    var moved      = false;

    el.addEventListener("mousedown", function (e) {
      // Only left mouse button
      if (e.button !== 0) return;
      isDown      = true;
      moved       = false;
      startX      = e.clientX;
      startScroll = el.scrollLeft;
      el.style.cursor     = "grabbing";
      el.style.userSelect = "none";
      e.preventDefault();
    });

    window.addEventListener("mousemove", function (e) {
      if (!isDown) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      el.scrollLeft = startScroll - dx;
    });

    window.addEventListener("mouseup", function () {
      if (!isDown) return;
      isDown = false;
      el.style.cursor     = "grab";
      el.style.userSelect = "";
    });

    // Block click on buttons/links if we dragged
    el.addEventListener("click", function (e) {
      if (moved) {
        e.preventDefault();
        e.stopImmediatePropagation();
        moved = false;
      }
    }, true);
  }

  // Tab nav lists
  document.querySelectorAll(".custom-tab > ul").forEach(addDragScroll);

  // Tab content grids
  document.querySelectorAll(".tab-content .grid").forEach(addDragScroll);
});

(function () {
  const sliderTrack = document.getElementById('sliderTrack');
  if (!sliderTrack) return;

  const pageTag = document.querySelector('.intro-tag');
  if (!pageTag) return;

  const pageCategory = pageTag.textContent.trim().toLowerCase();
  let category = null;
  if (pageCategory.includes('packaging')) category = 'packaging';
  else if (pageCategory.includes('social media')) category = 'social media';
  else if (pageCategory.includes('catalogue')) category = 'catalogue';
  else if (pageCategory.includes('3d') || pageCategory.includes('rendering')) category = '3d';
  if (!category) return;

  sliderTrack.querySelectorAll('.sl-card').forEach(card => {
    const sub = card.querySelector('.sl-card-sub');
    if (!sub) return;
    const cardText = sub.textContent.trim().toLowerCase();
    const isPackaging = cardText.includes('packaging');
    const isSocial = cardText.includes('social media');
    const isCatalogue = cardText.includes('catalogue');
    const is3D = cardText.includes('3d') || cardText.includes('rendering');

    let show = false;
    if (category === 'packaging' && isPackaging) show = true;
    if (category === 'social media' && isSocial) show = true;
    if (category === 'catalogue' && isCatalogue) show = true;
    if (category === '3d' && is3D) show = true;

    if (!show) card.remove();
  });

  const visibleCards = sliderTrack.querySelectorAll('.sl-card').length;
  if (!visibleCards) {
    const section = sliderTrack.closest('.slider-sec');
    if (section) section.style.display = 'none';
    return;
  }

  const header = document.querySelector('.slider-sec .sec-header h1');
  if (header) {
    if (category === 'packaging') header.textContent = 'More Packaging Work';
    if (category === 'social media') header.textContent = 'More Social Media Work';
    if (category === 'catalogue') header.textContent = 'More Catalogue Work';
    if (category === '3d') header.textContent = 'More 3D Work';
  }
})();
