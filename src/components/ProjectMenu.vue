<template>
  <q-menu>
    <q-list
      class="slim"
    >
      <template
        v-for="(item, i) in menuItems"
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
  computed,
} from 'vue';
import {
  useRouter,
} from 'vue-router';
import { useI18n } from 'vue-i18n/index';

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
    const { t } = useI18n();
    const menuItems = computed(() => [
      {
        name: t('__ButtonClearCache'),
        callback: props.onClearCache,
        separated: false,
      },
      {
        name: t('__ViewTitleProjectSettings'),
        callback: async () => {
          await router.push({
            name: 'project.profile',
          });
        },
        separated: false,
      },
    ]);
    return {
      menuItems,
    };
  },
};
</script>
