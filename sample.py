import pandas as pd
import plotly.graph_objects as go
import json
from difflib import get_close_matches

# === Load data ===
df = pd.read_csv("01_District_wise_crimes_committed_IPC_2001_2012.csv")
df.columns = df.columns.str.strip()
df = df[df["YEAR"] == 2012]

# === GeoJSON ===
with open("india_district.geojson", "r", encoding="utf-8") as f:
    geojson_data = json.load(f)
for feature in geojson_data["features"]:
    feature["properties"]["district"] = feature["properties"]["NAME_2"].strip().lower()
geojson_districts = {f["properties"]["district"] for f in geojson_data["features"]}

# === Function to get mapped dataframe for any crime ===
def get_crime_df(crime_col):
    grouped = df.groupby("DISTRICT")[[crime_col]].sum().reset_index()
    grouped.columns = ["DISTRICT", "Crime_Value"]
    grouped["DISTRICT"] = grouped["DISTRICT"].str.strip().str.lower()
    mapped_names = {
        dist: get_close_matches(dist, geojson_districts, n=1, cutoff=0.85)[0]
        for dist in grouped["DISTRICT"]
        if get_close_matches(dist, geojson_districts, n=1, cutoff=0.85)
    }
    grouped["district_mapped"] = grouped["DISTRICT"].map(mapped_names)
    return grouped.dropna(subset=["district_mapped"])

# === Crime Columns to Visualize ===
crime_columns = [
    "RAPE", "DOWRY DEATHS", "ASSAULT ON WOMEN WITH INTENT TO OUTRAGE HER MODESTY",
    "INSULT TO MODESTY OF WOMEN", "CRUELTY BY HUSBAND OR HIS RELATIVES",
    "KIDNAPPING & ABDUCTION", "KIDNAPPING AND ABDUCTION OF WOMEN AND GIRLS",
    "DOMESTIC VIOLENCE", "MURDER", "HURT/GREVIOUS HURT", "TOTAL IPC CRIMES"
]
crime_columns = [col for col in crime_columns if col in df.columns]

# === Generate Initial Data ===
initial_crime = crime_columns[0]
df_crime = get_crime_df(initial_crime)

# === Base Figure ===
fig = go.Figure()

fig.add_trace(go.Choropleth(
    geojson=geojson_data,
    locations=df_crime["district_mapped"],
    z=df_crime["Crime_Value"],
    featureidkey="properties.district",
    colorscale="YlOrRd",
    colorbar_title=initial_crime,
    name=initial_crime,
    hovertext=df_crime["district_mapped"]
))

# === Dropdown for Crime Selection ===
dropdown_buttons = []
for crime in crime_columns:
    temp_df = get_crime_df(crime)
    dropdown_buttons.append(dict(
        label=crime,
        method="restyle",
        args=[
            {
                "z": [temp_df["Crime_Value"]],
                "locations": [temp_df["district_mapped"]],
                "hovertext": [temp_df["district_mapped"]],
                "colorbar.title": crime
            }
        ]
    ))

# === Layout and Map Setup ===
fig.update_layout(
    title="District-wise Danger Zones by Crime Type (2012)",
    updatemenus=[{
        "buttons": dropdown_buttons,
        "direction": "down",
        "showactive": True,
        "x": 0.05,
        "xanchor": "left",
        "y": 1.05,
        "yanchor": "top"
    }],
    geo=dict(
        fitbounds="locations", 
        visible=True,
        showcountries=True,
        countrycolor="Black",
        countrywidth=0.5,
    ),
    margin={"r":0,"t":50,"l":0,"b":0}
)

fig.show()
