<template>
  <div>
    <q-btn
      flat
      icon="mdi-menu"
      round
    />
    <q-menu>
      <q-list
        class="slim"
      >
        <q-item-label
          class="text-caption text-weight-medium q-pa-md"
          v-text="userName"
        />
        <template
          v-for="(item, i) in state.items"
          :key="i"
        >
          <template
            v-if="!item.requiresRoleCode || item.requiresRoleCode === userRoleCode"
          >
            <q-separator
              v-show="item.separated"
            />
            <q-item
              v-close-popup
              :to="item.to"
              class="dense"
              clickable
              exact-active-class="text-black"
            >
              <q-item-section>
                <span
                  v-text="item.name"
                />
              </q-item-section>
            </q-item>
          </template>
        </template>
      </q-list>
    </q-menu>
  </div>
</template>

<script>
import {
  reactive,
  watch,
} from 'vue';
import { useI18n } from 'vue-i18n/index';
import {
  Role,
} from '@/constants';

export default {
  name: 'TheHeaderViewMenu',
  props: {
    locale: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userRoleCode: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const state = reactive({
      items: [],
    });
    const setItems = () => {
      state.items = [
        {
          name: t('__ViewTitleSettings'),
          to: { name: 'user.profile' },
          requiresRoleCode: 0,
          separated: true,
        },
        {
          name: t('__ViewTitleProjectIndex'),
          to: { name: 'project.index' },
          requiresRoleCode: 0,
          separated: false,
        },
        {
          name: t('__ViewTitleSystem'),
          to: { name: 'system.users' },
          requiresRoleCode: Role.Admin,
          separated: false,
        },
        {
          name: t('__ButtonLogOut'),
          to: { name: 'logout' },
          requiresRoleCode: 0,
          separated: true,
        },
      ];
    };
    if (props.locale) {
      setItems();
    }
    watch(() => props.locale, () => setItems());
    return {
      state,
    };
  },
};
</script>
