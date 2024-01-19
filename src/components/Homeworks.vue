<script setup>
import { ref, onMounted } from 'vue';
import TablePagination from './TablePagination.vue';
import HomeworksTableBody from './tables/HomeworksTableBody.vue';
import HomeworksTableHeader from './tables/HomeworksTableHeader.vue';
import { useAuthStore } from '@/stores/auth';
import request from '@/lib/request';

const auth = useAuthStore();

const subjects = ref([]);
const homeworks = ref([]);
const paginationMeta = ref({});

async function fetchSubjects() {
  const response = await request.get('http://127.0.0.1:3000/api/v1/teachers/subjects', {token: auth.token});
  const responseData = await response.json();
  subjects.value = responseData.subjects;
}

async function fetchHomeworks() {
  const response = await request.get('http://127.0.0.1:3000/api/v1/teachers/homeworks', {token: auth.token});
  const responseData = await response.json();
  homeworks.value = responseData.homeworks;
  paginationMeta.value = responseData.meta;
  console.log(responseData);
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
          <HomeworksTableBody :homeworks="homeworks" />
          <TablePagination />
      </div>
    </div>
  </section>
</template>
