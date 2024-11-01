from pyairtable import Api
import pandas as pd
import folium
import logging
import os
from datetime import datetime
from dotenv import load_dotenv
import pytz

# Define the Paris time zone
paris_tz = pytz.timezone('Europe/Paris')
# Configure logging
logger = logging.getLogger("openstreetmap")

# Load environment variables
load_dotenv()

class OpenStreetMap:

    def __init__(self, lat, lng, zoom_start):
        self.num = 1
        logger.debug(f"Map on ({lat}, {lng}), zoom_start={zoom_start}")
        self.map = folium.Map(location=[lat, lng], zoom_start=zoom_start)

    def create_layer(self, location_list, layer_name, color):
        if not location_list:
            logger.warning(f'No record has been passed for this layer "{layer_name}"')
            return

        for location in location_list:
            latitude = location['fields']['Latitude']
            longitude = location['fields']['Longitude']
            name = location['fields']['Libellé long']
            codepostal = location['fields']['Code postal']
            googlemaps = location['fields']['Google Maps URL']

            folium.Marker(
                [latitude, longitude],
                popup=f'<div style="font-size: large"><b>{name}</b><br><i>{layer_name}</i><br>{codepostal}<br>'
                      f'<a href="{googlemaps}" target="_blank">Google Maps URL</a></div>',
                icon=folium.Icon(color=color, icon='ok-sign')
            ).add_to(self.map)

        folium.LayerControl().add_to(self.map)

    def save_html(self, filepath):
        self.map.save(filepath)
        print(f"Map saved to {filepath}")

    @staticmethod
    def create_mdx_file(filepath, last_update, map_file_url):
        with open(filepath, "w") as mdx_file:
          mdx_file.write(f"""---
id: osm_map
title: "Lieux fréquentés"
---

<p>Dernière mise à jour : {last_update}</p>

<div style={{{{"width": "100%", "height": "80vh"}}}}>
  <iframe
    src="{map_file_url}"
    style={{{{"border": "none", "width": "100%", "height": "100%"}}}}
    allowFullScreen
  />
</div>
""")
        print(f"MDX file saved to {filepath}")


    @staticmethod
    def process_location_maps():
        logger.info("Processing data for map")

        # Initialize API
        airtable_api = Api(os.getenv('AIRTABLE_API_TOKEN'))
        lieux = airtable_api.table('appP8kY2qxO1uwfUl', 'tblgvkkeJ7JLU1swS')
        records = lieux.all(view='OpenStreetMap View')

        # Calculate map center
        sumlatitude = sum(record['fields']['Latitude'] for record in records)
        sumlongitude = sum(record['fields']['Longitude'] for record in records)
        centerlatitude = sumlatitude / len(records)
        centerlongitude = sumlongitude / len(records)

        # Create map
        osm_map = OpenStreetMap(lat=centerlatitude, lng=centerlongitude, zoom_start=12)
        rehearsal_studios = [r for r in records if 'Studio de répétition' in r['fields']['Type de Lieu']]
        cafes_concert = [r for r in records if 'Café Concert' in r['fields']['Type de Lieu']]

        osm_map.create_layer(location_list=rehearsal_studios, layer_name="Studio de répétition", color="purple")
        osm_map.create_layer(location_list=cafes_concert, layer_name="Café Concert", color="black")

        # Define file paths
        map_filepath = "static/osm_map.html"
        mdx_filepath = "docs/fonctionnement/osm_map.mdx"
        last_update = datetime.now(paris_tz).strftime("%Y-%m-%d %H:%M:%S %z")
        map_file_url = "/osm_map.html"

        # Save map HTML and MDX
        osm_map.save_html(map_filepath)
        OpenStreetMap.create_mdx_file(mdx_filepath, last_update, map_file_url)

if __name__ == '__main__':
    try:
        OpenStreetMap.process_location_maps()
    except Exception as error:
        logger.exception("An exception occurred:")
        logger.error("On LocationMap:", error)
