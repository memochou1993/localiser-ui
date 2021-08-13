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
            class="q-px-md q-py-sm text-sm-right"
            v-text="language.name"
          />
        </div>
        <div
          class="col-12 col-sm-9 flex items-center"
        >
          <div
            ref="anchor"
            class="full-width cursor-pointer break-word"
          >
            <template
              v-if="value"
            >
              <div
                :class="[value.text ? 'text-info' : 'text-secondary', 'q-px-md q-py-sm']"
                @click="state.enableEditForm = true"
                v-text="value.text || 'Empty'"
              />
              <q-menu
                v-if="state.enableEditForm"
                :offset="[-16, 0]"
                :style="anchor ? `width: ${anchor.clientWidth - 16}px`: ''"
                class="q-pa-md shadow-4"
              >
                <ValueEditor
                  :default-text="value.text"
                  :key-id="keyId"
                  :value-id="value.id"
                  :on-close="() => state.enableEditForm = false"
                  :on-submit="editValue"
                />
              </q-menu>
            </template>
            <template
              v-else
            >
              <div
                class="text-secondary q-px-md q-py-sm"
                @click="state.enableCreateForm = true"
                v-text="'Empty'"
              />
              <q-menu
                v-if="state.enableCreateForm"
                :offset="[-16, 0]"
                :style="anchor ? `width: ${anchor.clientWidth - 16}px`: ''"
                class="q-pa-md shadow-4"
              >
                <ValueEditor
                  :key-id="keyId"
                  :language-id="language.id"
                  :on-close="() => state.enableCreateForm = false"
                  :on-submit="createValue"
                />
              </q-menu>
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
    value: {
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
      if (value.text !== props.value.text) {
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
