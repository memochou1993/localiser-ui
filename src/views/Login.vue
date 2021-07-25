<template>
  <div
    class="window-height row justify-center items-center"
  >
    <div
      class="col-10 col-sm-8 col-md-6"
    >
      <q-card>
        <q-card-section
          horizontal
          style="height: 400px"
        >
          <q-img
            class="col-6"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
          <q-card-section
            class="col-6"
          >
            <q-form
              autofocus
              class="q-gutter-md"
              @submit="submit"
            >
              <q-input
                v-model="state.email"
                label="Email"
                lazy-rules
                spellcheck="false"
              />
              <q-input
                v-model="state.password"
                label="Password"
                lazy-rules
                type="password"
              />
              <div
                class="text-right q-mt-lg"
              >
                <q-btn
                  :disable="!isValid"
                  color="primary"
                  label="Sign In"
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
    const reset = () => {
      state.email = '';
      state.password = '';
    };
    const submit = async () => {
      try {
        const { data } = await token.fetch({
          email: state.email,
          password: state.password,
        });
        Cookie.set('token', Buffer.from(data.token).toString('base64'));
        store.commit('setToken', data.token);
        router.push({ name: 'home' });
        reset();
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
