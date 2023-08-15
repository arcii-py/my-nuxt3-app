<template>
    <section class="hero">

        Wedding in {{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds
    </section>
</template>
  
<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
    setup() {
        // Parse the fixed date
        const [day, month, year] = '21.10.2023'.split('.').map(Number);
        const endTime = new Date(year, month - 1, day); // month is 0-indexed in JavaScript

        const days = ref(0);
        const hours = ref(0);
        const minutes = ref(0);
        const seconds = ref(0);

        const updateCountdown = () => {
            const now = new Date();
            const timeDiff = endTime - now;

            days.value = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            hours.value = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes.value = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            seconds.value = Math.floor((timeDiff % (1000 * 60)) / 1000);
        };

        onMounted(() => {
            updateCountdown(); // Initial update
            const interval = setInterval(updateCountdown, 1000);

            onUnmounted(() => {
                clearInterval(interval);
            });
        });

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }
}
</script>
  
  
<style scoped>
.hero {
    background-color: #007BFF;
    color: white;
    padding: 2rem;
    text-align: center;
    font-size: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 40rem;
    margin: 2.5rem auto;
}

.countdown-item {
    display: block;
    margin: 0.5rem 0;
}

@media (min-width: 768px) {
    .hero {
        font-size: 2rem;
    }
    .countdown-item {
        display: inline-block;
        margin: 0 1rem;
    }
}
</style>