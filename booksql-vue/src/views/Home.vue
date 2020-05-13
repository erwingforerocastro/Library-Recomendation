<template>
  <div>
    <ApolloQuery :query="categoryQuery">
      <template slot-scope="{ result: { data, loading }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <div v-else>
          <a href="#" class="link-margin" @click.prevent="selectedCategoryMethod('all')">All</a>
          <a href="#" class="link-margin" @click.prevent="selectedCategoryMethod('featured')">Featured</a>
          <a
            href="#"
            v-for="category of data.categories"
            :key="category.id"
            @click.prevent="selectedCategoryMethod(category.id)"
          >{{ category.id }} {{category.name}}</a>
        </div>
      </template>
    </ApolloQuery>

    <div v-if="selectedCategoryMethod=='all'">
      <ApolloQuery :query="query">
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <div v-if="isLoading">Loading...</div>
          <div v-else>
            <div 
            v-for="book of data.books" 
            class="user" 
            :key="book.id"><router-link :to="`/book/${book.id}`">{{ book.id }} {{book.title}}</router-link></div>
          </div>
        </template>
      </ApolloQuery>
    </div>

    <div v-else-if="selectedCategoryMethod=='featured'">
      <ApolloQuery :query="query" :variables="{f:false}">
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <div v-if="isLoading">Loading...</div>
          <div v-else>
            <div 
            v-for="book of data.booksByFeatured" 
            class="user" 
            :key="book.id">
            <router-link :to="`/book/${book.id}`">{{ book.id }} {{book.title}}</router-link>
            <div>{{book.author}}</div>
            <img :src="`http://127.0.0.1:8000/img/${book.image}`" alt="cover image">
            </div>
          </div>
        </template>
      </ApolloQuery>
    </div>

    <div v-else>
      <ApolloQuery
        :query="require('@/graphql/queries/Category.gql')"
        :variables="{id:selectedCategory}"
      >
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <div v-if="isLoading">Loading...</div>
          <div v-else>
            <div
              v-for="book of data.category.books"
              class="user"
              :key="book.id"
            ><router-link :to="`/book/${book.id}`">{{ book.id }} {{book.title}}</router-link></div>
          </div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>
 


<script>
// import gql from 'graphql-tag'
import categoryQuery from "@/graphql/queries/Category.gql";
import booksQuery from "@/graphql/queries/Books.gql";
import categoriesQuery from "@/graphql/queries/Categories.gql";
import booksFeaturedQuery from "@/graphql/queries/BooksFeatured.gql";
export default {
  name: "Home",
  components: {},
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
