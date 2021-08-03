<template>
  <q-card
    bordered
    class="q-px-md"
    flat
  >
    <q-input
      autofocus
      borderless
      dense
      placeholder="Search"
      @update:model-value="(v) => $emit('update', v)"
    />
  </q-card>
</template>

<script>
export default {
  name: 'AppFilter',
  emits: [
    'update',
  ],
};
</script>
