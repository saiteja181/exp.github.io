import { Feed } from 'core/domain/common/feed';
import { User } from 'core/domain/users/user';
import { ServerRequestStatusType } from 'redux/actions/serverRequestStatusType';

export interface ISendFeedbackComponentProps {
    /**
     * Whether send feedback is diplayed
     */
    sendFeedbackStatus?: boolean;

    /**
     * Send feedback
     */
    sendFeed?: (feed: Feed) => any;

    /**
     * Hide feedback form
     */
    hideFeedback?: () => any;

    /**
     * The server request of send feedback
     */
    sendFeedbackRequestType?: ServerRequestStatusType;

    /**
     * Current user profile
     */
    currentUser?: User;

    /**
     * Design theme
     */
    theme?: any;

    /**
     * Styles
     */
    classes?: any;

    /**
     * Translate to locale string
     */
    t?: (state: any, param?: {}) => any;
}
