<template>
<div class="container mt-4">
    <h1>Editar libro</h1>
    <b-form  @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group label="Titulo:">
        <b-form-input
          type="text"
          v-model="form.title"
          required
          placeholder="ingrese el titulo"
        ></b-form-input>
      </b-form-group>

      <b-form-group  label="Autor:" >
        <b-form-input
         v-model="form.author"
          required
          placeholder="Ingrese el autor"
        ></b-form-input>
      </b-form-group>

      <b-form-group  label="Imagen:">
        <b-form-input
          type="text"
          v-model="form.image"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group  label="Descripcion:" >
        <b-form-textarea
          v-model="form.description"
          required
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="input-group-5" label="Link:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="form.link"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-6">
        <b-form-checkbox-group v-model="form.featured" id="checkboxes-4">
          <b-form-checkbox value="true">Destacado</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
       <b-form-group label="Categorias:" >
       <ApolloQuery :query="require('@/graphql/queries/Categories.gql')">
        <template slot-scope="{ result: { data, loading }, isLoading }">
        <div v-if="isLoading">Cargando...</div>
        <div v-else>
          <b-form-select v-model="form.category" v-for="category of data.categories" :key="category.id">
              <b-form-select-option :value="category.id"> 
                  {{category.name}}
              </b-form-select-option>
          </b-form-select>
        </div>
      </template>
    </ApolloQuery>
      </b-form-group>
      <b-button type="submit" variant="primary">Editar libro</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>
<script>
import editBook from "@/graphql/mutations/EditBook.gql";
import booksQuery from "@/graphql/queries/Books.gql";

export default{
    name:'EditBook',
    data() {
        return {
            form:{
               title:'',
               author:'',
               image: null,
               description:'',
               link:'',
               featured:false,
               category:'',
            },
            book:null,
        }
    },
    apollo: {
        book: booksQuery,
        variables(){
            if(this.$route && this.$route.params){
                return {
                  id:this.$route.params.id
               }
            }
            
        },
        result ({ data, loading, networkStatus }) {
           this.title=data.book.title
           this.author=data.book.author
           this.image=data.book.image
           this.description=data.book.description
           this.link=data.book.link
           this.featured=data.book.featured
           this.category=data.book.category.id
           
        },
  },
    methods: {
        onSubmit(){
              this.$apollo.mutate({
              mutation:editBook,
              variables: {
                id:this.$route.params.id,
                title:this.title,
                author:this.author,
                image:this.image,
                description:this.description,
                link:this.link,
                featured:this.featured,
                category:this.category
              },
            }).then((data) => {
              console.log(data)
              this.$router.push(`/book/${this.$route.params.id}`)
            }).catch((error) => {
              console.error(error)
            })
        },
        onReset(evt){
           this.form.title=''
           this.form.author=''
           this.form.image=null
           this.form.description=''
           this.form.link=''
           this.form.featured=false
           this.form.category=''
        }
    },
}
</script>