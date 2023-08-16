<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            message: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                });

                const data = await response.json();
                this.message = data.message;

                if (data.success) {
                    // Redirect to dashboard or main page after successful login
                    this.$router.push('/dashboard');
                }
            } catch (error) {
                this.message = "An error occurred.";
            }
        }
    }
}
</script>