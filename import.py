import json
import os
import urllib.request
import re

output_txt_path = "/Users/cashify/.gemini/antigravity-ide/brain/bb9ad680-7f19-4367-a26b-5c7e3263a2dc/.system_generated/steps/18/output.txt"
workspace_dir = "/Users/cashify/Desktop/payout"
screens_dir = os.path.join(workspace_dir, "screens")

os.makedirs(screens_dir, exist_ok=True)

with open(output_txt_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

def clean_filename(title):
    s = title.lower()
    s = re.sub(r'[^a-z0-9]+', '_', s)
    return s.strip('_')

imported = []

for idx, screen in enumerate(data.get("screens", [])):
    title = screen.get("title", f"screen_{idx}")
    filename_base = clean_filename(title)
    
    html_url = screen.get("htmlCode", {}).get("downloadUrl")
    screenshot_url = screen.get("screenshot", {}).get("downloadUrl")
    
    html_path = os.path.join(screens_dir, f"{filename_base}.html")
    png_path = os.path.join(screens_dir, f"{filename_base}.png")
    
    print(f"Downloading HTML for: {title} -> {html_path}")
    if html_url:
        try:
            req = urllib.request.Request(html_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as resp, open(html_path, 'wb') as out:
                out.write(resp.read())
        except Exception as e:
            print(f"  Error downloading HTML: {e}")
            
    print(f"Downloading Screenshot for: {title} -> {png_path}")
    if screenshot_url:
        try:
            req = urllib.request.Request(screenshot_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as resp, open(png_path, 'wb') as out:
                out.write(resp.read())
        except Exception as e:
            print(f"  Error downloading screenshot: {e}")
            
    imported.append({
        "title": title,
        "id": screen.get("name"),
        "html_file": f"screens/{filename_base}.html",
        "screenshot_file": f"screens/{filename_base}.png",
        "width": screen.get("width"),
        "height": screen.get("height"),
        "deviceType": screen.get("deviceType")
    })

# Save summary json
summary_path = os.path.join(workspace_dir, "imported_screens.json")
with open(summary_path, 'w', encoding='utf-8') as f:
    json.dump(imported, f, indent=2)

print("Done importing screens!")
