const modeContent = {
  today: {
    title: "A short list that still knows the bigger picture.",
    description: "Choose today's actions from your mainlines, add quick actions when needed, and finish the day with a clear record of what moved."
  },
  calendar: {
    title: "See the month without living inside the calendar.",
    description: "Use Calendar as a future-facing map. Plan upcoming actions, notice deadlines and Special days, then return to the day in front of you."
  },
  review: {
    title: "Remember progress, not just unfinished work.",
    description: "Completed actions remain visible during the day and collect into Review, giving you evidence that your mainlines are moving."
  }
};

document.querySelectorAll("[data-scroll-target]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.scrollTarget)?.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll(".mode-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const mode = tab.dataset.mode;
    document.querySelectorAll(".mode-tab").forEach(option => {
      const active = option === tab;
      option.classList.toggle("active", active);
      option.setAttribute("aria-selected", String(active));
    });
    document.querySelector("#mode-title").textContent = modeContent[mode].title;
    document.querySelector("#mode-description").textContent = modeContent[mode].description;
    document.querySelector("#mode-visual").dataset.mode = mode;
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .16 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

const familyProfiles = {
  parent: {
    name: "Parent",
    description: "Work and personal life",
    avatar: "P",
    example: "A parent can keep a focused workday while remembering the small action that supports family life.",
    mainlines: [
      ["Launch proposal", "Review the final pricing page", "Work"],
      ["Stay healthy", "Walk for thirty minutes", "Health"],
      ["Family time", "Read with Leo after dinner", "Home"]
    ]
  },
  leo: {
    name: "Leo, age 9",
    description: "Small habits, owned by Leo",
    avatar: "L",
    example: "Leo checks off his own habits after school. The goal is not more chores; it is learning to notice and follow through.",
    mainlines: [
      ["Curious reader", "Read ten pages before screen time", "Reading"],
      ["Strong body", "Play outside for thirty minutes", "Movement"],
      ["Take care of my space", "Put backpack and shoes away", "Home"]
    ]
  }
};

document.querySelectorAll(".family-profile").forEach(button => {
  button.addEventListener("click", () => {
    const profile = familyProfiles[button.dataset.familyProfile];
    document.querySelectorAll(".family-profile").forEach(option => option.classList.toggle("active", option === button));
    document.querySelector(".family-demo").dataset.familyView = button.dataset.familyProfile;
    document.querySelector(".family-avatar").textContent = profile.avatar;
    document.querySelector("#family-name").textContent = profile.name;
    document.querySelector("#family-description").textContent = profile.description;
    document.querySelector("#family-example-text").textContent = profile.example;
    document.querySelector("#family-mainlines").innerHTML = profile.mainlines.map(([title, action, tag]) => `
      <div><span></span><p><strong>${title}</strong><small>${action}</small></p><em>${tag}</em></div>
    `).join("");
  });
});

document.querySelector(".demo-today")?.addEventListener("change", event => {
  const label = event.target.closest("label");
  if (!label) return;
  label.style.color = event.target.checked ? "#9aa39b" : "";
  label.style.textDecoration = event.target.checked ? "line-through" : "";
});

document.querySelector("#open-mainline")?.addEventListener("click", () => {
  window.close();
});
