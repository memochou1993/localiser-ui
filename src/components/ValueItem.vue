<template>
  <q-item
    class="q-pa-none"
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
              v-if="value"
            >
              <div
                :class="[value.text ? 'text-info' : 'text-warning', 'q-pr-md q-py-sm']"
                @click="setEditForm(true)"
                v-text="value.text || 'Empty'"
              />
              <q-popup-proxy
                v-if="state.editForm"
                :style="anchor ? `width: ${anchor.clientWidth}px`: ''"
                class="q-pa-md shadow-4"
              >
                <ValueEditor
                  :key-id="keyId"
                  :value-id="value.id"
                  :value-text="value.text"
                  @onClose="setEditForm(false)"
                  @onSubmit="editValue"
                />
              </q-popup-proxy>
            </template>
            <template
              v-else
            >
              <div
                class="text-warning q-pr-md q-py-sm"
                @click="setCreateForm(true)"
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
                  @onClose="setCreateForm(false)"
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
      createForm: false,
      editForm: false,
    });
    const anchor = ref(null);
    const setCreateForm = (v) => {
      state.createForm = v;
    };
    const setEditForm = (v) => {
      state.editForm = v;
    };
    const createValue = (data) => {
      if (data.text) {
        props.onCreateValue(data);
      }
      setCreateForm(false);
    };
    const editValue = (data) => {
      if (data.text !== props.value.text) {
        props.onEditValue(data);
      }
      setEditForm(false);
    };
    return {
      state,
      anchor,
      setCreateForm,
      setEditForm,
      createValue,
      editValue,
    };
  },
};
</script>
