

/* ==========================================================================
   AL-MUNQITH Landing Page Scripts — Heavy/Pro Edition
   File: assets/js/main.js
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     Header Scroll Effect
     ========================================================= */
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* =========================================================
     Mobile Drawer Navigation
     ========================================================= */
  const menuBtn = document.querySelector(".menu-btn");
  const drawer = document.querySelector(".drawer");
  const drawerPanel = drawer?.querySelector(".panel");

  if (menuBtn && drawer && drawerPanel) {
    menuBtn.addEventListener("click", () => {
      drawer.classList.add("open");
      document.body.style.overflow = "hidden";
    });

    drawer.addEventListener("click", (e) => {
      if (e.target === drawer) closeDrawer();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* =========================================================
     Back To Top Button
     ========================================================= */
  const toTop = document.querySelector(".to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      toTop.classList.add("show");
    } else {
      toTop.classList.remove("show");
    }
  });

  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* =========================================================
     Reveal on Scroll
     ========================================================= */
  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(el => revealObserver.observe(el));

  /* =========================================================
     Toast Notification System
     ========================================================= */
  const toast = document.getElementById("toast");
  const toastTitle = document.getElementById("toastTitle");
  const toastMsg = document.getElementById("toastMsg");
  const toastHint = document.getElementById("toastHint");
  const toastClose = document.getElementById("toastClose");

  function showToast(title, msg, hint = "سنرد خلال 24 ساعة.") {
    toastTitle.textContent = title;
    toastMsg.textContent = msg;
    toastHint.textContent = hint;
    toast.classList.add("show");

    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 4500);
  }

  toastClose?.addEventListener("click", () => {
    toast.classList.remove("show");
  });

  /* =========================================================
     Contact Form Validation + UX
     ========================================================= */
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const requiredFields = form.querySelectorAll("[required]");
      let valid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = "rgba(255,107,107,.6)";
          valid = false;
        } else {
          field.style.borderColor = "rgba(102,217,255,.4)";
        }
      });

      if (!valid) {
        showToast("تنبيه", "الرجاء تعبئة جميع الحقول الإلزامية", "تحقق من الحقول المطلوبة (*)");
        return;
      }

      // Fake submit success (replace later with API)
      showToast("تم الاستلام ✅", "تم إرسال طلبك بنجاح", "سنتواصل معك خلال 24 ساعة");
      form.reset();
    });
  }

});
