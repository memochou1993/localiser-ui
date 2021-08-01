<template>
  <q-item
    class="q-pa-none"
  >
    <q-item-section>
      <div
        class="row"
      >
        <div
          class="col-4 flex items-center q-px-md"
        >
          <span
            v-text="language.name"
          />
        </div>
        <div
          class="col-8 flex items-center q-px-md"
        >
          <div
            class="full-width cursor-pointer break-word"
          >
            <template
              v-if="value"
            >
              <div
                :class="[value.text ? 'text-secondary' : 'text-warning']"
                @click="setEditForm(true)"
                v-text="value.text || 'Empty'"
              />
              <q-menu
                v-if="state.editForm"
                :offset="[0, 0]"
                class="q-pa-md"
                style="width: 300px;"
              >
                <ValueFormEdit
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
                class="text-warning"
                @click="setCreateForm(true)"
                v-text="'Empty'"
              />
              <q-menu
                v-if="state.createForm"
                :offset="[0, 0]"
                class="q-pa-md"
                style="width: 300px;"
              >
                <ValueFormCreate
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
import ValueFormCreate from './ValueFormCreate.vue';
import ValueFormEdit from './ValueFormEdit.vue';

export default {
  name: 'ValueList',
  components: {
    ValueFormCreate,
    ValueFormEdit,
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
