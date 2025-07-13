#!/usr/bin/env python3
"""
Script to download bird songs from the bird recordings report.
Downloads 3 recordings per bird and organizes them in folders by bird name.
"""

import os
import re
import requests
import time
from pathlib import Path
from urllib.parse import urlparse

def extract_bird_recordings_from_report(report_path):
    """Extract bird names and their download URLs from the report."""
    with open(report_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by bird sections
    bird_sections = re.split(r'### (.+?)\n', content)[1:]  # Skip first empty section
    
    bird_recordings = {}
    
    for i in range(0, len(bird_sections), 2):
        if i + 1 < len(bird_sections):
            bird_name = bird_sections[i].strip()
            section_content = bird_sections[i + 1]
            
            # Extract download URLs
            download_urls = re.findall(r'Direct Audio: (https://xeno-canto\.org/\d+/download)', section_content)
            
            if download_urls:
                bird_recordings[bird_name] = download_urls[:3]  # Take first 3 recordings
    
    return bird_recordings

def sanitize_filename(name):
    """Convert bird name to a safe filename."""
    # Replace spaces and special characters
    safe_name = re.sub(r'[^\w\s-]', '', name)
    safe_name = re.sub(r'[-\s]+', '_', safe_name)
    return safe_name.lower()

def download_file(url, filepath):
    """Download a file from URL to filepath."""
    try:
        response = requests.get(url, stream=True, timeout=30)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

def main():
    # Get the directory where this script is located
    script_dir = Path(__file__).parent
    report_path = script_dir / "bird_recordings_report_20250712_170852.md"
    
    if not report_path.exists():
        print(f"Report file not found: {report_path}")
        return
    
    # Extract bird recordings from report
    print("Extracting bird recordings from report...")
    bird_recordings = extract_bird_recordings_from_report(report_path)
    
    print(f"Found {len(bird_recordings)} birds with recordings")
    
    # Create base directory for downloads
    downloads_dir = script_dir / "downloads"
    downloads_dir.mkdir(exist_ok=True)
    
    # Download recordings for each bird
    for bird_name, urls in bird_recordings.items():
        print(f"\nProcessing {bird_name}...")
        
        # Create bird directory
        bird_dir = downloads_dir / sanitize_filename(bird_name)
        bird_dir.mkdir(exist_ok=True)
        
        # Download each recording
        for i, url in enumerate(urls, 1):
            # Extract filename from URL
            parsed_url = urlparse(url)
            filename = f"{sanitize_filename(bird_name)}_recording_{i}.mp3"
            filepath = bird_dir / filename
            
            print(f"  Downloading recording {i}/3: {filename}")
            
            if download_file(url, filepath):
                print(f"    ✓ Downloaded successfully")
            else:
                print(f"    ✗ Download failed")
            
            # Small delay to be respectful to the server
            time.sleep(1)
    
    print(f"\nDownload complete! Files saved to: {downloads_dir}")

if __name__ == "__main__":
    main() 