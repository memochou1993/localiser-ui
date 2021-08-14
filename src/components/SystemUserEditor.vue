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
          @submit.stop="submit"
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
              borderless
              dense
            />
          </div>
          <div
            class="q-pb-lg"
          >
            <AppTextLabel
              text="Roles"
            />
            <q-select
              v-model="state.roles"
              :input-debounce="0"
              :model-value="state.roles"
              :options="state.roleOptions"
              :rules="rules.roles"
              borderless
              dense
              hide-dropdown-icon
              multiple
              options-selected-class="text-secondary"
              @keyup.enter.stop
            >
              <template
                #selected-item="scope"
              >
                <q-chip
                  :tabindex="scope.tabindex"
                  :label="scope.opt.name"
                  class="q-px-sm q-ml-none q-my-xs q-mr-sm cursor-default"
                  color="secondary"
                  dense
                  outline
                  removable
                  square
                  @remove="scope.removeAtIndex(scope.index)"
                />
              </template>
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
import defaultRoleOptions from '@/assets/role_options.json';
import AppTextLabel from './AppTextLabel.vue';

export default {
  name: 'SystemUserEditor',
  components: {
    AppTextLabel,
  },
  props: {
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
      name: '',
      email: '',
      password: 'password', // FIXME
      roles: [],
      roleOptions: defaultRoleOptions.filter((o) => o.scope === 'system'),
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
        (v) => !props.users.some((p) => p.email === v.trim()) || 'The email has already been taken.',
      ],
      password: [
        (v) => (v && !!v.trim()) || 'The new password is required.',
        (v) => v.length >= 8 || 'The new password must be at least 8 characters.',
      ],
      roles: [
        (v) => v.length > 0 || 'The roles is required.',
      ],
    };
    const submit = async () => {
      if (!await form?.value.validate()) {
        return;
      }
      props.onSubmit({
        name: state.name,
        email: state.email,
        password: state.password,
        roles: state.roles.map((r) => r.value),
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
      submit,
    };
  },
};
</script>
