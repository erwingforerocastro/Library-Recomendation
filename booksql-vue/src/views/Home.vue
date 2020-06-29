<template>
  <div class="home">
    <div class="hero bg-grey-light mb-24">
      <div class="container flex flex-col lg:flex-row lg:justify-between py-10">
        <div class="mt-10">
          <h1 class="lg:w-3/4 mb-4">Recomenadación de libros, sitio hecho por <a class="text-white" href="https://www.linkedin.com/in/erwing-forero-castro-586781133" target="_blank">efc</a></h1>
          <p class="leading-normal lg:w-3/4 mb-6">Construido con laravel (LightHouse GraphQL), Vue.js (vue-apollo) and tailwind CSS</p>
          <div class="flex items-center">
            <a href="#" class="bg-purple-dark text-white rounded px-4 py-4 mr-4 hover:bg-purple">Ver libros</a>
            <a href="#" class="border border-purple-dark border-solid rounded text-purple-dark px-4 py-4 hover:bg-purple hover:text-white"> ver screencast</a>
          </div>
        </div>
        <div class="mt-10">
          <img src="../assets/hero.svg" alt="hero">
        </div>
      </div>
    </div>
    <div class="container">
         <div class="flex flex-wrap -mx-2">
           <div class="w-full lg:w-1/4 px-4 mb-12">
                <ApolloQuery :query="categoryQuery">
                <template slot-scope="{ result: { data, loading }, isLoading }">
                  <div v-if="isLoading">Cargando...</div>
                  <ul v-else class="list-reset text-lg">
                    <li class="mb-6">
                    <a href="#" class="text-black hover:text-grey-darkest" @click.prevent="selectedCategoryMethod('all')">Todo</a>
                    </li>
                    <li class="mb-6">
                    <a href="#" class="text-black hover:text-grey-darkest" @click.prevent="selectedCategoryMethod('featured')">Destacados</a>
                    </li>
                    <li
                    class="mb-6"
                      v-for="category of data.categories"
                      :key="category.id"
                      @click.prevent="selectedCategoryMethod(category.id)"
                    >
                    <a href="#" class="text-black hover:text-grey-darkest">{{ category.id }} {{category.name}}</a>
                    </li>
                    <li class="mb-6">
                    <router-link to="/books/add" class="text-black hover:text-grey-darkest">Agregar libro</router-link>
                    </li> 
                  </ul>
                </template>
              </ApolloQuery> 
           </div>
           <div class="w-full lg:w-3/4 px-4 mb-12">
              <ApolloQuery :query="query" v-if="selectedCategoryMethod=='all'">
               <template slot-scope="{ result: { data, loading }, isLoading }">
                 <div v-if="isLoading">Cargando...</div>
                 <div v-else class="flex flex-wrap">
                 <div v-for="book of data.books" class="w-full lg:w-1/3 px-4 mb-12" :key="book.id">
                     <booksListing :book="book"/>
                  </div>
                 </div>
               </template>
             </ApolloQuery>
             <ApolloQuery :query="query" :variables="{f:false}" v-else-if="selectedCategoryMethod=='featured'">
              <template slot-scope="{ result: { data, loading }, isLoading }">
                <div v-if="isLoading">Cargando...</div>
                <div v-else class="flex flex-wrap">
                  <div v-for="book of data.booksByFeatured" class="w-full lg:w-1/3 px-4 mb-12" :key="book.id">
                    <booksListing :book="book"/>
                  </div>
                </div>
              </template>
            </ApolloQuery>
            <ApolloQuery
              :query="require('@/graphql/queries/Category.gql')"
              :variables="{id:selectedCategory}" v-else>
              <template slot-scope="{ result: { data, loading }, isLoading }">
                <div v-if="isLoading">Cargando...</div>
                <div v-else class="flex flex-wrap">
                  <div v-for="book of data.category.books" class="w-full lg:w-1/3 px-4 mb-12" :key="book.id">
                     <booksListing :book="book"/>
                  </div>
                </div>
              </template>
            </ApolloQuery>
           </div>
        </div>
    </div> <!-- final del container -->
  </div>
</template>
 


<script>
// import gql from 'graphql-tag'
import categoryQuery from "@/graphql/queries/Category.gql";
import booksQuery from "@/graphql/queries/Books.gql";
import categoriesQuery from "@/graphql/queries/Categories.gql";
import booksFeaturedQuery from "@/graphql/queries/BooksFeatured.gql";
import booksListing from "@/components/BookListing.vue"

export default {
  name: "Home",
  components: {
    booksListing
  },
  data() {
    return {
      categoryQuery,
      booksQuery,
      categoriesQuery,
      booksFeaturedQuery,
      selectedCategory: 3,
      query: booksQuery,
      datos: null
    };
  },
  // apollo:{
  //   categories: gql`{
  //     categories
  //     {
  //       id
  //       name
  //     }
  //   }`
  // },
  methods: {
    selectedCategoryMethod(category) {
      if (category == "all") {
        this.query = booksQuery;
      } else if (category == "featured") {
        this.query = booksFeaturedQuery;
      } else {
        this.query = categoryQuery;
      }
      this.selectedCategory = category;
    }
  }
};
</script>
