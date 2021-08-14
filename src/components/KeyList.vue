<template>
  <q-list
    v-if="keys.filter(filter).length > 0"
    bordered
    class="bg-white rounded-borders q-py-sm"
  >
    <template
      v-for="(key, i) in keys.filter(filter)"
      :key="key.id"
    >
      <q-separator
        v-show="i > 0"
        spaced
      />
      <KeyItem
        :key-item="key"
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
    class="text-center"
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
    languages: {
      type: Array,
      default: () => [],
    },
    needle: {
      type: String,
      default: '',
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
  },
  setup(props) {
    const filter = (k) => {
      const needle = props.needle.toLowerCase();
      return k.name.toLowerCase().includes(needle)
        || k.values.some((v) => v.text?.toLowerCase().includes(needle));
    };
    return {
      filter,
    };
  },
};
</script>
