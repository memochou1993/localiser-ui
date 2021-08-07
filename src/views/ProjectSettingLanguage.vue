<template>
  <div>
    <ProjectSettingHeading
      text="Languages"
    />
    <q-table
      :rows="project.languages"
      :columns="columns"
      bordered
      flat
      hide-bottom
    />
  </div>
</template>

<script>
import {
  ProjectSettingHeading,
} from '@/components';

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
    sortable: false,
  },
  {
    name: 'code',
    required: true,
    label: 'Code',
    align: 'left',
    field: (row) => row.code,
    sortable: false,
  },
];

export default {
  name: 'ProjectSettingLanguage',
  components: {
    ProjectSettingHeading,
  },
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
