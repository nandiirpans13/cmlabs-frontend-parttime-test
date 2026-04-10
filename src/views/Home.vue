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
              <h2 class="section-title">Ingredients</h2>
              <div class="row pt-3">
                <Loading 
                  v-if="is_loading"
                  v-for="i in 12"
                  :key="i"
                  :visible="is_loading"
                />

                <CardItem
                  v-if="!is_loading && displayedFoods.length > 0"
                  v-for="(item, index) in displayedFoods"
                  :key="index"
                  :image="item.strThumb"
                  :title="item.strIngredient"
                  @click="goToDetail(item.strIngredient)"
                />

                <div v-if="!is_loading && displayedFoods.length === 0" class="col-12 text-center py-5">
                  <div class="empty-state">
                    <i class="mdi mdi-close display-1 text-white"></i>
                    <p class="display-6 text-white">No ingredients found.</p>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-center mt-4">
                <base-pagination
                  :page-count="totalPages"
                  v-model="pagination.page"
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
import { ref, onMounted, onUnmounted, computed, getCurrentInstance, watch } from 'vue'
import Shapes from './view-components/Shapes.vue'
import CardItem from './view-components/CardItem.vue'
import Loading from './view-components/Loading.vue'
import Swal from "sweetalert2";
import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL

let interval = null
const { proxy } = getCurrentInstance()

const currentIndex = ref(0)
const keyword = ref("")
const is_loading = ref(false);
const foods = ref([])
const texts = ref([
  'Create Delicious Meals at Home',
  'Cook Anything You Love',
  'Find Ingredients Easily'
])

const pagination = ref({
  page: 1,
  perPage: 12,
})

const filteredFoods = computed(() => {
  return foods.value.filter(item =>
    item.strIngredient &&
    item.strIngredient.toLowerCase().includes(keyword.value.toLowerCase())
  )
})

const totalPages = computed(() =>
  Math.ceil(filteredFoods.value.length / pagination.value.perPage)
)

const displayedFoods = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.perPage
  const end = start + pagination.value.perPage
  return filteredFoods.value.slice(start, end)
})

const goToDetail = (name) => {
  proxy.$router.push({
    name: 'meals',
    params: { name_ingredients: name }
  })
}

const fetchIngredients = async () => {
  is_loading.value = true

  await axios.get(`${API_URL}/list.php?i=list`).then(res => {
    foods.value = res.data.meals
  }).catch(err => {
    foods.value = []
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "Gagal mengambil data",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }).finally(() => {
    is_loading.value = false
  })
}

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = Math.floor(Math.random() * texts.value.length)
  }, 3000)

  fetchIngredients()
})

onUnmounted(() => clearInterval(interval));

watch(filteredFoods, () => {
  is_loading.value = true;

  setTimeout(() => {
    is_loading.value = false;
  }, 100);
});

watch(keyword, () => {
  pagination.value.page = 1
})

watch(filteredFoods, () => {
  pagination.value.page = 1
})
</script>
