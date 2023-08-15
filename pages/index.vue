<template>
  <div>
  <NavigationFlex />
  <HeroCard />
  <SendNotification />
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import SendNotification from '~/components/SendNotification.vue';

export default Vue.extend({
    name: 'IndexPage',
    components: { SendNotification }
})
</script>
