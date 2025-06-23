document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });

  // Mobile menu functionality
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Contact form handling
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
            website: formData.get("website"),
          }),
        });
        const result = await response.json();
        if (result.success) {
          showMessage(
            "Thank you for your message! We'll get back to you soon.",
            "success"
          );
          contactForm.reset();
        } else {
          showMessage("Something went wrong. Please try again.", "error");
        }
      } catch (error) {
        console.error("Error:", error);
        showMessage("Something went wrong. Please try again.", "error");
      } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }

  function showMessage(message, type) {
    if (formMessage) {
      formMessage.textContent = message;
      formMessage.className = `mt-4 p-4 rounded-lg ${
        type === "success"
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-red-100 text-red-700 border border-red-200"
      }`;
      formMessage.classList.remove("hidden");
      setTimeout(() => formMessage.classList.add("hidden"), 5000);
    }
  }

  // Navbar background on scroll
  const navbar = document.querySelector("nav");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("bg-white/95");
        navbar.classList.remove("bg-white/90");
      } else {
        navbar.classList.remove("bg-white/95");
        navbar.classList.add("bg-white/90");
      }
    });
  }

  // Project Modal Event Listeners
  const projectCard = document.getElementById("tableau-explorer-card");
  const projectModal = document.getElementById("project-modal");
  const closeModalButton = document.getElementById("project-modal-close-btn");
  const getInTouchButton = document.getElementById("get-in-touch-btn");

  if (projectCard && projectModal) {
    projectCard.addEventListener("click", () => {
      openProjectModal();
    });
  }

  if (closeModalButton) {
    closeModalButton.addEventListener("click", () => {
      closeProjectModal();
    });
  }

  if (getInTouchButton) {
    getInTouchButton.addEventListener("click", () => {
      closeProjectModal();
    });
  }

  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !projectModal.classList.contains("hidden")) {
      closeProjectModal();
    }
  });
});

// Project Modal functions
function openProjectModal() {
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
}
