<template>
  <q-input
    v-model="input"
    :model-value="input"
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
  ref,
} from 'vue';

export default {
  name: 'AppFilter',
  emits: [
    'onUpdate',
  ],
  setup() {
    const input = ref('');
    return {
      input,
    };
  },
};
</script>
