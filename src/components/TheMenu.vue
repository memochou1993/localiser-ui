<template>
  <div>
    <q-btn
      flat
      icon="mdi-menu"
      round
    />
    <q-menu>
      <q-list
        style="min-width: 160px"
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
            style="min-height: 40px"
          >
            <q-item-section>
              <q-item-label>
                <span
                  v-text="item.name"
                />
              </q-item-label>
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
    name: 'Profile',
    to: {
      name: 'projects',
    },
    separated: false,
  },
  {
    name: 'Projects',
    to: {
      name: 'projects',
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
