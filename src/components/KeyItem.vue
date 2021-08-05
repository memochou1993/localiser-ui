<template>
  <q-item
    class="q-pa-none"
  >
    <q-item-section>
      <div
        class="row"
      >
        <div
          class="col-3 flex items-center"
        >
          <div
            class="full-width cursor-pointer break-word"
          >
            <div
              class="text-info q-px-md q-py-sm"
              @click="state.editForm = true"
              v-text="currentKey.name"
            />
          </div>
        </div>
        <div
          class="col-9"
        >
          <LanguageList
            :key-id="currentKey.id"
            :languages="languages"
            :on-create-value="onCreateValue"
            :on-edit-value="onEditValue"
            :values="currentKey.values"
          />
        </div>
      </div>
    </q-item-section>
  </q-item>
  <KeyEditor
    v-if="state.editForm"
    :default-name="currentKey.name"
    :keys="keys"
    @onClose="state.editForm = false"
  />
</template>

<script>
import {
  reactive,
} from 'vue';
import KeyEditor from './KeyEditor.vue';
import LanguageList from './LanguageList.vue';

export default {
  name: 'KeyItem',
  components: {
    KeyEditor,
    LanguageList,
  },
  props: {
    currentKey: {
      type: Object,
      default: () => {},
    },
    keys: {
      type: Array,
      default: () => [],
    },
    onCreateValue: {
      type: Function,
      default: () => {},
    },
    onEditValue: {
      type: Function,
      default: () => {},
    },
    languages: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const state = reactive({
      editForm: false,
    });
    return {
      state,
    };
  },
};
</script>
