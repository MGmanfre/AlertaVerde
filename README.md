# Alerta Verde - Plataforma de Conscientização Ambiental

## Visão Geral

Alerta Verde é uma aplicação web estática focada em conscientização e educação ambiental. A plataforma oferece uma experiência interativa para que os usuários aprendam sobre questões ambientais, realizem quizzes e enviem sugestões para melhorias ambientais. A aplicação é construída utilizando HTML, CSS e JavaScript puros, com design responsivo e capacidade de alternância de tema.

### Arquitetura do Frontend

A aplicação segue uma arquitetura modular de frontend com arquivos JavaScript separados para diferentes funcionalidades:

- **Aplicação Principal (script.js)**: Gerencia funcionalidades principais como controle do slideshow, navegação, validação de formulários e rolagem suave
- **Módulo de Quiz (quiz.js)**: Gerencia o quiz interativo sobre meio ambiente com perguntas, pontuação e explicações
- **Sistema de Temas (themes.js)**: Fornece alternância entre temas claro/escuro com persistência em localStorage e detecção de preferência do sistema

### Estrutura de Arquivos

```
    /
    ├── index.html # Estrutura principal HTML
    ├── styles.css # Estilos globais com propriedades personalizadas
    ├── styleMobile # Estilos para suporte Mobile e outras telas
    ├── script.js # Lógica principal da aplicação
    ├── quiz.js # Funcionalidade do quiz
    └── themes.js # Gerenciamento de temas
```

## Componentes Principais

### 1. Sistema de Navegação Responsivo

- **Navegação para Desktop**: Barra de navegação horizontal tradicional
- **Navegação para Mobile**: Menu hambúrguer com sobreposição
- **Rolagem Suave**: Navegação por âncoras com efeitos de rolagem suave

### 2. Slideshow Interativo

- **Slides Automáticos**: Progresso automático com tempo configurável
- **Navegação Manual**: Navegação por clique com indicador de pontos
- **Pausa no Hover**: Slideshow pausa automaticamente ao interagir

### 3. Sistema de Quiz Ambiental

- **Banco de Perguntas**: Dados em array com perguntas de múltipla escolha
- **Sistema de Pontuação**: Rastreamento de pontuação em tempo real e cálculo percentual
- **Feedback Educacional**: Explicações detalhadas para cada resposta

### 4. Gerenciamento de Temas

- **Suporte a Dois Temas**: Variantes clara e escura
- **Integração com o Sistema**: Detecção automática da preferência de esquema de cores
- **Armazenamento Persistente**: Preferência do usuário salva no localStorage
- **Troca em Tempo Real**: Aplicação imediata do tema sem recarregar a página

### 5. Manipulação de Formulários

- **Validação no Lado do Cliente**: Validação em tempo real com feedback visual
- **Estados de Sucesso**: Feedback ao usuário para envios bem-sucedidos
- **Acessibilidade**: Rótulos ARIA corretos e suporte a navegação por teclado
