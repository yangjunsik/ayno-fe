
import styled from '@emotion/styled';
import { useResource } from '../../../hooks/useResource';
import ResourceInput from '../../../components/admin/resource/ResourceInput';
import ResourceList from '../../../components/admin/resource/ResourceList';
import type { ApiResponse } from '../../../types/common/response';

interface ResourceItem {
    id: number;
    name: string;
}

interface ResourceManagerProps<T> {
    title: string;
    placeholder?: string;
    getFn: () => Promise<T[] | ApiResponse<T[]>>;
    addFn: (name: string) => Promise<T | ApiResponse<T>>;
    deleteFn: (id: number) => Promise<void | ApiResponse<void>>;
    mapItem: (item: T) => ResourceItem;
}

const Container = styled.div`
    padding: 20px;
    max-width: 800px;
`;

const Title = styled.h2`
    margin-bottom: 24px;
    font-size: 24px;
    color: #333;
`;

const ErrorMessage = styled.div`
    padding: 12px;
    margin-bottom: 20px;
    background-color: #fff2f0;
    border: 1px solid #ffccc7;
    border-radius: 8px;
    color: #ff4d4f;
`;

const ResourceManager = <T extends { [key: string]: any }>({
    title,
    placeholder,
    getFn,
    addFn,
    deleteFn,
    mapItem
}: ResourceManagerProps<T>) => {
    const { items, isLoading, error, addItem, deleteItem } = useResource(
        getFn,
        addFn,
        deleteFn,
        mapItem
    );

    return (
        <Container>
            <Title>{title}</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ResourceInput
                onAdd={addItem}
                placeholder={placeholder}
                isLoading={isLoading}
            />
            <ResourceList
                items={items}
                onDelete={deleteItem}
            />
        </Container>
    );
};

export default ResourceManager;
