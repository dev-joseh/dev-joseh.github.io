const checkbox = document.querySelector("#checkTheme");
const root = document.querySelector(":root");
const svg = document.querySelectorAll("svg");
const announcements = document.querySelector(".announcements");
const trending = document.querySelector(".trending");

checkbox.addEventListener("change", ()=> {
    root.classList.toggle("light");
})

checkbox.addEventListener("change", ()=> {
    svg.forEach((icon) => icon.fill === "#FFFFFF" ? icon.fill === "#000000" : icon.fill === "#FFFFFF");
})

announcements.addEventListener("click", ()=> {
    announcements.classList.toggle("hidden");
    trending.classList.toggle("hidden");
})

trending.addEventListener("click", ()=> {
    announcements.classList.toggle("hidden");
    trending.classList.toggle("hidden");
})