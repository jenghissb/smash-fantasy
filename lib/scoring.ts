export function scoreForPlacement(
  place: number | null | undefined
): number {

  if (!place) return 0;

  if (place === 1) return 550;
  if (place === 2) return 520;
  if (place === 3) return 490;
  if (place === 4) return 460;

  if (place < 7) return 430;
  if (place < 9) return 390;
  if (place < 13) return 350;
  if (place < 17) return 310;
  if (place < 25) return 270;
  if (place < 33) return 220;
  if (place < 49) return 170;
  if (place < 73) return 120;
  if (place < 97) return 60;

  return 0;
}
