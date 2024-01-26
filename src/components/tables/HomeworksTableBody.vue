<script setup>
import { storeToRefs } from 'pinia';
import HomeworksTableRow from './HomeworksTableRow.vue';

import { useHomeworksStore } from '@/stores/homeworkStore';
const homeworksStore = useHomeworksStore();
const { homeworks } = storeToRefs(homeworksStore);

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
                        <HomeworksTableRow v-for="homework in homeworks" 
                            :id="homework.id" 
                            :title="homework.title" 
                            :color="homework.color"
                            :subject="homework.subject" 
                            :submission="`${homework.submitted}/${homework.total}`" 
                            :due-date="homework.due_date"/>
                    </tbody>
                </table>
            </div>
</template>
