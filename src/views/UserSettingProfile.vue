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
      TODO
    </div>
  </div>
</template>

<script>
import {
  AppTextHeading,
} from '@/components';

export default {
  name: 'UserSettingProfile',
  components: {
    AppTextHeading,
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
    const editUser = async () => {
      try {
        //
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
