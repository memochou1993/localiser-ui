<template>
  <q-list>
    <template
      v-for="(item, i) in items"
      :key="i"
    >
      <q-separator
        v-show="item.separator"
      />
      <q-item
        :to="item.to"
        class="text-caption"
        clickable
      >
        <q-item-section
          avatar
        >
          <q-icon
            :name="item.icon"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label
            class="text-body2"
          >
            <span
              v-text="item.name"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script>
const items = [
  {
    name: 'Projects',
    to: {
      name: 'project',
    },
    icon: 'mdi-file-outline',
    separator: false,
  },
  {
    name: 'Log out',
    to: {
      name: 'logout',
    },
    icon: 'mdi-logout-variant',
    separator: true,
  },
];

export default {
  name: 'TheMenu',
  setup() {
    return {
      items,
    };
  },
};
</script>
