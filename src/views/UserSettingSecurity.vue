<template>
  <div>
    <div
      class="q-mb-lg"
    >
      <AppTextHeading
        :text="t('__TitleSecurity')"
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
import { useI18n } from 'vue-i18n/index';
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
    users: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const { t } = useI18n();
    const q = useQuasar();
    const editUser = async ({
      userId,
      newPassword,
    }) => {
      try {
        await actions.user.update({
          userId,
          password: newPassword,
        });
        q.notify({
          color: 'positive',
          group: false,
          message: t('__NotificationPasswordUpdated'),
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
