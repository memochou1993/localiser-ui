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
      >
        <div
          class="row justify-between items-center"
        >
          <div
            class="col-12 col-md-8"
          >
            <AppTextCaption
              :text="t('__WarningDeleteProjectTitle')"
            />
            <span
              v-text="t('__WarningDeleteProjectContent')"
            />
          </div>
          <div
            class="col-12 col-md-4 text-md-right"
          >
            <q-btn
              :disable="!enableSubmitButton"
              :label="t('__ButtonDeleteProject')"
              class="text-red q-my-md"
              no-caps
              outline
              @click="submit"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import {
  ref,
} from 'vue';
import { useI18n } from 'vue-i18n/index';
import AppTextCaption from './AppTextCaption.vue';

export default {
  name: 'ProjectEditorDanger',
  components: {
    AppTextCaption,
  },
  props: {
    enableSubmitButton: {
      type: Boolean,
      required: true,
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
    projectId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const form = ref(null);
    const submit = async () => {
      if (!await form?.value.validate()) {
        return;
      }
      props.onSubmit({
        projectId: props.projectId,
      });
    };
    return {
      t,
      form,
      submit,
    };
  },
};
</script>
