<template>
  <q-dialog
    ref="dialog"
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
          ref="form"
          @keyup.enter.stop="submit"
          @submit.stop
        >
          <div
            class="q-pb-lg"
          >
            <AppTextLabel
              text="Name"
            />
            <q-select
              v-model="state.name"
              :input-debounce="0"
              :model-value="state.name"
              :options="state.nameOptions"
              :rules="rules.name"
              autofocus
              borderless
              dense
              fill-input
              hide-dropdown-icon
              hide-selected
              options-selected-class="text-secondary"
              use-input
              @filter="onFilterName"
              @input-value="onInputName"
              @keyup.enter.stop
            >
              <template
                #option="scope"
              >
                <q-item
                  v-close-popup
                  v-bind="scope.itemProps"
                  class="dense"
                >
                  <q-item-section>
                    <span
                      v-text="scope.opt"
                    />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div
            class="q-pb-lg"
          >
            <AppTextLabel
              text="Code"
            />
            <q-input
              v-model="state.code"
              :model-value="state.code"
              :rules="rules.code"
              autocomplete="off"
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
import defaultLanguageOptions from '@/assets/LanguageOptions';
import AppTextLabel from './AppTextLabel.vue';

export default {
  name: 'LanguageEditor',
  components: {
    AppTextLabel,
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
    const { dialogRef: dialog } = useDialogPluginComponent();
    const form = ref(null);
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
        const needle = v.toLowerCase();
        state.nameOptions = defaultLanguageOptions
          .filter((o) => !props.languages.some((l) => l.name === o.name))
          .filter((o) => o.name.toLocaleLowerCase().includes(needle))
          .map((o) => o.name);
      });
    };
    const onInputName = (v) => {
      state.name = v;
      if (!state.code) {
        state.code = defaultLanguageOptions.find((o) => o.name === v)?.code || '';
      }
    };
    const submit = async () => {
      if (!await form?.value.validate()) {
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
      dialog.value.show();
    });
    return {
      state,
      dialog,
      form,
      rules,
      onFilterName,
      onInputName,
      submit,
    };
  },
};
</script>
