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
            :text="t('__InputName')"
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
            :text="t('__InputEmail')"
            class="q-my-sm"
          />
          <q-input
            v-model="state.email"
            :model-value="state.email"
            :rules="rules.email"
            autocomplete="off"
            autofocus
            borderless
            dense
            type="email"
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
    const { t } = useI18n();
    const state = reactive({
      name: props.defaultName,
      email: props.defaultEmail,
    });
    const form = ref(null);
    const rules = {
      name: [
        (v) => (v && !!v.trim()) || t('__ValidationNameRequired'),
      ],
      email: [
        (v) => (v && !!v.trim()) || t('__ValidationEmailRequired'),
        (v) => /^\S+@\S+\.\S+$/.test(v) || t('__ValidationEmailValid'),
        (v) => (v.trim() === props.defaultEmail.trim() || !props.users.some((l) => l.email === v.trim())) || t('__ValidationEmailUnique'),
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
      t,
      state,
      form,
      rules,
      submit,
    };
  },
};
</script>
