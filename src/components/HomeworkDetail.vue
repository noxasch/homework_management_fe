<script setup>
import TablePagination from './TablePagination.vue';
import TableBody from './TableBody.vue';
import HomeworkTableHeader from './HomeworkTableHeader.vue';
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">

      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <HomeworkTableHeader />
          <TableBody />
          <TablePagination />
      </div>
    </div>
  </section>
</template>
