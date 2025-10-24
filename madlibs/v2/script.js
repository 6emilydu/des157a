(function () {
  "use strict";

  const form = document.querySelector("#madlib-form");
  const outputPanel = document.querySelector("#output");
  const resetBtn = document.querySelector("#reset-btn");

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

    return `This morning, Minion Stuart woke up feeling very <strong>${adj1}</strong>.
He grabbed his favorite <strong>${noun1}</strong> and ran to the lab, ready to <strong>${verb1}</strong> with his friends.
But when he got there, Minion Bob had already invented a <strong>${noun2}</strong> that went <strong>${sound}</strong> all over the place!
Soon, bananas were flying, and the Minions were laughing like <strong>${plural}</strong>.`;
  }

  function revealText(htmlString, container) {
    container.innerHTML = htmlString;
    container.hidden = false;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
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
