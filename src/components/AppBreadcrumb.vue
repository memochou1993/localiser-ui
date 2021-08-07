<template>
  <q-breadcrumbs
    active-color="info"
  >
    <template
      v-for="(breadcrumb, i) in breadcrumbs"
      :key="i"
    >
      <q-breadcrumbs-el
        :label="breadcrumb.label"
        :to="breadcrumb.to"
      />
    </template>
  </q-breadcrumbs>
</template>

<script>
export default {
  name: 'AppBreadcrumb',
  props: {
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
