<template>
  <q-list
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
      <q-item
        class="q-pa-none"
      >
        <q-item-section>
          <div
            class="row"
          >
            <div
              class="col-3 flex items-center"
            >
              <span
                class="q-px-md q-py-sm break-word"
                v-text="key.name"
              />
            </div>
            <div
              class="col-9"
            >
              <LanguageList
                :key-id="key.id"
                :languages="languages"
                :on-create-value="onCreateValue"
                :on-edit-value="onEditValue"
                :values="key.values"
              />
            </div>
          </div>
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script>
import LanguageList from './LanguageList.vue';

export default {
  name: 'KeyList',
  components: {
    LanguageList,
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
    onEditValue: {
      type: Function,
      default: () => {},
    },
    languages: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    //
  },
};
</script>
