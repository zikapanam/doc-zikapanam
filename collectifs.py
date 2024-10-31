import json
import os
from pyairtable import Api
from dotenv import load_dotenv

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()

# Configuration Airtable avec des variables d'environnement
API_KEY = os.getenv('AIRTABLE_API_KEY')
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
        
        data[collectif_id] = {
            "intitule": fields.get("Intitulé"),
            "intitule_court": fields.get("Intitulé court"),
            "pseudo_zap": fields.get("Pseudo ZAP (from REF responsable)"),
            "jam_description": fields.get("Jam description"),
            "illustration_url": fields.get("Illustration", [{}])[0].get("url"),
            "discord_presentation_url": fields.get("discord_presentation_url"),
            "recrutement_permanent": fields.get("Recrutement permanent", False),  # Champ ajoutée pour le recrutement permanent
            "lineups": []
        }

    # Organisation des lineups par collectif
    for lineup in lineups_records:
        fields = lineup['fields']
        lineup_data = {
            "intitule_long": fields.get("intitulé long"),
            "intitule_court": fields.get("intitulé court"),
            "referent_pseudo_zap": fields.get("Rollup Référent Pseudo ZAP"),
            "style_musique": fields.get("Style(s) de musique"),
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
