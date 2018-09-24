import { HealthCheckType } from '../components/healthcheck/IHealthCheck';
import { HttpMethodType } from '../components/shared/Utilities';

/**
 * User properties that customizes the application
 * 
 * This file is to be written by the Application Creator; 
 * this example serves as mock data for development and testing.
 */
const APPLICATION_PROFILE = {
  capabilities: {
    cloudDeployment: {
      applicationURL: "http://frontend.my-openshift-cluster.com/",
      consoleURL: "http://my-openshift-cluster.com/console"
    },
    codebase: {
      baseImage: "rht/java-s2i",
      repoGitURL: "git://someone@github.com/whatever/somewhere",
      repoHttpURL: "https://github.com/redhat-developer/something",
      runtime: "Eclipse Vert.x - Java",
      runtimeDescription: "Eclipse Vert.x is a tool-kit for building reactive applications on the JVM.",
      runtimeImage: "/img/vertx.jpg",
      version: "Vert.x RHOAR 1.0.0",
      webhooksURL: "https://github.com/redhat-developer/somerepo/settings/hooks"
    },
    healthChecks: {
      liveness: {
        healthcheck: {
          fileName: "LivenessEndpoint.java",
          fileURL: "http://github.com/user/repo/src/whatever/LivenessEndpoint.java",
          path: "/api/hc/liveness",
          type: HealthCheckType.LIVENESS as HealthCheckType,
          url: "http://runtimeapp.my-openshift-cluster.com/api/hc/liveness",
        }
      },
      readiness: {
        healthcheck: {
          fileName: "ReadinessEndpoint.java",
          fileURL: "http://github.com/user/repo/src/whatever/ReadinessEndpoint.java",
          path: "/api/hc/readiness",
          type: HealthCheckType.READINESS as HealthCheckType,
          url: "http://runtimeapp.my-openshift-cluster.com/api/hc/readiness"
        }
      }
    },
    httpApiEndpoints:
    {
      baseUrl: 'http://runtimeapp.my-openshift-cluster.com/api',
      endpoints: [
        {
          methods: [
            HttpMethodType.GET
          ],
          name: "GreetingService",
          path: "/greeting",
          sourceCodeUrl: "https://github.com/user/repo/src/whatever/File.java",
          url: "http://runtimeapp.my-openshift-cluster.com/api/greeting",
        }
      ],
      jsonSpecUrl: "http://somedomain.com/api-docs",
      swaggerUrl: "http://somedomain.com/swagger-ui.html"
    },
    messagingBrokers : [{
      messagingBroker: 
      {
        consoleUrl: "http://messagingBroker1.my-openshift-cluster.com/console",
        description: "AMQ provides fast, lightweight, and secure messaging for Internet-scale applications.",
        image: "amq-broker-7-tech-preview/amq-broker-71-openshift",
        imageUrl: "https://access.redhat.com/containers/?tab=overview#/registry.access.redhat.com/amq-broker-7-tech-preview/amq-broker-71-openshift",
        name: "Red Hat AMQ Broker 7.1",
        password: "password",
        queues: [{
          queue : {
            consumerSourceFileName: "WorkOrderConsumer.java",
            consumerSourceUrl: "http://github.com/user/repo/src/main/WorkOrderConsumer.java",
            path: "/workOrders",
            producerSourceFileName: "WorkOrderProducer.java",
            producerSourceUrl: "http://github.com/user/repo/src/main/WorkOrderProducer.java",
          }
        }],
        topics: [{
          topic : {
            path: "/newsAlerts",
            publisherSourceFileName: "NewsAlertPublisher.java",
            publisherSourceUrl: "http://github.com/user/repo/src/main/NewsAlertPublisher.java",
            subscriberSourceFileName: "NewsAlertSubscriber.java",
            subscriberSourceUrl: "http://github.com/user/repo/src/main/NewsAlertSubscriber.java"
          }
        }],
        username: "username",
      }
    }],
    relationalDatabases: [{
      relationalDatabase:
      {
        baseUrl: 'http://runtimeapp.my-openshift-cluster.com/db/api',
        deploymentUrl: "http://databaseapp1.my-openshift-cluster.com/console",
        description: "PostgreSQL, often simply Postgres, is an object-relational database management system with an emphasis on extensibility and standards compliance.",
        endpoints: [
          {
            endpoint: {
              methods: [
                HttpMethodType.GET,
                HttpMethodType.POST
              ],
              name: "FruitController",
              path: "/fruits",
              sourceUrl: "https://github.com/user/repo/src/SomeFile.java"
            }
          },
          {
            endpoint: {
              methods: [
                HttpMethodType.PUT,
                HttpMethodType.DELETE
              ],
              name: "FruitController",
              path: "/fruits/{id}",
              sourceUrl: "https://github.com/user/repo/src/SomeFile.java"
            }
          }
        ],
        image: "rhscl/postgresql-10-rhel7",
        imageUrl: "https://access.redhat.com/containers/?tab=overview#/registry.access.redhat.com/rhscl/postgresql-10-rhel7",
        jsonSpecUrl: "http://somedomain.com/api-docs",
        name: "PostgreSQL",
        password: "password",
        routeUrl: "http://databaseapp1.my-openshift-cluster.com/console/something/routes",
        swaggerUrl: "http://somedomain.com/swagger-ui.html",
        username: "admin",
      }
    }]
  }
}

export default APPLICATION_PROFILE;