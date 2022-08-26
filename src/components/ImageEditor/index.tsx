import 'cropperjs/dist/cropper.css';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { grey } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import SvgRotateLeft from '@mui/icons-material/RotateLeft';
import SvgRotateRight from '@mui/icons-material/RotateRight';
import { SocialError } from 'core/domain/common/socialError';
import { IImageGalleryService } from 'core/services/imageGallery/IImageGalleryService';
import { SocialProviderTypes } from 'core/socialProviderTypes';
import { Map } from 'immutable';
import { FileResult } from 'models/files';
import React, { Component } from 'react';
import Cropper from 'react-cropper';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { provider } from 'socialEngine';
import config from 'config';
import * as globalActions from 'redux/actions/globalActions';
import * as imageGalleryActions from 'redux/actions/imageGalleryActions';
import { authorizeSelector } from 'redux/reducers/authorize/authorizeSelector';
import { v4 as uuid } from 'uuid';

import { useDispatch } from 'redux/store';
import { IImageEditorComponentState } from './IImageEditorComponentState';
import { IImageEditorComponentProps } from './IImageEditorComponentProps';

// - Material UI
// - Import app components

// - Import API
// - Import actions
const styles = () => ({
    dialogTitle: {
        display: 'flex',
    },
    titleText: {
        flex: 1,
    },
    loading: {
        position: 'absolute',
        top: '45%',
        left: '45%',
    },
    cropperImage: {
        width: '100%',
        height: '100%',
    },
});

/**
 * React component class
 */
export class ImageEditorComponent extends Component<
    IImageEditorComponentProps & WithTranslation,
    IImageEditorComponentState
> {
    /**
     * Fields
     */
    cropperRef: any;

    _imageGalleryService: IImageGalleryService;

    constructor(props: IImageEditorComponentProps & WithTranslation) {
        super(props);
        this._imageGalleryService = provider.get<IImageGalleryService>(SocialProviderTypes.ImageGalleryService);
        // Defaul state
        this.state = {
            disabledOk: true,
            loading: true,
        };

        // Binding functions to `this`
    }

    /**
     * Handle add link
     */
    handleCropDone = () => {
        const { onClose, progress, onSetUrl, showTopLoading, hideTopLoading, saveImage, showError, currentUser } =
            this.props;
        if (showTopLoading) {
            showTopLoading();
        }
        const fileName = `${uuid()}`;
        this.cropperRef
            .getCroppedCanvas({
                minWidth: 256,
                minHeight: 256,
                maxWidth: 4096,
                maxHeight: 4096,
                fillColor: '#fff',
                imageSmoothingEnabled: false,
                imageSmoothingQuality: 'high',
            })
            .toBlob((blob: any) => {
                const onSuccess = (fileResult: FileResult) => {
                    onSetUrl(fileResult.fileURL);
                    if (saveImage && hideTopLoading && progress) {
                        saveImage(fileResult.fileURL);
                        hideTopLoading();
                        progress(100, false);
                    }
                    onClose();
                };

                const onFailure = (error: SocialError) => {
                    if (hideTopLoading && showError) {
                        hideTopLoading();
                        showError(error.code);
                    }
                };
                if (currentUser && progress) {
                    this._imageGalleryService.uploadFile(
                        `${config.data.imageFolderPath}/${currentUser.userId}`,
                        blob,
                        fileName,
                        progress,
                        onSuccess,
                        onFailure,
                    );
                }
            });
    };

    /**
     * Rotate image
     */
    rotate = (degree: number) => {
        this.cropperRef.rotate(degree);
    };

    /**
     * On change image of image editor
     */
    handleCropImage = () => {};

    /**
     * Call when editor is ready
     */
    hadnleEditorReady = () => {
        this.setState({
            disabledOk: false,
            loading: false,
        });
    };

    setCropRef = (ref: any) => {
        this.cropperRef = ref;
    };

    /**
     * Reneder component DOM
     */
    render() {
        const CropperX: any = Cropper;
        const { classes, t, open, onClose, originalPhotoUrl, theme } = this.props;
        const { disabledOk, loading } = this.state;
        return (
            <Dialog open={open} onClose={onClose} maxWidth="sm">
                <DialogTitle className={classes.dialogTitle}>
                    <Typography variant="h6" className={classes.titleText}>
                        {t('post.imageEditorTitle')}
                    </Typography>
                    <IconButton onClick={() => this.rotate(-90)}>
                        <SvgRotateLeft />
                    </IconButton>
                    <IconButton onClick={() => this.rotate(90)}>
                        <SvgRotateRight />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <CropperX
                        ref={this.setCropRef}
                        src={originalPhotoUrl}
                        style={{ height: 400, width: '100%' }}
                        aspectRatio={16 / 9}
                        ready={this.hadnleEditorReady}
                        crossOrigin={'anonymous'}
                        crop={this.handleCropImage}
                    />
                    {loading ? (
                        <div className={classes.loading}>
                            {' '}
                            <CircularProgress
                                style={{ color: theme.palette.primary.light }}
                                size={30}
                                thickness={5}
                            />{' '}
                        </div>
                    ) : (
                        ''
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        disableFocusRipple
                        disableRipple
                        onClick={onClose}
                        style={{ color: grey[800] }}
                    >
                        {t('post.cancelButton')}
                    </Button>
                    <Button
                        color="primary"
                        disableFocusRipple
                        disableRipple
                        onClick={this.handleCropDone}
                        disabled={disabledOk}
                    >
                        {t('post.addVideoButton')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: Function) => {
    return {
        progress: (percentage: number, status: boolean) => dispatch(globalActions.progressChange(percentage, status)),
        showTopLoading: () => dispatch(globalActions.showTopLoading()),
        hideTopLoading: () => dispatch(globalActions.hideTopLoading()),
        saveImage: (fileUrl: string) => dispatch(imageGalleryActions.dbSaveImage(fileUrl)),
        showError: (error: string) => dispatch(globalActions.showMessage(error)),
    };
};

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>) => {
    const currentUser = authorizeSelector.getCurrentUser(state).toJS();
    return {
        currentUser,
    };
};

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(ImageEditorComponent);

export default connect<{}, {}, any, any>(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles as any, { withTheme: true })(translateWrapper as any) as any);
