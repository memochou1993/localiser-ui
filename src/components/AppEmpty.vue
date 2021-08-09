<template>
  <q-card
    bordered
    flat
  >
    <q-card-section
      class="row justify-center items-center"
      style="min-height: 400px"
    >
      <span
        class="text-caption"
        v-text="'No Data'"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'AppEmpty',
};
</script>
