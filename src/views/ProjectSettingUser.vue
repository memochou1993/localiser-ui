<template>
  <div>
    <div
      class="q-mb-lg"
    >
      <AppTextHeading
        :text="t('__TitleMembers')"
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
              v-if="project.allow('update-projects')"
              color="red-4"
              dense
              icon="mdi-plus"
              round
              @click="state.enableCreateForm = true"
            />
            <ProjectUserEditor
              v-if="state.enableCreateForm"
              :default-user-options="users"
              :users="project.users"
              :on-close="() => state.enableCreateForm = false"
              :on-submit="attachUser"
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
        :enable-destroyer="project.allow('update-projects')"
        :enable-editor="project.allow('update-projects')"
        :me="me"
        :needle="state.keyword"
        :on-delete-user="(data) => confirm({
          title: t('__ConfirmationTitle'),
          content: t('__ConfirmationRemoveUser'),
          action: t('__ButtonDelete'),
          callback: () => detachUser(data),
        })"
        :users="project.users"
        scope="project"
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
import { useI18n } from 'vue-i18n/index';
import { useQuasar } from 'quasar';
import * as actions from '@/actions';
import {
  AppFilter,
  AppTextHeading,
  ProjectUserEditor,
  UserList,
} from '@/components';

export default {
  name: 'ProjectSettingUser',
  components: {
    AppFilter,
    AppTextHeading,
    ProjectUserEditor,
    UserList,
  },
  props: {
    onUpdateProject: {
      type: Function,
      default: () => {},
    },
    project: {
      type: Object,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const { t } = useI18n();
    const q = useQuasar();
    const state = reactive({
      keyword: '',
      enableCreateForm: false,
    });
    const me = computed(() => store.state.user);
    const confirm = (data) => store.commit('setConfirmation', data);
    const attachUser = async ({
      users,
    }) => {
      try {
        await actions.project.attachUser({
          projectId: props.project.id,
          users,
        });
        const { data } = await actions.project.fetch({
          projectId: props.project.id,
        });
        const { project } = props;
        props.onUpdateProject(Object.assign(project, data));
        q.notify({
          color: 'positive',
          group: false,
          message: t('__NotificationMemberAdded'),
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
    const detachUser = async ({
      userId,
    }) => {
      try {
        await actions.project.detachUser({
          projectId: props.project.id,
          userId,
        });
        const { data } = await actions.project.fetch({
          projectId: props.project.id,
        });
        const { project } = props;
        props.onUpdateProject(Object.assign(project, data));
        q.notify({
          color: 'positive',
          group: false,
          message: t('__NotificationMemberRemoved'),
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
      attachUser,
      detachUser,
    };
  },
};
</script>
