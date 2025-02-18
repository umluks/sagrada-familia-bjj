FROM nginx:alpine

# Define o diretório onde os arquivos serão copiados
WORKDIR /usr/share/nginx/html

# Copia todos os arquivos do diretório local para o Nginx
COPY . .

# Expõe a porta padrão do Nginx
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
