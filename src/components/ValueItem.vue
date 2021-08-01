<template>
  <q-item
    class="q-pa-none"
  >
    <q-item-section>
      <div
        class="row"
      >
        <div
          class="col-4 full-height flex items-center"
        >
          <span
            class="q-px-md break-word"
            v-text="language.name"
          />
        </div>
        <div
          class="col-8 full-height flex items-center"
        >
          <span
            v-if="value && !!value.text"
            class="text-secondary q-px-md break-word"
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
              class="q-pl-md"
            >
              <ValueCreateForm
                :key-id="keyId"
                :language-id="language.id"
                :on-create-value="onCreateValue"
                :on-reset="reset"
              />
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
import ValueCreateForm from './ValueCreateForm.vue';

export default {
  name: 'ValueList',
  components: {
    ValueCreateForm,
  },
  props: {
    keyId: {
      type: Number,
      required: true,
    },
    language: {
      type: Object,
      default: () => {},
    },
    onCreateValue: {
      type: Function,
      default: () => {},
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const state = reactive({
      createForm: false,
    });
    const reset = () => {
      state.createForm = false;
    };
    return {
      state,
      reset,
    };
  },
};
</script>
