<script setup>
import { ref, onMounted } from 'vue';
import TablePagination from './TablePagination.vue';
import HomeworksTableBody from './tables/HomeworksTableBody.vue';
import HomeworksTableHeader from './tables/HomeworksTableHeader.vue';
import { useAuthStore } from '@/stores/auth';
import request from '@/lib/request';
import { useRouter } from 'vue-router';
import { useHomeworksStore } from '@/stores/homeworks';

const auth = useAuthStore();
const homeworks = useHomeworksStore();
const router = useRouter();

const subjects = ref([]);

async function fetchSubjects() {
  const response = await request.get('http://127.0.0.1:3000/api/v1/teachers/subjects', {token: auth.token});
  if (response.ok) {
    const responseData = await response.json();
    subjects.value = responseData.subjects;
    console.log(responseData);
  } else {
    auth.clear();
    router.push({ name: 'login' });
  }
  
}

async function fetchHomeworks() {
  const result = await homeworks.get();
  if (!result) {
    auth.clear();
    router.push({ name: 'login' });
  }
}

onMounted(async () => {
  await fetchHomeworks();
  await fetchSubjects();
});
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-5 sm:p-5 md:h-screen">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">

      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
          <HomeworksTableHeader :subjects="subjects" />
          <HomeworksTableBody :homeworks="homeworks.homeworks" />
          <TablePagination />
      </div>
    </div>
  </section>
</template>
