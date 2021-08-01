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
        :key-id="keyId"
        :language="language"
        :on-create="onCreate"
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
    keyId: {
      type: Number,
      required: true,
    },
    languages: {
      type: Array,
      default: () => [],
    },
    onCreate: {
      type: Function,
      default: () => {},
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
