<template>
  <div>
    <q-btn
      flat
      icon="mdi-translate"
      round
    />
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
            exact-active-class="text-black"
            @click="onChangeLanguage(item.locale)"
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
import {
  computed,
} from 'vue';
import { useI18n } from 'vue-i18n/index';

export default {
  name: 'TheHeaderMenuLanguage',
  props: {
    onChangeLanguage: {
      type: Function,
      default: () => {},
    },
  },
  setup() {
    const { t } = useI18n();
    const menuItems = computed(() => [
      {
        name: t('__LanguageEnglish'),
        locale: 'en',
        separated: false,
      },
      {
        name: t('__LanguageTraditionalChinese'),
        locale: 'zh_TW',
        separated: false,
      },
    ]);
    return {
      menuItems,
    };
  },
};
</script>
