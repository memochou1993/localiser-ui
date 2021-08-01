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
            class="q-px-md"
            v-text="language.name"
          />
        </div>
        <div
          class="col-8 flex items-center"
        >
          <div
            style="width: 100%"
            class="q-px-md break-word"
          >
            <template
              v-if="value"
            >
              <ValueEditForm
                v-if="state.editForm"
                :key-id="keyId"
                :on-edit-value="editValue"
                :value-id="value.id"
                :value-text="value.text"
                @close="setEditForm(false)"
              />
              <span
                v-else
                :class="[value.text ? 'text-secondary' : 'text-warning', 'cursor-pointer']"
                @click="setEditForm(true)"
                v-text="value.text || 'Empty'"
              />
            </template>
            <template
              v-else
            >
              <ValueCreateForm
                v-if="state.createForm"
                :key-id="keyId"
                :language-id="language.id"
                :on-create-value="createValue"
                @close="setCreateForm(false)"
              />
              <span
                v-else
                class="text-warning cursor-pointer"
                @click="setCreateForm(true)"
                v-text="'Empty'"
              />
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
import ValueCreateForm from './ValueCreateForm.vue';
import ValueEditForm from './ValueEditForm.vue';

export default {
  name: 'ValueList',
  components: {
    ValueCreateForm,
    ValueEditForm,
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
    const setCreateForm = (value) => {
      state.createForm = value;
    };
    const setEditForm = (value) => {
      state.editForm = value;
    };
    const createValue = (data) => {
      props.onCreateValue(data);
      setCreateForm(false);
    };
    const editValue = (data) => {
      props.onEditValue(data);
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
