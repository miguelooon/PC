FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]
FROM python:3.8
COPY . /tool
WORKDIR /tool
RUN pip install psycopg2
CMD ["python", "main.py"]