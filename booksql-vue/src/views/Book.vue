<template>
    <div class="book">
        <ApolloQuery :query="require('@/graphql/queries/Books.gql')" :variables="{id:$route.params.id}" >
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <div v-if="isLoading">Loading...</div>
          <div v-else>
              <div>{{data.book.title}}</div>
              <div>{{data.book.author}}</div>
              <img :src="`http://127.0.0.1:8000/img/${book.image}`" alt="cover image">
              <router-link class="link-margin" :to="`/book/${data.book.id}/edit`">Editar</router-link>
              <router-link class="link-margin" v-on:click.prevent="deleteBook">Eliminar</router-link>
          </div>
        </template>
      </ApolloQuery>
    </div>
</template>

<script>
import deleteBook from "@/graphql/mutations/DeleteBook.gql";

export default {
    name:'Book',
    data() {
        return {
            
        }
    },
    methods: {
        deleteBook(){
            this.$apollo.mutate({
              mutation:deleteBook,
              variables: {
                id:this.$route.params.id,
              },
            }).then((data) => {
              console.log(data)
              this.$router.push('/')
            }).catch((error) => {
              console.error(error)
            })
        }
    },
    
}
</script>