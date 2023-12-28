window.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('greetingsForm');
    const greetingsList = document.getElementById('greetingsList');

    // Загрузка сохраненных поздравлений из localStorage
    const savedGreetings = JSON.parse(localStorage.getItem('greetings')) || [];

    // Восстановление сохраненных поздравлений
    savedGreetings.forEach(greeting => {
        const newGreeting = createGreetingElement(greeting.message);
        appendGreeting(newGreeting);
    });

    // Обработка отправки формы
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const messageInput = document.getElementById('message');
        const greetingMessage = messageInput.value.trim();

        if (greetingMessage !== '') {
            const newGreeting = createGreetingElement(greetingMessage);
            appendGreeting(newGreeting);

            // Сохранение поздравления в localStorage
            savedGreetings.push({ message: greetingMessage });
            localStorage.setItem('greetings', JSON.stringify(savedGreetings));
        }

        messageInput.value = '';
    });

    // Функция создания элемента списка с поздравлением и кнопкой удаления
    function createGreetingElement(message) {
        const newGreeting = document.createElement('li');
        newGreeting.innerText = message;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Удалить';
        deleteButton.addEventListener('click', function () {
            newGreeting.remove();

            // Удаление поздравления из localStorage
            const index = savedGreetings.findIndex(greeting => greeting.message === message);
            if (index !== -1) {
                savedGreetings.splice(index, 1);
                localStorage.setItem('greetings', JSON.stringify(savedGreetings));
            }
        });

        newGreeting.appendChild(deleteButton);
        return newGreeting;
    }

    // Функция добавления поздравления к списку
    function appendGreeting(greetingElement) {
        greetingsList.appendChild(greetingElement);
    }
});