document.addEventListener("DOMContentLoaded", () => {
    const parallax = document.querySelector(".parallax");
    const formContainer = document.getElementById('formContainer');
    const welcomeSection = document.querySelector('.welcome');
    let currentStep = 0; // Текущий шаг
    const steps = document.querySelectorAll('.form-step');
    const submitButton = document.getElementById('submitButton');

    // Эффект размытия при прокрутке
    document.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            parallax.classList.add("scrolled"); // Добавить размытие
        } else {
            parallax.classList.remove("scrolled"); // Убрать размытие
        }
    });

    // Функция для отображения формы
    window.startForm = function () {
        if (welcomeSection && formContainer) {
            welcomeSection.style.display = 'none'; // Скрыть приветствие
            formContainer.style.display = 'block'; // Показать форму
        }
    };

    // Функция для отображения текущего шага
    function showStep(step) {
        steps.forEach((el, index) => {
            el.classList.toggle('active', index === step); // Показать только текущий шаг
        });

        // Управление видимостью кнопки "Отправить"
        if (step === steps.length - 1) {
            submitButton.style.display = 'block'; // Показать кнопку "Отправить" на последнем шаге
        } else {
            submitButton.style.display = 'none'; // Скрыть кнопку "Отправить" на остальных шагах
        }
    }

    // Обработчик кнопки "Далее"
    window.nextStep = function () {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep); // Показать следующий шаг
        }
    };

    // Обработчик кнопки "Назад"
    window.prevStep = function () {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep); // Вернуться к предыдущему шагу
        }
    };

    // Обработка отправки формы
    document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        birthDate: document.getElementById('birthDate').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        education: document.getElementById('education').value,
    };

    // Отправка данных на сервер
    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (response.ok) {
                alert('Данные успешно сохранены!');
                document.getElementById('registrationForm').reset();
                location.reload();
            } else {
                alert('Ошибка сохранения данных.');
            }
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
});


    // Инициализация первого шага
    showStep(currentStep);
});
