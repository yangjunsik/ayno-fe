import { useState, useCallback, useRef, useMemo } from 'react';
import styled from '@emotion/styled';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  getOutgoers,
  reconnectEdge,
  type Connection,
  type Edge,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ToolNode from '../components/workflow/ToolNode';
import SidebarTools from '../components/workflow/SidebarTools';
import WritingSection from '../components/editor/WritingSection';
import FloatingToolbar from '../components/editor/FloatingToolbar';
import ScrollTopButton from '../components/common/ScrollTopButton';
import FullScreenButton from '../components/common/FullScreenButton';
import CustomConnectionLine from '../components/workflow/CustomConnectionLine';

import type { BlockData, BlockType } from '../types/workflow';


const PageContainer = styled.div`display: flex; flex-direction: column; height: 100vh; overflow: hidden;`;
const TopSection = styled.div<{ isFullScreen: boolean }>`height: ${({ isFullScreen }) => (isFullScreen ? '0px' : '60vh')}; border-bottom: 1px solid #e0e0e0; position: relative; background: #f8f9fa; overflow: hidden; transition: height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);`;
const BottomSection = styled.div`flex: 1; overflow-y: auto; background: #fff; position: relative;`;


let id = 0;
const getId = () => `dnd_node_${id++}`;

const FlowEditor = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  
  const [activeInfo, setActiveInfo] = useState<{ nodeId: string; index: number } | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const nodeTypes = useMemo(() => ({ toolNode: ToolNode }), []);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);
  const onReconnect = useCallback((oldEdge: Edge, newConnection: Connection) => { setEdges((els) => reconnectEdge(oldEdge, newConnection, els)); }, []);
  const onReconnectEnd = useCallback((_: MouseEvent | TouchEvent, edge: Edge, type: string) => { if (type !== 'reconnect') { setEdges((eds) => eds.filter((e) => e.id !== edge.id)); } }, []);
  const onDragOver = useCallback((event: React.DragEvent) => { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/label');
      if (!type) return;
      const position = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });
      
      const newNode: Node = {
        id: getId(), type, position,
        data: { label, blocks: [{ id: Date.now().toString(), type: 'body', content: '' }] }, 
      };
      setNodes((nds) => nds.concat(newNode));
    }, [reactFlowInstance, setNodes]
  );

  const sortedNodes = useMemo(() => {
    if (nodes.length === 0) return [];
    const inDegree = new Map<string, number>();
    nodes.forEach(n => inDegree.set(n.id, 0));
    edges.forEach(e => { const current = inDegree.get(e.target) || 0; inDegree.set(e.target, current + 1); });
    const queue: { id: string; level: number }[] = [];
    const levels = new Map<string, number>();
    nodes.forEach(n => { if ((inDegree.get(n.id) || 0) === 0) { queue.push({ id: n.id, level: 1 }); levels.set(n.id, 1); } });
    const visited = new Set<string>();
    while (queue.length > 0) {
      const { id, level } = queue.shift()!;
      if (visited.has(id)) continue;
      visited.add(id);
      const currentNode = nodes.find(n => n.id === id);
      if (!currentNode) continue;
      const outgoers = getOutgoers(currentNode, nodes, edges);
      outgoers.forEach(target => {
        const currentLevel = levels.get(target.id) || 0;
        const nextLevel = Math.max(currentLevel, level + 1);
        levels.set(target.id, nextLevel);
        queue.push({ id: target.id, level: nextLevel });
      });
    }
    const nodesByLevel = new Map<number, Node[]>();
    nodes.forEach(node => {
      const level = levels.get(node.id) || 1; 
      const list = nodesByLevel.get(level) || [];
      list.push(node);
      nodesByLevel.set(level, list);
    });
    return nodes.map(node => {
      const level = levels.get(node.id) || 1;
      const group = nodesByLevel.get(level) || [];
      group.sort((a, b) => a.position.y - b.position.y);
      const indexInGroup = group.findIndex(n => n.id === node.id);
      const stepLabel = group.length > 1 ? `Step ${level}-${indexInGroup + 1}` : `Step ${level}`;
      return { ...node, data: { ...node.data, stepLabel } };
    }).sort((a, b) => {
      const levelA = levels.get(a.id) || 0;
      const levelB = levels.get(b.id) || 0;
      if (levelA !== levelB) return levelA - levelB;
      return a.position.y - b.position.y;
    });
  }, [nodes, edges]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
    setTimeout(() => {
      const targetElement = document.getElementById(`step-section-${node.id}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveInfo({ nodeId: node.id, index: 0 });
      }
    }, 100);
  }, []);

  const handleScrollTop = () => {
    const topElement = document.getElementById('editor-top');
    if (topElement) topElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const handleBlockChange = (nodeId: string, blockIndex: number, content: string) => {
    setNodes((nds) => nds.map((node) => {
      if (node.id !== nodeId) return node;
      const blocks = [...(node.data.blocks as BlockData[] || [])];
      if (blocks[blockIndex]) blocks[blockIndex] = { ...blocks[blockIndex], content };
      return { ...node, data: { ...node.data, blocks } };
    }));
  };

  const handleAddBlock = (nodeId: string, index: number, contentBefore: string, contentAfter: string) => {
    let newFocusIndex = index + 1;
    
    if (index === -1) {
      const targetNode = nodes.find(n => n.id === nodeId);
      const currentBlocks = (targetNode?.data.blocks as BlockData[]) || [];
      newFocusIndex = currentBlocks.length; 
    }

    setNodes((nds) => nds.map((node) => {
      if (node.id !== nodeId) return node;
      const blocks = [...(node.data.blocks as BlockData[] || [])];
      
      const newBlock: BlockData = { id: Date.now().toString(), type: 'body', content: contentAfter };
      
      const insertIndex = index === -1 ? blocks.length : index + 1;
      blocks.splice(insertIndex, 0, newBlock);
      
      return { ...node, data: { ...node.data, blocks } };
    }));
    
    setTimeout(() => setActiveInfo({ nodeId, index: newFocusIndex }), 10);
  };

  const handleRemoveBlock = (nodeId: string, index: number) => {
    setNodes((nds) => nds.map((node) => {
      if (node.id !== nodeId) return node;
      const blocks = [...(node.data.blocks as BlockData[] || [])];

      if (blocks.length <= 1) {
        blocks[0].content = '';
        return { ...node, data: { ...node.data, blocks } };
      }

      blocks.splice(index, 1);
      return { ...node, data: { ...node.data, blocks } };
    }));

    if (index > 0) {
      setTimeout(() => setActiveInfo({ nodeId, index: index - 1 }), 10);
    }
  };

  const handleToolbarAction = (action: string) => {
    if (!activeInfo) {
      alert('편집할 텍스트를 클릭한 뒤 툴바를 눌러주세요.');
      return;
    }
    const { nodeId, index } = activeInfo;
    
    setNodes((nds) => nds.map((node) => {
      if (node.id !== nodeId) return node;
      const blocks = [...(node.data.blocks as BlockData[])];
      const currentBlock = blocks[index];
      
      if (action === 'image') {
        const newImageBlock: BlockData = { id: Date.now().toString(), type: 'image', content: '' };
        blocks.splice(index + 1, 0, newImageBlock);
      } 
      else {
        blocks[index] = { ...currentBlock, type: action as BlockType };
      }
      return { ...node, data: { ...node.data, blocks } };
    }));
  };

  return (
    <PageContainer>
      <TopSection ref={reactFlowWrapper} isFullScreen={isFullScreen}>
        <SidebarTools />
        <div style={{ marginLeft: '260px', height: '100%' }}>
          <ReactFlow
            nodes={sortedNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onReconnect={onReconnect}
            onReconnectEnd={onReconnectEnd}
            reconnectRadius={20}
            connectionLineComponent={CustomConnectionLine}
            connectionLineStyle={{ stroke: '#222', strokeWidth: 2 }}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background gap={16} size={1} />
            <Controls />
          </ReactFlow>
        </div>
      </TopSection>

      <BottomSection>
        <FullScreenButton isFullScreen={isFullScreen} onClick={() => setIsFullScreen(!isFullScreen)} />
        <WritingSection 
          sortedNodes={sortedNodes}
          edges={edges}
          selectedNodeId={selectedNodeId}
          activeInfo={activeInfo}
          onFocusBlock={(nodeId, index) => setActiveInfo({ nodeId, index })}
          onChangeBlock={handleBlockChange}
          onAddBlock={handleAddBlock}
          onRemoveBlock={handleRemoveBlock}
        />
        <FloatingToolbar onAction={handleToolbarAction} />
        <ScrollTopButton onClick={handleScrollTop} />
      </BottomSection>
    </PageContainer>
  );
};

export default function WritePage() {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
}