<template>
  <div>
    <div
      class="q-mb-lg"
    >
      <AppTextHeading
        :text="t('__TitleGeneral')"
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
        class="q-my-sm"
      />
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n/index';
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
      required: true,
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { t } = useI18n();
    const q = useQuasar();
    const editUser = async ({
      userId,
      name,
      email,
    }) => {
      try {
        const { data } = await actions.user.update({
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
          color: 'positive',
          group: false,
          message: t('__NotificationProfileUpdated'),
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
      editUser,
    };
  },
};
</script>
