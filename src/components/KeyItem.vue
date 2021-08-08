<template>
  <q-item
    class="q-pa-none"
  >
    <q-item-section>
      <div
        class="row"
      >
        <div
          class="col-12 col-sm-3 flex items-center"
        >
          <div
            class="full-width cursor-pointer break-word"
          >
            <div
              class="text-info q-px-md q-py-sm"
              @click="state.enableEditForm = true"
              v-text="currentKey.name"
            />
          </div>
        </div>
        <div
          class="col-12 col-sm-8 flex items-center"
        >
          <div
            class="full-width"
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
        <div
          class="col-12 col-sm-1 flex justify-center items-center"
        >
          <KeyItemMenu
            :key-id="currentKey.id"
            :on-delete-key="onDeleteKey"
            class="q-px-md q-py-sm"
          />
        </div>
      </div>
    </q-item-section>
  </q-item>
  <KeyEditor
    v-if="state.enableEditForm"
    :default-name="currentKey.name"
    :key-id="currentKey.id"
    :keys="keys"
    :on-close="() => state.enableEditForm = false"
    :on-submit="editKey"
  />
</template>

<script>
import {
  reactive,
} from 'vue';
import KeyEditor from './KeyEditor.vue';
import KeyItemMenu from './KeyItemMenu.vue';
import ValueList from './ValueList.vue';

export default {
  name: 'KeyItem',
  components: {
    KeyEditor,
    KeyItemMenu,
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
    onDeleteKey: {
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
      enableEditForm: false,
    });
    const editKey = (key) => {
      if (key.name !== props.currentKey.name) {
        props.onEditKey(key);
      }
      state.enableEditForm = false;
    };
    return {
      state,
      editKey,
    };
  },
};
</script>
