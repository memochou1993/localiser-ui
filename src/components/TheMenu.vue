<template>
  <div>
    <q-btn
      flat
      icon="mdi-menu"
      round
    />
    <q-menu>
      <q-list
        class="text-primary"
        style="min-width: 160px;"
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
            clickable
            style="min-height: 40px;"
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
  </div>
</template>

<script>
const items = [
  {
    name: 'My Profile',
    to: {
      name: 'project.index', // FIXME
    },
    separated: false,
  },
  {
    name: 'My Projects',
    to: {
      name: 'project.index',
    },
    separated: false,
  },
  {
    name: 'Log out',
    to: {
      name: 'logout',
    },
    separated: true,
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
