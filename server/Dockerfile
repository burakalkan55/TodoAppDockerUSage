# 1. Node.js tabanlı bir image kullan
FROM node:18

# 2. Çalışma dizinini belirle
WORKDIR /app

# 3. package.json ve lock dosyasını kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Uygulama kodlarını ve Prisma dosyalarını kopyala
COPY . .

# 6. Prisma client dosyalarını oluştur
RUN npx prisma generate

# 7. TypeScript ile build al (dist klasörüne)
RUN npm run build

# 8. Express portunu aç
EXPOSE 5000

# 9. Uygulamayı başlat
CMD ["node", "dist/server.js"]
