import { combineReducers } from 'redux-immutable';

// - Import reducers
import { authorizeReducer } from './authorize/authorizeReducer';
import { circleReducer } from './circles/circleReducer';
import { commentReducer } from './comments/commentReducer';
import { globalReducer } from './global/globalReducer';
import { imageGalleryReducer } from './imageGallery/imageGalleryReducer';
import { notificationReducer } from './notifications/notificationReducer';
import { postReducer } from './posts/postReducer';
import { userReducer } from './users/userReducer';
import { voteReducer } from './votes/voteReducer';
import { serverReducer } from './server/serverReducer';
import { userSettingReducer } from './userSetting/userSettingReducer';
import { vangReducer } from './vang/vangReducer';
// - Reducers
export const rootReducer = () =>
    combineReducers({
        imageGallery: imageGalleryReducer,
        post: postReducer,
        circle: circleReducer,
        comment: commentReducer,
        vote: voteReducer,
        server: serverReducer,
        authorize: authorizeReducer,
        user: userReducer,
        notify: notificationReducer,
        global: globalReducer,
        userSetting: userSettingReducer,
        vang: vangReducer,
    } as any);
