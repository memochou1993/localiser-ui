<template>
  <div>
    <q-btn
      flat
      icon="mdi-menu"
      round
    />
    <q-menu>
      <q-list
        class="slim"
      >
        <q-item-label
          class="text-caption text-weight-medium q-pa-md"
          v-text="userName"
        />
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
            exact-active-class="text-black"
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
    separated: true,
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
  name: 'TheHeaderMenu',
  props: {
    userName: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      items,
    };
  },
};
</script>
