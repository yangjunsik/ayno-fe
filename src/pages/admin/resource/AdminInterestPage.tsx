import ResourceManager from './ResourceManager';
import { getInterests, addInterest, deleteInterest } from '../../../api/adminResource';
import type { Interest } from '../../../types/resource';

const AdminInterestPage = () => {
    return (
        <ResourceManager<Interest>
            title="관심요소 관리"
            placeholder="새 관심요소 이름 (예: AI, 디자인)"
            getFn={getInterests}
            addFn={addInterest}
            deleteFn={deleteInterest}
            mapItem={(item) => ({ id: item.interestId, name: item.interestLabel })}
        />
    );
};

export default AdminInterestPage;
