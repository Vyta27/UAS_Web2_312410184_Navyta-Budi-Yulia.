const Kategori = {
    template: `
    <div>
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-700">Kelola Kategori</h2>
            <button @click="tambah" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                + Tambah Kategori
            </button>
        </div>

        <!-- Modal -->
        <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-96 shadow-xl">
                <h3 class="text-lg font-bold mb-4">{{ formTitle }}</h3>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-1">Nama Kategori</label>
                    <input type="text" v-model="formData.nama_kategori"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-1">Deskripsi</label>
                    <textarea v-model="formData.deskripsi" rows="3"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <div class="flex gap-2 justify-end">
                    <button @click="showForm = false" class="px-4 py-2 border rounded hover:bg-gray-100">Batal</button>
                    <button @click="saveData" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Simpan</button>
                </div>
            </div>
        </div>

        <!-- Tabel -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-3 text-left text-gray-600">ID</th>
                        <th class="px-4 py-3 text-left text-gray-600">Nama Kategori</th>
                        <th class="px-4 py-3 text-left text-gray-600">Deskripsi</th>
                        <th class="px-4 py-3 text-center text-gray-600">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in kategori" :key="row.id_kategori" class="border-t hover:bg-gray-50">
                        <td class="px-4 py-3">{{ row.id_kategori }}</td>
                        <td class="px-4 py-3">{{ row.nama_kategori }}</td>
                        <td class="px-4 py-3">{{ row.deskripsi }}</td>
                        <td class="px-4 py-3 text-center">
                            <button @click="edit(row)" class="bg-yellow-400 text-white px-3 py-1 rounded text-sm mr-1 hover:bg-yellow-500">Edit</button>
                            <button @click="hapus(index, row.id_kategori)" class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data() {
        return {
            kategori: [],
            showForm: false,
            formTitle: 'Tambah Kategori',
            formData: { id_kategori: null, nama_kategori: '', deskripsi: '' }
        }
    },
    mounted() { this.loadData(); },
    methods: {
        loadData() {
            axios.get(apiUrl + '/api/kategori').then(r => this.kategori = r.data);
        },
        tambah() {
            this.showForm = true;
            this.formTitle = 'Tambah Kategori';
            this.formData = { id_kategori: null, nama_kategori: '', deskripsi: '' };
        },
        edit(row) {
            this.showForm = true;
            this.formTitle = 'Edit Kategori';
            this.formData = { ...row };
        },
        hapus(index, id) {
            if (confirm('Yakin menghapus data?')) {
                axios.delete(apiUrl + '/api/kategori/' + id).then(() => {
                    this.kategori.splice(index, 1);
                });
            }
        },
        saveData() {
            const params = new URLSearchParams();
            params.append('nama_kategori', this.formData.nama_kategori);
            params.append('deskripsi', this.formData.deskripsi);

            if (this.formData.id_kategori) {
                axios.post(apiUrl + '/api/kategori/' + this.formData.id_kategori + '/edit', params)
                    .then(() => { this.loadData(); this.showForm = false; });
            } else {
                axios.post(apiUrl + '/api/kategori', params)
                    .then(() => { this.loadData(); this.showForm = false; });
            }
        }
    }
};