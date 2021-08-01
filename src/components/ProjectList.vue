<template>
  <q-list>
    <template
      v-for="(project, i) in projects"
      :key="project.id"
    >
      <q-separator
        v-show="i === 0"
        spaced
      />
      <q-item>
        <q-item-section
          class="text-weight-regular"
        >
          <q-item-label
            class="text-subtitle2 text-weight-regular q-mb-sm"
          >
            <router-link
              :to="{ name: 'project', params: { projectId: project.id } }"
              class="text-secondary underline-none underline-hover"
              v-text="project.name"
            />
          </q-item-label>
          <q-item-label
            v-show="project.description"
            caption
            class="q-mb-sm"
            v-text="project.description"
          />
          <q-item-label>
            <template
              v-for="(language) in project.languages"
              :key="language.id"
            >
              <q-chip
                :label="language.name"
                class="q-ma-none q-mr-sm cursor-pointer"
                color="red"
                dense
                outline
                square
              />
            </template>
          </q-item-label>
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
