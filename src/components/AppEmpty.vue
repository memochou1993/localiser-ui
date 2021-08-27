<template>
  <q-card
    bordered
    class="row justify-center items-center"
    flat
    style="min-height: 400px"
  >
    <q-img
      class="logo"
    />
  </q-card>
</template>

<script>
import { useI18n } from 'vue-i18n/index';

export default {
  name: 'AppEmpty',
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
};
</script>
