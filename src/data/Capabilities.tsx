/**
 * Internal configuration for the capability sections
 */
const CAPABILITIES = {
  cloudDeployment : {
    iconClasses: "fa fa-cloud",
    id: "cloudDeployment",
    imageAlt: "OpenShift Logo",
    imageURL: "img/openshift.png",
    name: "Cloud Deployment"
  },
  codebase : {
    iconClasses: "fa fa-code",
    id: "codebase",
    imageAlt: "Vert.x Logo",
    imageURL: "img/vertx.jpg",
    name: "Eclipse Vert.x Java Codebase"
  },
  healthChecks : {
    iconClasses: "fa fa-medkit",
    id: "healthChecks",
    name: "Health Checks"
  }, 
  httpApiEndpoints : {
    iconClasses: "fa fa-plug",
    id: "httpApiEndpoints",
    name: "HTTP API Endpoints"
  },
  messaging : {
    iconClasses: "fa fa-envelope-open",
    id: "messaging",
    imageAlt: "Red Hat AMQ Logo",
    imageURL: "img/amq.png",
    name: "Messaging"
  },
  relationalDatabases : {
    iconClasses: "fa fa-database",
    id: "relationalDatabases",
    imageAlt: "PostgreSQL Logo",
    imageURL: "img/postgresql.png",
    name: "Relational Databases"
  }
}

export default CAPABILITIES;