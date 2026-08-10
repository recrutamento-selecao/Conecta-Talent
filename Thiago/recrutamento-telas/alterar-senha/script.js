document.querySelectorAll(".toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.previousElementSibling;
    input.type = input.type === "password" ? "text" : "password";
  });
});
