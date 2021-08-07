<template>
  <div
    class="layout row justify-center items-center"
  >
    <div
      class="col-10 col-sm-8 col-md-6"
    >
      <q-card
        class="shadow-4"
      >
        <q-card-section
          horizontal
          style="height: 400px;"
        >
          <q-img
            class="col-6 gt-xs"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
          <q-card-section
            class="col-12 col-sm-6 q-pa-lg"
          >
            <q-form
              ref="formRef"
              @submit="submit"
            >
              <div
                class="q-pb-lg"
              >
                <div
                  class="text-caption text-grey-10 q-pa-xs"
                  v-text="'Email'"
                />
                <q-input
                  v-model="state.email"
                  :model-value="state.email"
                  :rules="rules.email"
                  autofocus
                  borderless
                  class="q-pb-lg"
                  dense
                  spellcheck="false"
                />
              </div>
              <div
                class="q-pb-lg"
              >
                <div
                  class="text-caption text-grey-10 q-pa-xs"
                  v-text="'Password'"
                />
                <q-input
                  v-model="state.password"
                  :model-value="state.password"
                  :rules="rules.password"
                  borderless
                  dense
                  type="password"
                />
              </div>
              <div
                class="text-right q-mt-md"
              >
                <q-btn
                  color="primary"
                  label="Log in"
                  type="submit"
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
import * as actions from '@/actions';

const rules = {
  email: [
    (v) => (v && !!v.trim()) || 'The email is required.',
  ],
  password: [
    (v) => (v && !!v.trim()) || 'The password is required.',
  ],
};

export default {
  name: 'Login',
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      email: '',
      password: '',
    });
    const formRef = ref(null);
    const submit = async () => {
      if (!await formRef?.value.validate()) {
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
      } catch (err) {
        console.debug(err);
      }
    };
    return {
      state,
      rules,
      formRef,
      submit,
    };
  },
};
</script>

<style lang="sass" scoped>
.layout
  height: calc(100vh - 58px - 48px * 2)
</style>
