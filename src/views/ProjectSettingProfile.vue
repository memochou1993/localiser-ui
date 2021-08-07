<template>
  <div>
    <ProjectSettingHeading
      text="General"
    />
    <q-card
      bordered
      flat
      class="q-pa-md"
      style="min-height: 400px"
    >
      <q-card-section
        class="q-py-none"
      >
        <q-form
          ref="formRef"
          @submit="submit"
        >
          <div
            class="q-pb-lg"
          >
            <div
              class="text-caption text-weight-medium text-grey-10 q-py-sm"
              v-text="'Project Name'"
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
            class="text-right q-mt-md"
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
</template>

<script>
import {
  reactive,
  ref,
} from 'vue';
import * as actions from '@/actions';
import {
  ProjectSettingHeading,
} from '@/components';

const rules = {
  name: [
    (v) => (v && !!v.trim()) || 'The name is required.',
  ],
};

export default {
  name: 'ProjectSettingProfile',
  components: {
    ProjectSettingHeading,
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      errorMessages: {},
      name: props.project.name,
    });
    const formRef = ref(null);
    const submit = async () => {
      if (!await formRef?.value.validate()) {
        return;
      }
      try {
        const { data } = await actions.project.update({
          projectId: props.project.id,
          name: state.name,
        });
        Object.assign(props.project, data);
      } catch (err) {
        const { data } = err.response;
        state.errorMessages.name = data.errors.name.pop();
      }
    };
    return {
      state,
      formRef,
      rules,
      submit,
    };
  },
};
</script>
