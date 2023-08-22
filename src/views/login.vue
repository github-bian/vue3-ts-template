<template>
	<h2>这里是登录页面</h2>
	<br />
	<router-link to="/">跳转至首页</router-link>
	<br />
	<router-link to="/vueUse">跳转至vueUse页面</router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'LoginPage',
});
</script>
