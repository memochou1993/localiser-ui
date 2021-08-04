<template>
  <q-btn
    class="q-px-md"
    color="primary"
    label="Create"
    outline
    @click="dialogRef.show()"
  />
  <q-dialog
    ref="dialogRef"
    @hide="cancel"
  >
    <q-card
      class="q-dialog-plugin"
    >
      <q-card-section>
        <span
          class="text-body1 text-weight-regular"
          v-text="'Create'"
        />
      </q-card-section>
      <q-card-section>
        <div
          class="text-grey-10 q-py-sm"
          v-text="'Name'"
        />
        <q-card
          bordered
          class="q-px-sm"
          flat
        >
          <q-input
            v-model="state.name"
            autofocus
            borderless
            dense
          />
        </q-card>
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
import {
  reactive,
} from 'vue';
import { useDialogPluginComponent } from 'quasar';

export default {
  name: 'KeyCreator',
  emits: [
    ...useDialogPluginComponent.emits,
    'onSubmit',
  ],
  setup(props, { emit }) {
    const state = reactive({
      name: '',
    });
    const {
      dialogRef,
      onDialogOK,
      onDialogCancel,
    } = useDialogPluginComponent();
    const reset = () => {
      state.name = '';
    };
    return {
      state,
      dialogRef,
      submit: () => {
        emit('onSubmit', state);
        reset();
        onDialogOK();
      },
      cancel: () => {
        reset();
        onDialogCancel();
      },
    };
  },
};
</script>
