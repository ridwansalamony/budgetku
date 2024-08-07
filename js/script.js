const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
const localStorageTheme = localStorage.getItem("theme");
const btnTheme = document.querySelector(".theme-switch");
const iconLight = document.querySelector("#light");
const iconDark = document.querySelector("#dark");
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  return systemSettingDark.matches ? "dark" : "light";
}
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
document.querySelector("html").setAttribute("data-theme", currentThemeSetting);

currentThemeSetting === "dark" ? iconLight.classList.add("hidden") : iconDark.classList.add("hidden");
btnTheme.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  const newCta = newTheme === "dark" ? "Change to light theme" : "Change to dark theme";
  btnTheme.setAttribute("aria-label", newCta);

  iconDark.classList.toggle("hidden");
  iconLight.classList.toggle("hidden");

  document.querySelector("html").setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  currentThemeSetting = newTheme;
});

// Budget Card
const sectionBudget = document.querySelector(".budgets");
let budgets = Array(
  {
    id: 1,
    name: "Jalan-jalan",
    amount: 1500000,
  },
  {
    id: 2,
    name: "Jajan",
    amount: 500000,
  },
  {
    id: 3,
    name: "Mudik",
    amount: 2000000,
  },
  {
    id: 4,
    name: "Entertainment",
    amount: 300000,
  }
);

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

budgets.forEach((budget) => {
  sectionBudget.innerHTML += `
        <div class="budget-card">
          <h2 class="budget-card-name">${budget.name}</h2>
          <p class="budget-card-amount">${rupiah(budget.amount)}</p>
          <p class="budget-card-total">Total ${rupiah(budget.amount)}</p>
        </div>
  `;
});
sectionBudget.innerHTML += '<button type="button" class="add-budget">+</button>';

// Modal
const btnAdd = document.querySelector(".add-budget");
const modal = document.querySelector(".modal-budget");
const btnCloseModal = document.querySelector(".close-modal");
btnAdd.addEventListener("click", () => modal.classList.toggle("modal-show"));
btnCloseModal.addEventListener("click", () => modal.classList.toggle("modal-show"));
