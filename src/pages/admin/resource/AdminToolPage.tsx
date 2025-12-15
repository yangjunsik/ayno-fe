import ResourceManager from './ResourceManager';
import { getTools, addTool, deleteTool } from '../../../api/adminResource';
import type { Tool } from '../../../types/resource';

const AdminToolPage = () => {
    return (
        <ResourceManager<Tool>
            title="툴(Tool) 관리"
            placeholder="새 툴 이름 (예: Figma, React)"
            getFn={getTools}
            addFn={addTool}
            deleteFn={deleteTool}
            mapItem={(item) => ({ id: item.toolId, name: item.toolName })}
        />
    );
};

export default AdminToolPage;
