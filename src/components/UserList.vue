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
        :enable-destroyer="enableDestroyer"
        :enable-editor="enableEditor"
        :on-delete-user="onDeleteUser"
        :on-edit-user="onEditUser"
        :props="props"
        :me="me"
        :scope="scope"
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
import {
  computed,
} from 'vue';
import { useI18n } from 'vue-i18n/index';
import AppEmpty from './AppEmpty.vue';
import UserItem from './UserItem.vue';

export default {
  name: 'UserList',
  components: {
    AppEmpty,
    UserItem,
  },
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
    needle: {
      type: String,
      default: '',
    },
    onDeleteUser: {
      type: Function,
      default: () => {},
    },
    onEditUser: {
      type: Function,
      default: () => {},
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
  setup(props) {
    const { t } = useI18n();
    const columns = computed(() => [
      {
        name: 'name',
        align: 'left',
        headerStyle: '',
        label: t('__ColumnName'),
        required: true,
        sortable: false,
        style: '',
      },
      {
        name: 'email',
        align: 'left',
        headerStyle: '',
        label: t('__ColumnEmail'),
        required: true,
        sortable: false,
        style: '',
      },
      {
        name: 'role',
        align: 'left',
        headerStyle: '',
        label: t('__ColumnRole'),
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
    ]);
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
