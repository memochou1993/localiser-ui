<template>
  <q-list>
    <template
      v-for="(key, i) in keys"
      :key="key.id"
    >
      <q-separator
        v-show="i === 0"
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
              class="col-3 full-height flex items-center"
            >
              <span
                class="q-px-md break-word"
                v-text="key.name"
              />
            </div>
            <div
              class="col-9"
            >
              <ValueList
                :key-id="key.id"
                :languages="languages"
                :on-create-value="onCreateValue"
                :values="key.values"
              />
            </div>
          </div>
        </q-item-section>
      </q-item>
      <q-separator
        spaced
      />
    </template>
  </q-list>
</template>

<script>
import ValueList from './ValueList.vue';

export default {
  name: 'KeyList',
  components: {
    ValueList,
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
