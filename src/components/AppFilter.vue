<template>
  <q-input
    v-model="state.input"
    :model-value="state.input"
    autocomplete="off"
    autofocus
    borderless
    class="bg-white"
    dense
    type="search"
    @update:model-value="onInput"
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
  props: {
    onInput: {
      type: Function,
      default: () => {},
    },
  },
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
