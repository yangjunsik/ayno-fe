import React from 'react';
import styled from '@emotion/styled';
import { FaTrash } from 'react-icons/fa';

interface ResourceItem {
    id: number;
    name: string;
}

interface ResourceListProps {
    items: ResourceItem[];
    onDelete: (id: number) => Promise<void>;
    isLoading?: boolean;
}

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    overflow: hidden;
    background-color: #fff;
`;

const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    background-color: white;
    border-bottom: 1px solid #eaeaea;
    transition: background-color 0.2s;

    &:last-of-type {
        border-bottom: none;
    }

    &:hover {
        background-color: #fafafa;
    }
`;

const ItemName = styled.span`
    font-size: 16px;
    color: #111;
    font-weight: 500;
`;

const DeleteButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid #e0e0e0;
    background-color: white;
    color: #999;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #000;
        color: #fff;
        border-color: #000;
    }
`;

const EmptyState = styled.div`
    padding: 40px;
    text-align: center;
    color: #888;
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
`;

const ResourceList: React.FC<ResourceListProps> = ({ items, onDelete, isLoading }) => {
    if (items.length === 0) {
        return <EmptyState>등록된 항목이 없습니다.</EmptyState>;
    }

    return (
        <List style={{ opacity: isLoading ? 0.5 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}>
            {items.map((item) => (
                <ListItem key={item.id}>
                    <ItemName>{item.name}</ItemName>
                    <DeleteButton onClick={() => onDelete(item.id)} title="삭제" disabled={isLoading}>
                        <FaTrash size={14} />
                    </DeleteButton>
                </ListItem>
            ))}
        </List>
    );
};

export default ResourceList;
