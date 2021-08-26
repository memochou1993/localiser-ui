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
          v-text="t('__TitleKeyEditor')"
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
import AppTextLabel from './AppTextLabel.vue';

export default {
  name: 'KeyEditor',
  components: {
    AppTextLabel,
  },
  props: {
    defaultName: {
      type: String,
      default: '',
    },
    keyId: {
      type: String,
      default: '',
    },
    keys: {
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
    });
    const { dialogRef: dialog } = useDialogPluginComponent();
    const form = ref(null);
    const isUniqueName = (v) => v.trim().toLowerCase() === props.defaultName.trim().toLowerCase()
      || !props.keys.some((k) => k.name.toLowerCase() === v.trim().toLowerCase());
    const rules = {
      name: [
        (v) => (v && !!v.trim()) || t('__ValidationNameRequired'),
        (v) => isUniqueName(v) || t('__ValidationNameUnique'),
      ],
    };
    const submit = async () => {
      if (!await form?.value.validate()) {
        return;
      }
      props.onSubmit({
        keyId: props.keyId,
        name: state.name,
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
