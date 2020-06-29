<template>
<div class="create container mt-4">
  <h1 class="mb-4">Crear libro</h1>
    <form  @submit.prevent="onSubmit" @reset.prevent="onReset">
      <div class="form-group" label="Titulo:">
        <label class="font-bold mb-2" for="title">Titulo:</label>
        <input type="text" v-model="form.title" required placeholder="ingrese el titulo">
      </div>

      <div class="form-group"  label="Autor:" >
        <label for="author" class="font-bold mt-2">Autor:</label>
        <input type="text" v-model="form.author"  required  placeholder="Ingrese el autor">
      </div>
      <div class="form-group"  label="Imagen:">
        <label for="imagen" class="font-bold mt-2">Imagen:</label>
        <input type="text" v-model="form.image" required>
      </div>
      <div class="form-group"  label="Descripción:" >
        <label for="descripción" class="font-bold mt-2">Descripción:</label>
        <textarea v-model="form.description" required></textarea>
      </div>
      <div class="form-group" label="Link:">
        <label for="link" class="font-bold mt-2">Link:</label>
        <input v-model="form.link" type="text" required>
      </div>
      <div class="form-group" id="input-group-6">
        <input type="checkbox" v-model="form.featured" id="checkboxes-4">
      </div>
       <div label="Categorias:" >
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
      </div>
      <b-button type="submit" variant="primary">Crear libro</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </form>
  </div>
</template>
<script>
import addBook from "@/graphql/mutations/AddBook.gql";
export default{
    name:'AddBook',
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
<style scoped>
.form-group{
  margin-bottom: 32px;
}
input[type="text"],textarea{
  padding:10px 14px;
  border: 1px solid lightgray;
  border-radius: 5px;
}  
label{
  display: block;
}
button{
  padding: 16px;
  background: #027BFF;
  color: white;
  border-radius: 5px;
  font-size: 16px;
}

</style>