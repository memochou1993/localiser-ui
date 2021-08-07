<template>
  <div
    class="q-my-xl"
  >
    <div
      class="q-my-md"
    >
      <AppSkeleton
        width="25%"
      />
    </div>
    <div
      class="q-my-md"
    >
      <AppSkeleton />
    </div>
    <div
      class="q-my-md"
    >
      <AppSkeleton
        :count="5"
      />
    </div>
  </div>
</template>

<script>
import AppSkeleton from './AppSkeleton.vue';

export default {
  name: 'AppLoading',
  components: {
    AppSkeleton,
  },
};
</script>
