<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LoginForm from '@/components/LoginForm.vue';

const auth = useAuthStore();
const router = useRouter();

onMounted(() => {
  if (auth.isLoggedIn()) {
    router.push({ name: 'home' });
  }
});
</script>

<template>
  <main>
    <LoginForm />
  </main>
</template>
