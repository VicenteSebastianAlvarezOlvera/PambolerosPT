import random
import json
import pulp
from pulp import LpProblem, LpVariable, lpSum, LpMinimize, LpBinary
from datetime import datetime, timedelta, date

class Partido:
    def __init__(self, numero, equipo_local, equipo_visitante=None, fecha_hora=None, cancha=None, arbitro=None):
        self.numero = numero
        self.equipo_local = equipo_local
        self.equipo_visitante = equipo_visitante
        self.fecha_hora = fecha_hora
        self.cancha = cancha
        self.arbitro = arbitro

class Calendario:
    def __init__(self):
        self.partidos = []
        self.canchas = set()
        self.arbitros = set()
        self.contador_partidos = 1

    def agregar_partido(self, partido):
        partido.numero = self.contador_partidos
        self.partidos.append(partido)
        self.contador_partidos += 1
        if partido.cancha:
            self.canchas.add(partido.cancha)
        if partido.arbitro:
            self.arbitros.add(partido.arbitro)

    def generar_calendario_optimo(self, fecha_inicio_torneo, dias_semana, hora_inicio, hora_fin, output_file):
        # Convertir días de la semana a números (0 es lunes y 6 es domingo)
        dias_semana_numericos = [datetime.strptime(dia, "%A").weekday() for dia in dias_semana]

        # Reorganizar aleatoriamente la lista de equipos
        random.shuffle(equipos)

        # Crear problema de optimización
        problema = LpProblem("Calendario de Partidos", LpMinimize)

        # Variables de decisión
        X = {(partido, cancha, hora, dia): LpVariable(f'X_{partido.numero}_{cancha}_{hora}_{dia}', cat=LpBinary)
             for partido in self.partidos
             for cancha in self.canchas
             for hora in range(hora_inicio, hora_fin)  # Rango de horas
             for dia in range(len(dias_semana_numericos))}  # Considerar todas las semanas

        # Minimizar el número de conflictos
        problema += lpSum(X[partido, cancha, hora, dia] for partido in self.partidos
                          for cancha in self.canchas
                          for hora in range(hora_inicio, hora_fin)  # Rango de horas
                          for dia in range(len(dias_semana_numericos)))

        # Restricciones
        for partido in self.partidos:
            for cancha in self.canchas:
                for hora in range(hora_inicio, hora_fin):
                    for dia in range(len(dias_semana_numericos)):
                        # Cada partido se juega en exactamente una cancha, hora y día
                        problema += lpSum(X[p, c, h, d] for p, c, h, d in X if p == partido) == 1
                        # No pueden haber dos partidos en la misma cancha al mismo tiempo y día
                        problema += lpSum(X[p, c, h, d] for p, c, h, d in X if c == cancha and h == hora and d == dia) <= 1

        # Resolver el problema
        problema.solve()

        partidos_json = []
        for partido, cancha, hora, dia in X:
            if X[partido, cancha, hora, dia].value() == 1:
               # fecha_partido = datetime.strptime(fecha_inicio_torneo, "%Y-%m-%d") + timedelta(weeks=dia, days=dias_semana_numericos[dia])
                fecha_partido = fecha_inicio_torneo + timedelta(weeks=dia, days=dias_semana_numericos[dia])
                fecha_hora = datetime(fecha_partido.year, fecha_partido.month, fecha_partido.day, hora)
                partido_info = {
                    "numero": partido.numero,
                    "equipo_local": partido.equipo_local,
                    "equipo_visitante": partido.equipo_visitante if partido.equipo_visitante else "Bye",
                    "fecha_hora": fecha_hora.strftime('%Y-%m-%d %H:%M'),
                    "cancha": cancha,
                    "arbitro": partido.arbitro if partido.arbitro else "No asignado"
                }
                partidos_json.append(partido_info)

        with open(output_file, 'w') as json_file:
            json.dump(partidos_json, json_file, indent=4)
def obtener_datos(file_name):
        with open(file_name, 'r') as file:
            data = json.load(file)
        return data
#datos = obtener_datos('data.json')
datos = obtener_datos('shuffleddata.json')


# Ejemplo de uso
calendario = Calendario()

equipos = datos["Equipos"]
canchas = datos["Canchas"]
arbitros = datos["Arbitros"]
dias_semana_origen = datos["DiasSemana"]

for i in range(0, len(equipos), 2):
    if i + 1 < len(equipos):
        # Generar una fecha y hora únicas para cada partido
        fecha_hora = datetime.strptime("2024-03-22", "%Y-%m-%d") + timedelta(days=i * (len(equipos) // 2) + i // 2)
        partido = Partido(None, equipos[i], equipos[i + 1], fecha_hora, canchas[i % len(canchas)], arbitros[i % len(arbitros)])
        calendario.agregar_partido(partido)
    else:
        # Para el último equipo, crea un bye
        partido = Partido(None, "Equipo sin rival: ", equipos[i])
        calendario.agregar_partido(partido)

# Solicitar fecha de inicio del torneo
fecha_inicio_torneo = date.today()#input("Ingrese la fecha de inicio del torneo (YYYY-MM-DD): ")
# Solicitar días de la semana en los que se jugarán los partidos
dias_semana = dias_semana_origen#input("Ingrese los días de la semana en los que se jugarán los partidos (separados por comas, en inglés): ").split(", ")
# Solicitar hora de inicio y fin del rango de horas en la que se jugarán los partidos
hora_inicio = 6#int(input("Ingrese la hora de inicio del rango de horas (0-23): "))
hora_fin = 18#int(input("Ingrese la hora de fin del rango de horas (1-24): "))
# Solicitar nombre del archivo de salida
fecha = str(date.today())
output_file = "TorneoShuffled.json"

calendario.generar_calendario_optimo(fecha_inicio_torneo, dias_semana, hora_inicio, hora_fin, output_file)