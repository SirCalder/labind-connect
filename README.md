
# 🌐 LabInd Connect - Site Institucional

> O LabInd Connect é o site institucional completo para o Laboratório de Informática Industrial (LABIND) da UDESC. Desenvolvido como uma plataforma moderna e dinâmica para divulgar projetos, equipe, publicações e notícias do laboratório.

---

### ✨ Tecnologias Utilizadas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

### 🚀 Funcionalidades Principais

* **Páginas Dinâmicas:** Seções para Projetos, Equipe, Publicações e Notícias.
* **Painel de Administração:** Uma área restrita (`/admin`) para gerenciar todo o conteúdo do site de forma intuitiva, incluindo:
    * CRUD completo para Projetos.
    * CRUD completo para Notícias.
    * CRUD completo para Membros da Equipe.
    * CRUD completo para Publicações.
* **Design Responsivo:** Interface totalmente adaptável para desktops, tablets e dispositivos móveis.
* **Tema Claro/Escuro:** Toggle para alternar entre os modos de visualização.
* **Componentes Reutilizáveis:** Construído com `shadcn/ui` para uma UI consistente e de alta qualidade.

---

### 🔧 Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e rodar o projeto no seu ambiente de desenvolvimento.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/sircalder/labind-connect.git](https://github.com/sircalder/labind-connect.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd labind-connect
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Acesse o projeto:**
    Abra seu navegador e acesse `http://localhost:8080` (ou a porta indicada no seu terminal).

---

### 🔑 Acessando o Painel de Administração

O projeto utiliza um sistema de autenticação local para o painel de administração, ideal para prototipagem e desenvolvimento.

* **URL de Login:** `/login`
* **Usuário:** `admin`
* **Senha:** `labind2024`

*Nota: Estas credenciais estão definidas no arquivo `src/lib/authService.ts` e não devem ser usadas em um ambiente de produção sem um sistema de autenticação seguro.*

---

### 📦 Estrutura do Projeto

O código está organizado da seguinte forma:

* `src/components/`: Componentes React reutilizáveis (UI, layout, etc.).
* `src/data/`: Dados iniciais (mock) para projetos, equipe, etc.
* `src/lib/`: Funções de serviço (`projectService.ts`, `authService.ts`) que simulam uma API interagindo com o `localStorage`.
* `src/pages/`: Componentes que representam as páginas do site (rotas públicas e de administração).
* `src/App.tsx`: Arquivo principal que gerencia o roteamento da aplicação.

---

### 🚀 Deploy

O site é automaticamente compilado e publicado no **GitHub Pages**. Qualquer push para a branch `main` irá acionar o processo de deploy.
