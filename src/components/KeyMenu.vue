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
        style="min-width: 160px;"
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
            clickable
            style="min-height: 40px;"
            @click="item.callback"
          >
            <q-item-section>
              <span
                v-text="'Delete Key'"
              />
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-menu>
  </div>
</template>

<script>
export default {
  name: 'KeyMenu',
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
    const items = [
      {
        name: 'Delete Key',
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
