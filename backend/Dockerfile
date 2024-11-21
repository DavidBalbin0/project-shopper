# Use a imagem oficial do Node.js como base
FROM node:18-alpine

## Define o diretório de trabalho dentro do container
#WORKDIR /app

# Copia o package.json e package-lock.json para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto para o container
COPY . .

# Compila o projeto
RUN npm run build

# Define o comando para iniciar o aplicativo
CMD ["npm", "run", "start:prod"]
