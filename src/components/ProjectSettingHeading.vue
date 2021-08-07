<template>
  <div
    class="q-mb-lg"
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
  name: 'ProjectSettingHeading',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
