import React, { useState } from 'react';
import styled from '@emotion/styled';

interface ResourceInputProps {
    onAdd: (name: string) => Promise<void>;
    placeholder?: string;
    isLoading?: boolean;
}

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    flex: 1;
    padding: 14px 20px;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
    font-size: 16px;
    transition: all 0.2s;
    background-color: #f9f9f9;

    &:focus {
        outline: none;
        border-color: #000;
        background-color: #fff;
    }

    &::placeholder {
        color: #aaa;
    }
`;

const Button = styled.button`
    padding: 0 32px;
    background-color: #000;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.5px;

    &:hover {
        background-color: #333;
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
    }
`;

const ResourceInput: React.FC<ResourceInputProps> = ({ onAdd, placeholder, isLoading }) => {
    const [value, setValue] = useState('');

    const handleSubmit = async () => {
        if (!value.trim()) return;
        await onAdd(value);
        setValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <Container>
            <Input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder || '이름을 입력하세요'}
                disabled={isLoading}
            />
            <Button onClick={handleSubmit} disabled={isLoading || !value.trim()}>
                {isLoading ? '등록 중...' : '등록'}
            </Button>
        </Container>
    );
};

export default ResourceInput;
