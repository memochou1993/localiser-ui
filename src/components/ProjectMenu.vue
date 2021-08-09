<template>
  <q-menu>
    <q-list
      class="slim"
    >
      <template
        v-for="(item, i) in items"
        :key="i"
      >
        <q-separator
          v-show="item.separated"
        />
        <q-item
          v-close-popup
          :to="item.to"
          class="dense"
          clickable
        >
          <q-item-section>
            <span
              v-text="item.name"
            />
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-menu>
</template>

<script>
const items = [
  {
    name: 'Settings',
    to: {
      name: 'project.profile',
    },
    separated: false,
  },
];

export default {
  name: 'KeyIndexMenu',
  setup() {
    return {
      items,
    };
  },
};
</script>
