<template>
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
        ref="form"
        @keyup.enter.stop="submit"
        @submit.stop="submit"
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
            :model-value="state.name"
            :rules="rules.name"
            autofocus
            borderless
            dense
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
</template>

<script>
import {
  reactive,
  ref,
} from 'vue';
import AppTextCaption from './AppTextCaption.vue';

const rules = {
  name: [
    (v) => (v && !!v.trim()) || 'The name is required.',
  ],
};

export default {
  name: 'ProjectEditorGeneral',
  components: {
    AppTextCaption,
  },
  props: {
    defaultName: {
      type: String,
      default: '',
    },
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
    const state = reactive({
      name: props.defaultName,
    });
    const form = ref(null);
    const submit = async () => {
      if (!await form?.value.validate()) {
        return;
      }
      props.onSubmit({
        projectId: props.projectId,
        name: state.name,
      });
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
