<template>
  <q-list>
    <template
      v-for="(language, i) in languages"
      :key="i"
    >
      <q-item>
        <q-item-section>
          <div
            class="row"
          >
            <div
              class="col-6"
            >
              <span
                class="full-height flex items-center"
                v-text="language.name"
              />
            </div>
            <div
              class="col-6"
            >
              <template
                v-for="(value) in values"
                :key="value.id"
              >
                <span
                  v-if="value.id === language.id"
                  class="full-height flex items-center"
                  v-text="value.text"
                />
              </template>
            </div>
          </div>
        </q-item-section>
      </q-item>
      <q-separator
        v-show="i < languages.length - 1"
        spaced
      />
    </template>
  </q-list>
</template>

<script>
export default {
  name: '',
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
