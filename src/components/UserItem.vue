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
};
</script>
