<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div class="p-6 bg-white rounded-lg border border-gray-200">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
            <i class="pi pi-users text-blue-600 text-xl"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Total Users</p>
            <p class="text-2xl font-bold text-gray-900">5</p>
          </div>
        </div>
      </div>
      <div class="p-6 bg-white rounded-lg border border-gray-200">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
            <i class="pi pi-check-circle text-green-600 text-xl"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Active</p>
            <p class="text-2xl font-bold text-gray-900">5</p>
          </div>
        </div>
      </div>
      <div class="p-6 bg-white rounded-lg border border-gray-200">
        <div class="flex items-center gap-3">
          <button
            @click="counter.increment"
            class="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg hover:bg-purple-200 transition"
          >
            <i class="pi pi-chart-bar text-purple-600 text-xl"></i>
          </button>
          <div>
            <p class="text-sm text-gray-500">Количество нажатий</p>
            <p class="text-2xl font-bold text-gray-900">{{ counter.count }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
