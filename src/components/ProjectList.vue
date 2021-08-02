<template>
  <q-list>
    <q-separator
      spaced
    />
    <template
      v-for="(project) in projects"
      :key="project.id"
    >
      <q-item>
        <q-item-section
          class="text-weight-regular"
        >
          <div
            class="text-subtitle2 text-weight-regular q-mb-md"
          >
            <router-link
              :to="{ name: 'project', params: { projectId: project.id } }"
              class="text-secondary underline-none underline-hover"
              v-text="project.name"
            />
          </div>
          <div>
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
