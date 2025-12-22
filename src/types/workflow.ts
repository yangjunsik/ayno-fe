export type ToolCategory = 'AI Tools' | 'Visual Tools' | 'Video Tools';

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
}

export const TOOL_ITEMS: ToolItem[] = [
  { id: 'gpt', name: 'Chat GPT', category: 'AI Tools' },
  { id: 'claude', name: 'Claude', category: 'AI Tools' },
  { id: 'perplexity', name: 'Perplexity', category: 'AI Tools' },
  { id: 'midjourney', name: 'Midjourney', category: 'AI Tools' },
  { id: 'figma', name: 'Figma', category: 'Visual Tools' },
  { id: 'illustrator', name: 'Illustrator', category: 'Visual Tools' },
  { id: 'photoshop', name: 'Photoshop', category: 'Visual Tools' },
  { id: 'premiere', name: 'Premiere Pro', category: 'Video Tools' },
  { id: 'capcut', name: 'CapCut', category: 'Video Tools' },
];

export type BlockType = 'h1' | 'h2' | 'body' | 'bullet' | 'prompt' | 'image';

export interface BlockData {
  id: string;       
  type: BlockType;   
  content: string;  
  file?: File;      
}

export interface NodeData {
  label: string;
  stepLabel?: string;
  blocks: BlockData[]; 
}