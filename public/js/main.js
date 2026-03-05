var PROJECT_DATA = {
  "time-complexity-mcp": {
    title: "Time Complexity MCP",
    overview:
      "An MCP server for static Big-O time complexity analysis. Parses code into ASTs using tree-sitter, detects loops, recursion, and known stdlib calls, then reports per-function complexity with line-level annotations.",
    features: [
      "Supports JS/TS, Dart, Kotlin, Java, Python, PHP, Go",
      "Per-function complexity reports with line-level annotations",
      "Detects loops, recursion, and known stdlib call complexity",
      "analyze_github_repo tool for remote repository analysis",
    ],
    stack: ["TypeScript", "Tree-sitter", "MCP SDK"],
    highlights: [
      "Parses code into ASTs for accurate static analysis",
      "Handles nested loops, recursive calls, and standard library patterns",
      "Works as an MCP server — integrates directly into AI coding workflows",
      "Published and open source on GitHub",
    ],
    github: "https://github.com/Luzgan/time-complexity-mcp",
  },
  "ai-rulesmith": {
    title: "AI Rulesmith",
    overview:
      "A CLI tool to compose AI agent context files (CLAUDE.md, .cursorrules, AGENTS.md, etc.) from reusable markdown rules. Define rules once, share them across projects, and keep AI agent instructions consistent.",
    features: [
      "Compose context files from a library of reusable markdown rules",
      "Built-in rules for common patterns (code style, git, testing, etc.)",
      "Support for global and project-local custom rules",
      "Preview, validate, and test rule configurations",
    ],
    stack: ["TypeScript", "Commander.js", "npm"],
    highlights: [
      "Published as ai-rulesmith on npm",
      "40+ built-in rules covering code style, workflow, security, and more",
      "Supports multiple AI targets (Claude Code, Cursor, Windsurf, etc.)",
      "Scenario testing to verify rules influence agent behavior",
    ],
    github: "https://github.com/Luzgan/ai-rulesmith",
  },
  openbrain: {
    title: "OpenBrain",
    overview:
      "A personal knowledge management MCP server built with PostgreSQL and pgvector for semantic search. Organizes thoughts, tags, people, and projects in a modular architecture accessible through AI assistants.",
    features: [
      "Semantic search powered by pgvector embeddings",
      "Modular architecture: thoughts, tags, people, projects",
      "Full MCP server interface for AI assistant integration",
      "Pydantic v2 for data validation",
    ],
    stack: ["Python", "FastMCP", "PostgreSQL", "pgvector", "Pydantic v2"],
    highlights: [
      "Store and retrieve knowledge through natural language queries",
      "Vector embeddings enable finding related content by meaning, not just keywords",
      "Designed for use with Claude and other MCP-compatible AI assistants",
      "Open source on GitHub",
    ],
    github: "https://github.com/Luzgan/openbrain",
  },
  "elements-village": {
    title: "Elements Village",
    overview:
      "A 2D pixel-art village management game built in Godot 4 with GDScript. Villagers have elemental affinities, autonomous needs-driven scheduling, and a building/training system.",
    features: [
      "Autonomous villager AI with needs-driven scheduling",
      "Elemental affinity system affecting villager abilities",
      "Building and training system for village growth",
      "Pixel-art visual style",
    ],
    stack: ["Godot 4", "GDScript"],
    highlights: [
      "Villagers autonomously manage their own schedules based on needs",
      "Phase 2 complete: simulation, training, and skills systems",
      "Phase 3 in progress: marriage and element inheritance mechanics",
      "A passion project exploring game AI and simulation design",
    ],
    github: null,
  },
  "life-manager": {
    title: "Life Manager",
    overview:
      "A modular life-management platform that started as a project tracker and evolved into a comprehensive personal tool. Features project tracking, workout logging, social media analytics, and full MCP integration for use with AI assistants.",
    features: [
      "Modular architecture with auto-registration of routers and MCP tools",
      "26 MCP tools across projects, tasks, social tracking, and training",
      "Google OAuth authentication and MCP over HTTP",
      "React 19 + TypeScript frontend with FastAPI backend",
    ],
    stack: [
      "Python",
      "FastAPI",
      "React 19",
      "TypeScript",
      "SQLite",
      "FastMCP",
    ],
    highlights: [
      "255+ pytest tests and 41 Playwright e2e tests",
      "Training module for exercise tracking with flexible metrics",
      "Social tracking with Reddit and LinkedIn OAuth2 auto-sync",
      "Private project — not published, built for personal use",
    ],
    github: null,
  },
  "tableau-explorer": {
    title: "Tableau Workbook Explorer",
    overview:
      "A tool designed to help Tableau developers and analysts understand complex field relationships in their workbooks. Upload local Tableau files to visualize field dependencies and gain insights into calculation structures.",
    features: [
      "Upload and parse local Tableau workbooks (.twb files) — nothing is uploaded to any server",
      "Interactive dependency graphs using React Flow",
      "Field information with visibility status (hidden/visible)",
    ],
    stack: ["JavaScript", "React", "React Flow", "XML Parser"],
    highlights: [
      "Helps debug calculation errors and optimize workbook performance",
      "Visualize the blast radius of deleting a field",
      "Built by reverse-engineering Tableau's undocumented XML format",
      "Useful for onboarding new team members to complex workbooks",
    ],
    github: null,
    url: "https://tableau-workbook-explorer.com/",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });

  // Mobile menu functionality
  var mobileMenuButton = document.getElementById("mobile-menu-button");
  var mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });

    var mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // Smooth scrolling for navigation links
  var navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var targetId = this.getAttribute("href");
      var targetSection = document.querySelector(targetId);

      if (targetSection) {
        var offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Contact form handling
  var contactForm = document.getElementById("contact-form");
  var formMessage = document.getElementById("form-message");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      var formData = new FormData(this);
      var submitButton = this.querySelector('button[type="submit"]');
      var originalText = submitButton.textContent;

      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      try {
        var response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
            website: formData.get("website"),
          }),
        });
        var result = await response.json();
        if (result.success) {
          showMessage(
            "Thank you for your message! I'll get back to you soon.",
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
      formMessage.className =
        "mt-4 p-4 rounded-lg " +
        (type === "success"
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-red-100 text-red-700 border border-red-200");
      formMessage.classList.remove("hidden");
      setTimeout(function () {
        formMessage.classList.add("hidden");
      }, 5000);
    }
  }

  // Navbar background on scroll
  var navbar = document.querySelector("nav");
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

  // Project Modal
  var projectModal = document.getElementById("project-modal");
  var closeModalButton = document.getElementById("project-modal-close-btn");
  var getInTouchButton = document.getElementById("get-in-touch-btn");

  // Attach click handlers to all project cards
  var projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach(function (card) {
    card.addEventListener("click", function () {
      var projectKey = this.getAttribute("data-project");
      openProjectModal(projectKey);
    });
  });

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeProjectModal);
  }

  if (getInTouchButton) {
    getInTouchButton.addEventListener("click", closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener("click", function (e) {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      projectModal &&
      !projectModal.classList.contains("hidden")
    ) {
      closeProjectModal();
    }
  });
});

