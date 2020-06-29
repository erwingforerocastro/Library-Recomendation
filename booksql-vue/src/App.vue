<template>
  <div id="app" class="font-sans antialiased text-black">
    <div id="nav" class="bg-purple-dark">
      <div class="container flex-align-items-center justify-beetwen py-6">
        <div>
          <a href="/"><img src="./assets/logo.svg" alt="logo"></a>
        </div>
        <div>
           <router-link to="/" class="text-white hover:text-grey-light">Inicio</router-link> 
           <router-link to="/about" class="text-white hover:text-grey-light">Acerca de</router-link>
       </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style src="./assets/main.css">
