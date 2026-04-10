<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Halaman tidak ditemukan</p>
    <router-link :to="{ name: 'home' }">Kembali ke Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 30vh;
}
</style>