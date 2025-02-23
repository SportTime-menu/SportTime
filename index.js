document.getElementById("searchInput").addEventListener("input", function () {
  let filter = this.value.toLowerCase();
  let dishes = document.querySelectorAll(".dish-card");
  let sections = document.querySelectorAll(".section-title"); // Розділи з h2

  dishes.forEach((dish) => {
    let name = dish.querySelector("h3").textContent.toLowerCase();
    if (name.includes(filter)) {
      dish.style.display = "block"; // Показуємо знайдену страву
    } else {
      dish.style.display = "none"; // Ховаємо, якщо не підходить
    }
  });

  // Перевіряємо кожен заголовок розділу
  sections.forEach((section) => {
    let title = section.querySelector("h2"); // Заголовок розділу
    let nextDishesContainer = section.nextElementSibling; // Блок .dishes
    let visibleDishes = nextDishesContainer.querySelectorAll(
      ".dish-card[style='display: block;']"
    );

    if (visibleDishes.length > 0) {
      title.style.display = "block"; // Показуємо заголовок, якщо є хоча б одна страва
    } else {
      title.style.display = "none"; // Ховаємо заголовок, якщо всі страви в розділі зникли
    }
  });
});
