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
      v-if="scope === Scope.System"
      key="role"
      :props="props"
      v-text="props.row.role.name"
    />
    <q-td
      v-if="scope === Scope.Project"
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
        v-if="enableEditor && scope === Scope.System"
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
      </div>
      <div
        v-if="enableDestroyer"
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
</template>

<script>
import {
  reactive,
} from 'vue';
import {
  Scope,
} from '@/constants';
import SystemUserEditor from './SystemUserEditor.vue';

export default {
  name: 'UserItem',
  components: { SystemUserEditor },
  props: {
    enableDestroyer: {
      type: Boolean,
      required: true,
    },
    enableEditor: {
      type: Boolean,
      required: true,
    },
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
      Scope,
      state,
    };
  },
};
</script>
