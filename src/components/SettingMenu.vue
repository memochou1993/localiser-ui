<template>
  <q-list
    bordered
    class="bg-white rounded-borders q-py-xs"
  >
    <template
      v-for="(item, i) in items"
      :key="i"
    >
      <q-item
        v-close-popup
        :to="item.to"
        clickable
        exact
        exact-active-class="bg-primary text-white"
      >
        <q-item-section>
          <span
            class="text-caption q-px-md"
            v-text="item.name"
          />
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script>
export default {
  name: 'SettingMenu',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
