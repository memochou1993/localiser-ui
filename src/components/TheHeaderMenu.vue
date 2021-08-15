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
          <template
            v-if="!item.requiresRole || item.requiresRole === userRole"
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
      name: 'user.profile',
    },
    requiresRole: '',
    separated: true,
  },
  {
    name: 'My Projects',
    to: {
      name: 'project.index',
    },
    requiresRole: '',
    separated: false,
  },
  {
    name: 'Settings',
    to: {
      name: 'system.users',
    },
    requiresRole: 'admin',
    separated: false,
  },
  {
    name: 'Log out',
    to: {
      name: 'logout',
    },
    requiresRole: '',
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
    userRole: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {
      items,
    };
  },
};
</script>
