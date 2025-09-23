function slideProjects(direction) {
  const carousel = document.getElementById("projectsCarousel");
  const scrollAmount = 320; // px (card width + gap)
  carousel.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}
