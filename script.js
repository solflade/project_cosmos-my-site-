// Ожидаем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Галерея загружена!');
    
    // 1. ПОДСЧЁТ КОЛИЧЕСТВА ИЗОБРАЖЕНИЙ
    function updateImageCounter() {
        const visibleCards = document.querySelectorAll('.image-card:not(.hidden)');
        const counter = document.getElementById('image-counter');
        if (counter) {
            counter.textContent = visibleCards.length;
        }
        console.log('Видимых изображений:', visibleCards.length);
    }
    
    // 2. НАСТРОЙКА ЛАЙКОВ
    let totalLikes = 0;
    const totalLikesElement = document.getElementById('total-likes');
    
    function setupLikes() {
        const likeButtons = document.querySelectorAll('.like-btn');
        
        likeButtons.forEach(button => {
            button.removeEventListener('click', handleLikeClick);
            button.addEventListener('click', handleLikeClick);
        });
    }
    
    function handleLikeClick(event) {
        event.stopPropagation();
        const button = this;
        const likesSpan = button.querySelector('.like-count');
        let currentLikes = parseInt(likesSpan.textContent);
        
        if (button.classList.contains('liked')) {
            // Убираем лайк
            currentLikes--;
            totalLikes--;
            button.classList.remove('liked');
            button.querySelector('i').classList.remove('fas');
            button.querySelector('i').classList.add('far');
        } else {
            // Добавляем лайк
            currentLikes++;
            totalLikes++;
            button.classList.add('liked');
            button.querySelector('i').classList.remove('far');
            button.querySelector('i').classList.add('fas');
        }
        
        // Обновляем счётчики
        likesSpan.textContent = currentLikes;
        if (totalLikesElement) {
            totalLikesElement.textContent = totalLikes;
        }
        
        // Анимация кнопки
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
        
        console.log('Всего лайков:', totalLikes);
    }
    
    // 3. ФИЛЬТРАЦИЯ ПО КАТЕГОРИЯМ
    function setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const imageCards = document.querySelectorAll('.image-card');
        
        filterButtons.forEach(btn => {
            btn.removeEventListener('click', handleFilterClick);
            btn.addEventListener('click', handleFilterClick);
        });
        
        function handleFilterClick() {
            const filterValue = this.getAttribute('data-filter');
            
            // Обновляем активную кнопку
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Фильтруем карточки
            imageCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
            
            // Обновляем счётчик изображений
            updateImageCounter();
            console.log('Фильтр:', filterValue);
        }
    }
    
    // 5. ФУНКЦИЯ ДЛЯ УВЕЛИЧЕНИЯ ИЗОБРАЖЕНИЯ (ZOOM)
    const zoomBtns = document.querySelectorAll('.zoom-btn');
    zoomBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.image-card');
            const img = card.querySelector('.gallery-img');
            const title = card.querySelector('.image-title').textContent;
            const description = card.querySelector('.image-description').textContent;
            
            // Создаём модальное окно
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                cursor: pointer;
            `;
            
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                text-align: center;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modalImg.style.cssText = `
                max-width: 100%;
                max-height: 70vh;
                border-radius: 10px;
                box-shadow: 0 5px 30px rgba(0,0,0,0.5);
            `;
            
            const modalTitle = document.createElement('h3');
            modalTitle.textContent = title;
            modalTitle.style.cssText = `
                color: white;
                margin-top: 15px;
                font-size: 20px;
            `;
            
            const modalDesc = document.createElement('p');
            modalDesc.textContent = description;
            modalDesc.style.cssText = `
                color: #ccc;
                margin-top: 8px;
                font-size: 14px;
            `;
            
            modalContent.appendChild(modalImg);
            modalContent.appendChild(modalTitle);
            modalContent.appendChild(modalDesc);
            modal.appendChild(modalContent);
            
            document.body.appendChild(modal);
            
            // Закрытие по клику
            modal.addEventListener('click', () => {
                modal.remove();
            });
            
            // Закрытие по ESC
            document.addEventListener('keydown', function closeOnEsc(e) {
                if (e.key === 'Escape') {
                    if (document.body.contains(modal)) {
                        modal.remove();
                    }
                    document.removeEventListener('keydown', closeOnEsc);
                }
            });
            
            console.log('Открыто:', title);
        });
    });
    
    // 6. ИНИЦИАЛИЗАЦИЯ ВСЕХ ФУНКЦИЙ
    function init() {
        updateImageCounter();
        setupLikes();
        setupFilters();
        setupViewToggle();
        
        // Добавляем класс hidden в CSS
        if (!document.querySelector('#image-gallery .hidden')) {
            const style = document.createElement('style');
            style.textContent = '.hidden { display: none !important; }';
            document.head.appendChild(style);
        }
        
        console.log('JavaScript работает правильно!');
    }
    
    init();
});






// Обработка формы обратной связи
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedback-form');
    const successMessage = document.getElementById('form-success');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Простая валидация
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const consent = document.getElementById('consent');
            
            let isValid = true;
            
            if (!name.value.trim()) {
                name.style.borderColor = '#ff4757';
                isValid = false;
            } else {
                name.style.borderColor = '#28a745';
            }
            
            if (!email.value.trim() || !email.validity.valid) {
                email.style.borderColor = '#ff4757';
                isValid = false;
            } else {
                email.style.borderColor = '#28a745';
            }
            
            if (!message.value.trim()) {
                message.style.borderColor = '#ff4757';
                isValid = false;
            } else {
                message.style.borderColor = '#28a745';
            }
            
            if (!consent.checked) {
                isValid = false;
                consent.parentElement.style.border = '1px solid #ff4757';
                consent.parentElement.style.borderRadius = '8px';
                consent.parentElement.style.padding = '8px';
            } else {
                consent.parentElement.style.border = 'none';
                consent.parentElement.style.padding = '0';
            }
            
            if (isValid) {
                // Показываем сообщение об успехе
                successMessage.classList.add('show');
                
                // Очищаем форму
                form.reset();
                
                // Сбрасываем стили полей
                name.style.borderColor = '#e0e0e0';
                email.style.borderColor = '#e0e0e0';
                message.style.borderColor = '#e0e0e0';
                
                // Скрываем сообщение через 5 секунд
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
                
                console.log('Форма отправлена!');
            } else {
                console.log('Ошибка валидации формы');
            }
        });
        
        // Убираем красную рамку при вводе
        const inputs = document.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#e0e0e0';
                }
            });
        });
        
        // Чекбокс - убираем подсветку
        const checkbox = document.getElementById('consent');
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    this.parentElement.style.border = 'none';
                    this.parentElement.style.padding = '0';
                }
            });
        }
    }
});