<template>
  <q-dialog
    ref="dialog"
    @hide="close"
  >
    <q-card
      class="q-dialog-plugin"
    >
      <q-card-section
        class="q-pa-lg"
      >
        <span
          class="text-body1 text-weight-regular"
          v-text="confirmation.title"
        />
      </q-card-section>
      <q-card-section
        class="q-px-lg q-pb-none"
      >
        <span
          v-text="confirmation.content"
        />
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
          @click="close"
        />
        <q-space />
        <q-btn
          :label="confirmation.action"
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
  computed,
  onMounted,
} from 'vue';
import {
  useStore,
} from 'vuex';
import { useI18n } from 'vue-i18n/index';
import { useDialogPluginComponent } from 'quasar';

export default {
  name: 'TheConfirmation',
  emits: [
    ...useDialogPluginComponent.emits,
  ],
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const { dialogRef: dialog } = useDialogPluginComponent();
    const confirmation = computed(() => store.state.confirmation);
    const close = () => {
      store.commit('resetConfirmation');
    };
    const submit = async () => {
      store.state.confirmation.callback();
      close();
    };
    onMounted(() => {
      dialog.value.show();
    });
    return {
      t,
      dialog,
      confirmation,
      close,
      submit,
    };
  },
};
</script>
