import pandas as pd


df = pd.read_csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vRBbW95ukh4Vg2piXFqcGaEcSf1AFxn5c9PnWinhF6Di7DFa6Z1eELsA3mywmwZwP0G7WOtHrYeYPDD/pub?gid=0&single=true&output=csv')
df_civil = df.copy()
del df_civil['war']
del df_civil['coordinates_war']
del df_civil['coordinates_war_text']
df_civil = df_civil[~df_civil['civil'].isna()]
df_civil['type'] = ['civic' for i in df_civil['civil']]

print(df_civil.shape)

df_war = df.copy()
del df_war['civil']
del df_war['coordinates_civil']
del df_war['coordinates_civil_text']
df_war = df_war[~df_war['war'].isna()]
df_war['type'] = ['war' for i in df_war['war']]

print(df_war.shape)

df_civil.rename(columns={'civil' : 'text', 'coordinates_civil':'coordinates', 'coordinates_civil_text' : 'coordinates_text'}, inplace=True)
df_war.rename(columns={'war' : 'text', 'coordinates_war':'coordinates', 'coordinates_war_text' : 'coordinates_text'}, inplace=True)

df = pd.concat([df_civil, df_war])
df = df.sort_values('date')
df['step'] = [i for i in range(0, len(df))]

print(df)

df.to_csv('data.csv', index = False)