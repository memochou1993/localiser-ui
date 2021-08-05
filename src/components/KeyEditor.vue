<template>
  <q-dialog
    ref="dialogRef"
    @hide="close"
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
          dense
          label="Cancel"
          no-caps
          outline
          @click="close"
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
} from 'vue';
import { useDialogPluginComponent } from 'quasar';

export default {
  name: 'KeyEditor',
  emits: [
    ...useDialogPluginComponent.emits,
    'onSubmit',
    'onClose',
  ],
  setup(props, { emit }) {
    const state = reactive({
      name: '',
    });
    const {
      dialogRef,
    } = useDialogPluginComponent();
    onMounted(() => {
      dialogRef.value.show();
    });
    return {
      state,
      dialogRef,
      submit: () => {
        emit('onSubmit', state);
        emit('onClose');
      },
      close: () => {
        emit('onClose');
      },
    };
  },
};
</script>
