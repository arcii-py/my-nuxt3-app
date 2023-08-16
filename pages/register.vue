<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="register">
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Register</button>
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
        async register() {
            try {
                const response = await fetch("/api/register", {
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
                    // Redirect to login or dashboard after successful registration
                    this.$router.push('/login');
                }
            } catch (error) {
                this.message = "An error occurred.";
            }
        }
    }
}
</script>