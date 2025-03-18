document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("div.highlight pre:not(:has(.copy-button))").forEach((pre) => {
        let code = pre.querySelector("code");
        if (!code) return; // Skip if no <code> block inside

        let button = document.createElement("button");
        button.className = "copy-button";
        button.innerHTML = "📋"; // Clipboard icon

        button.addEventListener("click", () => {
            navigator.clipboard.writeText(code.innerText).then(() => {
                button.innerHTML = "✅"; // Change icon on success
                setTimeout(() => (button.innerHTML = "📋"), 1500);
            });
        });

        // Position button at the top-right corner
        pre.style.position = "relative";
        pre.appendChild(button);
    });
});
