const titleElements = document.querySelectorAll(".title");

if (titleElements.length) {
    titleElements.forEach((element) => {
        element.addEventListener("click", () => {
            element.style.color = "blue";
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const currentYear = document.getElementById("current-year");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});
