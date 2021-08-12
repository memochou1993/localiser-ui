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
    user: {
      type: Object,
      required: true,
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
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
