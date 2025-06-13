(function() {
    // Функция для обнаружения открытия DevTools
    function detectDevTools() {
        const threshold = 160; // Порог для обнаружения открытия (примерное значение)
        const devtools = /./;
        devtools.toString = function() {
            this.opened = true;
        };
        console.log(devtools);
        return devtools.opened;
    }

    // Запрет открытия DevTools через F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U (просмотр исходного кода)
    document.addEventListener('keydown', function(event) {
        // F12
        if (event.key === 'F12') {
            event.preventDefault();
            console.warn('DevTools F12 заблокирован.');
        }

        // Ctrl+Shift+I (инспектор элементов)
        if (event.ctrlKey && event.shiftKey && event.key === 'I') {
            event.preventDefault();
            console.warn('DevTools Ctrl+Shift+I заблокирован.');
        }

        // Ctrl+Shift+J (консоль)
        if (event.ctrlKey && event.shiftKey && event.key === 'J') {
            event.preventDefault();
            console.warn('DevTools Ctrl+Shift+J заблокирован.');
        }

        // Ctrl+U (просмотр исходного кода)
        if (event.ctrlKey && event.key === 'U') {
            event.preventDefault();
            console.warn('Просмотр исходного кода Ctrl+U заблокирован.');
        }

        // Cmd+Option+I (Mac)
        if (event.metaKey && event.altKey && event.key === 'I') {
            event.preventDefault();
            console.warn('DevTools Cmd+Option+I заблокирован.');
        }

        // Cmd+Option+J (Mac)
        if (event.metaKey && event.altKey && event.key === 'J') {
            event.preventDefault();
            console.warn('DevTools Cmd+Option+J заблокирован.');
        }
    });

    // Запрет открытия DevTools через контекстное меню (правая кнопка мыши)
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        console.warn('Контекстное меню заблокировано.');
    });

    // Обнаружение изменения размеров окна (часто происходит при открытии DevTools)
    // и проверка на открытые DevTools
    let previousWidth = window.innerWidth;
    let previousHeight = window.innerHeight;

    window.addEventListener('resize', function() {
        if (detectDevTools()) {
            console.warn('DevTools, вероятно, открыты (изменение размеров окна).');
            // Здесь можно добавить действия, например, перенаправление или закрытие страницы
            // window.location.href = 'about:blank';
        }
        previousWidth = window.innerWidth;
        previousHeight = window.innerHeight;
    });

    // Обнаружение DevTools через setTimeout (для некоторых браузеров)
    // Эта техника работает, потому что `console.clear()` не работает, если DevTools закрыты
    // и `console.profile()` вызывает ошибку, если DevTools не открыты
    setInterval(function() {
        const startTime = new Date();
        debugger; // Остановит выполнение, если DevTools открыты
        const endTime = new Date();
        if (endTime - startTime > 100) { // Если время выполнения сильно увеличилось, DevTools, возможно, открыты
            console.warn('DevTools, возможно, открыты (debugger detection).');
            // window.location.href = 'about:blank';
        }

        try {
            console.clear();
            console.profile();
            console.profileEnd();
        } catch (e) {
            console.warn('DevTools, возможно, открыты (console methods detection).');
            // window.location.href = 'about:blank';
        }
    }, 1000); // Проверять каждую секунду

})();
