import urllib.request
import ssl
import sys

url = "https://www.emsd.gov.hk/filemanager/en/content_650/dataset/registered_vehicle_maintenance_workshops.csv"
output_path = "public/garages.csv"

print(f"Downloading from {url}...")

try:
    # Create an SSL context that ignores certificate errors (sometimes needed for older gov sites or specific envs)
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    req = urllib.request.Request(
        url, 
        data=None, 
        headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
        }
    )

    with urllib.request.urlopen(req, context=ctx) as response:
        data = response.read()
        with open(output_path, "wb") as f:
            f.write(data)
    
    print(f"Successfully downloaded to {output_path}")
    print(f"File size: {len(data)} bytes")

except Exception as e:
    print(f"Error downloading file: {e}")
    sys.exit(1)
