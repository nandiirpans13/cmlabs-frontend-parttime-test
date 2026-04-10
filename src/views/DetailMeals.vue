<template>
    <section class="section section-lg section-shaped overflow-hidden my-5">
        <shapes2 />

        <div class="container shape-container py-0 pb-5">
            <div class="row row-grid justify-content-between align-items-center">
                <div class="col-lg-4 mb-md-auto">
                    <div class="transform-perspective-left">
                        <card class="border-0" type="secondary" shadow body-classes="px-md-3 py-md-3" header-classes="pb-5 bg-white">
                            <img
                                :src="dataMeal.strMealThumb"
                                alt="Image placeholder"
                                class="rounded shadow"
                                width="100%"
                                height="400px"
                            />
                        </card>
                    </div>
                </div>

                <div class="col-lg-7">
                    <h3 class="display-3 text-white">
                        {{ dataMeal.strMeal }}
                    </h3>
                    <span v-if="dataMeal.strCategory" class="badge badge-pill badge-success text-white text-uppercase">
                        {{ dataMeal.strCategory }}
                    </span>
                    <span v-if="dataMeal.strTags" class="badge badge-pill badge-secondary text-white text-uppercase">
                        {{ dataMeal.strTags }}
                    </span>
                    <span v-if="dataMeal.strArea" class="badge badge-pill badge-primary text-white text-uppercase">
                        {{ dataMeal.strArea }}
                    </span>

                    <div class="mt-2">
                        <h4 class="display-4 text-white">
                            Recipe Ingredients
                        </h4>
                        <ul class="text-white">
                            <li v-for="(item, index) in ingredients" :key="index">
                                {{ index + 1 }}. {{ item.name }}
                                <small>{{ item.measure }}</small>
                            </li>
                        </ul>
                    </div>

                    <div class="mt-2">
                        <h3 class="text-white">Instructions</h3>
                        <ol>
                            <li v-for="(step, index) in steps" :key="index">
                                <span v-if="step">{{ step }}</span>
                            </li>
                        </ol>
                    </div>

                </div>

                <div class="col-lg-12 mt-5">
                    <card v-if="dataMeal.strYoutube" class="rounded" type="secondary" shadow header-classes="pb-5 bg-white">                        
                        <iframe
                            width="100%"
                            height="500"
                            :src="youtubeEmbed"
                            frameborder="0"
                            allowfullscreen
                        ></iframe>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, computed, getCurrentInstance } from 'vue'
import axios from 'axios'
import Swal from "sweetalert2";
import Shapes2 from './view-components/Shapes-2.vue'

const API_URL = process.env.VUE_APP_API_URL
const { proxy } = getCurrentInstance()
const dataMeal = ref({})

const ingredients = computed(() => {
  const list = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = dataMeal.value[`strIngredient${i}`]
    const measure = dataMeal.value[`strMeasure${i}`]

    if (ingredient && ingredient.trim() !== '') {
      list.push({
        name: ingredient,
        measure: measure
      })
    }
  }

  return list
})

const steps = computed(() => {
  if (!dataMeal.value.strInstructions) return []

  let text = dataMeal.value.strInstructions

  if (/\d+\.\s/.test(text)) {
    return text
      .split(/\d+\.\s/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
  }

  return text
    .split('.')
    .map(s => s.trim())
    .filter(s => s.length > 0)
})

const youtubeEmbed = computed(() => {
  return dataMeal.value.strYoutube
    ? `https://www.youtube.com/embed/${dataMeal.value.strYoutube.split('v=')[1]}`
    : ''
})

const fetchIngredients = async () => {
  const { id_meal } = proxy.$route.params
  await axios.get(`${API_URL}/lookup.php?i=${id_meal}`).then(res => {
    dataMeal.value = res.data.meals[0]
  }).catch(err => {
    dataMeal.value = {}
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Gagal mengambil data",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });
})
}

onMounted(() => {
  fetchIngredients()
});
</script>
<style>
ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 5px 0;
}

ol {
  padding-left: 20px;
  color: #FFFFFF;
}

ol li {
  margin-bottom: 5px;
  line-height: 1.5;
}
</style>
