import styled from '@emotion/styled';
import { 
  SiOpenai, SiFigma, SiAdobeillustrator, SiAdobephotoshop, 
  SiAdobepremierepro 
} from 'react-icons/si';
import { FaRobot, FaVideo, FaSearch, FaPaintBrush } from 'react-icons/fa';
import { TOOL_ITEMS, type ToolCategory } from '../../types/workflow';

const SidebarContainer = styled.aside`
  position: absolute;
  top: 0; left: 0; bottom: 0; 
  width: 260px;
  background: #fff;
  border-right: 1px solid #e0e0e0;
  padding: 24px 16px;
  z-index: 10;
  overflow-y: auto;
  box-shadow: 4px 0 12px rgba(0,0,0,0.02);
`;

const MainTitle = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: #111;
  margin-bottom: 24px;
  padding-left: 4px;
`;

const CategoryGroup = styled.div`
  margin-bottom: 28px;
`;

const CategoryTitle = styled.h4`
  font-size: 12px;
  font-weight: 700;
  color: #999;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding-left: 4px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const ToolItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 8px;
  background: #f8f9fa;
  border: 1px solid #eee;
  border-radius: 12px;
  cursor: grab;
  transition: all 0.2s;

  &:hover {
    background: #fff;
    border-color: #000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }
  
  &:active { cursor: grabbing; }

  .icon { font-size: 24px; color: #555; }
  .name { font-size: 12px; font-weight: 600; color: #333; text-align: center; }
`;

const categories: ToolCategory[] = ['AI Tools', 'Visual Tools', 'Video Tools'];

const getSidebarIcon = (id: string) => {
  switch(id) {
    case 'gpt': return <SiOpenai />;
    case 'claude': return <FaRobot />;
    case 'perplexity': return <FaSearch />;
    case 'midjourney': return <FaPaintBrush />;
    case 'figma': return <SiFigma />;
    case 'illustrator': return <SiAdobeillustrator />;
    case 'photoshop': return <SiAdobephotoshop />;
    case 'premiere': return <SiAdobepremierepro />;
    case 'capcut': return <FaVideo />;
    default: return <FaRobot />;
  }
};

export default function SidebarTools() {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <SidebarContainer>
      <MainTitle>Workflow Tools</MainTitle>
      {categories.map((cat) => (
        <CategoryGroup key={cat}>
          <CategoryTitle>{cat}</CategoryTitle>
          <GridContainer>
            {TOOL_ITEMS.filter(t => t.category === cat).map(tool => (
              <ToolItem
                key={tool.id}
                draggable
                onDragStart={(e) => onDragStart(e, 'toolNode', tool.name)}
              >
                <div className="icon">{getSidebarIcon(tool.id)}</div>
                <div className="name">{tool.name}</div>
              </ToolItem>
            ))}
          </GridContainer>
        </CategoryGroup>
      ))}
    </SidebarContainer>
  );
}