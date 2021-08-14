<template>
  <q-table
    v-if="languages.filter(filter).length > 0"
    :columns="columns"
    :pagination="{ rowsPerPage: 0 }"
    :rows="languages.filter(filter)"
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
  <AppEmpty
    v-else
    class="text-center"
  />
</template>

<script>
import AppEmpty from './AppEmpty.vue';
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
    AppEmpty,
    LanguageItem,
  },
  props: {
    languages: {
      type: Array,
      default: () => [],
    },
    needle: {
      type: String,
      default: '',
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
  setup(props) {
    const filter = (l) => {
      const needle = props.needle.toLowerCase();
      return l.name.toLowerCase().includes(needle)
        || l.code.toLowerCase().includes(needle);
    };
    return {
      columns,
      filter,
    };
  },
};
</script>
