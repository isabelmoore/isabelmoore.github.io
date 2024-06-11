import matplotlib.pyplot as plt

def hsl_to_rgb(h, s, l):
    """Convert an HSL color to RGB."""
    h /= 360
    s /= 100
    l /= 100
    c = (1 - abs(2 * l - 1)) * s
    x = c * (1 - abs(h * 6 % 2 - 1))
    m = l - c/2
    r, g, b = (0, 0, 0)
    if h < 1/6:
        r, g, b = (c, x, 0)
    elif h < 2/6:
        r, g, b = (x, c, 0)
    elif h < 3/6:
        r, g, b = (0, c, x)
    elif h < 4/6:
        r, g, b = (0, x, c)
    elif h < 5/6:
        r, g, b = (x, 0, c)
    else:
        r, g, b = (c, 0, x)
    r, g, b = (r + m, g + m, b + m)
    return (r * 255, g * 255, b * 255)

# Define the HSL color saturation and lightness values
colors = {
    'First Color': (35, 61),
    'First Color Alt': (27, 57),
    'First Color Lighter': (92, 85),
    'Title Color': (8, 15),
    'Text Color': (8, 45),
    'Text Color Light': (8, 65),
    'Input Color': (70, 96),
    'Body Color': (60, 99),
    'Scroll Bar Color': (12, 90),
    'Scroll Thumb Color': (12, 80)
}

# Hue value
hue = 8

# Plotting
fig, ax = plt.subplots(figsize=(10, 5))
for i, (key, (s, l)) in enumerate(colors.items()):
    color = hsl_to_rgb(hue, s, l)
    ax.barh(key, 1, color=[c/255 for c in color], left=i)

ax.set_xlim(0, len(colors))
plt.show()
