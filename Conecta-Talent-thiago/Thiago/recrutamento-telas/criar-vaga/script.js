document.querySelectorAll(".pill button").forEach((button) => {
  button.addEventListener("click", () => button.parentElement.remove());
});
