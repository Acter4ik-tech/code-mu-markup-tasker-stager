document.addEventListener('DOMContentLoaded', function() {
  const burgerCheckbox = document.getElementById('burger-checkbox');
  const leftAside = document.querySelector('.container__aside-main.left');
  const rightAside = document.querySelector('.container__aside-main.right');
  const backgroundForAside = document.getElementById('container__burger-back')
  const body = document.body;
  
  if (burgerCheckbox) {
    burgerCheckbox.addEventListener('change', function() {
      // Добавляем анимацию
      backgroundForAside.style.transition = 'opacity 0.4s ease, visibility 0.4s ease';
      leftAside.style.transition = 'opacity 0.4s ease, visibility 0.4s ease';
      rightAside.style.transition = 'opacity 0.4s ease, visibility 0.4s ease';
      
      // Показываем или скрываем
      if (this.checked) {
        body.classList.add('burger-open');
      } else {
        body.classList.remove('burger-open');
      }
      
      // Убираем transition после анимации
      setTimeout(() => {
        backgroundForAside.style.transition = '';
        leftAside.style.transition = '';
        rightAside.style.transition = '';
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
});