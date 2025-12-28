
export interface ImageData {
  base64: string;
  mimeType: string;
}

export interface TransformationResult {
  imageUrl: string;
  description?: string;
}

export enum StylePreset {
  CYBERPUNK = 'Cyberpunk Villain',
  DARK_FANTASY = 'Dark Fantasy Overlord',
  CINEMATIC_NOIR = 'Cinematic Noir Antagonist',
  APOCALYPTIC = 'Post-Apocalyptic Raider',
  COSMIC_HORROR = 'Cosmic Space Villain'
}
