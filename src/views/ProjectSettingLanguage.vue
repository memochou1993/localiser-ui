<template>
  <div>
    <q-table
      :rows="project.languages"
      :columns="columns"
      bordered
      card-class="bg-grey-1"
      flat
      hide-bottom
    />
  </div>
</template>

<script>
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: 'code',
    required: true,
    label: 'Code',
    align: 'left',
    field: (row) => row.code,
    sortable: true,
  },
];

export default {
  name: 'ProjectSettingLanguage',
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      columns,
    };
  },
};
</script>
