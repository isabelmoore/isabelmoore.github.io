import matplotlib.pyplot as plt

# Define the HSL color saturation and lightness values
# The hue-color is set to 18 as per the CSS example.
hue_color = 18

colors = {
    'First Color': (hue_color, 69, 61),            # hsl(var(--hue-color), 69%, 61%)
    'First Color Second': (hue_color, 35, 61),     # hsl(var(--hue-color), 35%, 61%)
    'First Color Alt': (hue_color, 27, 57),        # hsl(var(--hue-color), 27%, 57%)
    'First Color Lighter': (hue_color, 92, 85),    # hsl(var(--hue-color), 92%, 85%)
    'Title Color': (hue_color, 8, 15),             # hsl(var(--hue-color), 8%, 15%)
    'Text Color': (hue_color, 8, 45),              # hsl(var(--hue-color), 8%, 45%)
    'Text Color Light': (hue_color, 8, 65),        # hsl(var(--hue-color), 8%, 65%)
    'Input Color': (hue_color, 70, 96),            # hsl(var(--hue-color), 70%, 96%)
    'Body Color': (hue_color, 60, 99),             # hsl(var(--hue-color), 60%, 99%)
    'Scroll Bar Color': (hue_color, 12, 90),       # hsl(var(--hue-color), 12%, 90%)
    'Scroll Thumb Color': (hue_color, 12, 80)      # hsl(var(--hue-color), 12%, 80%)
}

# Example function to convert HSL to RGB
def hsl_to_rgb(h, s, l):
    s /= 100
    l /= 100
    c = (1 - abs(2 * l - 1)) * s
    x = c * (1 - abs((h / 60) % 2 - 1))
    m = l - c / 2
    if 0 <= h < 60:
        r, g, b = c, x, 0
    elif 60 <= h < 120:
        r, g, b = x, c, 0
    elif 120 <= h < 180:
        r, g, b = 0, c, x
    elif 180 <= h < 240:
        r, g, b = 0, x, c
    elif 240 <= h < 300:
        r, g, b = x, 0, c
    elif 300 <= h < 360:
        r, g, b = c, 0, x
    else:
        r, g, b = 0, 0, 0
    r, g, b = (r + m) * 255, (g + m) * 255, (b + m) * 255
    return int(r), int(g), int(b)

# Print the colors in RGB format
for name, (h, s, l) in colors.items():
    rgb = hsl_to_rgb(h, s, l)
    print(f"{name}: HSL({h}, {s}%, {l}%) -> RGB{rgb}")

# Plotting


from colorsys import rgb_to_hsv


def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def adjust_to_peach(hex_color):
    r, g, b = hex_to_rgb(hex_color)
    # Convert RGB to HSL to adjust hue
    r, g, b = r / 255.0, g / 255.0, b / 255.0
    h, s, l = rgb_to_hsv(r, g, b)
    # Replace the hue with peach (30°) while keeping saturation and lightness
    peach_r, peach_g, peach_b = [int(c * 255) for c in rgb_to_hsv(30 / 360, s, l)]
    return f"#{peach_r:02x}{peach_g:02x}{peach_b:02x}"

# Colors to adjust
blue_colors = {
    "light-blue": "#6bf0ff",
    "aqua": "#a7ffee",
    "teal": "#54b8aa",
    "cyan": "#39c6d6",
    "blue": "#23f0ff",
    "bright-blue": "#23f0ff",
}

# Adjust blue tones to peach tones
peach_colors = {name: adjust_to_peach(hex_color) for name, hex_color in blue_colors.items()}
print(peach_colors)


# Plotting
fig, ax = plt.subplots(figsize=(10, 5))
y_pos = list(range(len(colors)))
names = list(colors.keys())

for i, (name, (h, s, l)) in enumerate(colors.items()):
    rgb = hsl_to_rgb(h, s, l)
    color = [c / 255 for c in rgb]
    ax.barh(i, 1, color=color, edgecolor='black')
    ax.text(0.5, i, name, va='center', ha='center', fontsize=10, color='white')

ax.set_xlim(0, 1)
ax.set_yticks(y_pos)
ax.set_yticklabels([])
ax.set_title("CSS Colors in HSL converted to RGB")
plt.tight_layout()
plt.show()