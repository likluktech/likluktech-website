import os, re

html_dir = r'C:\Users\THINK09\WorkBuddy\20260329093252\likluktech'
html_files = [f for f in os.listdir(html_dir) if f.endswith('.html')]

for hfile in html_files:
    fpath = os.path.join(html_dir, hfile)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = re.sub(r'(images/[^"]+?)\.png', r'\1.jpg', content)
    
    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated: {hfile}')
    else:
        print(f'No change: {hfile}')

print('Done.')
