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
          v-text="t('__TitleProjectUserEditor')"
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
              :text="t('__InputUsers')"
            />
            <q-select
              v-model="state.users"
              :input-debounce="0"
              :model-value="state.users"
              :options="state.userOptions"
              :rules="rules.users"
              borderless
              dense
              hide-dropdown-icon
              multiple
              options-selected-class="text-secondary"
              use-chips
              @filter="onFilterUser"
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
              <template
                #no-option
              >
                <q-item
                  class="dense cursor-default"
                >
                  <q-item-section>
                    No available user
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
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
import { useI18n } from 'vue-i18n/index';
import { useDialogPluginComponent } from 'quasar';
import defaultRoleOptions from '@/assets/js/RoleOptions';
import AppTextLabel from './AppTextLabel.vue';

export default {
  name: 'ProjectUserEditor',
  components: {
    AppTextLabel,
  },
  props: {
    defaultName: {
      type: String,
      default: '',
    },
    defaultRole: {
      type: Number,
      default: 0,
    },
    defaultUserOptions: {
      type: Array,
      default: () => [],
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
      users: [],
      userOptions: [],
      role: defaultRoleOptions.find((o) => o.code === props.defaultRole),
      roleOptions: defaultRoleOptions.filter((o) => o.scope === 'project'),
    });
    const { dialogRef: dialog } = useDialogPluginComponent();
    const form = ref(null);
    const rules = {
      users: [
        (v) => v.length > 0 || t('__ValidationUsersRequired'),
      ],
      role: [
        (v) => !!v || t('__ValidationRoleRequired'),
      ],
    };
    const onFilterUser = (v, update) => {
      update(() => {
        const needle = v.toLowerCase();
        state.userOptions = props.defaultUserOptions
          .filter((o) => !props.users.some((u) => u.id === o.id))
          .filter((o) => o.name.toLocaleLowerCase().includes(needle));
      });
    };
    const submit = async () => {
      if (!await form?.value.validate()) {
        return;
      }
      props.onSubmit({
        users: state.users.map((u) => ({
          id: u.id,
          role: state.role.code,
        })),
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
      onFilterUser,
      submit,
    };
  },
};
</script>
