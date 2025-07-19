<template>
  <div class="theme-wrapper">
    <div class="flex gap-4">
      <div>
        primary:
        <el-color-picker v-model="colorPrimary" />
      </div>
      <div>
        success:
        <el-color-picker v-model="colorSuccess" />
      </div>
      <div>
        warning:
        <el-color-picker v-model="colorWarning" />
      </div>
      <div>
        error:
        <el-color-picker v-model="colorError" />
      </div>
    </div>

    <el-divider />

    <co-config-provider
      :theme="{
        token: {
          colorPrimary: colorPrimary,
          colorSuccess: colorSuccess,
          colorWarning: colorWarning,
          colorError: colorError,
        },
      }"
    >
      <co-snug-menu mode="horizontal" v-model="active" class="mb-4">
        <co-snug-menu-item
          v-for="item in menus"
          :key="item.name"
          :name="item.name"
          :icon="item.icon"
          :title="item.title"
        />
      </co-snug-menu>
      <div class="mb-4 flex gap-4">
        <el-menu default-active="1-1">
          <el-sub-menu index="1">
            <template #title>
              <co-icon name="carbon:reminder-medical" class="me-1" />
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="2">
            <co-icon name="carbon:menu" class="me-1" />
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <co-icon name="carbon:document" class="me-1" />
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <co-icon name="carbon:settings" class="me-1" />
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
        <div>
          <div class="mb-4">
            <el-button type="primary" plain>Primary</el-button>
            <el-button type="success" plain>Success</el-button>
            <el-button type="info" plain>Info</el-button>
            <el-button type="warning" plain>Warning</el-button>
            <el-button type="danger" plain>Danger</el-button>
          </div>

          <div class="mb-4 flex gap-2">
            <el-tag type="primary">Tag 1</el-tag>
            <el-tag type="success">Tag 2</el-tag>
            <el-tag type="info">Tag 3</el-tag>
            <el-tag type="warning">Tag 4</el-tag>
            <el-tag type="danger">Tag 5</el-tag>
          </div>

          <div class="mb-4">
            <el-button circle>
              <co-icon name="carbon:search" />
            </el-button>
            <el-button type="primary" circle>
              <co-icon name="carbon:edit" />
            </el-button>
            <el-button type="success" circle>
              <co-icon name="carbon:checkmark" />
            </el-button>
            <el-button type="info" circle>
              <co-icon name="carbon:email" />
            </el-button>
            <el-button type="warning" circle>
              <co-icon name="carbon:star" />
            </el-button>
            <el-button type="danger" circle>
              <co-icon name="carbon:trash-can" />
            </el-button>
          </div>

          <div class="mb-4 flex gap-4">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="Option A" value="Value A" />
              <el-checkbox label="Option B" value="Value B" />
            </el-checkbox-group>

            <el-radio-group v-model="radio">
              <el-radio :value="3">Option A</el-radio>
              <el-radio :value="6">Option B</el-radio>
            </el-radio-group>

            <el-switch v-model="switchValue" />
          </div>

          <div class="mb-4">
            <el-pagination background layout="prev, pager, next" :total="1000" />
          </div>

          <div class="mb-4 flex flex-col gap-2">
            <el-progress :percentage="50" />
            <el-progress :percentage="100" status="success" />
            <el-progress :percentage="100" status="warning" />
            <el-progress :percentage="50" status="exception" />
          </div>

          <div class="mb-4 flex gap-4">
            <el-progress type="circle" :width="80" :percentage="25" />
            <el-progress type="circle" :width="80" :percentage="100" status="success" />
            <el-progress type="circle" :width="80" :percentage="70" status="warning" />
            <el-progress type="circle" :width="80" :percentage="50" status="exception" />
          </div>

          <div class="mb-4">
            <el-segmented v-model="segmentedValue" :options="segmentedOptions" />
          </div>
        </div>

        <div v-if="isMounted">
          <div id="elTheme" class="mb-4 flex flex-col gap-4">
            <Message class="popup-static">Congrats, this is a success message.</Message>

            <MessageBox ref="messageBox" class="popup-static" container="#elTheme"></MessageBox>

            <Notification
              class="popup-static"
              type="success"
              title="Success"
              message="This is a success message"
              @close="null"
            ></Notification>
          </div>

          <div class="mb-4 flex flex-1 flex-col gap-4">
            <el-alert title="Success alert" type="success" :closable="false" />
            <el-alert title="Info alert" type="info" :closable="false" />
            <el-alert title="Warning alert" type="warning" :closable="false" />
            <el-alert title="Error alert" type="error" :closable="false" />
          </div>
        </div>
      </div>
    </co-config-provider>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import Message from 'element-plus/es/components/message/src/message2.mjs';
import MessageBox from 'element-plus/es/components/message-box/src/index.mjs';
import Notification from 'element-plus/es/components/notification/src/notification2.mjs';
import { useToken } from 'cosey/components';

const menus = [
  {
    name: 'users',
    icon: 'carbon:user-admin',
    title: '用户管理',
  },
  {
    name: 'roles',
    icon: 'carbon:user-role',
    title: '角色管理',
  },
  {
    name: 'permissions',
    icon: 'carbon:rule-locked',
    title: '权限管理',
  },
];

const active = ref('users');

const { token } = useToken();

const colorPrimary = ref(token.value.colorPrimary);
const colorSuccess = ref(token.value.colorSuccess);
const colorWarning = ref(token.value.colorWarning);
const colorError = ref(token.value.colorError);

const checkList = ref(['Value A', 'Value B']);

const radio = ref(3);

const switchValue = ref(true);

const segmentedValue = ref('Mon');
const segmentedOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const messageBox = useTemplateRef('messageBox');

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
  nextTick(() => {
    Object.assign(messageBox.value, {
      type: 'warning',
      title: 'Warning',
      message: 'proxy will permanently delete the file. Continue?',
    });
  });
});
</script>

<style scoped>
:deep(ul) {
  list-style: none;
  padding-inline-start: 0;
}

.popup-static {
  position: relative !important;
  display: flex !important;
  inset-block-start: 0 !important;
  inset-inline-start: 0 !important;
  transform: none !important;
  z-index: 0 !important;
}

#elTheme {
  .is-message-box {
    position: relative !important;
    display: block !important;
    overflow: visible !important;
    height: auto !important;
    background: none !important;
  }

  :deep(.el-overlay-message-box) {
    position: relative !important;
    padding: 0 !important;
    overflow: visible !important;
    text-align: initial !important;
  }

  :deep(.el-notification__title) {
    font-size: var(--el-notification-title-font-size) !important;
    font-weight: bold !important;
    line-height: var(--el-notification-icon-size) !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
  }
}
</style>
