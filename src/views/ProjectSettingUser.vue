<template>
  <div>
    <AppTextHeading
      text="Members"
    />
    <div
      class="row justify-between items-center"
    >
      <div
        class="row justify-between items-center my-12"
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
        class="row justify-between items-center my-12"
      >
        <AppFilter
          :on-input="(v) => state.keyword = v"
        />
      </div>
    </div>
    <UserList
      :needle="state.keyword"
      :on-detach-user="(data) => confirm({
        title: 'Are you sure?',
        content: 'Remove this user from this project?',
        action: 'Remove',
        callback: () => detachUser(data),
      })"
      :users="project.users"
      class="my-12"
    />
    <ProjectUserEditor
      v-if="state.enableCreateForm"
      :default-user-options="users"
      :users="project.users"
      :on-close="() => state.enableCreateForm = false"
      :on-submit="attachUser"
    />
  </div>
</template>

<script>
import {
  reactive,
} from 'vue';
import {
  useStore,
} from 'vuex';
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
    const state = reactive({
      keyword: '',
      enableCreateForm: false,
    });
    const confirm = (data) => store.commit('setConfirmation', data);
    const attachUser = async ({ users }) => {
      try {
        await actions.project.attachUser({
          projectId: props.project.id,
          users,
        });
        const { project } = props;
        project.users = project.users.concat(users);
        props.onUpdateProject(project);
      } catch (err) {
        console.debug(err);
      }
    };
    const detachUser = async ({ userId }) => {
      try {
        await actions.project.detachUser({
          projectId: props.project.id,
          userId,
        });
        const { project } = props;
        project.users.splice(project.users.findIndex((u) => u.id === userId), 1);
        props.onUpdateProject(project);
      } catch (err) {
        console.debug(err);
      }
    };
    return {
      state,
      confirm,
      attachUser,
      detachUser,
    };
  },
};
</script>