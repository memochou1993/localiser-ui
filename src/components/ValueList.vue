<template>
  <q-list
    class="full-height"
  >
    <template
      v-for="(language, i) in languages"
      :key="language.id"
    >
      <q-separator
        v-show="i > 0"
        spaced
      />
      <ValueItem
        :current-value="values.find((v) => v.language.id === language.id)"
        :key-id="keyId"
        :language="language"
        :on-create-value="onCreateValue"
        :on-edit-value="onEditValue"
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
};
</script>
