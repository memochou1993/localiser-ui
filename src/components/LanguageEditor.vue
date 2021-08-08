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
          @keyup.enter.stop="submit"
          @submit="submit"
        >
          <div
            class="q-pb-lg"
          >
            <AppInputLabel
              text="Name"
            />
            <q-input
              v-if="state.enableNameInput"
              v-model="state.name"
              :model-value="state.name"
              :rules="rules.name"
              autofocus
              borderless
              dense
            />
            <q-select
              v-else
              v-model="state.name"
              :model-value="state.name"
              :options="langOptions.filter(langFilter).map((o) => o.name)"
              :rules="rules.name"
              autofocus
              borderless
              dense
              hide-dropdown-icon
              options-selected-class="text-secondary"
              @update:model-value="onSelectName"
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
    languageId: {
      type: Number,
      default: 0,
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
      enableNameInput: props.defaultName && !langOptions.some((o) => o.name === props.defaultName),
      name: props.defaultName,
      code: props.defaultCode,
    });
    const { dialogRef } = useDialogPluginComponent();
    const formRef = ref(null);
    const langFilter = (o) => !props.languages.some((l) => l.code === o.code);
    const rules = {
      name: [
        (v) => (v && !!v.trim()) || 'The name is required.',
      ],
      code: [
        (v) => (v && !!v.trim()) || 'The code is required.',
        (v) => (v.trim() === props.defaultCode.trim() || !props.languages.some((l) => l.code === v.trim())) || 'The code has already been taken.',
      ],
    };
    const onSelectName = () => {
      const language = langOptions.find((o) => o.name === state.name);
      if (language.code === '') {
        state.enableNameInput = true;
        state.name = '';
        return;
      }
      state.code = language.code;
    };
    const submit = async () => {
      if (!await formRef?.value.validate()) {
        return;
      }
      props.onSubmit({
        languageId: props.languageId,
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
      langFilter,
      rules,
      onSelectName,
      submit,
    };
  },
};
</script>
