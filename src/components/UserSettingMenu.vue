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
const items = [
  {
    name: 'General',
    to: {
      name: 'user.profile',
    },
  },
  {
    name: 'Security',
    to: {
      name: 'user.security',
    },
  },
];

export default {
  name: 'UserSettingMenu',
  setup() {
    return {
      items,
    };
  },
};
</script>
