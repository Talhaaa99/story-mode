// Easter Eggs Manager
class EasterEggManager {
  private konamiCode: string[] = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];
  private konamiIndex: number = 0;
  private isHackerMode: boolean = false;
  private easterEggClicks: Set<string> = new Set();
  private secretLevelUnlocked: boolean = false;
  private initialized: boolean = false;

  constructor() {
    // Don't initialize anything in constructor to avoid SSR issues
  }

  public init() {
    if (this.initialized || typeof window === "undefined") return;
    this.initialized = true;
    this.initKonamiCode();
    this.initEasterEggTracking();
  }

  private initKonamiCode() {
    if (typeof window === "undefined") return;

    document.addEventListener("keydown", (event) => {
      if (event.code === this.konamiCode[this.konamiIndex]) {
        this.konamiIndex++;

        if (this.konamiIndex === this.konamiCode.length) {
          this.activateHackerMode();
          this.konamiIndex = 0;
        }
      } else {
        this.konamiIndex = 0;
      }
    });
  }

  private initEasterEggTracking() {
    if (typeof window === "undefined") return;

    // Track clicks on specific elements
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const easterEggId = target.getAttribute("data-easter-egg");

      if (easterEggId) {
        this.easterEggClicks.add(easterEggId);
        this.showPixelPopup(`Easter Egg Found: ${easterEggId}`, "neon-purple");

        // Check for secret level unlock
        if (this.easterEggClicks.size >= 3 && !this.secretLevelUnlocked) {
          this.unlockSecretLevel();
        }
      }
    });
  }

  private activateHackerMode() {
    if (typeof window === "undefined") return;

    this.isHackerMode = !this.isHackerMode;
    const body = document.body;

    if (this.isHackerMode) {
      body.classList.add("hacker-mode");
      this.showPixelPopup("HACKER MODE ACTIVATED! 💻", "neon-lime");

      // Add console messages
      console.log(
        "%c🔓 HACKER MODE ENABLED",
        "color: #00ff66; font-size: 20px; font-weight: bold;"
      );
      console.log(
        "%cWelcome to the matrix, hacker!",
        "color: #00ff66; font-size: 14px;"
      );
      console.log(
        "%cTry typing 'secret' in the console for a surprise!",
        "color: #00ff66; font-size: 12px;"
      );

      // Add console input listener
      this.addConsoleListener();
    } else {
      body.classList.remove("hacker-mode");
      this.showPixelPopup("Hacker mode deactivated", "neon-cyan");
    }
  }

  private addConsoleListener() {
    if (typeof window === "undefined") return;

    // This is a simplified version - in a real implementation, you'd need a more sophisticated approach
    const originalLog = console.log;
    console.log = function (...args) {
      if (args[0] === "secret") {
        console.log(
          "%c🎉 You found the secret console command!",
          "color: #ff00ff; font-size: 16px; font-weight: bold;"
        );
        console.log(
          "%cBonus achievement unlocked: Console Explorer",
          "color: #00ffff; font-size: 12px;"
        );
      }
      originalLog.apply(console, args);
    };
  }

  private unlockSecretLevel() {
    if (typeof window === "undefined") return;

    this.secretLevelUnlocked = true;
    this.showPixelPopup("SECRET LEVEL UNLOCKED! 🎮", "neon-pink");

    // Create secret level popup
    const secretPopup = document.createElement("div");
    secretPopup.className =
      "fixed inset-0 bg-cyber-black/90 flex items-center justify-center z-50";
    secretPopup.innerHTML = `
      <div class="bg-cyber-dark-gray border-2 border-neon-pink rounded-lg p-8 text-center max-w-md">
        <div class="text-4xl mb-4">🎮</div>
        <h2 class="text-2xl font-orbitron text-neon-pink mb-4">SECRET LEVEL UNLOCKED</h2>
        <p class="text-neon-cyan font-chakra-petch mb-6">
          You've discovered the hidden content! This is a bonus level with extra easter eggs and developer notes.
        </p>
        <button class="px-6 py-3 bg-neon-pink text-cyber-black font-chakra-petch font-bold rounded hover:bg-neon-lime transition-colors">
          ENTER SECRET LEVEL
        </button>
      </div>
    `;

    document.body.appendChild(secretPopup);

    // Remove popup on click
    secretPopup.addEventListener("click", () => {
      document.body.removeChild(secretPopup);
    });
  }

  private showPixelPopup(message: string, color: string) {
    if (typeof window === "undefined") return;

    const popup = document.createElement("div");
    popup.className = `pixel-popup text-shadow-${color}`;
    popup.textContent = message;
    popup.style.left = `${Math.random() * 80 + 10}%`;
    popup.style.top = `${Math.random() * 80 + 10}%`;

    document.body.appendChild(popup);

    popup.addEventListener("click", () => {
      document.body.removeChild(popup);
    });

    setTimeout(() => {
      if (document.body.contains(popup)) {
        document.body.removeChild(popup);
      }
    }, 3000);
  }

  // Random pixel popups
  public showRandomPopup() {
    if (typeof window === "undefined") return;

    const messages = [
      "SYSTEM OVERRIDE",
      "ACCESS GRANTED",
      "NEURAL LINK ACTIVE",
      "QUANTUM STATE: AWESOME",
      "HACK THE PLANET!",
      "CYBERPUNK 2077 REFERENCE",
      "MATRIX MODE: ENGAGED",
      "GLITCH IN THE SYSTEM",
      "NEON DREAMS",
      "DIGITAL NOMAD LIFE",
      "LEVEL UP ACHIEVED",
      "SKILL TREE UNLOCKED",
      "QUEST COMPLETE",
      "ACHIEVEMENT UNLOCKED",
    ];

    const colors = ["neon-pink", "neon-cyan", "neon-purple", "neon-lime"];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    this.showPixelPopup(randomMessage, randomColor);
  }

  // Get easter egg progress
  public getEasterEggProgress() {
    return {
      total: 5, // Total easter eggs available
      found: this.easterEggClicks.size,
      secretLevelUnlocked: this.secretLevelUnlocked,
      hackerModeActive: this.isHackerMode,
    };
  }
}

// Create instance but don't initialize immediately
export const easterEggManager = new EasterEggManager();

// Initialize only on client side
if (typeof window !== "undefined") {
  // Initialize after a short delay to ensure DOM is ready
  setTimeout(() => {
    easterEggManager.init();
  }, 100);

  // Auto-show random popups occasionally
  setInterval(() => {
    if (Math.random() < 0.1) {
      // 10% chance every interval
      easterEggManager.showRandomPopup();
    }
  }, 30000); // Every 30 seconds
}
