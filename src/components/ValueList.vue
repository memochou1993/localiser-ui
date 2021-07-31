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
      <q-item
        class="q-pa-none"
      >
        <q-item-section>
          <div
            class="row"
          >
            <div
              class="col-3 full-height flex items-center q-px-md"
            >
              <span
                v-text="language.name"
              />
            </div>
            <div
              class="col-9 full-height flex items-center q-px-md"
            >
              <template
                v-for="(value) in values"
                :key="value.id"
              >
                <span
                  v-if="value.id === language.id"
                  class="text-secondary"
                  v-text="value.text"
                />
              </template>
              <template
                v-if="values.length < 1"
              >
                <span
                  class="text-warning"
                  v-text="'Empty'"
                />
              </template>
            </div>
          </div>
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script>
export default {
  name: 'ValueList',
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
};
</script>
