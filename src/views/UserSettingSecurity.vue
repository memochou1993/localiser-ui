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
// import * as actions from '@/actions';
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
    const editUser = async ({ userId, oldPassword, newPassword }) => {
      try {
        console.log(userId, oldPassword, newPassword);
        // TODO
        // const { data } = await actions.user.updateMe({
        //   userId,
        //   password,
        // });
        // const { user } = props;
        // Object.assign(user, data);
        // props.onUpdateUser(user);
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
