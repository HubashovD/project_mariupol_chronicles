import pandas as pd


df = pd.read_csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vRBbW95ukh4Vg2piXFqcGaEcSf1AFxn5c9PnWinhF6Di7DFa6Z1eELsA3mywmwZwP0G7WOtHrYeYPDD/pub?gid=328832206&single=true&output=csv')
df['step'] = [i for i in range(0, len(df))]
df.to_csv('data.csv', index = False)