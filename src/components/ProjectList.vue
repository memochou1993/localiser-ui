<template>
  <q-list
    bordered
    class="rounded-borders q-py-sm"
    style="background: #fafafa;"
  >
    <template
      v-for="(project, i) in projects"
      :key="project.id"
    >
      <q-item
        class="q-py-none"
      >
        <q-item-section
          class="text-weight-regular"
        >
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
              class="q-ma-none q-mr-sm cursor-pointer"
              color="red"
              dense
              outline
              square
            />
          </div>
        </q-item-section>
      </q-item>
      <q-separator
        v-show="i < projects.length - 1"
        spaced
      />
    </template>
  </q-list>
</template>

<script>
export default {
  name: 'ProjectList',
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
