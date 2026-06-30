import json
import urllib.request
import urllib.parse
import time

with open('src/data/forestsData.json', 'r') as f:
    data = json.load(f)

missing = []

for item in data:
    if 'customSummary' in item:
        continue # Already handled
        
    name = item['name']
    typ = item.get('type', '')
    if typ in name: typ = ''
    country = item.get('country', 'India')
    if 'India' not in country: country = 'India'
    
    query = f"{name} {typ} {country}".strip()
    url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&utf8=&format=json"
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode())
            
        results = res.get('query', {}).get('search', [])
        
        # Filter out "List of"
        valid_results = [r for r in results if not r['title'].lower().startswith('list of')]
        
        if valid_results:
            item['wikiTitle'] = valid_results[0]['title']
        else:
            missing.append(item['name'])
    except Exception as e:
        print(f"Error on {name}: {e}")
        missing.append(item['name'])
        
    time.sleep(0.1) # Be nice to Wiki API

with open('src/data/forestsData.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Entities with no valid Wikipedia page:", missing)
