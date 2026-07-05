// Wait for the page to fully load
document.addEventListener("DOMContentLoaded", () => {

    // Fade in the page
    document.body.classList.add("loaded");

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Fade out when navigating to another page
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute("href");

        // Ignore external links and anchor links
        if (
            href &&
            !href.startsWith("#") &&
            !href.startsWith("http") &&
            !link.hasAttribute("target")
        ) {
            link.addEventListener("click", function (e) {
                e.preventDefault();

                document.body.classList.remove("loaded");

                setTimeout(() => {
                    window.location.href = href;
                }, 400); // Matches CSS transition duration
            });
        }
    });

});

const toggleButton = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleButton.textContent = "☀️ Light Mode";
}

// Toggle theme
toggleButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    // Save preference
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        toggleButton.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        toggleButton.textContent = "🌙 Dark Mode";
    }

});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        hamburger.textContent =
            navLinks.classList.contains("active") ? "✕" : "☰";
    });
}

const chatButton = document.getElementById("chatButton");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");

chatButton.addEventListener("click", () => {
    chatWindow.classList.toggle("hidden");
});

closeChat.addEventListener("click", () => {
    chatWindow.classList.add("hidden");
});

document.getElementById("sendMessage").addEventListener("click", () => {
    const input = document.getElementById("chatInput");
    const body = document.querySelector(".chat-body");

    if (input.value.trim() === "") return;

    const message = document.createElement("p");
    message.innerHTML = "<strong>You:</strong> " + input.value;

    body.appendChild(message);
    body.scrollTop = body.scrollHeight;

    input.value = "";
});