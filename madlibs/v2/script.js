
(function () {
  "use strict";

  const form = document.querySelector("#madlib-form");
  const outputPanel = document.querySelector("#output");
  const resetBtn = document.querySelector("#reset-btn");

  function escapeHTML(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function buildStory() {
    const adj1 = document.querySelector("#adj1").value.trim();
    const noun1 = document.querySelector("#noun1").value.trim();
    const verb1 = document.querySelector("#verb1").value.trim();
    const noun2 = document.querySelector("#noun2").value.trim();
    const sound = document.querySelector("#sound").value.trim();
    const plural = document.querySelector("#plural").value.trim();

    if (!adj1 || !noun1 || !verb1 || !noun2 || !sound || !plural) {
      alert("Please fill in all fields.");
      return "";
    }

    return `This morning, Minion Stuart woke up feeling very <strong>${escapeHTML(adj1)}</strong>.
He grabbed his favorite <strong>${escapeHTML(noun1)}</strong> and ran to the lab, ready to <strong>${escapeHTML(verb1)}</strong> with his friends.
But when he got there, Minion Bob had already invented a <strong>${escapeHTML(noun2)}</strong> that went <strong>${escapeHTML(sound)}</strong> all over the place!
Soon, bananas were flying, and the Minions were laughing like <strong>${escapeHTML(plural)}</strong>.`;
  }

  // reveal text word by word
  function revealText(htmlString, container) {
    container.innerHTML = "";
    container.hidden = false;

    const tokens = htmlString.split(/(\s+)/);
    let delay = 0;
    tokens.forEach(token => {
      if (/\S/.test(token)) {
        const span = document.createElement("span");
        span.className = "word";
        span.style.animationDelay = `${delay}ms`;
        span.innerHTML = token;
        container.appendChild(span);
        delay += 90;
      } else {
        container.appendChild(document.createTextNode(token));
      }
    });

    container.focus?.();
  }

  form.addEventListener("submit", evt => {
    evt.preventDefault();
    const storyHtml = buildStory();
    if (!storyHtml) return;
    revealText(storyHtml, outputPanel);
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    outputPanel.innerHTML = "";
    outputPanel.hidden = true;
    document.querySelector("#adj1").focus();
  });
})();
