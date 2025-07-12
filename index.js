// 🔍 Пошук страв
document.getElementById("searchInput").addEventListener("input", function () {
  let filter = this.value.toLowerCase();
  let dishes = document.querySelectorAll(".dish-card");
  let sections = document.querySelectorAll(".section-title"); // h2 заголовки секцій

  dishes.forEach((dish) => {
    let name = dish.querySelector("h3").textContent.toLowerCase();
    dish.style.display = name.includes(filter) ? "block" : "none";
  });

  sections.forEach((section) => {
    let title = section.querySelector("h2");
    let nextDishesContainer = section.nextElementSibling;
    let visibleDishes = nextDishesContainer.querySelectorAll(".dish-card[style='display: block;']");
    title.style.display = visibleDishes.length > 0 ? "block" : "none";
  });
});

// Випадаюче підменю для пункту "Кухня"
document.addEventListener('DOMContentLoaded', function () {
  var submenuToggle = document.querySelector('.sidebar-submenu-toggle');
  var submenuParent = document.querySelector('.sidebar-has-submenu');
  if (submenuToggle && submenuParent) {
    submenuToggle.addEventListener('click', function (e) {
      e.preventDefault();
      submenuParent.classList.toggle('open');
    });
  }
});

// Ефект зміни фону навігації при скролі (ПК тільки для index.html)
document.addEventListener('DOMContentLoaded', function () {
  if (document.body.classList.contains('index-main')) {
    var nav = document.querySelector('.main-nav');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 5) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
});

