<template>
  <div
    id="layout"
    class="row justify-center items-center"
  >
    <div
      class="col-12 col-sm-10 col-md-6"
    >
      <q-card
        class="shadow-4"
      >
        <q-card-section
          horizontal
          style="height: 400px;"
        >
          <q-img
            class="col-6 gt-xs logo"
          />
          <q-card-section
            class="col-12 col-sm-6 q-pa-lg"
          >
            <q-form
              ref="form"
              @keyup.enter.stop="submit"
              @submit.stop
            >
              <div
                class="q-pb-lg"
              >
                <AppTextLabel
                  :text="t('__InputEmail')"
                />
                <q-input
                  v-model="state.email"
                  :model-value="state.email"
                  :rules="rules.email"
                  autocomplete="off"
                  autofocus
                  borderless
                  dense
                  spellcheck="false"
                  type="email"
                />
              </div>
              <div
                class="q-pb-lg"
              >
                <AppTextLabel
                  :text="t('__InputPassword')"
                />
                <q-input
                  v-model="state.password"
                  :model-value="state.password"
                  :rules="rules.password"
                  autocomplete="off"
                  borderless
                  dense
                  type="password"
                />
              </div>
              <div
                class="text-right q-mt-lg"
              >
                <q-btn
                  :label="t('__ButtonLogIn')"
                  color="primary"
                  no-caps
                  @click="submit"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import {
  reactive,
  ref,
} from 'vue';
import {
  useStore,
} from 'vuex';
import {
  useRouter,
} from 'vue-router';
import { useI18n } from 'vue-i18n/index';
import { useQuasar } from 'quasar';
import * as actions from '@/actions';
import {
  AppTextLabel,
} from '@/components';

export default {
  name: 'Login',
  components: {
    AppTextLabel,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();
    const q = useQuasar();
    const state = reactive({
      email: '',
      password: '',
    });
    const form = ref(null);
    const rules = {
      email: [
        (v) => (v && !!v.trim()) || t('__ValidationEmailRequired'),
      ],
      password: [
        (v) => (v && !!v.trim()) || t('__ValidationPasswordRequired'),
      ],
    };
    const submit = async () => {
      if (!await form?.value.validate()) {
        return;
      }
      try {
        const { data } = await actions.token.fetch({
          email: state.email,
          password: state.password,
        });
        const encoded = Buffer.from(data.token).toString('base64');
        Cookie.set('token', encoded);
        store.commit('setToken', encoded);
        await router.push({ name: 'home' });
      } catch (e) {
        q.notify({
          color: 'negative',
          message: t('__NotificationLogInFailed'),
          timeout: 1000,
        });
      }
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

<style lang="sass" scoped>
#layout
  height: calc(100vh - 58px - 48px * 2)
</style>
