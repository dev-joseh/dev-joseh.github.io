const checkbox = document.querySelector("#checkTheme");
const root = document.querySelector(":root");

checkbox.addEventListener("change", ()=> {
    root.classList.toggle("light");
})