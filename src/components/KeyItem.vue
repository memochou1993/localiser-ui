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
          <ValueList
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
    :key-id="currentKey.id"
    :keys="keys"
    :on-close="() => state.editForm = false"
    :on-submit="editKey"
  />
</template>

<script>
import {
  reactive,
} from 'vue';
import KeyEditor from './KeyEditor.vue';
import ValueList from './ValueList.vue';

export default {
  name: 'KeyItem',
  components: {
    KeyEditor,
    ValueList,
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
    onEditKey: {
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
  setup(props) {
    const state = reactive({
      editForm: false,
    });
    const editKey = (key) => {
      if (key.name !== props.currentKey.name) {
        props.onEditKey(key);
      }
      state.editForm = false;
    };
    return {
      state,
      editKey,
    };
  },
};
</script>
