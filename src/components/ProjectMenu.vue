<template>
  <q-menu>
    <q-list
      class="slim"
    >
      <template
        v-for="(item, i) in menuItems"
        :key="i"
      >
        <template
          v-if="item.enabled"
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
    enableVisitWebsiteButton: {
      type: Boolean,
      default: false,
    },
    onClearCache: {
      type: Function,
      default: () => {},
    },
    onVisitWebsite: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const router = useRouter();
    const { t } = useI18n();
    const menuItems = computed(() => [
      {
        name: t('__ButtonVisitWebsite'),
        callback: props.onVisitWebsite,
        separated: false,
        enabled: props.enableVisitWebsiteButton,
      },
      {
        name: t('__ButtonClearCache'),
        callback: props.onClearCache,
        separated: false,
        enabled: true,
      },
      {
        name: t('__ViewTitleProjectSettings'),
        callback: async () => {
          await router.push({
            name: 'project.settings',
          });
        },
        separated: false,
        enabled: true,
      },
    ]);
    return {
      menuItems,
    };
  },
};
</script>
