var GA_MEASUREMENT_ID = "G-KJ4ZLNWE2B";

(function () {
  var CONSENT_KEY = "cookie_consent";

  function getConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {
      // Private browsing or storage unavailable
    }
  }

  function loadGA() {
    if (document.getElementById("gtag-script")) return;

    var script = document.createElement("script");
    script.id = "gtag-script";
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
  }

  function createBanner() {
    var banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.className =
      "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-secondary-200 shadow-lg transform translate-y-full transition-transform duration-300";

    banner.innerHTML =
      '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">' +
      '<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">' +
      '<p class="text-sm text-secondary-700">' +
      "This site uses cookies for analytics to understand how visitors interact with it. " +
      "No personal data is shared with third parties." +
      "</p>" +
      '<div class="flex gap-3 shrink-0">' +
      '<button id="cookie-decline" class="bg-secondary-100 hover:bg-secondary-200 text-secondary-800 font-medium py-2 px-4 rounded-lg transition-all duration-300 border border-secondary-200 text-sm">Decline</button>' +
      '<button id="cookie-accept" class="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-lg text-sm">Accept</button>' +
      "</div>" +
      "</div>" +
      "</div>";

    document.body.appendChild(banner);

    // Slide up after a frame
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        banner.classList.remove("translate-y-full");
      });
    });

    document.getElementById("cookie-accept").addEventListener("click", function () {
      setConsent("accepted");
      loadGA();
      removeBanner();
    });

    document.getElementById("cookie-decline").addEventListener("click", function () {
      setConsent("declined");
      removeBanner();
    });
  }

  function removeBanner() {
    var banner = document.getElementById("cookie-banner");
    if (banner) {
      banner.classList.add("translate-y-full");
      setTimeout(function () {
        banner.remove();
      }, 300);
    }
  }

  // Cookie settings link handler
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "cookie-settings-link") {
      e.preventDefault();
      setConsent("");
      try {
        localStorage.removeItem(CONSENT_KEY);
      } catch (e) {
        // Ignore
      }
      createBanner();
    }
  });

  // Init
  var consent = getConsent();
  if (consent === "accepted") {
    loadGA();
  } else if (!consent) {
    createBanner();
  }
})();
