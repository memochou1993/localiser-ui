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
        @submit.stop="submit"
      >
        <div
          class="q-pb-lg"
        >
          <AppTextCaption
            text="Name"
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
          class="q-pb-lg"
        >
          <AppTextCaption
            text="Email"
            class="q-my-sm"
          />
          <q-input
            v-model="state.email"
            :model-value="state.email"
            :rules="rules.email"
            autofocus
            borderless
            dense
            type="email"
          />
        </div>
        <div
          class="text-right q-my-lg"
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

export default {
  name: 'UserEditorGeneral',
  components: {
    AppTextCaption,
  },
  props: {
    defaultName: {
      type: String,
      default: '',
    },
    defaultEmail: {
      type: String,
      default: '',
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
    userId: {
      type: Number,
      default: 0,
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const state = reactive({
      name: props.defaultName,
      email: props.defaultEmail,
    });
    const form = ref(null);
    const rules = {
      name: [
        (v) => (v && !!v.trim()) || 'The name is required.',
      ],
      email: [
        (v) => (v && !!v.trim()) || 'The email is required.',
        (v) => /^\S+@\S+\.\S+$/.test(v) || 'The email must be a valid email address.',
        (v) => (v.trim() === props.defaultEmail.trim() || !props.users.some((l) => l.email === v.trim())) || 'The email has already been taken.',
      ],
    };
    const submit = async () => {
      if (!await form?.value.validate()) {
        return;
      }
      props.onSubmit({
        userId: props.userId,
        name: state.name,
        email: state.email,
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
