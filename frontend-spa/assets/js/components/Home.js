const Home = {
    template: `
    <div>
        <div v-if="!isLoggedIn" class="bg-blue-600 text-white py-16 text-center mb-8 rounded-lg">
            <h1 class="text-4xl font-bold mb-4">E-Inventory System</h1>
            <p class="text-blue-100 text-lg mb-6">Sistem Manajemen Inventaris Barang Modern</p>
            <router-link to="/login" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">
                Login ke Dashboard
            </router-link>
        </div>

        <h2 class="text-2xl font-bold text-gray-700 mb-6">
            {{ isLoggedIn ? 'Dashboard Admin' : 'Ringkasan Data' }}
        </h2>
        <div class="grid grid-cols-3 gap-6">
            <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                <p class="text-gray-500 text-sm">Total Barang</p>
                <p class="text-3xl font-bold text-blue-600">{{ totalBarang }}</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                <p class="text-gray-500 text-sm">Total Kategori</p>
                <p class="text-3xl font-bold text-green-600">{{ totalKategori }}</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
                <p class="text-gray-500 text-sm">Total Supplier</p>
                <p class="text-3xl font-bold text-purple-600">{{ totalSupplier }}</p>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            totalBarang: 0,
            totalKategori: 0,
            totalSupplier: 0,
            isLoggedIn: !!localStorage.getItem('token')
        }
    },
    mounted() {
        axios.get(apiUrl + '/api/barang').then(r => this.totalBarang = r.data.length);
        axios.get(apiUrl + '/api/kategori').then(r => this.totalKategori = r.data.length);
        axios.get(apiUrl + '/api/supplier').then(r => this.totalSupplier = r.data.length);
    }
};