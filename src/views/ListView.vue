<!-- src/views/ListView.vue -->
<template>
  <div>
    <h1>Lista de Cadastros</h1>

    <div v-if="cadastros.length === 0">
      <p>Nenhum cadastro encontrado.</p>
    </div>

    <ul v-else>
      <li v-for="(item, index) in cadastros" :key="item.id">
        <strong>Nome:</strong> {{ item.nome }} |
        <strong>CPF:</strong> {{ item.cpf }} |
        <strong>Telefone:</strong> {{ item.telefone }} |
        <strong>Email:</strong> {{ item.email }}
        <button @click="excluirCadastro(index)">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const cadastros = ref([])

// Função para buscar dados da API e armazenar em localStorage (opcional)
async function carregarDadosDaAPI() {
  try {
    const response = await fetch('https://private-9d65b3-tinnova.apiary-mock.com/users')
    const data = await response.json()
  
    const mappedData = data.map((item, index) => ({
      id: Date.now() + index, 
      nome: item.name,
      cpf: item.cpf,
      telefone: item.phone,
      email: item.email
    }))

    // Armazena no estado local
    cadastros.value = mappedData

    
    localStorage.setItem('cadastros', JSON.stringify(mappedData))
  } catch (error) {
    console.error('Erro ao carregar dados da API:', error)
  }
}

// Exclui um cadastro pelo índice e atualiza o localStorage
function excluirCadastro(index) {
  cadastros.value.splice(index, 1)
  localStorage.setItem('cadastros', JSON.stringify(cadastros.value))
}

onMounted(async () => {
  
  const localData = localStorage.getItem('cadastros')

  if (localData) {
    
    cadastros.value = JSON.parse(localData)
  } else {
   
    await carregarDadosDaAPI()
  }
})
</script>

<style scoped>
button {
  margin-left: 1rem;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}
</style>
