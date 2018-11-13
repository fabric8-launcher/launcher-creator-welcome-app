import appConfig from './config/appConfig';
import {checkNotNull} from '../shared/utils/Preconditions';
import { AxiosHttpApi } from '../shared/utils/HttpApi';


const appHttpApi = new AxiosHttpApi({ serviceUrl: checkNotNull(appConfig.definition, 'appConfig.definition').applicationUrl });

export default appHttpApi;