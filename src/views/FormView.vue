<!-- src/views/FormView.vue -->
<template>
  <div class="container">
    <div class="form-wrapper">
      <h1>Formulário de Cadastro</h1>
      <form @submit.prevent="handleSubmit">
        <!-- Nome -->
        <div class="form-group" :class="{ 'form-group--invalid': isNomeInvalid }">
          <label for="nome"></label>
          <input
            type="text"
            id="nome"
            v-model="nome"
            placeholder="Nome completo (sem abreviações)"
            required
          />
          <!-- Mensagem de erro caso seja inválido -->
          <p v-if="isNomeInvalid" class="error-message">
            Campo deve conter 3 caracteres ou mais
          </p>
        </div>

        <!-- CPF -->
        <div class="form-group">
          <label for="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            v-model="cpf"
            placeholder="Ex.: 000.000.000-00"
            required
          />
        </div>

        <!-- Telefone -->
        <div class="form-group">
          <label for="telefone">Telefone</label>
          <input
            type="text"
            id="telefone"
            v-model="telefone"
            placeholder="Ex.: (00) 99999-9999"
            required
          />
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">E-mail</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="seuemail@exemplo.com"
            required
          />
        </div>

        <!-- Botão -->
        <button 
          type="submit" 
          class="btn-submit"
          :disabled="isNomeInvalid"
        >
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Campos do formulário
const nome = ref('')
const cpf = ref('')
const telefone = ref('')
const email = ref('')

// Validação simples do campo "Nome completo": mínimo de 3 caracteres
const isNomeInvalid = computed(() => {
  return nome.value.length > 0 && nome.value.length < 3
})

function handleSubmit() {
  // Se o nome estiver inválido, não prossegue
  if (isNomeInvalid.value) return

  const novoCadastro = {
    id: Date.now(),
    nome: nome.value,
    cpf: cpf.value,
    telefone: telefone.value,
    email: email.value
  }

  const cadastrosSalvos = JSON.parse(localStorage.getItem('cadastros')) || []
  cadastrosSalvos.push(novoCadastro)
  localStorage.setItem('cadastros', JSON.stringify(cadastrosSalvos))

  // Limpa os campos
  nome.value = ''
  cpf.value = ''
  telefone.value = ''
  email.value = ''

  // Redireciona para a listagem (opcional)
  router.push('/list')
}
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* preenche toda a altura da viewport */
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
   
}

/* Card do formulário */
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

/* Classe para estado inválido */
.form-group--invalid input {
  color: #eb4a46 !important; /* força a cor do texto */
  border-bottom: 1px solid #eb4a46 !important; /* borda vermelha */
}

/* Mensagem de erro */
.error-message {
  font-size: 0.9rem;
  color: #eb4a46;
  margin-top: 0.3rem;
}

/* Label */
label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #555;
}

/* Inputs: borda inferior e cores conforme o guia */
input[type="text"],
input[type="email"] {
  width: 100%;
  border: none;
  border-bottom: 1px solid #efeedd; /* cor da borda sem foco */
  padding: 0.5rem 0;
  font-size: 1rem;
  outline: none;
  color: #efeedd; /* cor do texto sem foco */
  transition: color 0.3s, border-color 0.3s;
}

/* Foco no input */
input[type="text"]:focus,
input[type="email"]:focus {
  color: #333333;               /* cor do texto ao focar */
  border-bottom-color: #333333; /* cor da borda ao focar */
}

/* Placeholder alinhado à esquerda (opcional) */
::placeholder {
  text-align: left;
}

/* Botão de cadastro */
.btn-submit {
  width: 100%;
  background-color: #00c8b3;
  color: #fff;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Hover do botão */
.btn-submit:hover:not(:disabled) {
  background-color: #00ab90;
}

/* Botão desabilitado */
.btn-submit:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
