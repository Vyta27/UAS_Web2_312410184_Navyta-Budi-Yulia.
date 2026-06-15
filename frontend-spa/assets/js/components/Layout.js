const Layout = {
    template: `
    <div>
        <nav class="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
            <h1 class="text-xl font-bold">E-Inventory System</h1>
            <div class="flex gap-4 items-center">
                <router-link to="/dashboard" class="hover:text-blue-200">Beranda</router-link>
                <router-link to="/barang" class="hover:text-blue-200">Barang</router-link>
                <router-link to="/kategori" class="hover:text-blue-200">Kategori</router-link>
                <router-link to="/supplier" class="hover:text-blue-200">Supplier</router-link>
                <span class="text-blue-200">|</span>
                <span class="text-sm">{{ username }}</span>
                <button @click="logout" class="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm">
                    Logout
                </button>
            </div>
        </nav>
        <main class="p-6">
            <router-view></router-view>
        </main>
    </div>
    `,
    data() {
        return {
            username: localStorage.getItem('username') || 'Admin'
        }
    },
    methods: {
        logout() {
            if (confirm('Yakin ingin logout?')) {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                this.$router.push('/login');
            }
        }
    }
};