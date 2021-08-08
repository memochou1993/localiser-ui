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
          key="action"
          :props="props"
        >
          <q-btn
            class="q-mx-xs"
            color="grey-6"
            dense
            flat
            icon="mdi-pencil"
            round
          />
          <q-btn
            class="q-mx-xs"
            color="grey-6"
            dense
            flat
            icon="mdi-trash-can-outline"
            round
            @click="onDeleteLanguage({ languageId: props.row.id })"
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
    name: 'action',
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
    onEditLanguage: {
      type: Function,
      default: () => {},
    },
    onDeleteLanguage: {
      type: Function,
      default: () => {},
    },
  },
  setup() {
    return {
      columns,
    };
  },
};
</script>
