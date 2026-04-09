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
                <CardItem
                  v-for="(item, index) in filteredFoods"
                  :key="index"
                  :image="item.strMealThumb"
                  :title="item.strMeal"
                  @click="goToDetail(item.idMeal)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Shapes from './view-components/Shapes.vue'
import CardItem from './view-components/CardItem.vue'
import { ref, onMounted, onUnmounted, computed, getCurrentInstance } from 'vue'
import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const { proxy } = getCurrentInstance()
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
  const res = await axios.get(`${API_URL}/filter.php?i=${name_ingredients}`)
  foods.value = res.data.meals
}

onMounted(() => {
  fetchIMeals()
})

onUnmounted(() => clearInterval(interval));
</script>