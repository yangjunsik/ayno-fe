import { useState, useEffect, useCallback } from 'react';
import type { User } from '../types/user';
import { getMyProfile } from '../api/user';

// Global state to share between components
let globalUser: User | null = null;
const listeners = new Set<(user: User | null) => void>();

const notifyListeners = () => {
    listeners.forEach((listener) => listener(globalUser));
};

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(globalUser);
    const [isLoading, setIsLoading] = useState(!globalUser); // Initial load state

    useEffect(() => {
        const listener = (newUser: User | null) => {
            setUser(newUser);
            setIsLoading(false);
        };
        listeners.add(listener);

        // Initial check if not already loaded
        if (!globalUser) {
            checkAuth();
        } else {
            setIsLoading(false);
        }

        return () => {
            listeners.delete(listener);
        };
    }, []);

    const checkAuth = async () => {
        try {
            const response = await getMyProfile();
            if (response.data) {
                globalUser = response.data;
                notifyListeners();
            } else {
                globalUser = null;
                notifyListeners();
            }
        } catch (error) {
            globalUser = null;
            notifyListeners();
        } finally {
            setIsLoading(false);
        }
    };

    const login = useCallback((userData: User) => {
        globalUser = userData;
        notifyListeners();
    }, []);

    const logout = useCallback(() => {
        globalUser = null;
        notifyListeners();
        // TODO: Call logout API to clear cookies if needed
    }, []);

    return { user, isLoggedIn: !!user, login, logout, isLoading };
};

