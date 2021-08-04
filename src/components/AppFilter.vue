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
      @update:model-value="(v) => $emit('update', v)"
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
    'update',
  ],
  setup() {
    const input = ref('');
    return {
      input,
    };
  },
};
</script>
