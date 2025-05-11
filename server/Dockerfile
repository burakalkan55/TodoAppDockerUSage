# 1. Node.js tabanlı bir image kullan
FROM node:18

# 2. Uygulama çalışma dizinini oluştur
WORKDIR /app

# 3. package.json ve package-lock.json'u kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Projedeki tüm dosyaları kopyala (src, prisma, vs.)
COPY . .

# 6. Prisma client'ı oluştur
RUN npx prisma generate

# 7. Veritabanı tablolarını oluştur (migrate deploy)
RUN npx prisma migrate deploy

# 8. TypeScript'ten JavaScript'e derle
RUN npm run build

# 9. Uygulama portunu expose et
EXPOSE 5000

# 10. Uygulama başlatma komutu
CMD ["node", "dist/server.js"]
