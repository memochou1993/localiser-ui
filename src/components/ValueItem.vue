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
              <q-menu
                v-if="state.editForm"
                :offset="[0, 0]"
                class="q-pa-md shadow-4"
                fit
              >
                <ValueEditor
                  :key-id="keyId"
                  :on-edit-value="editValue"
                  :value-id="value.id"
                  :value-text="value.text"
                  @close="setEditForm(false)"
                />
              </q-menu>
            </template>
            <template
              v-else
            >
              <div
                class="text-warning q-pr-md q-py-sm"
                @click="setCreateForm(true)"
                v-text="'Empty'"
              />
              <q-menu
                v-if="state.createForm"
                :offset="[0, 0]"
                class="q-pa-md shadow-4"
                fit
              >
                <ValueCreator
                  v-if="state.createForm"
                  :key-id="keyId"
                  :language-id="language.id"
                  :on-create-value="createValue"
                  @close="setCreateForm(false)"
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
  reactive,
} from 'vue';
import ValueCreator from './ValueCreator.vue';
import ValueEditor from './ValueEditor.vue';

export default {
  name: 'ValueList',
  components: {
    ValueCreator,
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
      setCreateForm,
      setEditForm,
      createValue,
      editValue,
    };
  },
};
</script>
