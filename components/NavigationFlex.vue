<template>
    <header class="header">
        <nuxt-link to="/" class="logo">MOTIV-e Me</nuxt-link>
        <nav>
            <nuxt-link to="/">Home</nuxt-link>
            <nuxt-link to="/about">About</nuxt-link>
        </nav>
    </header>
</template>
  
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #333;
}

.logo {
    color: #fff;
    font-size: 1.5rem;
    text-decoration: none;
}

nav {
    display: flex;
    gap: 1rem;
}

nav a {
    color: #fff;
    text-decoration: none;
}

nav a:hover {
    text-decoration: underline;
}
</style>
  