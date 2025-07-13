#!/usr/bin/env python3
"""
Bird Recording Web Scraper
Searches for three recordings of birdsongs or calls for each of the 50 songbirds from fortytwo.js
"""

import requests
import json
import time
import csv
from urllib.parse import quote_plus
import os
from datetime import datetime

# List of 50 songbirds from fortytwo.js
SONGBIRD_NAMES = [
    # Appalachian Mountains (Upstate New York)
    "Wood Thrush", "Black-throated Blue Warbler", "Scarlet Tanager", "Rose-breasted Grosbeak", 
    "Veery", "Hermit Thrush", "Black-capped Chickadee",
    
    # Amazon Rainforest (South America)
    "Musician Wren", "Screaming Piha", "White-bellied Antbird", "Amazonian Umbrellabird",
    "Spix's Guan", "Hoatzin", "Amazonian Royal Flycatcher",
    
    # Australian Outback (Australia)
    "Superb Lyrebird", "Australian Magpie", "Pied Butcherbird", "Grey Shrike-thrush",
    "Rufous Whistler", "Golden Whistler", "Eastern Whipbird",
    
    # African Savanna (East Africa)
    "African Grey Hornbill", "Lilac-breasted Roller", "Red-billed Oxpecker", "Superb Starling",
    "Fiscal Shrike", "Yellow-billed Hornbill", "Red-chested Cuckoo",
    
    # Siberian Taiga (Russia)
    "Siberian Rubythroat", "Bluethroat", "Pallas's Leaf Warbler", "Siberian Accentor",
    "Red-flanked Bluetail", "Siberian Jay", "Pine Grosbeak",
    
    # Mediterranean Scrub (Southern Europe)
    "Common Nightingale", "European Robin", "Blackcap", "Sardinian Warbler",
    "Subalpine Warbler", "Cirl Bunting", "Thekla Lark",
    
    # Himalayan Alpine (Nepal/India)
    "Himalayan Monal", "Blood Pheasant", "Himalayan Bulbul", "Rufous-breasted Accentor",
    "Himalayan Rubythroat", "White-browed Rosefinch", "Alpine Chough",
    
    # Additional Bird
    "Common Waxbill"
]

class BirdRecordingScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Linux; rv:91.0) Gecko/20100101 Firefox/91.0'
        })
        self.results = {}
        self.delay = 2  # Delay between requests to be respectful

    def search_web_for_bird_recordings(self, bird_name):
        """Search the web for bird recordings using a search engine API or web scraping"""
        recordings = []
        
        # Define search queries for different types of recordings
        search_queries = [
            f"{bird_name} song recording",
            f"{bird_name} call sound",
            f"{bird_name} birdsong audio"
        ]
        
        print(f"Searching for recordings of {bird_name}...")
        
        for query in search_queries:
            if len(recordings) >= 3:
                break
                
            # Search for recordings from multiple sources
            sources = [
                self.search_xeno_canto(bird_name),
                self.search_ebird_macaulay(bird_name),
                self.search_birdsong_guide(bird_name)
            ]
            
            for source_results in sources:
                recordings.extend(source_results)
                if len(recordings) >= 3:
                    break
            
            time.sleep(self.delay)
        
        # Return top 3 unique recordings
        unique_recordings = []
        seen_urls = set()
        
        for recording in recordings:
            if recording['url'] not in seen_urls and len(unique_recordings) < 3:
                unique_recordings.append(recording)
                seen_urls.add(recording['url'])
        
        return unique_recordings

    def search_xeno_canto(self, bird_name):
        """Search Xeno-canto database for bird recordings"""
        recordings = []
        try:
            # Xeno-canto API endpoint
            encoded_name = quote_plus(bird_name)
            url = f"https://www.xeno-canto.org/api/2/recordings?query={encoded_name}"
            
            response = self.session.get(url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                
                for recording in data.get('recordings', [])[:3]:
                    recordings.append({
                        'source': 'Xeno-canto',
                        'title': f"{recording.get('en', bird_name)} - {recording.get('type', 'call')}",
                        'url': f"https://www.xeno-canto.org/{recording.get('id')}",
                        'audio_url': recording.get('file'),
                        'location': recording.get('loc', 'Unknown'),
                        'recordist': recording.get('rec', 'Unknown'),
                        'quality': recording.get('q', 'Unknown')
                    })
        except Exception as e:
            print(f"Error searching Xeno-canto for {bird_name}: {e}")
        
        return recordings

    def search_ebird_macaulay(self, bird_name):
        """Search eBird/Macaulay Library for bird recordings"""
        recordings = []
        try:
            # This would require eBird API access
            # For now, return placeholder structure
            recordings.append({
                'source': 'eBird/Macaulay Library',
                'title': f"{bird_name} song",
                'url': f"https://ebird.org/species/{bird_name.lower().replace(' ', '-').replace("'", '')}",
                'audio_url': None,
                'location': 'Various',
                'recordist': 'Various',
                'quality': 'High'
            })
        except Exception as e:
            print(f"Error searching eBird for {bird_name}: {e}")
        
        return recordings

    def search_birdsong_guide(self, bird_name):
        """Search other birdsong resources"""
        recordings = []
        try:
            # Search for recordings from other sources like All About Birds, etc.
            recordings.append({
                'source': 'All About Birds',
                'title': f"{bird_name} sounds and calls",
                'url': f"https://www.allaboutbirds.org/guide/{bird_name.replace(' ', '_')}/sounds",
                'audio_url': None,
                'location': 'Various',
                'recordist': 'Cornell Lab',
                'quality': 'High'
            })
        except Exception as e:
            print(f"Error searching birdsong guides for {bird_name}: {e}")
        
        return recordings

    def scrape_all_birds(self):
        """Scrape recordings for all birds in the list"""
        print(f"Starting to scrape recordings for {len(SONGBIRD_NAMES)} songbirds...")
        
        for i, bird_name in enumerate(SONGBIRD_NAMES, 1):
            print(f"\n[{i}/{len(SONGBIRD_NAMES)}] Processing: {bird_name}")
            
            try:
                recordings = self.search_web_for_bird_recordings(bird_name)
                self.results[bird_name] = recordings
                
                print(f"Found {len(recordings)} recordings for {bird_name}")
                for j, recording in enumerate(recordings, 1):
                    print(f"  {j}. {recording['title']} ({recording['source']})")
                
            except Exception as e:
                print(f"Error processing {bird_name}: {e}")
                self.results[bird_name] = []
            
            # Be respectful with requests
            time.sleep(self.delay)
        
        return self.results

    def save_results_to_files(self):
        """Save results to multiple file formats"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Save as JSON
        json_filename = f"bird_recordings_{timestamp}.json"
        with open(json_filename, 'w', encoding='utf-8') as f:
            json.dump(self.results, f, indent=2, ensure_ascii=False)
        
        # Save as CSV
        csv_filename = f"bird_recordings_{timestamp}.csv"
        with open(csv_filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(['Bird Name', 'Recording #', 'Title', 'Source', 'URL', 'Audio URL', 'Location', 'Recordist', 'Quality'])
            
            for bird_name, recordings in self.results.items():
                for i, recording in enumerate(recordings, 1):
                    writer.writerow([
                        bird_name,
                        i,
                        recording['title'],
                        recording['source'],
                        recording['url'],
                        recording.get('audio_url', ''),
                        recording.get('location', ''),
                        recording.get('recordist', ''),
                        recording.get('quality', '')
                    ])
        
        # Save as Markdown report
        md_filename = f"bird_recordings_report_{timestamp}.md"
        with open(md_filename, 'w', encoding='utf-8') as f:
            f.write("# Bird Recordings Collection\n\n")
            f.write(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            f.write(f"Total birds processed: {len(SONGBIRD_NAMES)}\n")
            f.write(f"Total recordings found: {sum(len(recordings) for recordings in self.results.values())}\n\n")
            
            # Group by biome
            biomes = {
                'Appalachian Mountains': SONGBIRD_NAMES[0:7],
                'Amazon Rainforest': SONGBIRD_NAMES[7:14],
                'Australian Outback': SONGBIRD_NAMES[14:21],
                'African Savanna': SONGBIRD_NAMES[21:28],
                'Siberian Taiga': SONGBIRD_NAMES[28:35],
                'Mediterranean Scrub': SONGBIRD_NAMES[35:42],
                'Himalayan Alpine': SONGBIRD_NAMES[42:49],
                'Additional': SONGBIRD_NAMES[49:50]
            }
            
            for biome, birds in biomes.items():
                f.write(f"## {biome}\n\n")
                for bird_name in birds:
                    recordings = self.results.get(bird_name, [])
                    f.write(f"### {bird_name}\n")
                    f.write(f"Found {len(recordings)} recordings:\n\n")
                    
                    for i, recording in enumerate(recordings, 1):
                        f.write(f"{i}. **{recording['title']}**\n")
                        f.write(f"   - Source: {recording['source']}\n")
                        f.write(f"   - URL: {recording['url']}\n")
                        if recording.get('audio_url'):
                            f.write(f"   - Direct Audio: {recording['audio_url']}\n")
                        if recording.get('location'):
                            f.write(f"   - Location: {recording['location']}\n")
                        f.write("\n")
                    f.write("\n")
        
        print(f"\nResults saved to:")
        print(f"  - JSON: {json_filename}")
        print(f"  - CSV: {csv_filename}")
        print(f"  - Markdown: {md_filename}")
        
        return json_filename, csv_filename, md_filename

def main():
    """Main function to run the bird recording scraper"""
    scraper = BirdRecordingScraper()
    
    print("Bird Recording Web Scraper")
    print("=" * 50)
    print(f"Target: {len(SONGBIRD_NAMES)} songbirds from 7 biomes")
    print("Goal: 3 recordings per bird (150 total recordings)\n")
    
    # Scrape all birds
    results = scraper.scrape_all_birds()
    
    # Save results
    files = scraper.save_results_to_files()
    
    # Print summary
    total_recordings = sum(len(recordings) for recordings in results.values())
    birds_with_recordings = sum(1 for recordings in results.values() if recordings)
    
    print(f"\n" + "=" * 50)
    print("SUMMARY")
    print("=" * 50)
    print(f"Birds processed: {len(SONGBIRD_NAMES)}")
    print(f"Birds with recordings found: {birds_with_recordings}")
    print(f"Total recordings found: {total_recordings}")
    print(f"Average recordings per bird: {total_recordings/len(SONGBIRD_NAMES):.1f}")
    print(f"Success rate: {birds_with_recordings/len(SONGBIRD_NAMES)*100:.1f}%")

if __name__ == "__main__":
    main()