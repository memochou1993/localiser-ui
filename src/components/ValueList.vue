<template>
  <q-list>
    <template
      v-for="(language, i) in languages"
      :key="language.id"
    >
      <q-separator
        v-show="i > 0"
        spaced
      />
      <ValueItem
        :key-id="keyId"
        :language="language"
        :on-create-value="onCreateValue"
        :on-edit-value="onEditValue"
        :value="values.find((value) => value.language.id === language.id)"
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
    onCreateValue: {
      type: Function,
      default: () => {},
    },
    onEditValue: {
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
