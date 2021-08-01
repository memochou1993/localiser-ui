<template>
  <q-list>
    <template
      v-for="(language, i) in languages"
      :key="i"
    >
      <q-separator
        v-show="i > 0"
        spaced
      />
      <ValueItem
        :language="language"
        :values="values"
      />
    </template>
  </q-list>
</template>

<script>
import ValueItem from './ValueItem.vue';

export default {
  name: 'ValueList',
  components: {
    ValueItem,
  },
  props: {
    languages: {
      type: Array,
      default: () => [],
    },
    values: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    //
  },
};
</script>
