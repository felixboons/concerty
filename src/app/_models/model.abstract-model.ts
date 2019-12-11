export abstract class Model {
  private readonly version: number;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  protected constructor(version: number, createdAt: Date, updatedAt: Date) {
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getVersion(): number {
    return this.version;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
