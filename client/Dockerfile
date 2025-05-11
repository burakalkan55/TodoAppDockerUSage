# 1. Node image
FROM node:18

# 2. Çalışma dizini
WORKDIR /app

# 3. Bağımlılık dosyalarını kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Diğer dosyaları kopyala
COPY . .

# 6. Production build al
RUN npm run build

# 7. Production server olarak serve kullan (yoksa kur)
RUN npm install -g serve

# 8. Port belirt (Vite değil, build sonrası static sunum için 4173 değil)
EXPOSE 4173

# 9. Static build klasörünü sun
CMD ["serve", "-s", "dist", "-l", "4173"]
