# 1. Dùng Node.js base image
FROM node:20-alpine

# 2. Set thư mục làm việc trong container
WORKDIR /app

# 3. Copy file package.json và package-lock.json trước
COPY package*.json ./

# 4. Cài dependency
RUN npm install

# 5. Copy toàn bộ source code vào container
COPY . .

# 6. Build TypeScript sang JavaScript
RUN npm run build

# 7. Expose port của service (theo code bạn để 3001)
EXPOSE 3001

# 8. Lệnh khởi chạy container
CMD ["npm", "run", "start"]
