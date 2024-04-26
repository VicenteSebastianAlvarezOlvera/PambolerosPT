import json

def obtener_datos(file_name):
        with open(file_name, 'r') as file:
            data = json.load(file)
        return data
#datos = obtener_datos('data.json')
datos = obtener_datos('shuffleddata.json')
print(datos)