#!/usr/bin/env python3
"""
Fix 1-4.png and 1-2.png domino images with correct rotations
"""

import os
from PIL import Image

def fix_specific_dominoes():
    dominoes_dir = "assets/img/dominoes"
    fixes = {
        "1-4.png": 90,   # Rotate 90 degrees to the left
        "1-2.png": -90   # Rotate 90 degrees to the right (negative = clockwise)
    }
    for filename, rotation in fixes.items():
        filepath = os.path.join(dominoes_dir, filename)
        if os.path.exists(filepath):
            try:
                with Image.open(filepath) as img:
                    print(f"Rotating {filename} by {rotation} degrees...")
                    rotated_img = img.rotate(rotation, expand=True)
                    rotated_img.save(filepath, "PNG")
                    print(f"✓ Successfully fixed {filename}")
            except Exception as e:
                print(f"✗ Error processing {filename}: {e}")
        else:
            print(f"✗ File not found: {filename}")

if __name__ == "__main__":
    fix_specific_dominoes() 