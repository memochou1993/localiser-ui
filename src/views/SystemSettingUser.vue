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
        :needle="state.keyword"
        :users="users"
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
  reactive,
} from 'vue';
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
    const state = reactive({
      keyword: '',
      enableCreateForm: false,
    });
    const createUser = async ({
      name,
      email,
      password,
      roles,
    }) => {
      const { data } = await actions.user.store({
        name,
        email,
        password,
        roles,
      });
      const { users } = props;
      users.push(data);
      props.onUpdateUsers(users);
    };
    return {
      state,
      createUser,
    };
  },
};
</script>
