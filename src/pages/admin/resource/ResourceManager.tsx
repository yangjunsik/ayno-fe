import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useResource } from '../../../hooks/useResource';
import ResourceInput from '../../../components/admin/resource/ResourceInput';
import ResourceList from '../../../components/admin/resource/ResourceList';
import type { ApiResponse } from '../../../types/common/response';

interface ResourceItem {
    id: number;
    name: string;
}

interface ResourceManagerProps<T, I = string> {
    title: string;
    placeholder?: string;
    getFn: () => Promise<T[]>;
    addFn: (item: I) => Promise<T | ApiResponse<T>>;
    deleteFn: (id: number) => Promise<void | ApiResponse<void>>;
    mapItem: (item: T) => ResourceItem;
    renderInput?: (onSubmit: (item: I) => Promise<void>, isLoading: boolean) => React.ReactNode;
}

const Container = styled.div`
    padding: 24px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 24px;
    color: #333;
`;

const ErrorMessage = styled.div`
    color: #ff4d4f;
    margin-bottom: 16px;
    padding: 8px 12px;
    background-color: #fff1f0;
    border: 1px solid #ffccc7;
    border-radius: 4px;
`;

const ResourceManager = <T, I = string>({ title, placeholder, getFn, addFn, deleteFn, mapItem, renderInput }: ResourceManagerProps<T, I>) => {
    const { items, isLoading, error, fetchItems, addItem, deleteItem } = useResource<T, I>(getFn, addFn, deleteFn);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return (
        <Container>
            <Title>{title}</Title>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {renderInput ? (
                renderInput(addItem, isLoading)
            ) : (
                <ResourceInput
                    onAdd={addItem as unknown as (name: string) => Promise<void>}
                    placeholder={placeholder}
                    isLoading={isLoading}
                />
            )}

            <ResourceList
                items={items.map(mapItem)}
                onDelete={deleteItem}
                isLoading={isLoading}
            />
        </Container>
    );
};

export default ResourceManager;
