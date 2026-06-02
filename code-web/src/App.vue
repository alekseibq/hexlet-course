<template>
  <main class="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 sm:px-6 lg:px-8">
    <section class="mx-auto max-w-3xl rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
      <div class="space-y-8">
        <div class="flex flex-col items-center gap-6 text-center">
          <img src="./assets/space-ship.svg" alt="Space ship" class="h-56 w-auto" />
          <div>
            <p class="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Space mission</p>
            <h1 class="mt-3 text-4xl font-semibold text-white sm:text-5xl">Counter</h1>
            <p class="mt-4 text-slate-400 sm:text-lg">Нажмите кнопку, чтобы увеличить счётчик. Просто, красиво и космически.</p>
          </div>
        </div>

        <div class="rounded-3xl bg-slate-950/80 p-6 text-center ring-1 ring-slate-700/60 sm:p-8">
          <p class="text-sm uppercase tracking-[0.24em] text-slate-400">Нажатий</p>
          <p class="mt-4 text-7xl font-semibold text-cyan-300">{{ count }}</p>
          <button
            @click="increment"
            class="mt-8 inline-flex items-center justify-center rounded-full bg-cyan-400 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-400/30"
          >
            Add
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);

const increment = () => {
  count.value += 1;
};
</script>
