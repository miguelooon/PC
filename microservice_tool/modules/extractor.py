
import psycopg2
def extract_metadata(db_file):
    # Analiza el archivo .sql y extrae la metadata
    # Retorna un objeto/diccionario con la metadata
    pass

def connect_to_db():
    try:
        connection = psycopg2.connect(
            user="postgres",
            password="postgres",
            host="db",
            port="5432",
            database="db"
        )
        return connection
    except Exception as error:
        print(f"Error connecting to database: {error}")
        return None

connection = connect_to_db()



