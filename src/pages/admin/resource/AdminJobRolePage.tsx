import ResourceManager from './ResourceManager';
import { getJobRoles, addJobRole, deleteJobRole } from '../../../api/adminResource';
import type { JobRole } from '../../../types/resource';

const AdminJobRolePage = () => {
    return (
        <ResourceManager<JobRole>
            title="직무 관리"
            placeholder="새 직무 이름 (예: 프론트엔드 개발자)"
            getFn={getJobRoles}
            addFn={addJobRole}
            deleteFn={deleteJobRole}
            mapItem={(item) => ({ id: item.jobRoleId, name: item.jobRoleLabel })}
        />
    );
};

export default AdminJobRolePage;
