<template>
  <q-list
    v-if="projects.filter(filter).length > 0"
    bordered
    class="bg-white rounded-borders q-py-sm"
  >
    <template
      v-for="(project, i) in projects.filter(filter)"
      :key="project.id"
    >
      <q-separator
        v-show="i > 0"
        spaced
      />
      <q-item
        class="q-py-none"
      >
        <q-item-section>
          <div
            class="text-subtitle2 text-weight-regular q-my-sm"
          >
            <router-link
              :to="{ name: 'project.show', params: { projectId: project.id } }"
              class="text-info underline-none underline-hover"
              v-text="project.name"
            />
          </div>
          <div
            v-if="project.languages.length > 0"
            class="q-my-sm"
          >
            <q-chip
              v-for="(language) in project.languages"
              :key="language.id"
              :label="language.name"
              class="q-px-sm q-ml-none q-my-xs q-mr-sm cursor-default"
              color="secondary"
              dense
              outline
              square
            />
          </div>
        </q-item-section>
        <q-card-section
          class="flex items-center q-px-none gt-xs"
          side
        >
          <span
            class="text-grey-6"
            v-text="`Updated ${formatDate(project.updated_at)} ago`"
          />
        </q-card-section>
      </q-item>
    </template>
  </q-list>
  <AppEmpty
    v-else
    class="text-center"
  />
</template>

<script>
import moment from 'moment';
import AppEmpty from './AppEmpty.vue';

export default {
  name: 'ProjectList',
  components: {
    AppEmpty,
  },
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
    needle: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const filter = (p) => {
      const needle = props.needle.toLowerCase();
      return p.name.toLowerCase().includes(needle);
    };
    const formatDate = (v) => moment.duration(moment(v).diff(moment())).humanize();
    return {
      filter,
      formatDate,
    };
  },
};
</script>
