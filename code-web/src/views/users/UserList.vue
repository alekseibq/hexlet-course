<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import type { User, UserFormData } from "@/types/user";
import { usersApi } from "@/api/users";
import { userSchema } from "./schema";

const toast = useToast();
const confirm = useConfirm();

const users = ref<User[]>([]);
const loading = ref(false);
const dialogVisible = ref(false);
const editingUser = ref<User | null>(null);
const form = ref<UserFormData>({ name: "", email: "", role: "viewer" });
const formErrors = ref<Partial<Record<keyof UserFormData, string>>>({});
const saving = ref(false);

async function loadUsers() {
  loading.value = true;
  try {
    users.value = await usersApi.getAll();
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  editingUser.value = null;
  form.value = { name: "", email: "", role: "viewer" };
  formErrors.value = {};
  dialogVisible.value = true;
}

function openEdit(user: User) {
  editingUser.value = user;
  form.value = { name: user.name, email: user.email, role: user.role };
  formErrors.value = {};
  dialogVisible.value = true;
}

async function save() {
  const result = userSchema.safeParse(form.value);
  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      if (issue.path.length > 0) {
        errors[issue.path[0] as string] = issue.message;
      }
    }
    formErrors.value = errors;
    return;
  }

  saving.value = true;
  try {
    if (editingUser.value) {
      await usersApi.update(editingUser.value.id, result.data);
      toast.add({ severity: "success", summary: "Updated", detail: "User updated", life: 3000 });
    } else {
      await usersApi.create(result.data);
      toast.add({ severity: "success", summary: "Created", detail: "User created", life: 3000 });
    }
    dialogVisible.value = false;
    await loadUsers();
  } catch {
    toast.add({ severity: "error", summary: "Error", detail: "Something went wrong", life: 3000 });
  } finally {
    saving.value = false;
  }
}

function confirmDelete(user: User) {
  confirm.require({
    message: `Delete user "${user.name}"? This action cannot be undone.`,
    header: "Confirm Delete",
    accept: async () => {
      await usersApi.delete(user.id);
      toast.add({ severity: "info", summary: "Deleted", detail: "User deleted", life: 3000 });
      await loadUsers();
    },
  });
}

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
];

function roleBadge(role: string) {
  switch (role) {
    case "admin":
      return "bg-red-100 text-red-700";
    case "editor":
      return "bg-yellow-100 text-yellow-700";
    case "viewer":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

onMounted(loadUsers);
</script>

<template>
  <div class="space-y-6">
    <Toast />
    <ConfirmDialog />

    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Users</h1>
      <Button
        label="New User"
        icon="pi pi-plus"
        @click="openCreate"
        class="bg-blue-600 text-white hover:bg-blue-700"
      />
    </div>

    <DataTable
      :value="users"
      :loading="loading"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20]"
      sortField="id"
      :sortOrder="1"
      class="bg-white rounded-lg border border-gray-200"
    >
      <Column field="id" header="ID" sortable :style="{ width: '80px' }" />
      <Column field="name" header="Name" sortable />
      <Column field="email" header="Email" sortable />
      <Column field="role" header="Role" sortable :style="{ width: '120px' }">
        <template #body="{ data }">
          <span
            :class="[
              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
              roleBadge(data.role),
            ]"
          >
            {{ data.role }}
          </span>
        </template>
      </Column>
      <Column field="createdAt" header="Created" sortable :style="{ width: '140px' }" />
      <Column header="Actions" :style="{ width: '140px' }">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button
              icon="pi pi-pencil"
              class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              @click="openEdit(data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              @click="confirmDelete(data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="dialogVisible"
      :header="editingUser ? 'Edit User' : 'New User'"
      :modal="true"
      :closable="false"
      class="w-full max-w-md"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <InputText v-model="form.name" placeholder="John Doe" />
          <p v-if="formErrors.name" class="mt-1 text-sm text-red-600">{{ formErrors.name }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <InputText v-model="form.email" type="email" placeholder="john@example.com" />
          <p v-if="formErrors.email" class="mt-1 text-sm text-red-600">{{ formErrors.email }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <Select
            v-model="form.role"
            :options="roleOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select a role"
          />
          <p v-if="formErrors.role" class="mt-1 text-sm text-red-600">{{ formErrors.role }}</p>
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancel"
          class="bg-gray-100 text-gray-700 hover:bg-gray-200"
          @click="dialogVisible = false"
        />
        <Button
          :label="editingUser ? 'Update' : 'Create'"
          :loading="saving"
          class="bg-blue-600 text-white hover:bg-blue-700"
          @click="save"
        />
      </template>
    </Dialog>
  </div>
</template>
