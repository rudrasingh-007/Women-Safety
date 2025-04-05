import pandas as pd
import plotly.graph_objects as go
import json
from difflib import get_close_matches

# === Load Data ===
df = pd.read_csv("CrimesOnWomenData.csv")
with open("india_district.geojson", "r", encoding="utf-8") as f:
    geojson_data = json.load(f)

# === GeoJSON Preprocessing ===
for feature in geojson_data["features"]:
    feature["properties"]["district"] = feature["properties"]["NAME_2"].strip().lower()
geojson_districts = {f["properties"]["district"] for f in geojson_data["features"]}

# === Crime Columns to Include in Dropdown ===
crime_columns = [
    "RAPE", "DOWRY DEATHS", "ASSAULT ON WOMEN WITH INTENT TO OUTRAGE HER MODESTY",
    "INSULT TO MODESTY OF WOMEN", "CRUELTY BY HUSBAND OR HIS RELATIVES",
    "KIDNAPPING & ABDUCTION", "KIDNAPPING AND ABDUCTION OF WOMEN AND GIRLS",
    "MURDER", "HURT/GREVIOUS HURT", "TOTAL IPC CRIMES"
]
crime_columns = [col for col in crime_columns if col in df.columns]

# === Helper: Clean District Names + Match GeoJSON ===
def get_crime_df(crime_col, year):
    data = df[df["YEAR"] == year]
    grouped = data.groupby("DISTRICT")[[crime_col]].sum().reset_index()
    grouped.columns = ["DISTRICT", "Crime_Value"]
    grouped["DISTRICT"] = grouped["DISTRICT"].str.strip().str.lower()

    mapped = {
        dist: get_close_matches(dist, geojson_districts, n=1, cutoff=0.85)[0]
        for dist in grouped["DISTRICT"]
        if get_close_matches(dist, geojson_districts, n=1, cutoff=0.85)
    }
    grouped["district_mapped"] = grouped["DISTRICT"].map(mapped)
    return grouped.dropna(subset=["district_mapped"])

# === Initial Setup ===
initial_year = 2012
initial_crime = crime_columns[0]
df_crime = get_crime_df(initial_crime, initial_year)

# === Base Figure ===
fig = go.Figure(go.Choropleth(
    geojson=geojson_data,
    locations=df_crime["district_mapped"],
    z=df_crime["Crime_Value"],
    featureidkey="properties.district",
    colorscale="Turbo",
    colorbar_title=initial_crime,
    hovertext=df_crime["district_mapped"]
))

# === Dropdown Menus ===
years = sorted(df["YEAR"].unique())
crime_buttons = []
for crime in crime_columns:
    crime_buttons.append(dict(
        label=crime,
        method="update",
        args=[{
            "z": [get_crime_df(crime, initial_year)["Crime_Value"]],
            "locations": [get_crime_df(crime, initial_year)["district_mapped"]],
            "hovertext": [get_crime_df(crime, initial_year)["district_mapped"]],
        }, {"colorbar.title": crime}]
    ))

year_buttons = []
for y in years:
    year_buttons.append(dict(
        label=str(y),
        method="update",
        args=[{
            "z": [get_crime_df(initial_crime, y)["Crime_Value"]],
            "locations": [get_crime_df(initial_crime, y)["district_mapped"]],
            "hovertext": [get_crime_df(initial_crime, y)["district_mapped"]],
        }, {"title": f"Danger Zones by {initial_crime} in {y}"}]
    ))

# === Layout ===
fig.update_layout(
    title=f"Danger Zones by {initial_crime} in {initial_year}",
    geo=dict(
        fitbounds="locations",
        visible=False,
        showcountries=True,
        countrycolor="Black",
        showland=True,
        landcolor="white",
    ),
    updatemenus=[
        {
            "buttons": crime_buttons,
            "direction": "down",
            "showactive": True,
            "x": 0.01,
            "xanchor": "left",
            "y": 1.12,
            "yanchor": "top",
            "pad": {"r": 10, "t": 10},
        },
        {
            "buttons": year_buttons,
            "direction": "down",
            "showactive": True,
            "x": 0.35,
            "xanchor": "left",
            "y": 1.12,
            "yanchor": "top",
            "pad": {"r": 10, "t": 10},
        }
    ],
    margin={"r": 0, "t": 60, "l": 0, "b": 0}
)

fig.show()
