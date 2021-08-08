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
          v-text="'Language Editor'"
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
            <AppInputLabel
              text="Name"
            />
            <q-select
              v-model="state.name"
              :model-value="state.name"
              :options="langOptions.map((o) => o.name)"
              :rules="rules.name"
              autofocus
              borderless
              dense
              hide-dropdown-icon
              options-selected-class="text-secondary"
              @update:model-value="state.code = langOptions.find((o) => o.name === state.name).code"
            />
          </div>
          <div
            class="q-pb-lg"
          >
            <AppInputLabel
              text="Code"
            />
            <q-input
              v-model="state.code"
              :model-value="state.code"
              :rules="rules.code"
              borderless
              dense
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
import langOptions from '@/assets/language_options.json';
import AppInputLabel from './AppInputLabel.vue';

export default {
  name: 'LanguageEditor',
  components: {
    AppInputLabel,
  },
  props: {
    defaultCode: {
      type: String,
      default: '',
    },
    defaultName: {
      type: String,
      default: '',
    },
    languages: {
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
      name: props.defaultName,
      code: props.defaultCode,
    });
    const { dialogRef } = useDialogPluginComponent();
    const formRef = ref(null);
    const rules = {
      name: [
        (v) => (v && !!v.trim()) || 'The name is required.',
        (v) => (v.trim() === props.defaultName.trim() || !props.languages.some((l) => l.name === v.trim())) || 'The name has already been taken.',
      ],
      code: [
        (v) => (v && !!v.trim()) || 'The code is required.',
        (v) => (v.trim() === props.defaultCode.trim() || !props.languages.some((l) => l.code === v.trim())) || 'The code has already been taken.',
      ],
    };
    const submit = async () => {
      if (!await formRef?.value.validate()) {
        return;
      }
      props.onSubmit({
        name: state.name,
        code: state.code,
      });
      props.onClose();
    };
    onMounted(() => {
      dialogRef.value.show();
    });
    return {
      state,
      dialogRef,
      formRef,
      langOptions,
      rules,
      submit,
    };
  },
};
</script>