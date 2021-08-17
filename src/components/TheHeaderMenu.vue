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
            v-if="!item.requiresRoleCode || item.requiresRoleCode === userRoleCode"
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
import {
  Role,
} from '@/constants';

const items = [
  {
    name: 'My Profile',
    to: {
      name: 'user.profile',
    },
    requiresRoleCode: 0,
    separated: true,
  },
  {
    name: 'My Projects',
    to: {
      name: 'project.index',
    },
    requiresRoleCode: 0,
    separated: false,
  },
  {
    name: 'System Settings',
    to: {
      name: 'system.users',
    },
    requiresRoleCode: Role.Admin,
    separated: false,
  },
  {
    name: 'Log out',
    to: {
      name: 'logout',
    },
    requiresRoleCode: 0,
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
    userRoleCode: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    return {
      items,
    };
  },
};
</script>
