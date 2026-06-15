const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

const apiUrl = 'http://localhost/UAS_Web2/backend-api/public';

// Axios Request Interceptor — token otomatis
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
});

// Axios Response Interceptor — tangkap error 401
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            alert('Sesi habis! Silakan login kembali.');
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    {
        path: '/',
        component: Layout,
        children: [
            { path: 'dashboard', component: Home, meta: { requiresAuth: true } },
            { path: 'barang', component: Barang, meta: { requiresAuth: true } },
            { path: 'kategori', component: Kategori, meta: { requiresAuth: true } },
            { path: 'supplier', component: Supplier, meta: { requiresAuth: true } },
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// Navigation Guard pakai meta requiresAuth
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.meta.requiresAuth && !token) {
        next('/login');
    } else if (to.path === '/login' && token) {
        next('/dashboard');
    } else {
        next();
    }
});

const app = createApp({});
app.use(router);
app.mount('#app');