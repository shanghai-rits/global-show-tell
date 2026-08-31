#!/usr/bin/env python3
"""
Extract CSS from static HTML files to separate CSS files
"""
import re
import os

# Files to process
files = ['calendar', 'events', 'collaboration', 'about', 'opencall']

os.makedirs('public/styles', exist_ok=True)

for filename in files:
    html_path = f'src/{filename}.html'
    css_path = f'public/styles/{filename}.css'
    
    print(f"\n{'='*60}")
    print(f"Processing: {filename}.html")
    print(f"{'='*60}")
    
    # Read HTML file
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Find all <style> blocks
    style_blocks = re.findall(r'<style>(.*?)</style>', html, re.DOTALL)
    
    if not style_blocks:
        print(f"⚠️  No <style> blocks found in {filename}.html")
        continue
    
    print(f"Found {len(style_blocks)} <style> block(s)")
    
    # Combine all CSS blocks
    combined_css = '\n\n'.join(style_blocks)
    
    # Write to CSS file
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(f"/* ========================================\n")
        f.write(f"   {filename.upper()}.HTML - Extracted CSS\n")
        f.write(f"   ======================================== */\n\n")
        f.write(combined_css)
    
    css_size = len(combined_css)
    print(f"✅ Extracted {css_size} characters to {css_path}")
    
    # Remove <style> blocks from HTML
    html_modified = re.sub(r'\s*<style>.*?</style>\s*', '\n', html, flags=re.DOTALL)
    
    # Find <head> section and add CSS link
    # Look for the last <link> or <script> in head before adding our link
    head_end = html_modified.find('</head>')
    if head_end == -1:
        print(f"❌ Could not find </head> tag in {filename}.html")
        continue
    
    # Find a good place to insert (after last <link> or before </head>)
    last_link = html_modified.rfind('<link', 0, head_end)
    if last_link != -1:
        # Find end of that link tag
        insert_pos = html_modified.find('>', last_link) + 1
    else:
        # Find last <script> before </head>
        last_script_end = html_modified.rfind('</script>', 0, head_end)
        if last_script_end != -1:
            insert_pos = last_script_end + 9  # len('</script>')
        else:
            insert_pos = head_end
    
    # Insert CSS link
    css_link = f'\n    <link rel="stylesheet" href="/styles/{filename}.css">\n'
    html_modified = html_modified[:insert_pos] + css_link + html_modified[insert_pos:]
    
    # Write modified HTML
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_modified)
    
    print(f"✅ Updated {filename}.html with CSS link")
    print(f"   Removed {len(style_blocks)} <style> block(s)")

print(f"\n{'='*60}")
print("✅ All CSS extraction complete!")
print(f"{'='*60}")
print("\nCreated CSS files:")
for filename in files:
    css_path = f'public/styles/{filename}.css'
    if os.path.exists(css_path):
        size = os.path.getsize(css_path)
        print(f"  - {css_path} ({size:,} bytes)")
