// main.js — логіка для меню, скролу, підвантаження даних
document.addEventListener('DOMContentLoaded', function () {
  const sidebarLinks = document.querySelectorAll('.sidebar-menu a[href^="#"]');
  const mainContent = document.getElementById('mainContent');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // Пропускаємо клік по розгортанні підменю
      if (this.classList.contains('sidebar-submenu-toggle')) return;

      // Знімаємо клас 'active' лише з підпунктів поточного підменю
      const parentSubmenu = this.closest('.sidebar-submenu');
      if (parentSubmenu) {
        parentSubmenu.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
      }

      // Додаємо клас 'active' до поточного пункту
      this.classList.add('active');

      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const section = document.querySelector(href);

        if (section && mainContent) {
          // Обчислюємо зміщення відносно контейнера mainContent
          const y = section.offsetTop - 110;

          // Плавний скрол до секції
          mainContent.scrollTo({ top: y, behavior: 'smooth' });
        }
        else {
          // Якщо секції ще нема — зберігаємо hash для скролу після рендеру
          pendingHash = href;
        }
      }
    });
  });


  // Випадаюче підменю для пункту "Кухня"
  // !!! Видалено дублюючу логіку відкриття/закриття підменю, бо вона конфліктує з index2.html
  // document.querySelectorAll('.sidebar-submenu-toggle').forEach(function(toggle) {
  //   toggle.addEventListener('click', function(e) {
  //     e.preventDefault();
  //     var parent = this.closest('.sidebar-has-submenu');
  //     if (parent) parent.classList.toggle('open');
  //   });
  // });

  // Динамічне завантаження меню з menu.json
  fetch('menu.json')
    .then(response => response.json())
    .then(data => {
      const menuContainer = document.getElementById('menu-sections');
      menuContainer.innerHTML = '';


      // Відображаємо всі секції з menu.json, крім гриль-меню
      data.forEach(section => {
        if (section.id !== 'gril') {
          const sectionDiv = document.createElement('div');
          sectionDiv.className = 'menu-section';
          sectionDiv.id = menuSectionId(section.category);
          let html = `<h2 class="menu-section-title">${section.category}</h2><div class="dishes-grid">`;
          section.dishes.forEach(dish => {
            html += `<div class="dish-card">`;
if (dish.img) {
  html += `<img src="${dish.img}" alt="${dish.name}" class="dish-card-img" loading="lazy" width="300" height="200" />`;
}
            html += `<div class="dish-card-info">`;
            html += `<div class="dish-card-title">${dish.name}</div>`;
            if (dish.price) html += `<div class="dish-card-price">${dish.price}</div>`;
            if (dish.weight) html += `<div class="dish-card-weight-row"><img src="wg.png" alt="Вага" class="dish-card-weight-icon" /><div class="dish-card-weight">${dish.weight}</div></div>`;
            html += `</div>`;
            html += `</div>`;
          });
          html += `</div>`;
          sectionDiv.innerHTML = html;
          menuContainer.appendChild(sectionDiv);
        }
      });
      // Додаємо напої з drinks.json
      fetch('drinks.json')
        .then(response => response.json())
        .then(drinksData => {
          drinksData.forEach(drinkSection => {
            const sectionId = drinksSectionId(drinkSection.category);
            const drinkDiv = document.createElement('div');
            drinkDiv.className = 'menu-section';
            drinkDiv.id = sectionId;
            let html = `<h2 class="menu-section-title">${drinkSection.category}</h2><div class="dishes-grid">`;
            drinkSection.items.forEach(item => {
              html += `<div class="dish-card">`;
              if (item.image) html += `<img src="${item.image}" alt="${item.name}" class="dish-card-img" />`;
              html += `<div class="dish-card-info">`;
              html += `<div class="dish-card-title">${item.name}</div>`;
              if (item.price) html += `<div class="dish-card-price">${item.price}</div>`;
              if (item.volume) html += `<div class="dish-card-weight-row"><img src="wg.png" alt="Об'єм" class="dish-card-weight-icon" /><div class="dish-card-weight">${item.volume}</div></div>`;
              html += `</div>`;
              html += `</div>`;
            });
            html += `</div>`;
            drinkDiv.innerHTML = html;
            menuContainer.appendChild(drinkDiv);
          });
          // Додаємо гриль-меню з grill_menu.json в самому кінці
          fetch('grill_menu.json')
            .then(response => response.json())
            .then(grillData => {
              grillData.forEach(section => {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'menu-section';
                sectionDiv.id = grillSectionId(section.category);
                let html = `<h2 class="menu-section-title">${section.category}</h2><div class="dishes-grid">`;
                section.dishes.forEach(dish => {
                  html += `<div class="dish-card">`;
if (dish.img) {
  html += `<img src="${dish.img}" alt="${dish.name}" class="dish-card-img" loading="lazy" width="300" height="200" />`;
}
                  html += `<div class="dish-card-info">`;
                  html += `<div class="dish-card-title">${dish.name}</div>`;
                  if (dish.price) html += `<div class="dish-card-price">${dish.price}</div>`;
                  if (dish.weight) html += `<div class="dish-card-weight-row"><img src="wg.png" alt="Вага" class="dish-card-weight-icon" /><div class="dish-card-weight">${dish.weight}</div></div>`;
                  html += `</div>`;
                  html += `</div>`;
                });
                html += `</div>`;
                sectionDiv.innerHTML = html;
                menuContainer.appendChild(sectionDiv);
              });
            });
        });
    });

  // Функція для генерації id секції страв (латиницею, для скролу)
  function menuSectionId(category) {
    const map = {
      'Стартери': 'starters',
      'Перші страви': 'soups',
      'Дитяче меню': 'kids',
      'Салати': 'salads',
      'Риба та морепродукти': 'seafood',
      'На сніданок': 'breakfast',
      'Гарніри': 'side-dishes',
      'Телятина': 'veal',
      'Свинина': 'pork',
      'Птиця': 'poultry',
      'Паста': 'pasta',
      'Закуска до пива': 'beer-snacks',
      'Хліб': 'bread',
      'Десерти': 'desserts',
      'Хліб на заквасці': 'sourdough',
      'Піца': 'pizza',
      // Додати інші категорії за потреби
    };
    return map[category] || category.toLowerCase().replace(/[^a-z0-9]+/gi, '-');
  }
  // Функція для генерації id секції гриль-меню
  function grillSectionId(category) {
    const map = {
      'Гриль меню': 'banquet-grill',
      'М\'ясні та рибні страви': 'banquet-meat-fish',
      'Гарніри': 'banquet-side',
      'Закуски': 'banquet-snacks',
      'Вареники': 'banquet-varenyky',
      // Додати інші категорії за потреби
    };
    return map[category] || category.toLowerCase().replace(/[^a-z0-9]+/gi, '-');
  }
  // Функція для генерації id секції напоїв (латиницею, для скролу)
  function drinksSectionId(category) {
    const map = {
      'Горілка': 'vodka',
      'Коньяк': 'cognac',
      'Віскі': 'whisky',
      'Текіла': 'tequila',
      'Ром': 'rum',
      'Настоянки': 'nastoiki',
      'Пиво': 'beer',
      'Шоти': 'shots',
      'Лонги': 'longs',
      'Лікери': 'liqueurs',
      'Вермути': 'vermouths',
      'Джин': 'gin',
      'Ігристі вина': 'sparkling',
      'Вина': 'wines',
      'Вина Грузії': 'georgian-wines',
      'Коктейлі безалкогольні': 'nonalc-cocktails',
      'Чай / кава': 'tea-coffee',
      'Вода / напої': 'water-drinks',
      // Додати інші категорії за потреби
    };
    return map[category] || category.toLowerCase().replace(/[^a-z0-9]+/gi, '-');
  }

  // Пошук по стравам
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const filter = this.value.toLowerCase();
      const dishes = document.querySelectorAll(".dish-card");
      const sections = document.querySelectorAll(".menu-section");
      const menuSections = document.getElementById('menu-sections');
      let firstVisible = null;
      let found = false;

      // Видаляємо попереднє повідомлення
      const oldMsg = document.getElementById('no-dish-found-msg');
      if (oldMsg) oldMsg.remove();

      dishes.forEach((dish) => {
        const nameEl = dish.querySelector(".dish-card-title");
        const name = nameEl ? nameEl.textContent.toLowerCase() : "";
        if (name.includes(filter)) {
          dish.style.display = "";
          if (!firstVisible) firstVisible = dish;
          found = true;
        } else {
          dish.style.display = "none";
        }
      });

      // Перевіряємо кожен розділ
      sections.forEach((section) => {
        const title = section.querySelector(".menu-section-title");
        const dishesGrid = section.querySelector(".dishes-grid");
        const visibleDishes = dishesGrid ? dishesGrid.querySelectorAll(
          ".dish-card:not([style*='display: none'])"
        ) : [];
        if (visibleDishes.length > 0) {
          title.style.display = "";
          section.style.display = '';
        } else {
          title.style.display = "none";
          section.style.display = 'none';
        }
      });

      // Якщо нічого не знайдено — показуємо повідомлення в menu-sections
      if (!found && filter.length > 0) {
        if (menuSections) {
          const msg = document.createElement('div');
          msg.id = 'no-dish-found-msg';
          msg.className = 'no-dish-found-msg';
          msg.innerHTML = `
            <div class="no-dish-found-msg-title">Результат пошуку:</div>
            <div class="no-dish-found-msg-icon">🔍</div>
            <div class="no-dish-found-msg-text">За запитом <i>${filter}</i> результатів не знайдено</div>
            <button onclick="window.location.reload()" class="no-dish-found-msg-btn">Повернутися до меню</button>
          `;
          menuSections.appendChild(msg);
        }
      }

      // Скролимо до першої знайденої страви з відступом 20px згори
      if (firstVisible) {
        setTimeout(() => {

          const rect = firstVisible.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const y = rect.top + scrollTop - 20;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    });
  }

  // --- Модальне вікно для зображень страв ---
  function setupDishImageModal() {
    const modal = document.getElementById('imgModal');
    const modalImg = document.getElementById('imgModalImg');
    const modalClose = document.getElementById('imgModalClose');

    // Делегування: слухаємо кліки по всім dish-card-img
    document.body.addEventListener('click', function (e) {
      const target = e.target;
      if (target.classList && target.classList.contains('dish-card-img')) {
        modalImg.src = target.src;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Забороняємо скрол сторінки
      }
    });

    // Закриття по кліку на хрестик
    modalClose.addEventListener('click', function () {
      modal.style.display = 'none';
      modalImg.src = '';
      document.body.style.overflow = '';
    });

    // Закриття по кліку поза зображенням
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        modalImg.src = '';
        document.body.style.overflow = '';
      }
    });

    // Закриття по ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        modalImg.src = '';
        document.body.style.overflow = '';
      }
    });
  }
  setupDishImageModal();
});


