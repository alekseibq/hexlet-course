<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const collapsed = ref(false);

const navItems = [
  { label: "Dashboard", icon: "pi pi-home", to: "/" },
  { label: "Users", icon: "pi pi-users", to: "/users" },
];
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <aside
      :class="[
        'flex flex-col bg-gray-900 text-white transition-all duration-200 shrink-0 z-10',
        collapsed ? 'w-16' : 'w-60',
      ]"
    >
      <div class="flex items-center h-16 px-4 border-b border-gray-700">
        <i class="pi pi-cog text-xl"></i>
        <span v-if="!collapsed" class="ml-3 font-semibold">Admin</span>
      </div>
      <nav class="flex-1 py-4 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            'flex items-center px-4 py-2.5 text-sm transition-colors',
            route.path === item.to
              ? 'bg-gray-700 text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          ]"
        >
          <i :class="[item.icon, 'text-lg w-6 text-center']"></i>
          <span v-if="!collapsed" class="ml-3">{{ item.label }}</span>
        </router-link>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header
        class="flex items-center h-16 px-6 bg-white border-b border-gray-200 gap-4 shrink-0"
      >
        <button
          @click="collapsed = !collapsed"
          class="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <i class="pi pi-bars"></i>
        </button>
        <div class="flex-1"></div>
        <div class="flex items-center gap-3">
          <i
            class="pi pi-bell text-lg text-gray-500 cursor-pointer hover:text-gray-700 transition"
          ></i>
          <div
            class="flex items-center justify-center w-8 h-8 text-sm font-medium bg-gray-300 rounded-full"
          >
            A
          </div>
        </div>
      </header>
      <main class="flex-1 overflow-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
