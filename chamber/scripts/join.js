const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close");

modalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.getElementById(button.dataset.modal);
        modal.showModal();
    });
});

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});
