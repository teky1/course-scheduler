// Converts a hex color (e.g. "#FF00CC" or "FF00CC") to an [R, G, B] tuple.
function hexToRgb(hex: string): [number, number, number] {
    // Remove '#' if present
    hex = hex.replace(/^#/, "");
    if (hex.length !== 6) {
      throw new Error("Hex color must be 6 characters long.");
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
  }
  
  // Converts an [R, G, B] tuple to a hex color string.
  function rgbToHex(rgb: [number, number, number]): string {
    return (
      "#" +
      rgb
        .map((channel) => channel.toString(16).padStart(2, "0"))
        .join("")
    );
  }
  
  // Define an interface for a gradient stop
export interface GradientStop {
    color: string;    // Hex color string, e.g., "#FF0000"
    percent: number;  // Position in the gradient (e.g., 0 to 100)
  }

// Given a gradient (list of stops) and a position, returns the interpolated hex color.
export function getGradientColor(gradient: GradientStop[], position: number): string {
    // Sort the gradient by percentage
    gradient = gradient.sort((a, b) => a.percent - b.percent);
  
    // Clamp the position to the gradient bounds
    if (position <= gradient[0].percent) {
      return gradient[0].color;
    }
    if (position >= gradient[gradient.length - 1].percent) {
      return gradient[gradient.length - 1].color;
    }
  
    // Find the two stops that bracket the position
    let lowerStop: GradientStop | null = null;
    let upperStop: GradientStop | null = null;
    for (let i = 0; i < gradient.length - 1; i++) {
      if (position >= gradient[i].percent && position <= gradient[i + 1].percent) {
        lowerStop = gradient[i];
        upperStop = gradient[i + 1];
        break;
      }
    }
  
    if (!lowerStop || !upperStop) {
      throw new Error("Position is out of the bounds of the gradient stops.");
    }
  
    // Calculate the interpolation factor (0 to 1)
    const t = (position - lowerStop.percent) / (upperStop.percent - lowerStop.percent);
  
    // Convert hex colors to RGB tuples
    const rgb1 = hexToRgb(lowerStop.color);
    const rgb2 = hexToRgb(upperStop.color);
  
    // Interpolate each RGB component
    const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * t);
    const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * t);
    const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * t);
  
    return rgbToHex([r, g, b]);
  }

  export function remapHueEvenly(hue: number): number {
    // Normalize original hue to [0, 1]
    const normalized = (hue % 360) / 360;
  
    // Define evenly distributed color "segments"
    const colorCount = 6; // red, orange, yellow, green, blue, purple
    const segment = Math.floor(normalized * colorCount);
    const withinSegment = (normalized * colorCount) % 1;
  
    // Map to equal-sized hue slices
    const evenHue = segment * (360 / colorCount) + withinSegment * (360 / colorCount);
    return evenHue;
  }

  export const textGradient: GradientStop[] = [
    { color: "#cc6666", percent: 20 },
    { color: "#cccc66", percent: 70 },
    { color: "#66cc66", percent: 90 },
  ];

  export const backgroundGradient: GradientStop[] = [
    { color: "#a14545", percent: 30 },
    { color: "#8e9140", percent: 60 },
    { color: "#45a147", percent: 80 },
  ];
  