<template>
  <q-tr
    :props="props"
  >
    <q-td
      key="name"
      :props="props"
      v-text="props.row.name"
    />
    <q-td
      key="email"
      :props="props"
      v-text="props.row.email"
    />
    <q-td
      v-if="scope === 'system'"
      key="role"
      :props="props"
      v-text="props.row.role.name"
    />
    <q-td
      v-if="scope === 'project'"
      key="role"
      :props="props"
      v-text="props.row.project_role.name"
    />
    <q-td
      key="action"
      :props="props"
      class="flex justify-center"
    >
      <div
        class="q-mx-xs"
      >
        <q-btn
          v-if="!props.row.deleted_at"
          color="grey-6"
          dense
          flat
          icon="mdi-pencil"
          round
          @click="state.enableEditForm = true"
        />
      </div>
      <div
        class="q-mx-xs"
      >
        <q-btn
          v-if="!props.row.deleted_at"
          :disable="props.row.id === me.id"
          color="grey-6"
          dense
          flat
          icon="mdi-trash-can-outline"
          round
          @click="onDeleteUser({ userId: props.row.id })"
        />
      </div>
    </q-td>
  </q-tr>
  <template
    v-if="scope === 'system'"
  >
    <SystemUserEditor
      v-if="state.enableEditForm"
      :default-name="props.row.name"
      :default-email="props.row.email"
      :default-role-code="props.row.role.code"
      :user-id="props.row.id"
      :users="users"
      :on-close="() => state.enableEditForm = false"
      :on-submit="onEditUser"
    />
  </template>
</template>

<script>
import {
  reactive,
} from 'vue';
import SystemUserEditor from './SystemUserEditor.vue';

export default {
  name: 'UserItem',
  components: { SystemUserEditor },
  props: {
    me: {
      type: Object,
      required: true,
    },
    onDeleteUser: {
      type: Function,
      default: () => {},
    },
    onEditUser: {
      type: Function,
      default: () => {},
    },
    props: {
      type: Object,
      required: true,
    },
    scope: {
      type: String,
      required: true,
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const state = reactive({
      enableEditForm: false,
    });
    return {
      state,
    };
  },
};
</script>
