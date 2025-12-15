import ResourceManager from './ResourceManager';
import { getTools, addTool, deleteTool } from '../../../api/adminResource';
import type { Tool } from '../../../types/resource';
import ToolInput from '../../../components/admin/resource/ToolInput';

const AdminToolPage = () => {
    return (
        <ResourceManager<Tool, Omit<Tool, 'toolId'>>
            title="툴 관리"
            getFn={getTools}
            addFn={addTool}
            deleteFn={deleteTool}
            mapItem={(item) => ({ id: item.toolId, name: item.toolName })}
            renderInput={(onSubmit, isLoading) => (
                <ToolInput onSubmit={onSubmit} isLoading={isLoading} />
            )}
        />
    );
};

export default AdminToolPage;
