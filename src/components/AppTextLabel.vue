<template>
  <div
    class="text-caption text-grey-10 q-ma-xs"
    v-text="text"
  />
</template>

<script>
export default {
  name: 'AppTextLabel',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
