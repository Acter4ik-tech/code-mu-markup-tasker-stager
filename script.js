const buttonFooter = document.getElementById('footer-button')
const menuFooter = document.querySelector('.footer__menu')

const burgerCheckbox = document.getElementById('burger-checkbox');
const footerSpace = document.querySelector('footer')
const leftAside = document.querySelector('.container__aside-main.left');
const rightAside = document.querySelector('.container__aside-main.right');
const backgroundForAside = document.getElementById('container__burger-back')

const mainContainer = document.querySelector('.container__main')

const conrainerAllElements = document.querySelector('.container');

const body = document.body;


// New Burger Menu


let mobileWrapper = document.getElementById('mobile-aside-container');

function isElementHidden(element) {
  return window.getComputedStyle(element).display === 'none';
}

function updateAsidePosition() {
  if (!mobileWrapper) return;
  
  if (isElementHidden(mobileWrapper)) {
    // Если контейнер скрыт - возвращаем aside в .container
    if (leftAside && rightAside) {
      conrainerAllElements.insertBefore(leftAside, mainContainer);
      conrainerAllElements.appendChild(rightAside);
    }
  } else {
    // Если контейнер видим - перемещаем aside в контейнер
    if (leftAside && rightAside) {
      mobileWrapper.appendChild(leftAside);
      mobileWrapper.appendChild(rightAside);
    }
  }
}

//function for checkbox (burger menu)
  
  
if (burgerCheckbox) {
  burgerCheckbox.addEventListener('change', function() {
    // Добавляем анимацию
    backgroundForAside.style.transition = 'opacity 0.4s ease, visibility 0.4s ease';
    mobileWrapper.style.transition = 'opacity 0.4s ease, visibility 0.4s ease';

    // leftAside.style.transition = 'opacity 0.4s ease, visibility 0.4s ease';
    // rightAside.style.transition = 'opacity 0.4s ease, visibility 0.4s ease';
    
    // Показываем или скрываем
    if (this.checked) {
      body.classList.add('burger-open');
      footerSpace.classList.add('hidden');
    } else {
      body.classList.remove('burger-open');
      footerSpace.classList.remove('hidden')
    }

    updateAsidePosition();

    
    // Убираем transition после анимации
    setTimeout(() => {
      backgroundForAside.style.transition = '';

      mobileWrapper.style.transition = '';
      // leftAside.style.transition = '';
      // rightAside.style.transition = '';
    }, 400);
  });
  
  // Принудительно скрываем при загрузке (если чекбокс не отмечен)
  if (!burgerCheckbox.checked) {
    body.classList.remove('burger-open');
  }
  
  // Отключаем анимацию при ресайзе
  let resizeTimer;
  window.addEventListener('resize', function() {
    // Отключаем transition на время ресайза
    leftAside.style.transition = 'none';
    rightAside.style.transition = 'none';
    
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Возвращаем возможность анимации после ресайза
      leftAside.style.transition = '';
      rightAside.style.transition = '';
    }, 200);
  });
}

// function for animating the footer by clicking a button

buttonFooter.addEventListener('click', () => {
  if (menuFooter.classList.contains('active')) {

    menuFooter.classList.remove('active')
    setTimeout(() => {
      menuFooter.style.display = 'none'
      buttonFooter.textContent = 'More…'
    }, 400)

  } else {
    menuFooter.style.display = 'grid'
    setTimeout(() => {
      menuFooter.classList.add('active')
      buttonFooter.textContent = 'Hide…'
    }, 400)
  }
})

// Fix for the issue with the footer disappearing when resizing after a button

function handleResize() {
  if (window.innerWidth > 501) {
    // на больших экранах показываем меню всегда
    menuFooter.style.display = 'flex'
  } else if (window.innerWidth <= 500) {
    menuFooter.style.display = 'none'
  }
}

// запуск при загрузке страницы
handleResize()

// слушаем изменение размера окна
window.addEventListener('resize', handleResize)