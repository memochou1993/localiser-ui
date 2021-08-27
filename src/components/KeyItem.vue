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
            class="text-info cursor-pointer break-word q-mx-md q-py-sm"
            @click="state.enableEditForm = true"
            v-text="`${keyPrefix || ''}${keyItem.name}${keySuffix || ''}`"
          />
          <KeyEditor
            v-if="enableKeyEditor && state.enableEditForm"
            :default-name="keyItem.name"
            :key-id="keyItem.id"
            :keys="keys"
            :on-close="() => state.enableEditForm = false"
            :on-submit="editKey"
          />
        </div>
        <div
          class="col-12 col-sm-8 flex items-center"
        >
          <div
            class="full-width"
          >
            <ValueList
              :enable-creator="enableValueCreator"
              :enable-editor="enableValueEditor"
              :key-id="keyItem.id"
              :languages="languages"
              :on-create-value="onCreateValue"
              :on-edit-value="onEditValue"
              :values="keyItem.values"
            />
          </div>
        </div>
        <div
          class="col-12 col-sm-1 flex justify-center items-center"
        >
          <KeyItemMenu
            v-if="enableMenu"
            :enable-destroyer="enableKeyDestroyer"
            :key-id="keyItem.id"
            :on-delete-key="onDeleteKey"
          />
        </div>
      </div>
    </q-item-section>
  </q-item>
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
    enableKeyEditor: {
      type: Boolean,
      required: true,
    },
    enableKeyDestroyer: {
      type: Boolean,
      required: true,
    },
    enableMenu: {
      type: Boolean,
      required: true,
    },
    enableValueCreator: {
      type: Boolean,
      required: true,
    },
    enableValueEditor: {
      type: Boolean,
      required: true,
    },
    keyItem: {
      type: Object,
      default: () => {},
    },
    keyPrefix: {
      type: String,
      default: '',
    },
    keySuffix: {
      type: String,
      default: '',
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
      if (key.name !== props.keyItem.name) {
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
