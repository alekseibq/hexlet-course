<script setup lang="ts">
import { useCounterStore } from "../stores/counter";

defineProps<{ msg: string }>();

const counter = useCounterStore();
</script>

<template>
  <div class="text-center space-y-4">
    <h1 class="text-4xl font-bold text-gray-800">{{ msg }}</h1>
    <p class="text-gray-600">Vue 3 + Vite + Tailwind + Pinia + TypeScript</p>
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      @click="counter.increment"
    >
      Count: {{ counter.count }}
    </button>
  </div>
</template>
