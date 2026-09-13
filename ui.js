/**
 * ExamPro UI Controller
 * Manages view routing, themes, standalone canvas confetti, modals, and toasts.
 */

import { appState } from "./state.js";
import { getUserLevelInfo } from "./gamification.js";

class UIController {
  constructor() {
    this.currentView = "dashboard";
    this.initTheme();
    this.initConfetti();
  }

  initTheme() {
    const savedTheme = appState.getTheme();
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateThemeButton(savedTheme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    appState.setTheme(next);
    this.updateThemeButton(next);
    this.showToast(next === "dark" ? "Dark Mode Enabled 🌙" : "Light Mode Enabled ☀️");
  }

  updateThemeButton(theme) {
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.innerHTML = theme === "dark" ? "☀️" : "🌙";
      btn.title = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
    }
  }

  switchView(viewId) {
    // Hide all view sections
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
    });

    // Show target section
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.classList.add("active");
      this.currentView = viewId;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Update active nav links in desktop sidebar and mobile bottom nav
    document.querySelectorAll("[data-nav-view]").forEach(link => {
      if (link.getAttribute("data-nav-view") === viewId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Notify listeners or render view content if needed
    window.dispatchEvent(new CustomEvent("viewChanged", { detail: { view: viewId } }));
  }

  updateHeaderStats() {
    const profile = appState.getProfile();
    const levelInfo = getUserLevelInfo(profile.xp);

    const streakEl = document.getElementById("header-streak-count");
    if (streakEl) streakEl.textContent = profile.streak || 1;

    const xpEl = document.getElementById("header-xp-count");
    if (xpEl) xpEl.textContent = `${profile.xp.toLocaleString()} XP`;

    const avatarEl = document.getElementById("header-user-avatar");
    if (avatarEl) avatarEl.textContent = profile.avatar || "🎯";

    const sidebarNameEl = document.getElementById("sidebar-user-name");
    if (sidebarNameEl) sidebarNameEl.textContent = profile.name || "Aspirant";

    const sidebarLevelEl = document.getElementById("sidebar-user-level");
    if (sidebarLevelEl) sidebarLevelEl.textContent = `Lvl ${levelInfo.level} • ${levelInfo.title}`;

    const sidebarAvatarEl = document.getElementById("sidebar-user-avatar");
    if (sidebarAvatarEl) sidebarAvatarEl.textContent = profile.avatar || "🎯";
  }

  showToast(message, icon = "✨", duration = 3000) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.innerHTML = `<span style="font-size: 1.25rem;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  showXPFloater(amount, parentElement) {
    if (!parentElement) return;
    const floater = document.createElement("div");
    floater.className = "xp-floater";
    floater.textContent = `+${amount} XP`;
    parentElement.appendChild(floater);
    setTimeout(() => floater.remove(), 1200);
  }

  // Pure Canvas Confetti Generator (No external CDN required)
  initConfetti() {
    let canvas = document.getElementById("confetti-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "confetti-canvas";
      document.body.appendChild(canvas);
    }
    this.confettiCanvas = canvas;
    this.confettiCtx = canvas.getContext("2d");
    this.particles = [];
    this.isConfettiActive = false;

    window.addEventListener("resize", () => {
      if (this.confettiCanvas) {
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;
      }
    });
    this.confettiCanvas.width = window.innerWidth;
    this.confettiCanvas.height = window.innerHeight;
  }

  triggerConfetti(durationMs = 3500) {
    this.confettiCanvas.width = window.innerWidth;
    this.confettiCanvas.height = window.innerHeight;
    const colors = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];
    this.particles = [];

    for (let i = 0; i < 150; i++) {
      this.particles.push({
        x: window.innerWidth * Math.random(),
        y: -10 - Math.random() * 50,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        velX: (Math.random() - 0.5) * 6,
        velY: Math.random() * 4 + 3,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8
      });
    }

    this.isConfettiActive = true;
    const startTime = Date.now();

    const animate = () => {
      if (!this.isConfettiActive) return;
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

      this.particles.forEach(p => {
        p.x += p.velX;
        p.y += p.velY;
        p.rot += p.rotSpeed;

        this.confettiCtx.save();
        this.confettiCtx.translate(p.x, p.y);
        this.confettiCtx.rotate((p.rot * Math.PI) / 180);
        this.confettiCtx.fillStyle = p.color;
        this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        this.confettiCtx.restore();

        if (p.y > window.innerHeight) {
          p.y = -10;
          p.x = Math.random() * window.innerWidth;
        }
      });

      if (Date.now() - startTime < durationMs) {
        requestAnimationFrame(animate);
      } else {
        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
        this.isConfettiActive = false;
      }
    };

    requestAnimationFrame(animate);
  }

  showBadgeUnlockedModal(badges) {
    if (!badges || badges.length === 0) return;
    const badge = badges[0]; // Show first unlocked badge

    const modal = document.getElementById("badge-unlocked-modal");
    if (!modal) return;

    document.getElementById("badge-modal-icon").textContent = badge.icon;
    document.getElementById("badge-modal-title").textContent = badge.name;
    document.getElementById("badge-modal-desc").textContent = badge.desc;

    modal.classList.add("active");
    this.triggerConfetti(2500);
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
}

export const ui = new UIController();
