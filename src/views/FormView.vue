<!-- src/views/FormView.vue -->
<template>
  <div class="container">
    <div class="form-wrapper">
      <h1>Formulário de Cadastro</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="nome">Nome completo:</label>
          <input type="text" id="nome" v-model="nome" required />
        </div>

        <div class="form-group">
          <label for="cpf">CPF:</label>
          <input type="text" id="cpf" v-model="cpf" required />
        </div>

        <div class="form-group">
          <label for="telefone">Telefone:</label>
          <input type="text" id="telefone" v-model="telefone" required />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>

        <!-- Botão que muda conforme o estado (normal, hover, disabled, loading) -->
        <button
          type="submit"
          class="btn-submit"
          :disabled="loading"
          :class="{ loading: loading }"
        >
          <!-- Se estiver carregando, mostra o spinner. Se não, mostra "Cadastrar" -->
          <span v-if="!loading">Cadastrar</span>
          <span v-else class="loader"></span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estados do formulário
const nome = ref('')
const cpf = ref('')
const telefone = ref('')
const email = ref('')

// Flag para controlar o estado de loading do botão
const loading = ref(false)

// Função para salvar dados no localStorage
async function handleSubmit() {
  // Ativa o estado de loading
  loading.value = true

  // Simulando um pequeno delay para exibir o loading (por exemplo, 1.5s)
  // Em uma aplicação real, você faria requisições HTTP ou outra lógica assíncrona.
  setTimeout(() => {
    // Cria o objeto a ser salvo
    const novoCadastro = {
      id: Date.now(),
      nome: nome.value,
      cpf: cpf.value,
      telefone: telefone.value,
      email: email.value
    }

    // Salva no localStorage
    const cadastrosSalvos = JSON.parse(localStorage.getItem('cadastros')) || []
    cadastrosSalvos.push(novoCadastro)
    localStorage.setItem('cadastros', JSON.stringify(cadastrosSalvos))

    // Limpa os campos
    nome.value = ''
    cpf.value = ''
    telefone.value = ''
    email.value = ''

    // Desativa o loading
    loading.value = false

    // (Opcional) Redireciona para a listagem
    router.push('/list')
  }, 1500)
}
</script>

<style scoped>
/* 
   Guia de estilo para o botão:
   - Normal: fundo #00c8b3, fonte #ffffff
   - Hover: opacidade 70%
   - Disabled: fundo #f6f6f6, fonte #dddadc
   - Loading: exibe spinner
*/

/* Container centralizado */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 1rem;
}

/* Card que envolve o formulário */
.form-wrapper {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Título centralizado */
h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

/* Agrupamento de cada campo */
.form-group {
  margin-bottom: 1.5rem;
}

/* Labels dos campos */
label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #555;
}

/* Inputs com borda apenas na parte inferior */
input[type="text"],
input[type="email"] {
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 0;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="email"]:focus {
  border-bottom-color: #00c8b3;
}

/* ---------------------- */
/* Estilos do botão      */
/* ---------------------- */
.btn-submit {
  width: 100%;
  background-color: #00c8b3; /* cor de fundo normal */
  color: #ffffff;           /* cor do texto normal */
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: opacity 0.3s, background-color 0.3s;
}

/* Hover: opacidade de 70% (0.7) */
.btn-submit:hover:not(:disabled) {
  opacity: 0.7;
}

/* Disabled: fundo #f6f6f6 e fonte #dddadc */
.btn-submit:disabled {
  background-color: #f6f6f6;
  color: #dddadc;
  cursor: not-allowed;
}

/* Spinner de loading */
.loader {
  display: inline-block;
  width: 1.4rem;
  height: 1.4rem;
  border: 3px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  vertical-align: middle;
}

/* Animação do spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
