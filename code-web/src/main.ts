import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import router from "./router";
import App from "./App.vue";
import "primeicons/primeicons.css";
import "./style.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  unstyled: true,
  pt: {
    button: {
      root: "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none border-0",
      label: "font-medium",
    },
    inputtext: {
      root: "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-50 disabled:cursor-not-allowed",
    },
    select: {
      root: "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer",
      overlay: "bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50",
      list: "py-1 overflow-auto",
      option: "px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer",
      optionSelected: "bg-blue-50 text-blue-700",
    },
    textarea: {
      root: "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-y",
    },
    datatable: {
      root: "w-full overflow-auto",
      table: "w-full border-collapse",
      header: "bg-gray-50",
      headerRow: "border-b border-gray-200",
      headerCell: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
      bodyRow: "border-b border-gray-200 hover:bg-gray-50 transition",
      bodyCell: "px-4 py-3 text-sm text-gray-900",
      paginator: "flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200",
    },
    paginator: {
      root: "flex items-center gap-1 text-sm",
      pageButton: "px-3 py-1 rounded hover:bg-gray-200 transition",
      pageButtonActive: "bg-blue-500 text-white hover:bg-blue-600",
      nextButton: "px-3 py-1 rounded hover:bg-gray-200",
      prevButton: "px-3 py-1 rounded hover:bg-gray-200",
    },
    dialog: {
      root: "bg-white rounded-xl shadow-xl border border-gray-200",
      header: "flex items-center justify-between px-6 py-4 border-b border-gray-200",
      title: "text-lg font-semibold text-gray-900",
      content: "px-6 py-4",
      footer: "flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200",
    },
    confirmdialog: {
      root: "bg-white rounded-xl shadow-xl border border-gray-200",
      header: "flex items-center justify-between px-6 py-4 border-b border-gray-200",
      title: "text-lg font-semibold text-gray-900",
      message: "px-6 py-4 text-sm text-gray-600",
      footer: "flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200",
    },
    toast: {
      root: "rounded-lg shadow-lg border px-4 py-3 flex items-center gap-3",
    },
    tag: {
      root: "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
    },
    toolbar: {
      root: "flex items-center justify-between gap-4 bg-white rounded-lg border border-gray-200 p-4",
    },
  },
});
app.use(ToastService);
app.use(ConfirmationService);
app.mount("#app");
