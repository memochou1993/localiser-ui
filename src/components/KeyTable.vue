<template>
  <q-table
    :columns="columns"
    :rows="rows"
    flat
    hide-bottom
    hide-header
    row-key="name"
  >
    <template
      #body="props"
    >
      <q-tr
        :props="props"
      >
        <q-td
          key="language"
          :props="props"
        >
          <span
            v-text="props.row.language.name"
          />
        </q-td>
        <q-td
          key="value"
          :props="props"
        >
          <template
            v-for="(value) in values"
            :key="value.id"
          >
            <span
              v-if="value.language.id === props.row.language.id"
              v-text="value.text"
            />
          </template>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'KeyTable',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
    values: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
