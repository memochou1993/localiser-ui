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
            <q-select
              v-model="state.name"
              :model-value="state.name"
              :options="state.nameOptions"
              :rules="rules.name"
              autofocus
              borderless
              dense
              fill-input
              hide-dropdown-icon
              hide-selected
              input-debounce="0"
              options-selected-class="text-secondary"
              use-input
              @filter="onFilterName"
              @input-value="onInputName"
              @keyup.enter.stop=""
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
      name: props.defaultName,
      code: props.defaultCode,
      nameOptions: [],
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
    const onFilterName = (v, update) => {
      update(() => {
        const keyword = v.toLowerCase();
        state.nameOptions = langOptions
          .filter((o) => !props.languages.some((l) => l.name === o.name))
          .filter((o) => o.name.toLocaleLowerCase().includes(keyword))
          .map((o) => o.name);
      });
    };
    const onInputName = (v) => {
      state.name = v;
      if (!state.code) {
        state.code = langOptions.find((o) => o.name === v)?.code || '';
      }
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
      rules,
      onFilterName,
      onInputName,
      submit,
    };
  },
};
</script>
