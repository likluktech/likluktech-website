"""
批量压缩图片：PNG → JPG（质量85，保持高画质）
目标：将网站图片从 ~174MB 压缩到 25MB 以内
"""
import os
from PIL import Image

src_dir = r"C:\Users\THINK09\WorkBuddy\20260329093252\likluktech\images"
total_before = 0
total_after = 0
converted = 0

for root, dirs, files in os.walk(src_dir):
    for fname in files:
        ext = fname.lower().split('.')[-1]
        if ext not in ('png', 'jpg', 'jpeg'):
            continue
        
        fpath = os.path.join(root, fname)
        size_before = os.path.getsize(fpath)
        total_before += size_before
        
        try:
            img = Image.open(fpath)
            
            # 转换为 RGB（PNG 可能有透明通道，JPG 不支持透明）
            if img.mode in ('RGBA', 'P', 'LA'):
                # 白色背景填充透明区域
                bg = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                bg.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                img = bg
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # 如果是 PNG，重命名为 jpg；如果已经是 jpg，就地压缩
            if ext == 'png':
                new_path = fpath[:-4] + '.jpg'
                img.save(new_path, 'JPEG', quality=85, optimize=True)
                os.remove(fpath)  # 删除原 PNG
                saved_path = new_path
            else:
                img.save(fpath, 'JPEG', quality=85, optimize=True)
                saved_path = fpath
            
            size_after = os.path.getsize(saved_path)
            total_after += size_after
            converted += 1
            
            print(f"OK {fname}: {size_before/1024/1024:.1f}MB -> {size_after/1024/1024:.1f}MB")
        
        except Exception as e:
            print(f"FAIL {fname}: {e}")
            total_after += size_before  # 失败的按原大小计

print(f"\n{'='*50}")
print(f"Total: {converted} images")
print(f"Before: {total_before/1024/1024:.1f} MB")
print(f"After:  {total_after/1024/1024:.1f} MB")
print(f"Saved:  {(total_before-total_after)/1024/1024:.1f} MB ({(1-total_after/total_before)*100:.0f}%)")
