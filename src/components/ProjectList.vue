<template>
  <q-list
    v-if="projects.length"
    bordered
    class="rounded-borders bg-grey-1 q-py-sm"
  >
    <template
      v-for="(project, i) in projects"
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
              :to="{ name: 'key.index', params: { projectId: project.id } }"
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
              class="q-ma-none q-mr-sm cursor-default"
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
    class="text-center q-my-xl"
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
  },
  setup() {
    const formatDate = (v) => moment.duration(moment(v).diff(moment())).humanize();
    return {
      formatDate,
    };
  },
};
</script>
