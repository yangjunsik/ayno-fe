import React, { useState } from 'react';
import styled from '@emotion/styled';

interface ToolInputData {
    toolName: string;
    toolSiteUrl: string;
    toolType: string;
    toolIconUrl: string;
}

interface ToolInputProps {
    onSubmit: (data: ToolInputData) => Promise<void>;
    isLoading: boolean;
}

const Form = styled.form`
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    align-items: center;
    background-color: #f9f9f9;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #eaeaea;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
`;

const Label = styled.label`
    font-size: 12px;
    font-weight: 600;
    color: #666;
`;

const Input = styled.input`
    padding: 10px 14px;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
    font-size: 14px;
    transition: all 0.2s;
    background-color: #fff;

    &:focus {
        outline: none;
        border-color: #000;
    }
`;

const Button = styled.button`
    padding: 0 24px;
    height: 40px;
    background-color: #000;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    align-self: flex-end;

    &:hover {
        background-color: #333;
        transform: translateY(-1px);
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
    }
`;

const ToolInput = ({ onSubmit, isLoading }: ToolInputProps) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !url.trim()) return;

        await onSubmit({
            toolName: name,
            toolSiteUrl: url,
            toolType: 'AI', // Default for now
            toolIconUrl: 'https://via.placeholder.com/64', // Default placeholder
        });

        setName('');
        setUrl('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup>
                <Label>툴 이름</Label>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. ChatGPT"
                    disabled={isLoading}
                />
            </InputGroup>
            <InputGroup>
                <Label>툴 URL</Label>
                <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://..."
                    disabled={isLoading}
                />
            </InputGroup>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Tool'}
            </Button>
        </Form>
    );
};

export default ToolInput;