function openProjectModal(projectKey) {
  var modal = document.getElementById("project-modal");
  var project = PROJECT_DATA[projectKey];
  if (!modal || !project) return;

  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-overview").textContent = project.overview;

  var featuresEl = document.getElementById("modal-features");
  featuresEl.innerHTML = project.features
    .map(function (f) {
      return (
        '<li class="flex items-start"><span class="text-primary-600 mr-2">•</span><span>' +
        f +
        "</span></li>"
      );
    })
    .join("");

  var stackEl = document.getElementById("modal-stack");
  stackEl.innerHTML = project.stack
    .map(function (s) {
      return (
        '<span class="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">' +
        s +
        "</span>"
      );
    })
    .join("");

  var highlightsEl = document.getElementById("modal-highlights");
  highlightsEl.innerHTML = project.highlights
    .map(function (h) {
      return (
        '<li class="flex items-start"><span class="text-primary-600 mr-2">•</span><span>' +
        h +
        "</span></li>"
      );
    })
    .join("");

  var githubSection = document.getElementById("modal-github-section");
  var githubLink = document.getElementById("modal-github-link");
  if (project.github) {
    githubLink.href = project.github;
    githubSection.classList.remove("hidden");
  } else {
    githubSection.classList.add("hidden");
  }

  var visitLink = document.getElementById("modal-visit-link");
  if (project.url) {
    visitLink.href = project.url;
    visitLink.classList.remove("hidden");
  } else {
    visitLink.classList.add("hidden");
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  var modal = document.getElementById("project-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
}
