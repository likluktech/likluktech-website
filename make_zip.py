import zipfile, os

src = r'C:\Users\THINK09\WorkBuddy\20260329093252\likluktech'
dst = r'C:\Users\THINK09\WorkBuddy\20260329093252\likluktech-website-v2.zip'

total = 0
with zipfile.ZipFile(dst, 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(src):
        for file in files:
            fp = os.path.join(root, file)
            arcname = os.path.relpath(fp, src)
            zf.write(fp, arcname)
            total += os.path.getsize(fp)

zip_size = os.path.getsize(dst)
print(f'Done! Source: {total/1024/1024:.1f} MB -> ZIP: {zip_size/1024/1024:.1f} MB')
