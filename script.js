const CONFIG = {
  checkoutUrl: "https://acesso.allanfulcher.com/checkout/caixa-5-minutos",
  metaPixelId: "905104172223662",
  supportPhone: "(54) 99326-4627",
  sellerName: "Allan Fulcher Tecnologia"
};

const isPlaceholder = (value) => !value || value.startsWith("[");

function buildCheckoutUrl() {
  if (isPlaceholder(CONFIG.checkoutUrl)) return "#oferta";
  try {
    const target = new URL(CONFIG.checkoutUrl);
    const source = new URLSearchParams(window.location.search);
    source.forEach((value, key) => {
      const normalizedKey = key.toLowerCase();
      if (normalizedKey.startsWith("utm_") || normalizedKey === "fbclid") {
        target.searchParams.set(key, value);
      }
    });
    return target.toString();
  } catch {
    return CONFIG.checkoutUrl;
  }
}

function installMetaPixel() {
  if (!/^\d{8,20}$/.test(CONFIG.metaPixelId)) return;
  /* Meta Pixel bootstrap, only enabled after a numeric pixel ID is configured. */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  window.fbq("init", CONFIG.metaPixelId);
  window.fbq("track", "PageView");
}

function track(eventName, payload) {
  if (typeof window.fbq === "function") window.fbq("track", eventName, payload);
}

function configurePage() {
  const checkoutUrl = buildCheckoutUrl();
  const buttons = document.querySelectorAll(".js-cta");
  buttons.forEach((button) => {
    button.href = checkoutUrl;
    button.addEventListener("click", (event) => {
      track("InitiateCheckout", {
        content_name: "Caixa dos 5 Minutos",
        content_ids: ["caixa-5-minutos"],
        content_type: "product",
        cta_section: button.dataset.section,
        num_items: 1,
        value: 27,
        currency: "BRL"
      });
      if (isPlaceholder(CONFIG.checkoutUrl)) {
        event.preventDefault();
        document.querySelector("#oferta")?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  document.querySelectorAll('[data-config="seller"]').forEach((node) => { node.textContent = CONFIG.sellerName; });
  document.querySelectorAll('[data-config="support"]').forEach((node) => { node.textContent = CONFIG.supportPhone; });

  const offer = document.querySelector("#oferta");
  if (offer && "IntersectionObserver" in window) {
    let fired = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || fired) return;
      fired = true;
      track("ViewContent", {
        content_name: "Caixa dos 5 Minutos",
        content_ids: ["caixa-5-minutos"],
        content_type: "product",
        value: 27,
        currency: "BRL"
      });
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(offer);
  }

  const sticky = document.querySelector(".sticky-cta");
  const stickyLink = sticky?.querySelector("a");
  const updateSticky = () => {
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const visible = pageHeight > 0 && window.scrollY / pageHeight >= 0.4;
    sticky?.classList.toggle("show", visible);
    sticky?.setAttribute("aria-hidden", String(!visible));
    if (stickyLink) stickyLink.tabIndex = visible ? 0 : -1;
  };
  window.addEventListener("scroll", updateSticky, { passive: true });
  updateSticky();
}

installMetaPixel();
document.addEventListener("DOMContentLoaded", configurePage);
