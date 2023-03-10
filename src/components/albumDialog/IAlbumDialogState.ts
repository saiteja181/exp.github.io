import { UserPermissionType } from 'core/domain/common/userPermissionType';

export interface IAlbumDialogState {
    [key: string]: any;
    activeStep: number;
    nextDisabled: boolean;
    saveDisabled: boolean;
    description: string;
    albumName: string;
    selectedPhotos: { src: string; file: any; fileName: string }[];
    accessUserList: Array<string>;
    permission: UserPermissionType;
    permissionOpen: boolean;
    descriptionError: string;
    albumNameError: string;
}
