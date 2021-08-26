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
          v-show="false"
          class="q-pb-lg"
        >
          <q-input
            autocomplete="username"
            model-value=""
            type="text"
          />
        </div>
        <div
          class="q-pb-lg"
        >
          <AppTextCaption
            :text="t('__InputNewPassword')"
            class="q-my-sm"
          />
          <q-input
            v-model="state.newPassword"
            :model-value="state.newPassword"
            :rules="rules.newPassword"
            autocomplete="new-password"
            autofocus
            borderless
            dense
            type="password"
          />
        </div>
        <div
          class="q-pb-lg"
        >
          <AppTextCaption
            :text="t('__InputConfirmPassword')"
            class="q-my-sm"
          />
          <q-input
            v-model="state.confirmPassword"
            :model-value="state.confirmPassword"
            :rules="rules.confirmPassword"
            autocomplete="new-password"
            borderless
            dense
            type="password"
          />
        </div>
        <div
          class="text-right q-mt-lg"
        >
          <q-btn
            :label="t('__ButtonSave')"
            color="primary"
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
import { useI18n } from 'vue-i18n/index';
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
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const state = reactive({
      newPassword: '',
      confirmPassword: '',
    });
    const form = ref(null);
    const rules = {
      newPassword: [
        (v) => (v && !!v.trim()) || t('__ValidationNewPasswordRequired'),
        (v) => v.length >= 8 || t('__ValidationNewPasswordMin'),
      ],
      confirmPassword: [
        (v) => (v && !!v.trim()) || t('__ValidationConfirmPasswordRequired'),
        (v) => v === state.newPassword || t('__ValidationNewPasswordConfirmed'),
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
      t,
      state,
      form,
      rules,
      submit,
    };
  },
};
</script>
