<template>
  <q-card
    bordered
    class="q-px-sm"
    flat
  >
    <q-input
      v-model="input"
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
  </q-card>
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
