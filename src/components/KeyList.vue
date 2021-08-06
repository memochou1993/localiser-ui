<template>
  <q-list
    v-if="keys.length > 0"
    bordered
    class="rounded-borders bg-grey-1 q-py-sm"
  >
    <template
      v-for="(key, i) in keys"
      :key="key.id"
    >
      <q-separator
        v-show="i > 0"
        spaced
      />
      <KeyItem
        :current-key="key"
        :keys="keys"
        :on-create-value="onCreateValue"
        :on-delete-key="onDeleteKey"
        :on-edit-key="onEditKey"
        :on-edit-value="onEditValue"
        :languages="languages"
      />
    </template>
  </q-list>
  <AppEmpty
    v-else
    class="text-center q-my-xl"
  />
</template>

<script>
import AppEmpty from './AppEmpty.vue';
import KeyItem from './KeyItem.vue';

export default {
  name: 'KeyList',
  components: {
    AppEmpty,
    KeyItem,
  },
  props: {
    keys: {
      type: Array,
      default: () => [],
    },
    onCreateValue: {
      type: Function,
      default: () => {},
    },
    onDeleteKey: {
      type: Function,
      default: () => {},
    },
    onEditKey: {
      type: Function,
      default: () => {},
    },
    onEditValue: {
      type: Function,
      default: () => {},
    },
    languages: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
