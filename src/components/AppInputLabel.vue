<template>
  <div
    class="text-caption text-grey-10 q-pa-xs"
    v-text="text"
  />
</template>

<script>
export default {
  name: 'AppInputLabel',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
