/**
 * Represents a capability like "Health Checks" or "HTTP API Endpoints"
 */
interface ICapability {
  capability: ICapabilityProperties
}

/**
 * All properties of a capability composed into one view
 */
interface ICapabilityProperties extends 
  ICapabilityPanelProperties, 
  ICapabilityHeaderProperties {

}

/**
 * Properties to be surfaced on the panel of the UI for that capability
 */
export interface ICapabilityPanelProperties {
  iconClasses?: string,
  id: string,
  name: string,
}

/**
 * Properties to be surfaced in the header of the capability section
 */
export interface ICapabilityHeaderProperties {
  imageURL?: string,
  imageAlt?: string
}

/**
 * CapabilityElement is an entry that describes part of the
 * capability's configuration.  For instance, when talking about the
 * Cloud Deployment, "Application URL" is a CapabilityElement
 */
export interface ICapabilityElement {

  // Optional CSS classes to apply to the name of the capability element
  classes?: string;

  // Optional CSS classes to apply to an icon alongside the name
  iconClasses?: string;

  // Size of the first column (1-12 in Bootstrap grid)
  firstColSize? : number;

  // Name of the element 
  name: string;

  // Tooltip to show if URL is specified; optional
  tooltip?: string;

  // URL to which we should link this element; optional
  url?: string;
}

export default ICapability;