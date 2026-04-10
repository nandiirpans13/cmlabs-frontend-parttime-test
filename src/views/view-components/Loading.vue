<template>
  <div class="col-lg-2 col-md-3 col-6 p-2">
    <div class="skeleton-card">
      <div class="skeleton skeleton-image"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkeletonCard"
};
</script>

<style scoped>
.skeleton-card {
  width: 100%;
  height: 110px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
}

/* Skeleton base */
.skeleton {
  background: linear-gradient(90deg, #eeeeee2e 25%, #ddddddad 37%, #eeeeee5c 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
  border-radius: 8px;
}

/* Image */
.skeleton-image {
  width: 100%;
  height: 180px;
}

/* Animation */
@keyframes shimmer {
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
}
</style>