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
      key="role"
      :props="props"
    >
      <q-chip
        v-for="(role, i) in props.row.roles"
        :key="i"
        :label="capitalize(role)"
        class="q-px-sm q-ml-none q-my-xs q-mr-sm cursor-default"
        color="secondary"
        dense
        outline
        square
      />
    </q-td>
    <q-td
      key="action"
      :props="props"
      class="flex justify-center"
    >
      <div
        class="q-mx-xs"
      >
        <q-btn
          :disable="users.length === 1"
          color="grey-6"
          dense
          flat
          icon="mdi-trash-can-outline"
          round
          @click="onDetachUser({ userId: props.row.id })"
        />
      </div>
    </q-td>
  </q-tr>
</template>

<script>
import { format } from 'quasar';

const { capitalize } = format;

export default {
  name: 'UserItem',
  props: {
    onDetachUser: {
      type: Function,
      default: () => {},
    },
    props: {
      type: Object,
      required: true,
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {
      capitalize,
    };
  },
};
</script>
