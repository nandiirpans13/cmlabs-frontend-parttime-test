<template>
  <section class="section-hero section-shaped my-0">
    <Shapes />

    <div class="container shape-container">
      <div class="col px-0">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-12 text-center pt-sm">

            <!-- SEARCH -->
            <div class="search-wrapper">
              <base-input 
                v-model="keyword"
                placeholder="- Search Meals -" 
                addon-right-icon="fa fa-search"
              />
            </div>

            <!-- INGREDIENT -->
            <div class="container container-lg ingredient-wrapper">
              <h2 class="section-title">Popular Meals</h2>

              <div class="row pt-3">
                <Loading 
                  v-if="is_loading"
                  v-for="i in 12"
                  :key="i"
                  :visible="is_loading"
                />

                <CardItem
                  v-if="!is_loading && filteredFoods.length > 0"
                  v-for="(item, index) in filteredFoods"
                  :key="index"
                  :image="item.strMealThumb"
                  :title="item.strMeal"
                  @click="goToDetail(item.idMeal)"
                />

                <div v-if="!is_loading && filteredFoods.length === 0" class="col-12 text-center py-5">
                  <div class="empty-state">
                    <i class="mdi mdi-close display-1 text-white"></i>
                    <p class="display-6 text-white">No meals found.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, getCurrentInstance, watch } from 'vue'
import Shapes from './view-components/Shapes.vue'
import CardItem from './view-components/CardItem.vue'
import Loading from './view-components/Loading.vue'
import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const { proxy } = getCurrentInstance()
const is_loading = ref(false);
const keyword = ref("")
const foods = ref([])

const filteredFoods = computed(() => {
  return foods.value.filter(item =>
    item.strMeal &&
    item.strMeal.toLowerCase().includes(keyword.value.toLowerCase())
  )
})

const goToDetail = (id) => {
  proxy.$router.push({
    name: 'detail-meal',
    params: { id_meal: id }
  })
}

const fetchIMeals = async () => {
  const { name_ingredients } = proxy.$route.params
  is_loading.value = true

  await axios.get(`${API_URL}/filter.php?i=${name_ingredients}`).then(res => {
    foods.value = res.data.meals
  }).catch(err => {
    foods.value = []
  }).finally(() => {
    is_loading.value = false
  })
}

onMounted(() => {
  fetchIMeals()
})

onUnmounted(() => clearInterval(interval));

watch(filteredFoods, () => {
  is_loading.value = true;

  setTimeout(() => {
    is_loading.value = false;
  }, 100);
});
</script>