import json
import os
import requests
from pyairtable import Api
from dotenv import load_dotenv

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()

# Configuration Airtable avec des variables d'environnement
API_KEY = os.getenv('AIRTABLE_API_TOKEN')
BASE_ID = os.getenv('AIRTABLE_BASE_ID')
COLLECTIFS_TABLE_NAME = 'Collectifs Musicaux'
LINEUPS_TABLE_NAME = 'Lineups'

# Vérification des variables d'environnement
if not API_KEY or not BASE_ID:
    raise ValueError("Les variables d'environnement AIRTABLE_API_KEY et AIRTABLE_BASE_ID doivent être définies dans le fichier .env")

# Initialisation de l'API Airtable
api = Api(API_KEY)
collectifs_table = api.table(BASE_ID, COLLECTIFS_TABLE_NAME)
lineups_table = api.table(BASE_ID, LINEUPS_TABLE_NAME)

# Création du dossier pour les images si non existant
os.makedirs('static/images', exist_ok=True)

def download_image(url, filename):
    """Télécharge une image depuis une URL et la sauvegarde localement."""
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        with open(filename, 'wb') as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)
        return filename
    except requests.RequestException as e:
        print(f"Erreur lors du téléchargement de {url}: {e}")
        return None

def fetch_collectifs():
    """Récupère les données des collectifs depuis Airtable."""
    return collectifs_table.all(view="Liste des collectifs non archivés")

def fetch_lineups():
    """Récupère les données des lineups depuis Airtable."""
    return lineups_table.all(view="Lineups non archivés")

def main():
    # Récupération des collectifs et des lineups
    collectifs_records = fetch_collectifs()
    lineups_records = fetch_lineups()
    
    # Organisation des données pour chaque collectif
    data = {}
    for collectif in collectifs_records:
        collectif_id = collectif['id']
        fields = collectif['fields']
        
        # Vérifie si une illustration est présente
        illustration_url = fields.get("Illustration", [{}])[0].get("url")
        if illustration_url:
            # Définit le chemin de fichier local pour l'image
            local_image_path = f"static/img/collectifs/{collectif_id}.jpg"
            # Télécharge l'image et met à jour l'URL si le téléchargement réussit
            if download_image(illustration_url, local_image_path):
                illustration_url = f"/img/collectifs/{collectif_id}.jpg"
                print(f"local image ajoutée ou mise à jour {local_image_path}")

        data[collectif_id] = {
            "intitule": fields.get("Intitulé"),
            "intitule_court": fields.get("Intitulé court"),
            "pseudo_zap": fields.get("Pseudo ZAP (from REF responsable)"),
            "jam_description": fields.get("Jam description"),
            "illustration_url": illustration_url,  # Met à jour avec le chemin local
            "discord_presentation_url": fields.get("discord_presentation_url"),
            "recrutement_permanent": fields.get("Recrutement permanent", False),
            "lineups": []
        }

    # Organisation des lineups par collectif
    for lineup in lineups_records:
        fields = lineup['fields']
        lineup_data = {
            "intitule_long": fields.get("intitulé long"),
            "intitule_court": fields.get("intitulé court"),
            "referent_pseudo_zap": fields.get("Rollup Référent Pseudo ZAP"),
            "prenoms_membres": ", ".join(sorted(fields.get("Prénoms des Membres", []))),
            "style_musique": ", ".join(fields.get("Style(s) de musique", [])),  # Les styles de musique séparés par des virgules
            "phrase_accroche": fields.get("Phrase d’accroche"),
            "description": fields.get("Description")
        }
        
        # Vérifie si le lineup est associé à un collectif
        collectif_id = fields.get("REF Collectif")
        if collectif_id:
            if isinstance(collectif_id, list):  # Si REF Collectif est une liste d'ID, prendre le premier
                collectif_id = collectif_id[0]
            if collectif_id in data:
                data[collectif_id]["lineups"].append(lineup_data)

    # Sauvegarde des données dans un fichier JSON
    with open('static/collectifs_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print("Données écrites dans le fichier collectifs_data.json")

if __name__ == "__main__":
    main()
