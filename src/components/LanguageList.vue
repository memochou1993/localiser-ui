<template>
  <q-table
    :columns="columns"
    :pagination="{ rowsPerPage: 0 }"
    :rows="languages"
    bordered
    flat
    hide-bottom
  >
    <template
      #body="props"
    >
      <LanguageItem
        :languages="languages"
        :on-delete-language="onDeleteLanguage"
        :on-edit-language="onEditLanguage"
        :props="props"
      />
    </template>
  </q-table>
</template>

<script>
import LanguageItem from './LanguageItem.vue';

const columns = [
  {
    name: 'name',
    align: 'left',
    field: (row) => row.name,
    headerStyle: '',
    label: 'Name',
    required: true,
    sortable: false,
    style: '',
  },
  {
    name: 'code',
    align: 'left',
    field: (row) => row.code,
    headerStyle: '',
    label: 'Code',
    required: true,
    sortable: false,
    style: '',
  },
  {
    name: 'action',
    align: 'center',
    field: () => '',
    headerStyle: 'width: 160px',
    label: '',
    required: true,
    sortable: false,
    style: 'width: 160px',
  },
];

export default {
  name: 'LanguageList',
  components: {
    LanguageItem,
  },
  props: {
    languages: {
      type: Array,
      default: () => [],
    },
    onDeleteLanguage: {
      type: Function,
      default: () => {},
    },
    onEditLanguage: {
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
