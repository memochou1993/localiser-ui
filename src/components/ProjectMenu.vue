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
          class="dense"
          clickable
          @click="item.callback"
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
import {
  useRouter,
} from 'vue-router';

export default {
  name: 'KeyIndexMenu',
  props: {
    onClearCache: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const router = useRouter();
    const items = [
      {
        name: 'Clear cache',
        callback: props.onClearCache,
        separated: false,
      },
      {
        name: 'Settings',
        callback: async () => {
          await router.push({
            name: 'project.profile',
          });
        },
        separated: false,
      },
    ];
    return {
      items,
    };
  },
};
</script>
