<template>
  <ApolloQuery :query="require('@/graphql/queries/Categories.gql')">
    <template slot-scope="{ result: { data, loading }, isLoading }">
      <div v-if="isLoading">Loading...</div>
      <ul v-else>
        <li
          v-for="category of data.categories"
          class="user"
          :key="category.id"
        >{{ category.id }} {{category.name}}</li>
      </ul>
    </template>
  </ApolloQuery>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      datos: null
    };
  }
};
</script>
