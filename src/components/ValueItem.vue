<template>
  <q-item
    class="q-pa-none"
  >
    <q-item-section>
      <div
        class="row"
      >
        <div
          class="col-3 full-height flex items-center"
        >
          <span
            class="q-px-md"
            v-text="language.name"
          />
        </div>
        <div
          class="col-9 full-height flex items-center"
        >
          <template
            v-for="(value) in values"
            :key="value.id"
          >
            <span
              v-if="value.id === language.id"
              class="text-secondary q-px-md"
              v-text="value.text"
            />
          </template>
          <template
            v-if="values.length < 1"
          >
            <div
              style="width: 100%"
            >
              <span
                v-if="!state.editForm"
                class="text-warning q-px-md cursor-pointer"
                @click="state.editForm = true"
                v-text="'Empty'"
              />
              <div
                v-else
                class="q-pl-md q-py-xs"
              >
                <q-card
                  bordered
                  class="q-px-sm"
                  flat
                >
                  <q-input
                    v-model="state.value"
                    autofocus
                    autogrow
                    borderless
                    dense
                    input-style="max-height: 6rem"
                    type="textarea"
                    @keyup.enter.stop
                  />
                </q-card>
                <div
                  class="q-gutter-sm q-mt-xs"
                >
                  <q-btn
                    class="q-mr-xs"
                    color="primary"
                    icon="mdi-check"
                    size="sm"
                    unelevated
                  />
                  <q-btn
                    class="q-mr-xs"
                    icon="mdi-close"
                    outline
                    size="sm"
                    unelevated
                    @click="close"
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import {
  reactive,
} from 'vue';

export default {
  name: 'ValueList',
  props: {
    language: {
      type: Object,
      default: () => {},
    },
    values: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const state = reactive({
      editForm: false,
      value: null,
    });
    const close = () => {
      state.editForm = false;
      state.value = null;
    };
    return {
      state,
      close,
    };
  },
};
</script>
