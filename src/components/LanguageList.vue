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
        :enable-delete-button="enableDeleteButton"
        :enable-edit-button="enableEditButton"
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
import { useI18n } from 'vue-i18n/index';
import AppEmpty from './AppEmpty.vue';
import LanguageItem from './LanguageItem.vue';

export default {
  name: 'LanguageList',
  components: {
    AppEmpty,
    LanguageItem,
  },
  props: {
    enableDeleteButton: {
      type: Boolean,
      default: true,
    },
    enableEditButton: {
      type: Boolean,
      default: true,
    },
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
    const { t } = useI18n();
    const columns = [
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
        name: 'locale',
        align: 'left',
        headerStyle: '',
        label: t('__ColumnLocale'),
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
    const filter = (l) => {
      const needle = props.needle.toLowerCase();
      return l.name.toLowerCase().includes(needle)
        || l.locale.toLowerCase().includes(needle);
    };
    return {
      columns,
      filter,
    };
  },
};
</script>
