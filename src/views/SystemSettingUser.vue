<template>
  <div>
    <div
      class="q-mb-lg"
    >
      <AppTextHeading
        :text="t('__TitleUsers')"
      />
      <div
        class="row justify-between items-center"
      >
        <div
          class="row justify-between items-center q-my-sm"
        >
          <div
            class="q-mr-sm"
          >
            <q-btn
              v-if="me.can('create-users')"
              color="red-4"
              dense
              icon="mdi-plus"
              round
              @click="state.enableCreateForm = true"
            />
            <SystemUserEditor
              v-if="state.enableCreateForm"
              :users="users"
              :on-close="() => state.enableCreateForm = false"
              :on-submit="createUser"
            />
          </div>
        </div>
        <div
          class="row justify-between items-center q-my-sm"
        >
          <AppFilter
            :on-input="(v) => state.keyword = v"
          />
        </div>
      </div>
      <UserList
        :enable-delete-button="me.can('delete-users')"
        :enable-edit-button="me.can('update-users')"
        :me="me"
        :needle="state.keyword"
        :on-delete-user="(data) => confirm({
          title: t('__ConfirmationTitle'),
          content: t('__ConfirmationDeleteUser'),
          action: t('__ButtonDelete'),
          callback: () => deleteUser(data),
        })"
        :on-edit-user="editUser"
        :users="users"
        scope="system"
        class="q-my-sm"
      />
    </div>
  </div>
</template>

<script>
import {
  computed,
  reactive,
} from 'vue';
import {
  useStore,
} from 'vuex';
import {
  useRouter,
} from 'vue-router';
import { useI18n } from 'vue-i18n/index';
import { useQuasar } from 'quasar';
import * as actions from '@/actions';
import {
  AppTextHeading,
  AppFilter,
  SystemUserEditor,
  UserList,
} from '@/components';

export default {
  name: 'SystemSettingUser',
  components: {
    AppTextHeading,
    AppFilter,
    SystemUserEditor,
    UserList,
  },
  props: {
    onUpdateUsers: {
      type: Function,
      default: () => {
      },
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();
    const q = useQuasar();
    const state = reactive({
      keyword: '',
      enableCreateForm: false,
    });
    const me = computed(() => store.state.user);
    const confirm = (data) => store.commit('setConfirmation', data);
    const createUser = async ({
      name,
      email,
      password,
      role,
    }) => {
      try {
        const { data } = await actions.user.store({
          name,
          email,
          password,
          role,
        });
        const { users } = props;
        users.push(data);
        props.onUpdateUsers(users);
        q.notify({
          color: 'info',
          group: false,
          message: t('__NotificationUserCreated'),
          timeout: 1000,
        });
      } catch (e) {
        q.notify({
          color: 'negative',
          message: e?.response?.data?.message || e.statusText || e.message,
          timeout: 1000,
        });
      }
    };
    const editUser = async ({
      userId,
      name,
      email,
      password,
      role,
    }) => {
      try {
        const { data } = await actions.user.update({
          userId,
          name,
          email,
          password,
          role,
        });
        const { users } = props;
        const user = users.find((u) => u.id === userId);
        Object.assign(user, data);
        props.onUpdateUsers(users);
        q.notify({
          color: 'info',
          group: false,
          message: t('__NotificationUserUpdated'),
          timeout: 1000,
        });
        if (userId === me.value.id && role !== me.value.role) {
          await router.push({
            name: 'logout',
          });
        }
      } catch (e) {
        q.notify({
          color: 'negative',
          message: e?.response?.data?.message || e.statusText || e.message,
          timeout: 1000,
        });
      }
    };
    const deleteUser = async ({
      userId,
    }) => {
      try {
        await actions.user.destroy({
          userId,
        });
        const { users } = props;
        const user = users.find((u) => u.id === userId);
        Object.assign(user, { deleted_at: (new Date()).toISOString() });
        props.onUpdateUsers(users);
        q.notify({
          color: 'info',
          group: false,
          message: t('__NotificationUserDeleted'),
          timeout: 1000,
        });
      } catch (e) {
        q.notify({
          color: 'negative',
          message: e?.response?.data?.message || e.statusText || e.message,
          timeout: 1000,
        });
      }
    };
    return {
      t,
      state,
      me,
      confirm,
      createUser,
      editUser,
      deleteUser,
    };
  },
};
</script>
