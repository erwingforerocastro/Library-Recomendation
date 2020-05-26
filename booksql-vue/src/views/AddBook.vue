<template>
<div class="container mt-4">
  <h1>Crear libro</h1>
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
          <b-form-select v-for="category of data.categories" :key="category.id">
              <b-form-select-option :value="category.id"> 
                  {{category.name}}
              </b-form-select-option>

          </b-form-select>
        </div>
      </template>
    </ApolloQuery>
      </b-form-group>
      <b-button type="submit" variant="primary">Crear libro</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>
<script>
import addBook from "@/graphql/mutations/AddBook.gql";
export default{
    name:'addBook',
    data() {
        return {
            form:{
               title:'',
               author:'',
               image: null,
               description:'',
               link:'',
               featured:false,
               category:''
            },
        }
    },
    methods: {
        onSubmit(){
              this.$apollo.mutate({
              mutation:addBook,
              variables: {
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
              this.$router.push('/')
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