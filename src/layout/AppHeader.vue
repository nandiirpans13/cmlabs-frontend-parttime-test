<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
                <i class="mdi mdi-food-fork-drink"></i>
                Meal Apps
            </router-link>

            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <a href="">
                        <i class="mdi mdi-food-fork-drink"></i>
                        Meal Apps
                    </a>
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu"></close-button>
                </div>
            </div>

            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                <li class="nav-item">
                    <a href="" rel="noopener" class="nav-link nav-link-icon">
                        <span class="btn-inner--icon">
                            <i class="fa fa-home mr-2"></i>
                        </span>

                        <span class="nav-link-inner--text">Home</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="" rel="noopener" class="nav-link nav-link-icon">
                        <span class="btn-inner--icon">
                            <i class="fas fa-utensils mr-2"></i>
                        </span>

                        <span class="nav-link-inner--text">Foods</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="" rel="noopener" class="nav-link nav-link-icon">
                        <span class="btn-inner--icon">
                            <i class="fa fa-carrot mr-2"></i>
                        </span>

                        <span class="nav-link-inner--text">Ingredients</span>
                    </a>
                </li> 

                <li class="nav-item">
                    <a href="" rel="noopener"  class="nav-link nav-link-icon">
                        <span class="btn-inner--icon">
                            <i class="fas fa-store mr-2"></i>
                        </span>

                        <span class="nav-link-inner--text">Local Culinary</span>
                    </a>
                </li> 
            </ul>
        </base-nav>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  }
};
</script>
<style>
</style>
