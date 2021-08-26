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
          v-text="t('__TitleLanguageEditor')"
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
              :text="t('__InputName')"
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
              :text="t('__InputLocale')"
            />
            <q-input
              v-model="state.locale"
              :model-value="state.locale"
              :rules="rules.locale"
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
          :label="t('__ButtonCancel')"
          color="primary"
          dense
          no-caps
          outline
          @click="onClose"
        />
        <q-space />
        <q-btn
          :label="t('__ButtonSave')"
          color="primary"
          dense
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
import { useI18n } from 'vue-i18n/index';
import { useDialogPluginComponent } from 'quasar';
import defaultLanguageOptions from '@/assets/js/LanguageOptions';
import AppTextLabel from './AppTextLabel.vue';

export default {
  name: 'LanguageEditor',
  components: {
    AppTextLabel,
  },
  props: {
    defaultLocale: {
      type: String,
      default: '',
    },
    defaultName: {
      type: String,
      default: '',
    },
    languageId: {
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
    const { t } = useI18n();
    const state = reactive({
      name: props.defaultName,
      locale: props.defaultLocale,
      nameOptions: [],
    });
    const { dialogRef: dialog } = useDialogPluginComponent();
    const form = ref(null);
    const rules = {
      name: [
        (v) => (v && !!v.trim()) || t('__ValidationNameRequired'),
        (v) => (v.trim() === props.defaultName.trim() || !props.languages.some((l) => l.name === v.trim())) || t('__ValidationNameUnique'),
      ],
      locale: [
        (v) => (v && !!v.trim()) || t('__ValidationLocaleRequired'),
        (v) => (v.trim() === props.defaultLocale.trim() || !props.languages.some((l) => l.locale === v.trim())) || t('__ValidationLocaleUnique'),
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
      if (!state.locale) {
        state.locale = defaultLanguageOptions.find((o) => o.name === v)?.locale || '';
      }
    };
    const submit = async () => {
      if (!await form?.value.validate()) {
        return;
      }
      props.onSubmit({
        languageId: props.languageId,
        name: state.name,
        locale: state.locale,
      });
      props.onClose();
    };
    onMounted(() => {
      dialog.value.show();
    });
    return {
      t,
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
