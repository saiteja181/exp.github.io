import { GraphService } from './services/graphs/GraphService'
import { IGraphService } from './services/graphs/IGraphService'
import { VoteService } from './services/votes/VoteService'
import { PostService } from './services/posts/PostService'
import { StorageService } from './services/storage/StorageService'
import { CommonService } from './services/common/CommonService'
import { CommentService } from './services/comments/CommentService'
import { ICircleService } from 'core/services/circles/ICircleService'
import { Container } from 'inversify'
import { IUserService, IUserSettingService } from 'core/services/users'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { UserService } from './services/users/UserService'
import { IAuthorizeService } from 'core/services/authorize'
import { AuthorizeService } from './services/authorize/AuthorizeService'
import { CircleService } from './services/circles/CircleService'
import { ICommentService } from 'core/services/comments'
import { ICommonService } from 'core/services/common/ICommonService'
import { IImageGalleryService } from 'core/services/imageGallery'
import { INotificationService } from 'core/services/notifications'
import { IPostService } from 'core/services/posts'
import { IVoteService } from 'core/services/votes'
import { ImageGalleryService } from './services/imageGallery/ImageGalleryService'
import { NotificationService } from './services/notifications'
import { OpenFaaSClient } from './openFaaSClientTypes'
import { IUserTieService } from 'core/services/circles'
import { UserTieService } from './services/circles/UserTieService'
import { UserSettingService } from './services/users/UserSettingService'
import { IChatService } from 'core/services/chat'
import { ChatService } from './services/chat'
import { IPermissionService } from 'core/services/security/IPermissionService'
import { PermissionService } from './services/security/PermissionService'
import { IStorageService } from 'core/services/files/IStorageService';

/**
 * Register telar client dependecies
 */
export const useOpenFaaS = (container: Container) => {
  container.bind<IPermissionService>(SocialProviderTypes.PermissionService).to(PermissionService)
  container.bind<IAuthorizeService>(SocialProviderTypes.AuthorizeService).to(AuthorizeService)
  container.bind<ICircleService>(SocialProviderTypes.CircleService).to(CircleService)
  container.bind<ICommentService>(SocialProviderTypes.CommentService).to(CommentService)
  container.bind<ICommonService>(SocialProviderTypes.CommonService).to(CommonService).inSingletonScope()
  container.bind<IImageGalleryService>(SocialProviderTypes.ImageGalleryService).to(ImageGalleryService)
  container.bind<IStorageService>(SocialProviderTypes.StorageService).to(StorageService)
  container.bind<INotificationService>(SocialProviderTypes.NotificationService).to(NotificationService)
  container.bind<IPostService>(SocialProviderTypes.PostService).to(PostService)
  container.bind<IUserService>(SocialProviderTypes.UserService).to(UserService)
  container.bind<IVoteService>(SocialProviderTypes.VoteService).to(VoteService)
  container.bind<IGraphService>(OpenFaaSClient.GraphService).to(GraphService)
  container.bind<IUserTieService>(SocialProviderTypes.UserTieService).to(UserTieService)
  container.bind<IUserSettingService>(SocialProviderTypes.UserSettingService).to(UserSettingService)
  container.bind<IChatService>(SocialProviderTypes.ChatService).to(ChatService)

}
