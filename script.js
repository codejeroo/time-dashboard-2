const categoryButtons = document.querySelectorAll(".category");
const currentTimeElements = document.querySelectorAll(".current-time");
const pastTimeElements = document.querySelectorAll(".past-time");

// Load data.json asynchronously
async function loadData() {
  try {
    const response = await fetch("data.json");
    return await response.json();
  } catch (error) {
    console.error("Error loading data.json:", error);
    return [];
  }
}

// Update DOM content based on selected timeframe
function updateContent(timeframe, data) {
  data.forEach((item, index) => {
    let current = item.timeframes[timeframe].current;
    let previous = item.timeframes[timeframe].previous;

    const currentLabel = current === 1 ? "hr" : "hrs";
    const previousLabel = previous === 1 ? "hr" : "hrs";

    currentTimeElements[index].textContent = `${current}${currentLabel}`;

    let pastPrefix;
    switch (timeframe) {
      case "daily":
        pastPrefix = "Yesterday";
        break;
      case "weekly":
        pastPrefix = "Last Week";
        break;
      case "monthly":
        pastPrefix = "Last Month";
        break;
      default:
        pastPrefix = "Previous";
    }

    pastTimeElements[index].textContent = `${pastPrefix} - ${previous}${previousLabel}`;
  });
}

// Add click listeners to category buttons
function setupCategoryListeners(data) {
  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove highlight from all buttons
      categoryButtons.forEach(otherButton => {
        otherButton.classList.remove("highlight");
      });

      // Highlight clicked button
      button.classList.add("highlight");

      const timeframe = button.textContent.trim().toLowerCase();

      if (["daily", "weekly", "monthly"].includes(timeframe)) {
        updateContent(timeframe, data);
      } else {
        console.warn(`Unknown timeframe: ${timeframe}`);
      }
    });
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  const data = await loadData();

  if (data.length > 0) {
    // Set default view to weekly
    updateContent("weekly", data);
    setupCategoryListeners(data);
  } else {
    console.error("Data not loaded, cannot initialize dashboard.");
  }
});
