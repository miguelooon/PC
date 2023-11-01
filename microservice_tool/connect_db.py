import psycopg2
connection = psycopg2.connect(
    dbname="db",
    user="postgres",
    password="postgres",
    host="db",
    port="5432",
    sslmode="prefer"
)
