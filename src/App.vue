<!-- src/App.vue -->
<template>
  <div>
    <nav>
      <router-link to="/">Formulário</router-link> |
      <router-link to="/list">Lista de Cadastros</router-link>
    </nav>
    <hr />
    <!-- A área onde cada "página" (rota) será exibida -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Estilos simples de exemplo */
nav {
  margin-bottom: 1rem;
}
router-link {
  margin-right: 1rem;
}
</style>
