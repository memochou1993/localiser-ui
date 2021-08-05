<template>
  <q-item
    class="full-height q-pa-none"
  >
    <q-item-section>
      <div
        class="row"
      >
        <div
          class="col-4 flex items-center"
        >
          <span
            class="q-px-md q-py-sm"
            v-text="language.name"
          />
        </div>
        <div
          class="col-8 flex items-center"
        >
          <div
            ref="anchor"
            class="full-width cursor-pointer break-word"
          >
            <template
              v-if="currentValue"
            >
              <div
                :class="[currentValue.text ? 'text-info' : 'text-secondary', 'q-pr-md q-py-sm']"
                @click="state.editForm = true"
                v-text="currentValue.text || 'Empty'"
              />
              <q-popup-proxy
                v-if="state.editForm"
                :style="anchor ? `width: ${anchor.clientWidth}px`: ''"
                class="q-pa-md shadow-4"
              >
                <ValueEditor
                  :default-text="currentValue.text"
                  :key-id="keyId"
                  :value-id="currentValue.id"
                  @onClose="state.editForm = false"
                  @onSubmit="editValue"
                />
              </q-popup-proxy>
            </template>
            <template
              v-else
            >
              <div
                class="text-secondary q-pr-md q-py-sm"
                @click="state.createForm = true"
                v-text="'Empty'"
              />
              <q-popup-proxy
                v-if="state.createForm"
                :style="anchor ? `width: ${anchor.clientWidth}px`: ''"
                class="q-pa-md shadow-4"
              >
                <ValueEditor
                  :key-id="keyId"
                  :language-id="language.id"
                  @onClose="state.createForm = false"
                  @onSubmit="createValue"
                />
              </q-popup-proxy>
            </template>
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
    currentValue: {
      type: Object,
      default: () => {},
    },
    keyId: {
      type: Number,
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
  },
  setup(props) {
    const state = reactive({
      createForm: false,
      editForm: false,
    });
    const anchor = ref(null);
    const createValue = (data) => {
      if (data.text) {
        props.onCreateValue(data);
      }
      state.createForm = false;
    };
    const editValue = (data) => {
      if (data.text !== props.currentValue.text) {
        props.onEditValue(data);
      }
      state.editForm = false;
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
