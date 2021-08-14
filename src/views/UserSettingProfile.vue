<template>
  <div>
    <div
      class="q-mb-lg"
    >
      <AppTextHeading
        text="General"
      />
      <div
        class="row"
      />
      <UserEditorGeneral
        v-if="user"
        :default-name="user.name"
        :default-email="user.email"
        :on-submit="editUser"
        :user-id="user.id"
        :users="users"
        class="my-12"
      />
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import * as actions from '@/actions';
import {
  AppTextHeading,
  UserEditorGeneral,
} from '@/components';

export default {
  name: 'UserSettingProfile',
  components: {
    AppTextHeading,
    UserEditorGeneral,
  },
  props: {
    onUpdateUser: {
      type: Function,
      default: () => {},
    },
    onUpdateUsers: {
      type: Function,
      default: () => {},
    },
    user: {
      type: Object,
      default: () => {},
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const q = useQuasar();
    const editUser = async ({ userId, name, email }) => {
      try {
        const { data } = await actions.user.updateMe({
          userId,
          name,
          email,
        });
        const { user } = props;
        Object.assign(user, data);
        props.onUpdateUser(user);
        const { users } = props;
        users.splice(users.findIndex((u) => u.id === user.id), 1, user);
        props.onUpdateUsers(users);
        q.notify({
          color: 'info',
          group: false,
          message: 'Profile updated.',
          timeout: 1000,
        });
      } catch (err) {
        console.debug(err);
      }
    };
    return {
      editUser,
    };
  },
};
</script>
