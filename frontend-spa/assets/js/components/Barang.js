const Barang = {
    template: `
    <div>
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-700">Kelola Barang</h2>
            <button @click="tambah" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                + Tambah Barang
            </button>
        </div>

        <!-- Modal -->
        <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-96 shadow-xl">
                <h3 class="text-lg font-bold mb-4">{{ formTitle }}</h3>
                <div class="mb-3">
                    <label class="block text-gray-700 mb-1">Nama Barang</label>
                    <input type="text" v-model="formData.nama_barang"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500">
                </div>
                <div class="mb-3">
                    <label class="block text-gray-700 mb-1">Stok</label>
                    <input type="number" v-model="formData.stok"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500">
                </div>
                <div class="mb-3">
                    <label class="block text-gray-700 mb-1">Harga</label>
                    <input type="number" v-model="formData.harga"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500">
                </div>
                <div class="mb-3">
                    <label class="block text-gray-700 mb-1">Kategori</label>
                    <select v-model="formData.id_kategori"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500">
                        <option value="">-- Pilih Kategori --</option>
                        <option v-for="k in kategori" :value="k.id_kategori">{{ k.nama_kategori }}</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-1">Supplier</label>
                    <select v-model="formData.id_supplier"
                        class="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500">
                        <option value="">-- Pilih Supplier --</option>
                        <option v-for="s in supplier" :value="s.id_supplier">{{ s.nama_supplier }}</option>
                    </select>
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
                        <th class="px-4 py-3 text-left text-gray-600">Nama Barang</th>
                        <th class="px-4 py-3 text-left text-gray-600">Stok</th>
                        <th class="px-4 py-3 text-left text-gray-600">Harga</th>
                        <th class="px-4 py-3 text-left text-gray-600">Kategori</th>
                        <th class="px-4 py-3 text-left text-gray-600">Supplier</th>
                        <th class="px-4 py-3 text-center text-gray-600">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in barang" :key="row.id_barang" class="border-t hover:bg-gray-50">
                        <td class="px-4 py-3">{{ row.id_barang }}</td>
                        <td class="px-4 py-3">{{ row.nama_barang }}</td>
                        <td class="px-4 py-3">{{ row.stok }}</td>
                        <td class="px-4 py-3">Rp {{ Number(row.harga).toLocaleString('id-ID') }}</td>
                        <td class="px-4 py-3">{{ row.nama_kategori }}</td>
                        <td class="px-4 py-3">{{ row.nama_supplier }}</td>
                        <td class="px-4 py-3 text-center">
                            <button @click="edit(row)" class="bg-yellow-400 text-white px-3 py-1 rounded text-sm mr-1 hover:bg-yellow-500">Edit</button>
                            <button @click="hapus(index, row.id_barang)" class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data() {
        return {
            barang: [],
            kategori: [],
            supplier: [],
            showForm: false,
            formTitle: 'Tambah Barang',
            formData: { id_barang: null, nama_barang: '', stok: 0, harga: 0, id_kategori: '', id_supplier: '' }
        }
    },
    mounted() {
        this.loadData();
        axios.get(apiUrl + '/api/kategori').then(r => this.kategori = r.data);
        axios.get(apiUrl + '/api/supplier').then(r => this.supplier = r.data);
    },
    methods: {
        loadData() {
            axios.get(apiUrl + '/api/barang').then(r => this.barang = r.data);
        },
        tambah() {
            this.showForm = true;
            this.formTitle = 'Tambah Barang';
            this.formData = { id_barang: null, nama_barang: '', stok: 0, harga: 0, id_kategori: '', id_supplier: '' };
        },
        edit(row) {
            this.showForm = true;
            this.formTitle = 'Edit Barang';
            this.formData = { ...row };
        },
        hapus(index, id) {
            if (confirm('Yakin menghapus data?')) {
                axios.delete(apiUrl + '/api/barang/' + id).then(() => {
                    this.barang.splice(index, 1);
                });
            }
        },
        saveData() {
            const params = new URLSearchParams();
            params.append('nama_barang', this.formData.nama_barang);
            params.append('stok', this.formData.stok);
            params.append('harga', this.formData.harga);
            params.append('id_kategori', this.formData.id_kategori);
            params.append('id_supplier', this.formData.id_supplier);

            if (this.formData.id_barang) {
                axios.post(apiUrl + '/api/barang/' + this.formData.id_barang + '/edit', params)
                    .then(() => { this.loadData(); this.showForm = false; });
            } else {
                axios.post(apiUrl + '/api/barang', params)
                    .then(() => { this.loadData(); this.showForm = false; });
            }
        }
    }
};