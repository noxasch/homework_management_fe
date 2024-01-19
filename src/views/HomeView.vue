<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Homeworks from '@/components/Homeworks.vue';

const auth = useAuthStore();
const router = useRouter();

onMounted(() => {

  if (!auth.isLoggedIn()) {
    router.push({ name: 'login' });
  }
});
</script>

<template>
  <main>
    <Homeworks />
  </main>
</template>
