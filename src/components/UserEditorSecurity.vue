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
            text="New password"
            class="q-my-sm"
          />
          <q-input
            v-model="state.newPassword"
            :model-value="state.newPassword"
            :rules="rules.newPassword"
            borderless
            dense
            type="password"
          />
        </div>
        <div
          class="q-pb-lg"
        >
          <AppTextCaption
            text="Confirm password"
            class="q-my-sm"
          />
          <q-input
            v-model="state.confirmPassword"
            :model-value="state.confirmPassword"
            :rules="rules.confirmPassword"
            borderless
            dense
            type="password"
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
  name: 'UserEditorSecurity',
  components: {
    AppTextCaption,
  },
  props: {
    onSubmit: {
      type: Function,
      default: () => {},
    },
    userId: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const state = reactive({
      newPassword: '',
      confirmPassword: '',
    });
    const form = ref(null);
    const rules = {
      newPassword: [
        (v) => (v && !!v.trim()) || 'The new password is required.',
        (v) => v.length >= 8 || 'The new password must be at least 8 characters.',
      ],
      confirmPassword: [
        (v) => (v && !!v.trim()) || 'The confirm password is required.',
        (v) => v === state.newPassword || 'The password and confirm password does not match.',
      ],
    };
    const submit = async () => {
      if (!await form?.value.validate()) {
        return;
      }
      props.onSubmit({
        userId: props.userId,
        newPassword: state.newPassword,
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
