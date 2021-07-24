<template>
  <q-drawer
    :width="240"
    class="bg-primary"
    show-if-above
  >
    <q-list>
      <q-item-label
        class="text-body1 text-white"
        header
      >
        Localiser
      </q-item-label>
      <q-item
        class="text-caption text-white"
        clickable
        href="https://github.com/quasarframework/"
        tag="a"
      >
        <q-item-section
          avatar
        >
          <q-icon
            name="mdi-file-table-outline"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label
            class="text-body2"
          >
            Projects
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
export default {
  name: 'TheDrawer',
};
</script>
