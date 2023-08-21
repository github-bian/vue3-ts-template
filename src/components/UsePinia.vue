<template>
	<div class="text-3xl">用户：{{ userStore.name }}</div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';
const userStore = useUserStore();
</script>
