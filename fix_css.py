with open('src/index.css', 'r') as f:
    lines = f.readlines()

dark_start = 58  # 0-indexed for line 59
light_start = 122 # 0-indexed for line 123
light_end = 183 # 0-indexed for line 184 (the line after `}`)

dark_block = lines[dark_start:light_start]
light_block = lines[light_start:light_end]

# Verify the blocks
if "DARK MODE" in dark_block[0] and "LIGHT MODE" in light_block[0]:
    new_lines = lines[:dark_start] + light_block + ['\n'] + dark_block + lines[light_end:]
    with open('src/index.css', 'w') as f:
        f.writelines(new_lines)
    print("Successfully swapped")
else:
    print(f"Error: Dark block start: {dark_block[0]}")
    print(f"Error: Light block start: {light_block[0]}")
