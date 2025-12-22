import { useMemo, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { type Node, type Edge, getIncomers, getOutgoers } from '@xyflow/react';
import type { NodeData, BlockData } from '../../types/workflow';

const EditorContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px 120px;
`;

const MainTitleInput = styled.input`
  width: 100%;
  font-size: 36px;
  font-weight: 800;
  border: none;
  outline: none;
  margin-bottom: 60px;
  color: #111;
  &::placeholder { color: #d1d5db; }
`;

const StepWrapper = styled.div`
  margin-bottom: 50px;
  position: relative;
  cursor: text;
`;

const StepHeader = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: flex-start; 
  gap: 4px; 
  margin-bottom: 12px; 
  position: relative; 
  z-index: 1;
  cursor: default;
`;

const StepLabel = styled.div`
  font-size: 14px;
  color: #9ca3af;
  font-weight: 500;
  background: #fff;
  padding-right: 8px;
`;

const ToolName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #111;
  margin: 0;
`;

const StepBody = styled.div`
  padding-left: 24px; 
  display: flex;
  flex-direction: column;
  gap: 2px; 
`;

const ImageBlockWrapper = styled.div`
  margin-top: 8px; 
  margin-bottom: 8px;
  padding: 20px; 
  background: #f8f9fa;
  border: 2px dashed #ddd; 
  border-radius: 8px; 
  text-align: center; 
  cursor: pointer;
  transition: all 0.2s;
  &:hover { border-color: #000; background: #f0f0f0; }
  img { max-width: 100%; border-radius: 4px; }
`;

const PromptWrapper = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PromptSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PromptLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #555;
  border-left: 3px solid #444; 
  padding-left: 10px;
  line-height: 1.2;
`;

const NotionCodeBlock = styled.div`
  background-color: #f7f6f3;
  border-radius: 4px;
  padding: 16px;
  
  margin-left: 14px; 
  
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #37352f;
  transition: box-shadow 0.2s;
  &:focus-within {
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  border: none;
  background: transparent;
  resize: none;
  outline: none;
  padding: 0;
  min-height: 24px;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  line-height: inherit;
  &::placeholder { color: #999; opacity: 0.6; }
`;

const ContentBlock = styled.div<{ type: string; isLast: boolean }>`
  padding: 4px 0;
  outline: none; 
  min-height: 24px; 
  font-size: 16px; 
  line-height: 1.6; 
  color: #374151; 
  white-space: pre-wrap;

  &:hover, &:focus { background: #f9fafb; border-radius: 4px; }
  
  ${props => props.isLast && `
    &:empty:before { content: '내용을 입력하세요...'; color: #d1d5db; pointer-events: none; }
  `}

  ${props => props.type === 'h1' && `font-size: 30px; font-weight: 800; margin-top: 20px; margin-bottom: 8px; line-height: 1.3; color: #111;`}
  ${props => props.type === 'h2' && `font-size: 24px; font-weight: 700; margin-top: 16px; margin-bottom: 8px; line-height: 1.3; color: #333;`}
  
  ${props => props.type === 'bullet' && `display: list-item; list-style-type: disc; margin-left: 36px;`}
`;

const BottomClickArea = styled.div`
  height: 60px; 
  cursor: text;
`;

const PlaceholderText = styled.div`
  color: #9ca3af; font-size: 14px; font-style: italic; padding: 20px 0; cursor: text;
`;


interface Props {
  sortedNodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  activeInfo: { nodeId: string; index: number } | null;
  onFocusBlock: (nodeId: string, blockIndex: number) => void;
  onChangeBlock: (nodeId: string, blockIndex: number, content: string) => void;
  onAddBlock: (nodeId: string, index: number, contentBefore: string, contentAfter: string) => void;
  onRemoveBlock: (nodeId: string, index: number) => void;
}

export default function WritingSection({ 
  sortedNodes, edges, selectedNodeId, activeInfo, 
  onFocusBlock, onChangeBlock, onAddBlock, onRemoveBlock 
}: Props) {
  
  const blockRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const autoResize = (target: HTMLTextAreaElement) => {
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
  };

  useEffect(() => {
    if (activeInfo) {
      const key = `${activeInfo.nodeId}-${activeInfo.index}`;
      const el = blockRefs.current[key];
      
      if (el) {
        requestAnimationFrame(() => {
          el.focus();
          if (el.isContentEditable) {
            const range = document.createRange();
            const sel = window.getSelection();
            try {
              range.selectNodeContents(el);
              range.collapse(false);
              sel?.removeAllRanges();
              sel?.addRange(range);
            } catch (e) {}
          }
        });
      }
    }
  }, [activeInfo]);

  const handleKeyDown = (e: React.KeyboardEvent, nodeId: string, index: number) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const currentContent = e.currentTarget.textContent || '';
      onAddBlock(nodeId, index, currentContent, '');
    }

    const currentText = e.currentTarget.textContent || '';
    if (e.key === 'Backspace' && currentText.trim() === '') {
      e.preventDefault();
      onRemoveBlock(nodeId, index);
    }
  };

  const handleBottomClick = (nodeId: string, blocks: BlockData[]) => {
    const lastIndex = blocks.length - 1;
    const lastBlock = blocks[lastIndex];

    if (lastBlock && lastBlock.type === 'body' && lastBlock.content === '') {
      onFocusBlock(nodeId, lastIndex);
    } else {
      onAddBlock(nodeId, -1, '', '');
    }
  };

  const visibleNodes = useMemo(() => {
    if (!selectedNodeId) return sortedNodes;
    const targetNode = sortedNodes.find(n => n.id === selectedNodeId);
    if (!targetNode) return sortedNodes;

    const ancestors = new Set<string>();
    const findAncestors = (curr: Node) => {
      const parents = getIncomers(curr, sortedNodes, edges);
      parents.forEach(p => { if (!ancestors.has(p.id)) { ancestors.add(p.id); findAncestors(p); } });
    };
    findAncestors(targetNode);

    const descendants = new Set<string>();
    const findDescendants = (curr: Node) => {
      const children = getOutgoers(curr, sortedNodes, edges);
      children.forEach(c => { if (!descendants.has(c.id)) { descendants.add(c.id); findDescendants(c); } });
    };
    findDescendants(targetNode);

    const lineageIds = new Set([...ancestors, targetNode.id, ...descendants]);
    return sortedNodes.filter(n => lineageIds.has(n.id));
  }, [sortedNodes, edges, selectedNodeId]);

  return (
    <EditorContainer>
      <MainTitleInput id="editor-top" placeholder="워크플로우 제목을 입력하세요" />

      {visibleNodes.map((node) => {
        const data = node.data as unknown as NodeData;
        const blocks = data.blocks || [];
        const stepDisplay = data.stepLabel?.replace(' ', '.') || 'Step.1';

        return (
          <StepWrapper 
            key={node.id} 
            id={`step-section-${node.id}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) handleBottomClick(node.id, blocks);
            }}
          >
            <StepHeader>
              <StepLabel>{stepDisplay}</StepLabel>
              <ToolName>{data.label}</ToolName>
            </StepHeader>

            <StepBody>
              {blocks.map((block, index) => {
                const isLastBlock = index === blocks.length - 1;

                if (block.type === 'image') {
                  return (
                    <ImageBlockWrapper key={block.id} onClick={() => onFocusBlock(node.id, index)}>
                      {block.content ? <img src={block.content} alt="Uploaded" /> : <div>클릭하여 이미지 업로드</div>}
                    </ImageBlockWrapper>
                  );
                }

                if (block.type === 'prompt') {
                  let inputVal = ''; let outputVal = '';
                  try { const parsed = JSON.parse(block.content); inputVal = parsed.input||''; outputVal = parsed.output||''; } catch(e) { inputVal=block.content; }
                  const updatePrompt = (t:any, v:any) => onChangeBlock(node.id, index, JSON.stringify({input: t==='input'?v:inputVal, output: t==='output'?v:outputVal}));

                  return (
                    <PromptWrapper key={block.id} onClick={() => onFocusBlock(node.id, index)}>
                      <PromptSection>
                        <PromptLabel>입력</PromptLabel>
                        <NotionCodeBlock>
                          <StyledTextarea 
                            value={inputVal} 
                            onChange={e=>{autoResize(e.target);updatePrompt('input',e.target.value)}} 
                            ref={r=>r&&autoResize(r)} 
                            placeholder="프롬프트를 입력하세요..."
                          />
                        </NotionCodeBlock>
                      </PromptSection>
                      <PromptSection>
                        <PromptLabel>출력</PromptLabel>
                        <NotionCodeBlock>
                          <StyledTextarea 
                            value={outputVal} 
                            onChange={e=>{autoResize(e.target);updatePrompt('output',e.target.value)}} 
                            ref={r=>r&&autoResize(r)} 
                            placeholder="예상 결과를 입력하세요..."
                          />
                        </NotionCodeBlock>
                      </PromptSection>
                    </PromptWrapper>
                  );
                }

                return (
                  <ContentBlock
                    key={block.id}
                    type={block.type}
                    contentEditable
                    suppressContentEditableWarning
                    isLast={isLastBlock}
                    ref={(el) => (blockRefs.current[`${node.id}-${index}`] = el)}
                    onKeyDown={(e) => handleKeyDown(e, node.id, index)}
                    onFocus={() => onFocusBlock(node.id, index)}
                    onBlur={(e) => onChangeBlock(node.id, index, e.currentTarget.innerText)}
                  >
                    {block.content}
                  </ContentBlock>
                );
              })}
              
              <BottomClickArea onClick={() => handleBottomClick(node.id, blocks)} />
            </StepBody>
          </StepWrapper>
        );
      })}

      {sortedNodes.length === 0 && (
        <PlaceholderText>👆 노드를 추가하면 작성 영역이 생깁니다.</PlaceholderText>
      )}
    </EditorContainer>
  );
}