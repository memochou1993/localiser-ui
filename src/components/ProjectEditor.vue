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
          v-text="t('__TitleProjectEditor')"
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
            <q-input
              v-model="state.name"
              :model-value="state.name"
              :rules="rules.name"
              autocomplete="off"
              autofocus
              borderless
              dense
            />
          </div>
          <div
            class="q-pb-lg"
          >
            <AppTextLabel
              :text="t('__InputDescription')"
            />
            <q-input
              v-model="state.description"
              :model-value="state.description"
              autocomplete="off"
              autogrow
              borderless
              dense
              input-style="max-height: 6rem;"
              type="textarea"
              @keyup.enter.stop
            />
          </div>
          <div
            class="q-pb-lg"
          >
            <AppTextLabel
              :text="t('__InputLanguages')"
            />
            <q-select
              v-model="state.languages"
              :input-debounce="0"
              :model-value="state.languages"
              :options="state.languageOptions"
              :rules="rules.languages"
              borderless
              dense
              hide-dropdown-icon
              multiple
              options-selected-class="text-secondary"
              use-chips
              @keyup.enter.stop
            >
              <template
                #selected-item="scope"
              >
                <q-chip
                  :tabindex="scope.tabindex"
                  :label="scope.opt.name"
                  class="q-px-sm q-ml-none q-my-xs q-mr-sm cursor-default"
                  color="secondary"
                  dense
                  outline
                  removable
                  square
                  @remove="scope.removeAtIndex(scope.index)"
                />
              </template>
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
                      v-text="scope.opt.name"
                    />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
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
  name: 'ProjectEditor',
  components: {
    AppTextLabel,
  },
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
    const { t } = useI18n();
    const state = reactive({
      name: '',
      description: '',
      languages: [],
      languageOptions: defaultLanguageOptions,
    });
    const { dialogRef: dialog } = useDialogPluginComponent();
    const form = ref(null);
    const rules = {
      name: [
        (v) => (v && !!v.trim()) || t('__ValidationNameRequired'),
      ],
      languages: [
        (v) => v.length > 0 || t('__ValidationLanguagesRequired'),
      ],
    };
    const submit = async () => {
      if (!await form?.value.validate()) {
        return;
      }
      props.onSubmit({
        name: state.name,
        description: state.description,
        languages: state.languages,
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
      submit,
    };
  },
};
</script>
