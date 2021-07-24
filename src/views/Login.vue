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
              @submit="() => {}"
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
import {
  computed,
  reactive,
} from 'vue';

export default {
  name: 'Login',
  setup() {
    const state = reactive({
      email: '',
      password: '',
    });
    const isValid = computed(() => !!state.email && !!state.password);
    return {
      state,
      isValid,
    };
  },
};
</script>
