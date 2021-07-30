<template>
  <div
    v-if="isAuthenticated"
  >
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
            v-show="item.separator"
          />
          <q-item
            v-close-popup
            :to="item.to"
            clickable
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
import {
  computed,
} from 'vue';
import {
  useStore,
} from 'vuex';

const items = [
  {
    name: 'Projects',
    to: {
      name: 'project',
    },
    separator: false,
  },
  {
    name: 'Log out',
    to: {
      name: 'logout',
    },
    separator: true,
  },
];

export default {
  name: 'TheMenu',
  setup() {
    const store = useStore();
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    return {
      items,
      isAuthenticated,
    };
  },
};
</script>
