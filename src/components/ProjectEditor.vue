<template>
  <q-dialog
    ref="dialogRef"
    @hide="onClose"
  >
    <q-card
      class="q-dialog-plugin"
    >
      <q-card-section
        class="q-pa-lg"
      >
        <span
          class="text-body1 text-weight-regular"
          v-text="'Project Editor'"
        />
      </q-card-section>
      <q-card-section
        class="q-px-lg q-pb-none"
      >
        <q-form
          ref="formRef"
          @submit="submit"
        >
          <div
            class="q-pb-lg"
          >
            <div
              class="text-grey-10 q-pa-xs"
              v-text="'Name'"
            />
            <q-input
              v-model="state.name"
              :model-value="state.name"
              :rules="rules.name"
              autofocus
              borderless
              dense
            />
          </div>
          <div
            class="q-pb-lg"
          >
            <div
              class="text-grey-10 q-pa-xs"
              v-text="'Languages'"
            />
            <q-select
              v-model="state.languages"
              :model-value="state.languages"
              :options="state.languageOptions"
              :rules="rules.languages"
              borderless
              dense
              hide-dropdown-icon
              input-debounce="0"
              multiple
              option-label="name"
              option-value="code"
              use-chips
            />
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions
        class="q-pa-lg"
      >
        <q-btn
          color="primary"
          dense
          label="Cancel"
          no-caps
          outline
          @click="onClose"
        />
        <q-space />
        <q-btn
          color="primary"
          dense
          label="Save"
          no-caps
          unelevated
          @click="submit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  onMounted,
  reactive,
  ref,
} from 'vue';
import { useDialogPluginComponent } from 'quasar';

const languageOptions = [
  {
    name: 'English',
    code: 'en',
  },
  {
    name: 'Chinese',
    code: 'zh',
  },
];

export default {
  name: 'ProjectEditor',
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
  },
  emits: [
    ...useDialogPluginComponent.emits,
  ],
  setup(props) {
    const state = reactive({
      name: '',
      languages: [],
      languageOptions,
    });
    const { dialogRef } = useDialogPluginComponent();
    const formRef = ref(null);
    onMounted(() => {
      dialogRef.value.show();
    });
    return {
      state,
      dialogRef,
      formRef,
      rules: {
        name: [
          (v) => (v && !!v.trim()) || 'The name is required.',
          (v) => !props.projects.some((p) => p.name === v.trim()) || 'The name has already been taken.',
        ],
        languages: [
          (v) => v.length > 0 || 'The languages is required.',
        ],
      },
      submit: async () => {
        if (!await formRef?.value.validate()) {
          return;
        }
        props.onSubmit(state);
        props.onClose();
      },
    };
  },
};
</script>
