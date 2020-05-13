<template>
    <div class="book">
        <ApolloQuery :query="require('@/graphql/queries/Books.gql')" :variables="{id:$route.params.id}" >
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <div v-if="isLoading">Loading...</div>
          <div v-else>
              <div>{{data.book.title}}</div>
              <div>{{data.book.author}}</div>
              <img :src="`http://127.0.0.1:8000/img/${book.image}`" alt="cover image">
          </div>
        </template>
      </ApolloQuery>
    </div>
</template>

<script>
export default {
    name:'Book',
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    
}
</script>