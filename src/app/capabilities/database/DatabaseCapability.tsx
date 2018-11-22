import * as React from 'react';
import CapabilityCard from '../../components/CapabilityCard';
import capabilitiesConfig from '../../config/capabilitiesConfig';
import {DatabaseCapabilityApi} from './DatabaseCapabilityApi';


interface DatabaseCapabilityProps {
  databaseType: string;
  apiService: DatabaseCapabilityApi;
}

interface DatabaseCapabilityState {
  fruits: string[];
}

export default class DatabaseCapability extends React.Component<DatabaseCapabilityProps, DatabaseCapabilityState> {

  constructor(props) {
    super(props);

    this.state = {
      fruits: [],
    }
  }

  public componentDidMount() {
    this.props.apiService.fetchFruits().then(fruits => this.setState({fruits}));
  }


  public render() {
    return (
      <CapabilityCard module="database">
        <CapabilityCard.Title>{capabilitiesConfig.database.name}</CapabilityCard.Title>
        <CapabilityCard.Body>
          <ul>
            {this.state.fruits.map((fruit, i) => (<li key={i}>{fruit}</li>))}
          </ul>
        </CapabilityCard.Body>
      </CapabilityCard>
    );
  }
}