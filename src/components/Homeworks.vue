<script setup>
import TablePagination from './TablePagination.vue';
import HomeworksTableBody from './tables/HomeworksTableBody.vue';
import HomeworksTableHeader from './tables/HomeworksTableHeader.vue';
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-5 sm:p-5 md:h-screen">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">

      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
          <HomeworksTableHeader />
          <HomeworksTableBody />
          <TablePagination />
      </div>
    </div>
  </section>
</template>
