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
        @keyup.enter.stop="submit"
        @submit.stop
      >
        <div
          class="q-pb-lg"
        >
          <AppTextCaption
            text="Project name"
            class="q-my-sm"
          />
          <q-input
            v-model="state.name"
            :model-value="state.name"
            :rules="rules.name"
            autocomplete="off"
            autofocus
            borderless
            dense
          />
        </div>
        <div
          class="q-pb-lg"
        >
          <AppTextCaption
            text="Project description"
            class="q-my-sm"
          />
          <q-input
            v-model="state.description"
            :model-value="state.description"
            autocomplete="off"
            autogrow
            borderless
            dense
          />
        </div>
        <div
          class="q-pb-lg"
        >
          <AppTextCaption
            text="Key prefix"
            class="q-my-sm"
          />
          <q-input
            v-model="state.keyPrefix"
            :model-value="state.keyPrefix"
            autocomplete="off"
            borderless
            dense
          />
        </div>
        <div
          class="q-pb-lg"
        >
          <AppTextCaption
            text="Key suffix"
            class="q-my-sm"
          />
          <q-input
            v-model="state.keySuffix"
            :model-value="state.keySuffix"
            autocomplete="off"
            borderless
            dense
          />
        </div>
        <div
          class="text-right q-mt-lg"
        >
          <q-btn
            :disable="!enableSubmitButton"
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
    defaultDescription: {
      type: String,
      default: '',
    },
    defaultName: {
      type: String,
      default: '',
    },
    defaultKeyPrefix: {
      type: String,
      default: '',
    },
    defaultKeySuffix: {
      type: String,
      default: '',
    },
    enableSubmitButton: {
      type: Boolean,
      default: true,
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
      description: props.defaultDescription,
      keyPrefix: props.defaultKeyPrefix,
      keySuffix: props.defaultKeySuffix,
    });
    const form = ref(null);
    const submit = async () => {
      if (!await form?.value.validate()) {
        return;
      }
      props.onSubmit({
        projectId: props.projectId,
        name: state.name,
        description: state.description,
        keyPrefix: state.keyPrefix,
        keySuffix: state.keySuffix,
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
