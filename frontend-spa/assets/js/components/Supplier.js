const Supplier = {
    template: `
    <div>
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-700">Kelola Supplier</h2>
            <button @click="tambah" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                + Tambah Supplier
            </button>
        </div>

        <!-- Modal -->
        <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-96 shadow-xl">
                <h3 class="text-lg font-bold mb-4">{{ formTitle }}</h3>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-1">Nama Supplier</label>
                    <input type="text" v-model="formData.nama_supplier"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-1">Alamat</label>
                    <textarea v-model="formData.alamat" rows="3"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-1">Telpon</label>
                    <input type="text" v-model="formData.telpon"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500">
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
                        <th class="px-4 py-3 text-left text-gray-600">Nama Supplier</th>
                        <th class="px-4 py-3 text-left text-gray-600">Alamat</th>
                        <th class="px-4 py-3 text-left text-gray-600">Telpon</th>
                        <th class="px-4 py-3 text-center text-gray-600">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in supplier" :key="row.id_supplier" class="border-t hover:bg-gray-50">
                        <td class="px-4 py-3">{{ row.id_supplier }}</td>
                        <td class="px-4 py-3">{{ row.nama_supplier }}</td>
                        <td class="px-4 py-3">{{ row.alamat }}</td>
                        <td class="px-4 py-3">{{ row.telpon }}</td>
                        <td class="px-4 py-3 text-center">
                            <button @click="edit(row)" class="bg-yellow-400 text-white px-3 py-1 rounded text-sm mr-1 hover:bg-yellow-500">Edit</button>
                            <button @click="hapus(index, row.id_supplier)" class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data() {
        return {
            supplier: [],
            showForm: false,
            formTitle: 'Tambah Supplier',
            formData: { id_supplier: null, nama_supplier: '', alamat: '', telpon: '' }
        }
    },
    mounted() { this.loadData(); },
    methods: {
        loadData() {
            axios.get(apiUrl + '/api/supplier').then(r => this.supplier = r.data);
        },
        tambah() {
            this.showForm = true;
            this.formTitle = 'Tambah Supplier';
            this.formData = { id_supplier: null, nama_supplier: '', alamat: '', telpon: '' };
        },
        edit(row) {
            this.showForm = true;
            this.formTitle = 'Edit Supplier';
            this.formData = { ...row };
        },
        hapus(index, id) {
            if (confirm('Yakin menghapus data?')) {
                axios.delete(apiUrl + '/api/supplier/' + id).then(() => {
                    this.supplier.splice(index, 1);
                });
            }
        },
        saveData() {
            const params = new URLSearchParams();
            params.append('nama_supplier', this.formData.nama_supplier);
            params.append('alamat', this.formData.alamat);
            params.append('telpon', this.formData.telpon);

            if (this.formData.id_supplier) {
                axios.post(apiUrl + '/api/supplier/' + this.formData.id_supplier + '/edit', params)
                    .then(() => { this.loadData(); this.showForm = false; });
            } else {
                axios.post(apiUrl + '/api/supplier', params)
                    .then(() => { this.loadData(); this.showForm = false; });
            }
        }
    }
};