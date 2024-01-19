<script setup>
import HomeworksTableRow from './HomeworksTableRow.vue';
</script>

<template>
  <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-4 py-3">Title</th>
                            <th scope="col" class="px-4 py-3">Subject</th>
                            <th scope="col" class="px-4 py-3">Due Date</th>
                            <th scope="col" class="px-4 py-3">Submission</th>
                            <th scope="col" class="px-4 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <HomeworksTableRow :id="1" title="Calculus" subject="Mathematics" submission="1/20" due-date="24-01-2024" />
                    </tbody>
                </table>
            </div>
</template>
