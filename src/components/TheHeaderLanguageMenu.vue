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
const items = [
  {
    name: 'English',
    locale: 'en',
    separated: false,
  },
  {
    name: 'Chinese Traditional',
    locale: 'zh_TW',
    separated: false,
  },
];

export default {
  name: 'TheHeaderLanguageMenu',
  props: {
    onChangeLanguage: {
      type: Function,
      default: () => {},
    },
  },
  setup() {
    return {
      items,
    };
  },
};
</script>
