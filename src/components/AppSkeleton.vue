<template>
  <q-skeleton
    v-for="(n) in count"
    :key="n"
    :height="height"
    :width="width"
    type="text"
  />
</template>

<script>
export default {
  name: 'AppSkeleton',
  props: {
    count: {
      type: Number,
      default: 1,
    },
    height: {
      type: String,
      default: '50px',
    },
    width: {
      type: String,
      default: '100%',
    },
  },
};
</script>
