import * as React from 'react';
import appHttpApi from '../../appHttpApi';
import {HttpApi} from '../../../shared/utils/HttpApi';
import {isMockMode} from '../../config/appConfig';
import DatabaseCapabilityApi from './DatabaseCapabilityApi';
import Capability from '../Capability';
import capabilitiesConfig from '../../config/capabilitiesConfig';


class HttpDatabaseCapabilityApi implements DatabaseCapabilityApi {
  private httpApi: HttpApi = appHttpApi;

  public fetchFruits(): Promise<string[]> {
    return this.httpApi.get('/fruits');
  }
}

class MockDatabaseCapabilityApi implements DatabaseCapabilityApi {
  public fetchFruits(): Promise<string[]> {
    return Promise.resolve(['apple', 'orange']);
  }
}

interface DatabaseCapabilityProps {
  databaseType: string;
}

interface DatabaseCapabilityState {
  fruits: string[];
}

export default class DatabaseCapability extends React.Component<DatabaseCapabilityProps, DatabaseCapabilityState> {

  private readonly databaseService = isMockMode ? new MockDatabaseCapabilityApi() : new HttpDatabaseCapabilityApi();

  constructor(props) {
    super(props);

    this.state = {
      fruits: [],
    }
  }

  public componentDidMount() {
    this.databaseService.fetchFruits().then(fruits => this.setState({fruits}));
  }


  public render() {
    return (
      <Capability module="database">
        <Capability.Title>{capabilitiesConfig.database.name}</Capability.Title>
        <Capability.Body>
          <ul>
            {this.state.fruits.map((fruit, i) => (<li key={i}>{fruit}</li>))}
          </ul>
        </Capability.Body>
      </Capability>
    );
  }
}