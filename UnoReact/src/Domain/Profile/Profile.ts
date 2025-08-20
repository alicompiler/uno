import * as uuid from 'uuid';

export interface Profile {
    id: string;
    name: string;
}

const PROFILE_NAME_KEY = 'profile_name';
const PROFILE_ID_KEY = 'profile_id';

export const createOfflineProfile = (name: string = ''): Profile => {
    const id = uuid.v4();
    localStorage.setItem(PROFILE_ID_KEY, id);
    localStorage.setItem(PROFILE_NAME_KEY, name);
    return {
        id,
        name: name,
    };
};

export const changeProfileName = (name: string) => {
    localStorage.setItem(PROFILE_NAME_KEY, name);
};

export const getProfile = (): Profile | null => {
    const id = localStorage.getItem(PROFILE_ID_KEY);
    if (!id) {
        return null;
    }
    const name = localStorage.getItem(PROFILE_NAME_KEY);
    return {
        id,
        name: name ?? '',
    };
};

export const getProfileOrCreateIfNotExists = (): Profile => {
    const profile = getProfile();
    if (profile) {
        return profile;
    }
    return createOfflineProfile();
};
