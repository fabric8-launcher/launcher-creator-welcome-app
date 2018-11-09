import * as React from 'react';
import CloudDeployment from './components/clouddeployment/CloudDeploymentComponent';
import Codebase from './components/codebase/CodebaseComponent';
import HealthChecks from './components/healthcheck/HealthChecksComponent';
import HttpApiEndpoints from './components/httpapiendpoint/HttpApiEndpointsComponent';
import Messaging from './components/messaging/MessagingComponent';
import RelationalDatabase from './components/relationaldatabase/RelationalDatabasesComponent';
import APPLICATION_PROFILE from './data/ApplicationProfile';

type ApplicationProfile = Readonly<typeof APPLICATION_PROFILE>;

class LandingPage extends React.Component<object , ApplicationProfile> {

  private readonly applicationProfile: ApplicationProfile = APPLICATION_PROFILE;
  private readonly cloudDeployment = this.applicationProfile.capabilities.cloudDeployment;
  private readonly codebase = this.applicationProfile.capabilities.codebase;
  private readonly healthChecks = this.applicationProfile.capabilities.healthChecks;
  private readonly httpApiEndpoints = this.applicationProfile.capabilities.httpApiEndpoints;
  private readonly messagingBrokers = this.applicationProfile.capabilities.messagingBrokers;
  private readonly relationalDatabases = this.applicationProfile.capabilities.relationalDatabases;

  public render() {
    return (
    <React.Fragment>
      { this.cloudDeployment ? (
        <CloudDeployment 
          cloudDeployment={this.cloudDeployment}
          />
        ) : ( 
          <div className="text-danger">Cloud Deployment is a required capability.</div>
        )
      }
      
      { this.codebase ? ( 
        <Codebase 
          codebase={this.codebase}
          />
        ) : ( 
          <div className="text-danger">Codebase is a required capability.</div>
        )
      }

      { this.healthChecks ? ( 
        <HealthChecks 
          healthChecks={this.healthChecks}
          />
        ) : ( 
          <div className="text-danger">Health Checks is a required capability.</div>
        )
      }

      { this.httpApiEndpoints ? ( 
        <HttpApiEndpoints 
          endpoints={this.httpApiEndpoints}
          />
        ) : ( 
          <div className="text-danger">Health Checks is a required capability.</div>
        )
      }

      { this.relationalDatabases ? ( 
        <RelationalDatabase
          relationalDatabases={this.relationalDatabases}
          />
        ) : ( 
          <div className="text-danger">Relational Databases is a required capability.</div>
        )
      }

      { this.messagingBrokers ? ( 
        <Messaging
          messagingBrokers={this.messagingBrokers}
          />
        ) : ( 
          <div className="text-danger">Messaging is a required capability.</div>
        )
      }
    </React.Fragment>
    );
  }
}

export default LandingPage;
