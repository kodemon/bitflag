import { FLAGS } from "../Constants/Flags";
import { AccessLevel, AccessRules } from "../Types/AccessProfile";

export abstract class AccessProfile<Schema extends Record<string, unknown>, Rules extends AccessRules<Schema> = AccessRules<Schema>> {
  public readonly access: Rules;

  constructor(access: Rules) {
    this.access = access;
  }

  /**
   * Set access level for the given field.
   */
  public set(field: keyof Rules, level: AccessLevel) {
    (this.access as any)[field] = this.getLevel(level);
    return this;
  }

  /**
   * Filter document fields based on the provided relationship level.
   */
  public filter(document: Schema, level: AccessLevel) {
    const data: any = {};
    for (const key in document) {
      if (document[key] !== undefined && this.access[key] !== undefined && this.check(this.access[key], level)) {
        data[key] = document[key];
      }
    }
    return data;
  }

  /**
   * Check if the field is accessible by the given relationship level.
   */
  public check(field: number, level: AccessLevel) {
    return (field & FLAGS[level]) === FLAGS[level];
  }

  /**
   * Convert the profile to serialized JSON object.
   */
  public toJSON() {
    const obj: any = {};
    for (const key in this.access) {
      obj[key] = this.access[key].toString(2).padStart(8, "0");
    }
    return obj as Record<keyof Rules, string>;
  }

  /**
   * Get flag combination for the given access level.
   */
  protected abstract getLevel(level: AccessLevel): number;
}
