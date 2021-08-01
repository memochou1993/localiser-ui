<template>
  <q-item
    class="q-pa-none"
  >
    <q-item-section>
      <div
        class="row"
      >
        <div
          class="col-4 full-height flex items-center"
        >
          <span
            class="q-px-md break-word"
            v-text="language.name"
          />
        </div>
        <div
          class="col-8 full-height flex items-center"
        >
          <div
            v-if="value && !!value.text"
          >
            <span
              v-if="!state.editForm"
              class="text-secondary q-px-md cursor-pointer break-word"
              @click="setEditForm(true)"
              v-text="value.text"
            />
            <div
              v-else
              class="q-pl-md"
            >
              <ValueEditForm
                :key-id="keyId"
                :on-edit-value="editValue"
                :on-close="() => setEditForm(false)"
                :value-id="value.id"
                :value-text="value.text"
              />
            </div>
          </div>
          <div
            v-else
            style="width: 100%"
          >
            <span
              v-if="!state.createForm"
              class="text-warning q-px-md cursor-pointer break-word"
              @click="setCreateForm(true)"
              v-text="'Empty'"
            />
            <div
              v-else
              class="q-pl-md"
            >
              <ValueCreateForm
                :key-id="keyId"
                :language-id="language.id"
                :on-create-value="createValue"
                :on-close="() => setCreateForm(false)"
              />
            </div>
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
