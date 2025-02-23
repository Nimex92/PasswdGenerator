import pandas as pd
import json

df = pd.read_excel("miarchivo.xls")
# Crear una nueva columna 'Nombre Completo' concatenando los nombres
df['Nombre Completo'] = df['NOMBRE'] + ' ' + df['Primer Apellido'] + ' ' + df['Segundo Apellido']
# Crear la columna 'usuario' en minúscula y separando por punto
df['usuario'] = df['NOMBRE'].str.lower() + '.' + df['Primer Apellido'].str.lower()
df['usuario'].apply(lambda x: x.strip())

# Crear la columna 'contraseña' con valor fijo
df['password'] = 'Unir2025@@'

# Seleccionar solo las columnas deseadas
df_seleccionado = df[['Nombre Completo', 'MAIL UNIR', 'MAIL PERSONAL', 'usuario', 'password']]

# Convertir a lista de diccionarios y luego a JSON
data = df_seleccionado.to_dict('records')
json_data = json.dumps(data, indent=4)

# Imprimir el JSON
# print(json_data)

# Guardar el JSON en un archivo
with open('salasprofes.json', 'w') as f:
    json.dump(data, f, indent=4)