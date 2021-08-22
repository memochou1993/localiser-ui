<template>
  <q-dialog
    ref="dialog"
    @hide="onClose"
  >
    <q-card
      class="q-dialog-plugin"
    >
      <q-card-section
        class="q-pa-lg"
      >
        <span
          class="text-body1 text-weight-regular"
          v-text="t('__TitleUserEditor')"
        />
      </q-card-section>
      <q-card-section
        class="q-px-lg q-pb-none"
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
              :text="t('__InputName')"
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
            <AppTextLabel
              :text="t('__InputEmail')"
            />
            <q-input
              v-model="state.email"
              :model-value="state.email"
              :rules="rules.email"
              autocomplete="off"
              borderless
              dense
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
              spellcheck="false"
            >
              <template
                #append
              >
                <q-icon
                  name="mdi-lock-reset"
                  class="cursor-pointer"
                  @click="generatePassword"
                />
              </template>
            </q-input>
          </div>
          <div
            class="q-pb-lg"
          >
            <AppTextLabel
              :text="t('__InputRole')"
            />
            <q-select
              v-model="state.role"
              :input-debounce="0"
              :model-value="state.role"
              :options="state.roleOptions"
              :rules="rules.role"
              borderless
              dense
              hide-dropdown-icon
              option-label="name"
              options-selected-class="text-secondary"
              @keyup.enter.stop
            >
              <template
                #option="scope"
              >
                <q-item
                  v-close-popup
                  v-bind="scope.itemProps"
                  class="dense"
                >
                  <q-item-section>
                    <span
                      v-text="scope.opt.name"
                    />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions
        class="q-pa-lg"
      >
        <q-btn
          :label="t('__ButtonCancel')"
          color="primary"
          dense
          no-caps
          outline
          @click="onClose"
        />
        <q-space />
        <q-btn
          :label="t('__ButtonSave')"
          color="primary"
          dense
          no-caps
          unelevated
          @click="submit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  onMounted,
  reactive,
  ref,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useDialogPluginComponent } from 'quasar';
import PasswordGenerator from '@memochou1993/password-generator-js';
import {
  Scope,
} from '@/constants';
import defaultRoleOptions from '@/assets/js/RoleOptions';
import AppTextLabel from './AppTextLabel.vue';

export default {
  name: 'SystemUserEditor',
  components: {
    AppTextLabel,
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
    defaultRoleCode: {
      type: Number,
      default: 0,
    },
    userId: {
      type: Number,
      default: 0,
    },
    users: {
      type: Array,
      default: () => [],
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
  },
  emits: [
    ...useDialogPluginComponent.emits,
  ],
  setup(props) {
    const { t } = useI18n();
    const state = reactive({
      name: props.defaultName,
      email: props.defaultEmail,
      password: '',
      role: defaultRoleOptions.find((o) => o.code === props.defaultRoleCode),
      roleOptions: defaultRoleOptions.filter((o) => o.scope === Scope.System),
    });
    const { dialogRef: dialog } = useDialogPluginComponent();
    const form = ref(null);
    const rules = {
      name: [
        (v) => (v && !!v.trim()) || t('__ValidationNameRequired'),
      ],
      email: [
        (v) => (v && !!v.trim()) || t('__ValidationEmailRequired'),
        (v) => /^\S+@\S+\.\S+$/.test(v) || t('__ValidationEmailValid'),
        (v) => (v.trim() === props.defaultEmail.trim() || !props.users.some((p) => p.email === v.trim())) || t('__ValidationEmailUnique'),
      ],
      password: [
        (v) => (v && !!v.trim()) || t('__ValidationPasswordRequired'),
        (v) => (!v || v.length >= 8) || t('__ValidationPasswordMin'),
      ],
      role: [
        (v) => !!v || t('__ValidationRoleRequired'),
      ],
    };
    const generatePassword = () => {
      state.password = PasswordGenerator.generate({
        length: 20,
        letters: true,
        numbers: true,
      });
    };
    const submit = async () => {
      if (!await form?.value.validate()) {
        return;
      }
      props.onSubmit({
        userId: props.userId,
        name: state.name,
        email: state.email,
        password: state.password,
        role: state.role.code,
      });
      props.onClose();
    };
    onMounted(() => {
      dialog.value.show();
    });
    return {
      t,
      state,
      dialog,
      form,
      rules,
      generatePassword,
      submit,
    };
  },
};
</script>
