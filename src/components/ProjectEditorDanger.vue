<template>
  <q-card
    bordered
    flat
    class="q-pa-md"
  >
    <q-card-section
      class="q-py-none"
    >
      <q-form
        ref="form"
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
              @click="submit"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import {
  ref,
} from 'vue';
import AppTextCaption from './AppTextCaption.vue';

export default {
  name: 'ProjectEditorDanger',
  components: {
    AppTextCaption,
  },
  props: {
    onSubmit: {
      type: Function,
      default: () => {},
    },
    projectId: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const form = ref(null);
    const submit = async () => {
      if (!await form?.value.validate()) {
        return;
      }
      props.onSubmit({
        projectId: props.projectId,
      });
    };
    return {
      form,
      submit,
    };
  },
};
</script>
