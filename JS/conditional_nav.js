document.addEventListener("DOMContentLoaded", function () {
    const navElement = document.getElementById("conditionalNav");
    const observer = new IntersectionObserver((entries) => {
      const firstSectionOutOfView =
        entries[0].boundingClientRect.bottom <= 0;
      if (firstSectionOutOfView) {
        navElement.style.display = "flex";
      } else {
        navElement.style.display = "none";
      }
    });

    const firstSection = document.getElementById("first_pg"); // Change this to the ID of your first section
    observer.observe(firstSection);
  });