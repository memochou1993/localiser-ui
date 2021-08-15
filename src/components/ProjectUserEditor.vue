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
          v-text="'Member Editor'"
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
              text="Users"
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
import AppTextLabel from './AppTextLabel.vue';

export default {
  name: 'ProjectUserEditor',
  components: {
    AppTextLabel,
  },
  props: {
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
    const state = reactive({
      users: [],
      userOptions: [],
    });
    const { dialogRef: dialog } = useDialogPluginComponent();
    const form = ref(null);
    const rules = {
      users: [
        (v) => v.length > 0 || 'The users is required.',
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
        users: state.users,
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
      onFilterUser,
      submit,
    };
  },
};
</script>
