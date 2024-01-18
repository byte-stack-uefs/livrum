import mysql.connector

# Configurações de conexão com o banco de dados
settings = {
    "user": "root",
    "password": "root",
    "port": 3306,
    "host": "172.20.0.1",  # Endereço do servidor MySQL
    "database": "livrum",  # Nome do banco de dados
    "raise_on_warnings": True,
}


def connect():
    # Estabelecendo a conexão
    try:
        conn = mysql.connector.connect(**settings)

        if conn.is_connected():
            print("Conexão ao banco de dados realizada com sucesso!")
            cursor = conn.cursor()

            # Exemplo: Executando uma consulta
            cursor.execute("SELECT VERSION()")
            version = cursor.fetchone()
            print(f"Versão do MySQL: {version}")

            # Fechar o cursor e a conexão
            cursor.close()
            conn.close()
            return version

    except mysql.connector.Error as e:
        print(f"Erro ao conectar ao banco de dados: {e}")


class DB:
    def __enter__(self):
        self.db = mysql.connector.connect(**settings)
        if self.db.is_connected():
            self.cursor = self.db.cursor(dictionary=True)
            return self.cursor
        else:
            raise Exception("Could not connect to DB")

    def __exit__(self, exc_type, exc_value, exc_tb):
        self.cursor.close()
        self.db.commit()
        self.db.close()
