<template>
  <q-btn
    class="q-px-md"
    color="primary"
    label="Create"
    outline
    @click="dialog.show()"
  />
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin"
    >
      <q-card-section>
        TODO
      </q-card-section>
      <q-card-actions
        class="q-pa-md"
      >
        <q-btn
          color="primary"
          label="Cancel"
          outline
          @click="cancel"
        />
        <q-space />
        <q-btn
          color="primary"
          label="Create"
          @click="submit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar';

export default {
  name: 'KeyCreator',
  emits: [
    ...useDialogPluginComponent.emits,
  ],
  setup() {
    const {
      dialog,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
    } = useDialogPluginComponent();
    return {
      dialog,
      onDialogHide,
      submit() {
        onDialogOK();
      },
      cancel: onDialogCancel,
    };
  },
};
</script>
