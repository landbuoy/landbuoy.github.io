#!/usr/bin/env python3
"""
Batch rotate domino images 90 degrees to the left (counterclockwise)
"""

import os
from PIL import Image
import glob

def rotate_dominoes():
    # Path to dominoes directory
    dominoes_dir = "assets/img/dominoes"
    
    # Get all PNG files in the directory
    png_files = glob.glob(os.path.join(dominoes_dir, "*.png"))
    
    print(f"Found {len(png_files)} PNG files to rotate")
    
    # Process each PNG file
    for png_file in png_files:
        try:
            # Open the image
            with Image.open(png_file) as img:
                print(f"Rotating {os.path.basename(png_file)}...")
                
                # Rotate 90 degrees to the left (counterclockwise)
                rotated_img = img.rotate(90, expand=True)
                
                # Save the rotated image, overwriting the original
                rotated_img.save(png_file, "PNG")
                
                print(f"✓ Successfully rotated {os.path.basename(png_file)}")
                
        except Exception as e:
            print(f"✗ Error processing {os.path.basename(png_file)}: {e}")
    
    print("\nBatch rotation complete!")

if __name__ == "__main__":
    rotate_dominoes() 