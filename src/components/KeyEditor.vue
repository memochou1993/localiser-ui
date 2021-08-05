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
      <q-card-section
        class="q-pb-lg"
      >
        <div
          class="text-grey-10 q-py-xs"
          v-text="'Name'"
        />
        <q-input
          v-model="state.name"
          :model-value="state.name"
          :rules="rules"
          autofocus
          borderless
          dense
        />
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
  props: {
    keys: {
      type: Array,
      default: () => [],
    },
  },
  emits: [
    ...useDialogPluginComponent.emits,
    'onSubmit',
    'onClose',
  ],
  setup(props, { emit }) {
    const state = reactive({
      name: '',
    });
    const isUnique = (name) => !props.keys.some((k) => k.name === name);
    const rules = [
      (v) => !!v || 'The name is required.',
      (v) => isUnique(v) || 'The name has already been taken.',
    ];
    const {
      dialogRef,
    } = useDialogPluginComponent();
    onMounted(() => {
      dialogRef.value.show();
    });
    return {
      state,
      rules,
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
