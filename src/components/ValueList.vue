<template>
  <q-list>
    <template
      v-for="(language, i) in languages"
      :key="language.id"
    >
      <q-separator
        v-show="i > 0"
        class="gt-xs"
        spaced
      />
      <ValueItem
        :enable-creator="enableCreator"
        :enable-editor="enableEditor"
        :key-id="keyId"
        :language="language"
        :on-create-value="onCreateValue"
        :on-edit-value="onEditValue"
        :value-item="values.find((v) => v.language.id === language.id)"
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
    enableCreator: {
      type: Boolean,
      required: true,
    },
    enableEditor: {
      type: Boolean,
      required: true,
    },
    keyId: {
      type: String,
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
