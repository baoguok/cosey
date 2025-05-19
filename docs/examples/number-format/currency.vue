<template>
  <div>
    <co-number-format type="currency" value="134814782" :precision="2" />
  </div>
  <div>
    <co-number-format
      type="currency"
      locales="en-US"
      currency="USD"
      value="134814782"
      :precision="2"
    />
  </div>
</template>

<script lang="ts" setup></script>
