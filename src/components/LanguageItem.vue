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
      key="locale"
      :props="props"
      v-text="props.row.locale"
    />
    <q-td
      key="action"
      :props="props"
      class="flex justify-center"
    >
      <div
        v-if="enableEditor"
        class="q-mx-xs"
      >
        <q-btn
          color="grey-6"
          dense
          flat
          icon="mdi-pencil"
          round
          @click="state.enableEditForm = true"
        />
        <LanguageEditor
          v-if="state.enableEditForm"
          :default-locale="props.row.locale"
          :default-name="props.row.name"
          :language-id="props.row.id"
          :languages="languages"
          :on-close="() => state.enableEditForm = false"
          :on-submit="onEditLanguage"
        />
      </div>
      <div
        v-if="enableDestroyer"
        class="q-mx-xs"
      >
        <q-btn
          :disable="languages.length === 1"
          color="grey-6"
          dense
          flat
          icon="mdi-trash-can-outline"
          round
          @click="onDeleteLanguage({ languageId: props.row.id })"
        />
      </div>
    </q-td>
  </q-tr>
</template>

<script>
import {
  reactive,
} from 'vue';
import LanguageEditor from './LanguageEditor.vue';

export default {
  name: 'LanguageItem',
  components: {
    LanguageEditor,
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
    props: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const state = reactive({
      enableEditForm: false,
    });
    return {
      state,
    };
  },
};
</script>
