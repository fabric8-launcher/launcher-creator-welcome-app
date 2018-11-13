export default interface DatabaseCapabilityApi {
  fetchFruits(): Promise<string[]>;
}