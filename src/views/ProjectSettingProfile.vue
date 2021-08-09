<template>
  <div>
    <div
      class="q-mb-lg"
    >
      <AppTextHeading
        text="General"
      />
      <div
        class="row"
      />
      <q-card
        bordered
        flat
        class="q-pa-md my-12"
        style="min-height: 400px"
      >
        <q-card-section
          class="q-py-none"
        >
          <q-form
            ref="form"
            @keyup.enter.stop="submit"
            @submit="submit"
          >
            <div
              class="q-pb-lg"
            >
              <AppTextCaption
                text="Project Name"
                class="q-my-sm"
              />
              <q-input
                v-model="state.name"
                :error="!!state.errorMessages.name"
                :error-message="state.errorMessages.name"
                :model-value="state.name"
                :rules="rules.name"
                autofocus
                borderless
                dense
                @update:model-value="state.errorMessages.name = ''"
              />
            </div>
            <div
              class="text-right"
            >
              <q-btn
                color="primary"
                label="Save"
                no-caps
                @click="submit"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
    <div
      class="q-mb-lg"
    >
      <AppTextHeading
        text="Danger Zone"
      />
      <div
        class="row"
      />
      <q-card
        bordered
        flat
        class="q-pa-md my-12"
      >
        <q-card-section
          class="q-py-none"
        >
          <div
            class="row justify-between items-center"
          >
            <div
              class="col-12 col-md-8"
            >
              <AppTextCaption
                text="Delete this project"
              />
              <span
                v-text="'Once you delete a project, there is no going back. Please be certain.'"
              />
            </div>
            <div
              class="col-12 col-md-4 text-sm-right"
            >
              <q-btn
                class="text-red q-my-md"
                label="Delete this project"
                no-caps
                outline
                unelevated
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  ref,
} from 'vue';
import * as actions from '@/actions';
import {
  AppTextCaption,
  AppTextHeading,
} from '@/components';

const rules = {
  name: [
    (v) => (v && !!v.trim()) || 'The name is required.',
  ],
};

export default {
  name: 'ProjectSettingProfile',
  components: {
    AppTextCaption,
    AppTextHeading,
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
    onUpdateProject: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const state = reactive({
      errorMessages: {},
      name: props.project.name,
    });
    const form = ref(null);
    const submit = async () => {
      if (!await form?.value.validate()) {
        return;
      }
      try {
        const { data } = await actions.project.update({
          projectId: props.project.id,
          name: state.name,
        });
        const { project } = props;
        Object.assign(project, data);
        props.onUpdateProject(project);
      } catch (err) {
        const { data } = err.response;
        state.errorMessages.name = data.errors.name.pop();
      }
    };
    return {
      state,
      form,
      rules,
      submit,
    };
  },
};
</script>
