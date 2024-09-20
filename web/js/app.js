import Router from '../router/router.js';

const router = new Router(document.getElementById('app'));

// Define routes
router.addRoute('/', {
    template: '../pages/home.html',
    script: '../js/home.js'
});

// 404 route
router.addRoute('*', {
    template: '/templates/404.html',
    script: '/js/404.js'
});