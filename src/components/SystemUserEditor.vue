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
          v-text="'User Editor'"
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
              text="Name"
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
              text="Email"
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
              text="Password"
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
              text="Role"
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
                      v-text="scope.opt.label"
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
          color="primary"
          dense
          label="Cancel"
          no-caps
          outline
          @click="onClose"
        />
        <q-space />
        <q-btn
          color="primary"
          dense
          label="Save"
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
import { useDialogPluginComponent } from 'quasar';
import PasswordGenerator from '@memochou1993/password-generator-js';
import {
  Scope,
} from '@/constants';
import defaultRoleOptions from '@/assets/RoleOptions';
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
        (v) => (v && !!v.trim()) || 'The name is required.',
      ],
      email: [
        (v) => (v && !!v.trim()) || 'The email is required.',
        (v) => /^\S+@\S+\.\S+$/.test(v) || 'The email must be a valid email address.',
        (v) => (v.trim() === props.defaultEmail.trim() || !props.users.some((p) => p.email === v.trim())) || 'The email has already been taken.',
      ],
      password: [
        (v) => (!v || v.length >= 8) || 'The new password must be at least 8 characters.',
      ],
      role: [
        (v) => !!v || 'The role is required.',
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
