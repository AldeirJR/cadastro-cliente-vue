<!-- src/views/ListView.vue -->
<template>
  <div>
    <h1>Lista de Cadastros</h1>

    <div v-if="cadastros.length === 0">
      <p>Nenhum cadastro encontrado.</p>
    </div>

    <ul v-else>
      <li v-for="(item, index) in cadastros" :key="item.id">
        <!-- Se o item estiver em modo de edição -->
        <div v-if="editIndex === index">
          <input 
            type="text" 
            v-model="editedCadastro.nome" 
            placeholder="Nome completo" 
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
        <!-- Modo de visualização normal -->
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

// Carrega os cadastros do localStorage ao montar o componente
function carregarCadastros() {
  const dados = JSON.parse(localStorage.getItem('cadastros')) || []
  cadastros.value = dados
}

// Exclui um cadastro pelo índice
function excluirCadastro(index) {
  cadastros.value.splice(index, 1)
  localStorage.setItem('cadastros', JSON.stringify(cadastros.value))
}

// Variáveis para controle de edição
const editIndex = ref(null)
const editedCadastro = ref({
  nome: '',
  cpf: '',
  telefone: '',
  email: ''
})

// Inicia a edição copiando os dados do cadastro selecionado
function editarCadastro(index) {
  editIndex.value = index
  const item = cadastros.value[index]
  editedCadastro.value = { ...item }
}

// Salva as alterações feitas no cadastro
function salvarEdicao(index) {
  cadastros.value[index] = { ...editedCadastro.value }
  localStorage.setItem('cadastros', JSON.stringify(cadastros.value))
  editIndex.value = null
}

// Cancela o modo de edição
function cancelarEdicao() {
  editIndex.value = null
}

onMounted(() => {
  carregarCadastros()
})
</script>

<style scoped>
/* Estilização dos botões e inputs na listagem */
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
