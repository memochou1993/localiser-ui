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
        class="my-12"
      />
    </div>
  </div>
</template>

<script>
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
    const editUser = async ({ userId, newPassword }) => {
      try {
        await actions.user.updateMe({
          userId,
          password: newPassword,
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
