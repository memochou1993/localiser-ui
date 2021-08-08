<template>
  <q-table
    :rows="languages"
    :columns="columns"
    :pagination="{ rowsPerPage: 0 }"
    bordered
    flat
    hide-bottom
  >
    <template
      #body="props"
    >
      <q-tr
        :props="props"
      >
        <q-td
          key="name"
          :props="props"
          v-text="props.row.name"
        />
        <q-td
          key="code"
          :props="props"
          v-text="props.row.code"
        />
        <q-td
          key="edit"
          :props="props"
        >
          <q-btn
            color="grey-6"
            dense
            flat
            icon="mdi-pencil"
            round
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
    sortable: false,
  },
  {
    name: 'code',
    required: true,
    label: 'Code',
    align: 'left',
    field: (row) => row.code,
    sortable: false,
  },
  {
    name: 'edit',
    required: true,
    label: '',
    align: 'center',
    field: () => '',
    sortable: false,
  },
];

export default {
  name: 'LanguageList',
  props: {
    languages: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {
      columns,
    };
  },
};
</script>
