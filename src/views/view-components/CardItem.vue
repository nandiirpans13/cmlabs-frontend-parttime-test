<template>
  <div class="col-lg-2 col-md-3 col-6 p-2" @click="$emit('click')">
    <div class="category-card">

      <img :src="image" :alt="title" class="card-img" />

      <div class="card-img-overlay">
        <h5>{{ title }}</h5>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: String,
  title: String
})

defineEmits(['click']);
</script>

<style scoped>
.category-card {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;

  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);

  transition: all 0.3s ease;
}

/* IMAGE */
.card-img {
  width: 100%;
  height: 110px;
  object-fit: fill;
  padding: 10px;
  transition: 0.3s;
  border-radius: 20px;
  filter: brightness(0.9);
}

/* TEXT */
.card-img-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px;
  text-align: center;

  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
}

.card-img-overlay h5 {
  font-size: 12px;
  color: white;
  margin: 0;
}

/* HOVER */
.category-card:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 15px 30px rgba(0,0,0,0.3);
}

.category-card:hover .card-img {
  transform: scale(1.1);
}

.category-card:hover {
  opacity: 1;
}

/* GLOW */
.category-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent);
  opacity: 0;
  transition: 0.3s;
}

.category-card:hover::before {
  opacity: 1;
}
</style>