from psycopg2 import connect
from psycopg2.extensions import connection
from app.config import DB_CONFIG

def get_connection() -> connection:
    return connect(
        host=DB_CONFIG["host"],
        port=DB_CONFIG["port"],
        dbname=DB_CONFIG["dbname"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"],
    )