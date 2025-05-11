# 1. Node.js tabanlı bir image kullan
FROM node:18

# 2. Çalışma dizinini belirle
WORKDIR /app

# 3. package.json ve lock dosyasını kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Uygulama kodlarını kopyala
COPY . .

# 6. TypeScript ile derle
RUN npm run build

# 7. Port tanımı (Express genelde 5000)
EXPOSE 5000

# 8. Container başladığında çalışacak komut
CMD ["node", "dist/server.js"]
