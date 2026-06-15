const Login = {
    template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-6">E-Inventory System</h2>
            <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded mb-4">{{ error }}</div>
            <div class="mb-4">
                <label class="block text-gray-700 mb-2">Username</label>
                <input type="text" v-model="username" 
                    class="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Username">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 mb-2">Password</label>
                <input type="password" v-model="password"
                    class="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Password">
            </div>
            <button @click="login"
                class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold">
                Login
            </button>
        </div>
    </div>
    `,
    data() {
        return {
            username: '',
            password: '',
            error: ''
        }
    },
    methods: {
        login() {
            const params = new URLSearchParams();
            params.append('username', this.username);
            params.append('password', this.password);

            axios.post(apiUrl + '/api/login', params)
                .then(response => {
                    const data = response.data;
                    if (data.status === 200) {
                        localStorage.setItem('token', data.data.token);
                        localStorage.setItem('username', data.data.username);
                        this.$router.push('/dashboard');
                    }
                })
                .catch(error => {
                    this.error = 'Username atau password salah!';
                });
        }
    }
};