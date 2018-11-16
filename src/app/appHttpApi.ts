import appConfig from './config/appConfig';
import {AxiosHttpApi} from '../shared/utils/HttpApi';


const appHttpApi = new AxiosHttpApi({ serviceUrl: appConfig.applicationUrl });

export default appHttpApi;