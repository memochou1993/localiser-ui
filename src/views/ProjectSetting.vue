<template>
  <div>
    <template
      v-if="isLoaded"
    >
      <div
        class="q-mb-lg"
      >
        <AppBreadcrumb
          :breadcrumbs="[
            { label: 'Projects', to: { name: 'project.index' } },
            { label: state.project.name, to: { name: 'project.show' } },
            { label: 'Settings' },
          ]"
        />
      </div>
      <div
        class="row"
      >
        <div
          class="col-12 col-sm-4 col-md-3"
        >
          <SettingMenu
            :items="menuItems"
            class="q-mr-sm-xl q-mb-lg"
          />
        </div>
        <div
          class="col-12 col-sm-8 col-md-9"
        >
          <router-view
            :on-update-project="(p) => state.project = p"
            :project="state.project"
            :users="state.users"
          />
        </div>
      </div>
    </template>
    <AppLoading
      v-else
    />
  </div>
</template>

<script>
import {
  computed,
  reactive,
} from 'vue';
import {
  useRoute,
  useRouter,
} from 'vue-router';
import { useI18n } from 'vue-i18n/index';
import { useQuasar } from 'quasar';
import * as actions from '@/actions';
import {
  Project,
} from '@/models';
import {
  AppBreadcrumb,
  AppLoading,
  SettingMenu,
} from '@/components';

export default {
  name: 'ProjectSetting',
  components: {
    AppBreadcrumb,
    AppLoading,
    SettingMenu,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t } = useI18n();
    const q = useQuasar();
    const state = reactive({
      project: null,
      users: [],
    });
    const menuItems = [
      { name: t('__TitleGeneral'), to: { name: 'project.profile' } },
      { name: t('__TitleMembers'), to: { name: 'project.users' } },
      { name: t('__TitleLanguages'), to: { name: 'project.languages' } },
    ];
    const isLoaded = computed(() => !!state.project);
    const { projectId } = route.params;
    (async () => {
      try {
        const { data } = await actions.project.fetch({
          projectId,
        });
        state.project = Object.assign(new Project(), data);
      } catch {
        return router.push({ name: 'project.index' });
      }
      try {
        const { data } = await actions.user.index();
        state.users = data.filter((u) => !u.deleted_at);
      } catch (e) {
        q.notify({
          color: 'negative',
          message: e?.response?.data?.message || e.statusText,
          timeout: 1000,
        });
      }
      return null;
    })();
    return {
      state,
      menuItems,
      isLoaded,
    };
  },
};
</script>
