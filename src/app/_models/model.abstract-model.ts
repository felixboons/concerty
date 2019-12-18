export abstract class Model {
  private readonly id: number;
  private readonly version: number;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  protected constructor(id: number, version: number, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): number {
    return this.id;
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
