<template>
  <div
    class="row justify-center items-center"
  >
    <div
      class="col-10 col-sm-8 col-md-6"
    >
      <q-card>
        <q-card-section
          horizontal
          style="height: 400px;"
        >
          <q-img
            class="col-6"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
          <q-card-section
            class="col-6"
          >
            <q-form
              @submit="submit"
            >
              <div
                class="q-pb-lg"
              >
                <div
                  class="text-grey-10 q-pa-xs"
                  v-text="'Email'"
                />
                <q-input
                  v-model="state.email"
                  :model-value="state.email"
                  :rules="[(v) => (v && !!v.trim()) || 'The email is required.']"
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
                  class="text-grey-10 q-pa-xs"
                  v-text="'Password'"
                />
                <q-input
                  v-model="state.password"
                  :model-value="state.password"
                  :rules="[(v) => (v && !!v.trim()) || 'The password is required.']"
                  borderless
                  dense
                  type="password"
                />
              </div>
              <div
                class="text-right q-mt-md"
              >
                <q-btn
                  :disable="!isValid"
                  color="primary"
                  label="Log in"
                  type="submit"
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
  computed,
  reactive,
} from 'vue';
import {
  useStore,
} from 'vuex';
import {
  useRouter,
} from 'vue-router';
import {
  token,
} from '@/actions';

export default {
  name: 'Login',
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      email: '',
      password: '',
    });
    const isValid = computed(() => !!state.email && !!state.password);
    const submit = async () => {
      try {
        const { data } = await token.fetch({
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
      isValid,
      submit,
    };
  },
};
</script>
