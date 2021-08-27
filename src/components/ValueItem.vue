<template>
  <q-item
    class="q-pa-none"
  >
    <q-item-section>
      <div
        class="row"
      >
        <div
          class="col-12 col-sm-3 flex justify-sm-end items-center"
        >
          <span
            class="q-mx-md q-py-sm text-sm-right"
            v-text="language.name"
          />
        </div>
        <div
          ref="anchor"
          class="col-12 col-sm-9 flex items-center"
        >
          <div
            v-if="valueItem"
            :class="[valueItem.text ? 'text-info' : 'text-secondary']"
          >
            <div
              class="cursor-pointer break-word q-mx-md q-py-sm"
              @click="state.enableEditForm = true"
              v-text="valueItem.text || 'Empty'"
            />
            <ValueEditor
              v-if="enableEditDialog && state.enableEditForm"
              :default-text="valueItem.text"
              :key-id="keyId"
              :value-id="valueItem.id"
              :offset="-16"
              :on-close="() => state.enableEditForm = false"
              :on-submit="editValue"
              :width="anchor ? anchor.clientWidth : 0"
            />
          </div>
          <div
            v-else
            class="text-secondary"
          >
            <div
              class="cursor-pointer break-word q-mx-md q-py-sm"
              @click="state.enableCreateForm = true"
              v-text="'Empty'"
            />
            <ValueEditor
              v-if="enableCreateDialog && state.enableCreateForm"
              :key-id="keyId"
              :language-id="language.id"
              :offset="-16"
              :on-close="() => state.enableCreateForm = false"
              :on-submit="createValue"
              :width="anchor ? anchor.clientWidth : 0"
            />
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import {
  ref,
  reactive,
} from 'vue';
import ValueEditor from './ValueEditor.vue';

export default {
  name: 'ValueItem',
  components: {
    ValueEditor,
  },
  props: {
    enableCreateDialog: {
      type: Boolean,
      default: true,
    },
    enableEditDialog: {
      type: Boolean,
      default: true,
    },
    keyId: {
      type: String,
      required: true,
    },
    language: {
      type: Object,
      default: () => {},
    },
    onCreateValue: {
      type: Function,
      default: () => {},
    },
    onEditValue: {
      type: Function,
      default: () => {},
    },
    valueItem: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const state = reactive({
      enableCreateForm: false,
      enableEditForm: false,
    });
    const anchor = ref(null);
    const createValue = (value) => {
      if (value.text) {
        props.onCreateValue(value);
      }
      state.enableCreateForm = false;
    };
    const editValue = (value) => {
      if (value.text !== props.valueItem.text) {
        props.onEditValue(value);
      }
      state.enableEditForm = false;
    };
    return {
      state,
      anchor,
      createValue,
      editValue,
    };
  },
};
</script>
