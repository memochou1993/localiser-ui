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
      <UserEditorSecurity
        :on-submit="editUser"
        :user-id="user.id"
        class="q-my-sm"
      />
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import * as actions from '@/actions';
import {
  AppTextHeading,
  UserEditorSecurity,
} from '@/components';

export default {
  name: 'UserSettingSecurity',
  components: {
    AppTextHeading,
    UserEditorSecurity,
  },
  props: {
    onUpdateUser: {
      type: Function,
      default: () => {},
    },
    user: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const q = useQuasar();
    const editUser = async ({ userId, newPassword }) => {
      try {
        await actions.user.update({
          userId,
          password: newPassword,
        });
        q.notify({
          color: 'info',
          group: false,
          message: 'Password updated.',
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
