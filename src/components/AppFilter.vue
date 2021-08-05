<template>
  <q-input
    v-model="state.input"
    :model-value="state.input"
    autofocus
    borderless
    dense
    @update:model-value="(v) => $emit('onUpdate', v)"
  >
    <template
      #append
    >
      <q-icon
        name="mdi-magnify"
      />
    </template>
  </q-input>
</template>

<script>
import {
  reactive,
} from 'vue';

export default {
  name: 'AppFilter',
  emits: [
    'onUpdate',
  ],
  setup() {
    const state = reactive({
      input: '',
    });
    return {
      state,
    };
  },
};
</script>
