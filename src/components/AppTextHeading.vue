<template>
  <div
    class="q-mb-sm"
  >
    <span
      class="text-h6 text-weight-regular"
      v-text="text"
    />
    <q-separator
      spaced
    />
  </div>
</template>

<script>
export default {
  name: 'AppHeading',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
