<!-- src/views/ListView.vue -->
<template>
  <div>
    <h1>Lista de Cadastros</h1>

    <div v-if="cadastros.length === 0">
      <p>Nenhum cadastro encontrado.</p>
    </div>

    <ul v-else>
      <li v-for="(item, index) in cadastros" :key="item.id">
        
        <div v-if="editIndex === index">
          <input 
            type="text" 
            v-model="editedCadastro.nome" 
            placeholder="Nome"
          />
          <input 
            type="text" 
            v-model="editedCadastro.cpf" 
            placeholder="CPF"
          />
          <input 
            type="text" 
            v-model="editedCadastro.telefone" 
            placeholder="Telefone"
          />
          <input 
            type="email" 
            v-model="editedCadastro.email" 
            placeholder="Email"
          />
          <button @click="salvarEdicao(index)">Salvar</button>
          <button @click="cancelarEdicao">Cancelar</button>
        </div>
        <!-- Modo de visualização -->
        <div v-else>
          <strong>Nome:</strong> {{ item.nome }} |
          <strong>CPF:</strong> {{ item.cpf }} |
          <strong>Telefone:</strong> {{ item.telefone }} |
          <strong>Email:</strong> {{ item.email }}
          <button @click="editarCadastro(index)">Editar</button>
          <button @click="excluirCadastro(index)">Excluir</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'


const cadastros = ref([])

// Variáveis para controle da edição
const editIndex = ref(null)
const editedCadastro = ref({
  nome: '',
  cpf: '',
  telefone: '',
  email: ''
})

// Função para buscar dados da API e armazenar no localStorage 
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

// Exclui um cadastro e atualiza o localStorage
function excluirCadastro(index) {
  cadastros.value.splice(index, 1)
  localStorage.setItem('cadastros', JSON.stringify(cadastros.value))
}

// Inicia o modo de edição para o cadastro selecionado
function editarCadastro(index) {
  editIndex.value = index
  // Faz uma cópia dos dados do cadastro para edição
  const item = cadastros.value[index]
  editedCadastro.value = { ...item }
}

// Salva as alterações e atualiza o localStorage
function salvarEdicao(index) {
  cadastros.value[index] = { ...editedCadastro.value }
  localStorage.setItem('cadastros', JSON.stringify(cadastros.value))
  editIndex.value = null
}

// Cancela a edição
function cancelarEdicao() {
  editIndex.value = null
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

input {
  margin-bottom: 0.5rem;
  padding: 0.3rem;
  font-size: 0.95rem;
}
</style>
