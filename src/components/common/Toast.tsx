import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useToast } from '../../contexts/ToastContext';
import type { ToastType } from '../../types/ui';
import { FiCheck, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  pointer-events: none; /* Allow clicking through container */
`;

const ToastItem = styled.div<{ type: ToastType }>`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: 12px;
  min-width: 320px;
  max-width: 90vw;
  animation: ${slideIn} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  background-color: #fff;
  border: 1px solid #E5E7EB;
`;

const IconWrapper = styled.div<{ type: ToastType }>`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: ${({ type }) =>
        type === 'success' ? '#10B981' :
            type === 'error' ? '#EF4444' : '#6B7280'};
`;

const Message = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
  flex: 1;
  line-height: 1.4;
`;

const CloseButton = styled.button<{ toastType: ToastType }>`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  font-size: 16px;
  opacity: 0.4;
  transition: opacity 0.2s;
  color: #9CA3AF;
  
  &:hover {
    opacity: 1;
    color: #4B5563;
  }
`;

const Toast = () => {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <ToastContainer>
            {toasts.map((toast) => (
                <ToastItem key={toast.id} type={toast.type}>
                    <IconWrapper type={toast.type}>
                        {toast.type === 'success' && <FiCheck />}
                        {toast.type === 'error' && <FiAlertCircle />}
                        {toast.type === 'info' && <FiInfo />}
                    </IconWrapper>
                    <Message>{toast.message}</Message>
                    <CloseButton toastType={toast.type} onClick={() => removeToast(toast.id)}>
                        <FiX />
                    </CloseButton>
                </ToastItem>
            ))}
        </ToastContainer>
    );
};

export default Toast;
