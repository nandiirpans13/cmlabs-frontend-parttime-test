<template>
  <section class="section-hero section-shaped my-0">
    <Shapes />

    <div class="container shape-container">
      <div class="col px-0">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-12 text-center pt-sm">

            <!-- ICON -->
            <div class="d-flex align-items-center justify-content-center gap-3 pb-sm hero-icons">
              <i class="mdi mdi-noodles"></i>
              <i class="mdi mdi-food-turkey"></i>
              <i class="mdi mdi-beer-outline"></i>
            </div>

            <!-- SEARCH -->
            <div class="search-wrapper">
              <base-input 
                v-model="keyword"
                :placeholder="texts[currentIndex]" 
                addon-right-icon="fa fa-search"
              />
            </div>

            <!-- INGREDIENT -->
            <div class="container container-lg ingredient-wrapper">
              <h2 class="section-title">{{ visibleCount }} Most Popular Ingredients</h2>

              <div class="row pt-3">
                <CardItem
                  v-for="(item, index) in displayedFoods"
                  :key="index"
                  :image="item.strThumb"
                  :title="item.strIngredient"
                  @click="goToDetail(item.strIngredient)"
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

let interval = null
const { proxy } = getCurrentInstance()

const currentIndex = ref(0)
const keyword = ref("")
const visibleCount = ref(12)

const texts = ref([
  'Create Delicious Meals at Home',
  'Cook Anything You Love',
  'Find Ingredients Easily'
])

const foods = ref([])

const filteredFoods = computed(() => {
  return foods.value.filter(item =>
    item.strIngredient &&
    item.strIngredient.toLowerCase().includes(keyword.value.toLowerCase())
  )
})

const displayedFoods = computed(() =>
  filteredFoods.value.slice(0, visibleCount.value)
)

const goToDetail = (name) => {
  proxy.$router.push({
    name: 'meals',
    params: { name_ingredients: name }
  })
}

const fetchIngredients = async () => {
  const res = await axios.get(`${API_URL}/list.php?i=list`)
  foods.value = res.data.meals
}

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = Math.floor(Math.random() * texts.value.length)
  }, 3000)

  fetchIngredients()
})

onUnmounted(() => clearInterval(interval));
</script>
