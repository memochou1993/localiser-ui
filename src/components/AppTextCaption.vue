<template>
  <div
    class="text-caption text-weight-medium text-grey-10"
    v-text="text"
  />
</template>

<script>
export default {
  name: 'AppTextCaption',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
