<template>
  <div>
    <div
      class="q-mb-lg"
    >
      <AppTextHeading
        text="Users"
      />
      <div
        class="row justify-between items-center"
      >
        <div
          class="row justify-between items-center q-my-sm"
        >
          <q-btn
            class="q-mr-sm"
            color="red-4"
            dense
            icon="mdi-plus"
            round
            @click="state.enableCreateForm = true"
          />
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
        :me="me"
        :needle="state.keyword"
        :on-delete-user="(data) => confirm({
          title: 'Are you sure?',
          content: 'Delete this user?',
          action: 'Delete',
          callback: () => deleteUser(data),
        })"
        :on-edit-user="editUser"
        :users="users"
        scope="system"
        class="q-my-sm"
      />
      <SystemUserEditor
        v-if="state.enableCreateForm"
        :users="users"
        :on-close="() => state.enableCreateForm = false"
        :on-submit="createUser"
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
      const { data } = await actions.user.store({
        name,
        email,
        password,
        role,
      });
      const { users } = props;
      users.push(data);
      props.onUpdateUsers(users);
    };
    const editUser = async ({
      userId,
      name,
      email,
      password,
      role,
    }) => {
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
        message: 'User updated.',
        timeout: 1000,
      });
      if (userId === me.value.id && role !== me.value.role) {
        await router.push({
          name: 'logout',
        });
      }
    };
    const deleteUser = async ({
      userId,
    }) => {
      await actions.user.destroy({
        userId,
      });
      const { users } = props;
      const user = users.find((u) => u.id === userId);
      Object.assign(user, { deleted_at: new Date() });
      props.onUpdateUsers(users);
      q.notify({
        color: 'info',
        group: false,
        message: 'User deleted.',
        timeout: 1000,
      });
    };
    return {
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
