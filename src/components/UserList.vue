<template>
  <q-table
    v-if="users.filter(filter).length > 0"
    :columns="columns"
    :pagination="{ rowsPerPage: 0 }"
    :rows="users.filter(filter)"
    bordered
    flat
    hide-bottom
  >
    <template
      #body="props"
    >
      <UserItem
        :on-detach-user="onDetachUser"
        :props="props"
        :users="users"
      />
    </template>
  </q-table>
  <AppEmpty
    v-else
    class="text-center"
  />
</template>

<script>
import AppEmpty from './AppEmpty.vue';
import UserItem from './UserItem.vue';

const columns = [
  {
    name: 'name',
    align: 'left',
    headerStyle: '',
    label: 'Name',
    required: true,
    sortable: false,
    style: '',
  },
  {
    name: 'email',
    align: 'left',
    headerStyle: '',
    label: 'Email',
    required: true,
    sortable: false,
    style: '',
  },
  {
    name: 'role',
    align: 'left',
    headerStyle: '',
    label: 'Roles',
    required: true,
    sortable: false,
    style: '',
  },
  {
    name: 'action',
    align: 'center',
    headerStyle: 'width: 160px',
    label: '',
    required: true,
    sortable: false,
    style: 'width: 160px',
  },
];

export default {
  name: 'UserList',
  components: {
    AppEmpty,
    UserItem,
  },
  props: {
    needle: {
      type: String,
      default: '',
    },
    onDetachUser: {
      type: Function,
      default: () => {},
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const filter = (l) => {
      const needle = props.needle.toLowerCase();
      return l.name.toLowerCase().includes(needle)
        || l.email.toLowerCase().includes(needle);
    };
    return {
      columns,
      filter,
    };
  },
};
</script>
