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
          <span
            v-if="value && !!value.text"
            class="text-secondary q-px-md"
            v-text="value.text"
          />
          <div
            v-else
            style="width: 100%"
          >
            <span
              v-if="!state.createForm"
              class="text-warning q-px-md cursor-pointer"
              @click="state.createForm = true"
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
                  v-model="state.text"
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
                  @click="create({ languageId: language.id })"
                />
                <q-btn
                  class="q-mr-xs"
                  icon="mdi-close"
                  outline
                  size="sm"
                  unelevated
                  @click="reset"
                />
              </div>
            </div>
          </div>
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
    keyId: {
      type: Number,
      required: true,
    },
    language: {
      type: Object,
      default: () => {},
    },
    onCreate: {
      type: Function,
      default: () => {},
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const state = reactive({
      createForm: false,
      text: null,
    });
    const reset = () => {
      state.createForm = false;
      state.text = null;
    };
    const create = ({ languageId }) => {
      props.onCreate({
        keyId: props.keyId,
        languageId,
        text: state.text,
      });
      reset();
    };
    return {
      state,
      create,
      reset,
    };
  },
};
</script>
