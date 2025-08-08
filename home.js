document.addEventListener("DOMContentLoaded", function () {
  const gridAboutUs = document.querySelector(".grid-about-us");

  if (gridAboutUs) {
    const children = Array.from(gridAboutUs.children);

    children.forEach((child, index) => {
      child.style.opacity = "0";
      child.style.transform = "translateY(20px)";
      child.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      child.style.transitionDelay = `${index * 0.1}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const children = Array.from(target.children);

            children.forEach((child) => {
              child.style.opacity = "1";
              child.style.transform = "translateY(0)";
            });

            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(gridAboutUs);
  } else {
    console.log("Element .grid-about-us not found on page");
  }

  // Create and add star element at the end of the page
  createPageEndStar();
});

/**
 * Creates and displays a beautiful animated star at the end of the page
 */
function createPageEndStar() {
  // Create the star container
  const starContainer = document.createElement("div");
  starContainer.className = "page-end-star-container";

  // Apply styles to the container
  Object.assign(starContainer.style, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px 20px",
    margin: "40px auto",
    background:
      "linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.05))",
    borderRadius: "20px",
    maxWidth: "200px",
    position: "relative",
    overflow: "hidden",
  });

  // Create SVG star element
  const starSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  starSvg.setAttribute("width", "80");
  starSvg.setAttribute("height", "80");
  starSvg.setAttribute("viewBox", "0 0 24 24");
  starSvg.setAttribute("fill", "none");

  // Create the star path
  const starPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  starPath.setAttribute(
    "d",
    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
  );
  starPath.setAttribute("fill", "url(#starGradient)");
  starPath.setAttribute("stroke", "#FFD700");
  starPath.setAttribute("stroke-width", "0.5");

  // Create gradient definition
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const gradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );
  gradient.setAttribute("id", "starGradient");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "100%");
  gradient.setAttribute("y2", "100%");

  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#FFD700");

  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "#FFA500");

  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);

  starSvg.appendChild(defs);
  starSvg.appendChild(starPath);

  // Apply CSS animations via JavaScript
  const keyframes = `
        @keyframes starGlow {
            0%, 100% { filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.8)) brightness(1); }
            50% { filter: drop-shadow(0 0 15px rgba(255, 215, 0, 1)) brightness(1.2); }
        }
        
        @keyframes starRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes containerPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
    `;

  // Inject keyframes if not already present
  if (!document.querySelector("#starAnimationStyles")) {
    const style = document.createElement("style");
    style.id = "starAnimationStyles";
    style.textContent = keyframes;
    document.head.appendChild(style);
  }

  // Apply animations to the star
  Object.assign(starSvg.style, {
    animation:
      "starGlow 2s ease-in-out infinite, starRotate 20s linear infinite",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  });

  // Apply animation to container
  starContainer.style.animation = "containerPulse 3s ease-in-out infinite";

  // Add hover effects
  starContainer.addEventListener("mouseenter", function () {
    starSvg.style.transform = "scale(1.2) rotate(0deg)";
    starSvg.style.animationPlayState = "paused";
    starContainer.style.animationPlayState = "paused";
  });

  starContainer.addEventListener("mouseleave", function () {
    starSvg.style.transform = "scale(1)";
    starSvg.style.animationPlayState = "running";
    starContainer.style.animationPlayState = "running";
  });

  // Add click effect
  starContainer.addEventListener("click", function () {
    // Create temporary sparkle effect
    createSparkleEffect(starContainer);
  });

  // Append star to container and container to page
  starContainer.appendChild(starSvg);

  // Find the best position to append (preferably at the end of body)
  const targetElement = document.body.lastElementChild || document.body;
  if (targetElement === document.body) {
    document.body.appendChild(starContainer);
  } else {
    targetElement.parentNode.insertBefore(
      starContainer,
      targetElement.nextSibling
    );
  }

  // Add entrance animation
  starContainer.style.opacity = "0";
  starContainer.style.transform = "translateY(50px) scale(0.8)";
  starContainer.style.transition = "opacity 1s ease, transform 1s ease";

  setTimeout(() => {
    starContainer.style.opacity = "1";
    starContainer.style.transform = "translateY(0) scale(1)";
  }, 100);
}

/**
 * Creates a sparkle effect when the star is clicked
 * @param {HTMLElement} container - The star container element
 */
function createSparkleEffect(container) {
  const sparkles = [];
  const sparkleCount = 8;

  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement("div");
    sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #FFD700, #FFA500);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

    const angle = (360 / sparkleCount) * i;
    const distance = 50;
    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance;

    sparkle.style.left = "50%";
    sparkle.style.top = "50%";
    sparkle.style.transform = "translate(-50%, -50%)";

    container.appendChild(sparkle);
    sparkles.push(sparkle);

    // Animate sparkle
    sparkle.animate(
      [
        { transform: "translate(-50%, -50%) scale(0)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`,
          opacity: 1,
          offset: 0.7,
        },
        {
          transform: `translate(calc(-50% + ${x * 1.5}px), calc(-50% + ${
            y * 1.5
          }px)) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 800,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    ).onfinish = () => {
      sparkle.remove();
    };
  }
}
