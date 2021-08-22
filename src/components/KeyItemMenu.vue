<template>
  <div>
    <q-btn
      color="grey-6"
      dense
      flat
      icon="mdi-dots-vertical"
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
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n/index';

export default {
  name: 'KeyItemMenu',
  props: {
    keyId: {
      type: Number,
      required: true,
    },
    onDeleteKey: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const { t } = useI18n();
    const items = [
      {
        name: t('__ButtonDeleteKey'),
        callback: () => props.onDeleteKey({ keyId: props.keyId }),
        separated: false,
      },
    ];
    return {
      items,
    };
  },
};
</script>
