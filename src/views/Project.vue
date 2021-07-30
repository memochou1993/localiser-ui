<template>
  <div
    class="row justify-center"
  >
    <div
      class="col-10 col-sm-8"
    >
      <q-card
        class="q-pa-md"
      >
        <q-card-section
          class="q-pa-md"
        >
          <div
            class="text-h6 text-weight-regular q-mb-md"
            v-text="'Projects'"
          />
          <div
            class="text-subtitle2"
          >
            <q-list>
              <template
                v-for="(project, i) in projects"
                :key="i"
              >
                <q-separator
                  spaced
                />
                <q-item>
                  <q-item-section
                    class="text-weight-regular"
                  >
                    <q-item-label
                      v-text="project.name"
                    />
                    <q-item-label>
                      <q-chip
                        class="q-mx-none q-mt-sm q-mb-none"
                        color="red"
                        dense
                        label="en"
                        outline
                        square
                      />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <q-separator
                spaced
              />
            </q-list>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Project',
  setup() {
    const projects = [
      {
        name: 'My Project',
      },
      {
        name: 'My Project 2',
      },
    ];
    return {
      projects,
    };
  },
};
</script>
