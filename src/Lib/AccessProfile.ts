type Privacy = Record<string, number>;
type Flags = Record<string, number>;

export abstract class AccessProfile<F extends Flags, P extends Privacy> {
  public readonly flags: F;
  public readonly privacy: P;

  constructor(flags: F, privacy: P) {
    this.flags = flags;
    this.privacy = privacy;
  }

  /**
   * Check if given flag has been set under the residing privacy key.
   *
   * @example
   *
   * ```
   * profile.has("friends", ["email"]); // check if friends can see email
   * ```
   *
   */
  public has(privacy: keyof P, flag: keyof F) {
    return (this.privacy[privacy] & this.flags[flag]) === this.flags[flag];
  }

  /**
   * Add list of flags to the list under the residing privacy key.
   *
   * @example
   *
   * ```
   * profile.add("friends", ["name"]); // friends can now see name
   * ```
   *
   */
  public add(privacy: keyof P, flags: (keyof F)[]) {
    for (const flag of flags) {
      (this.privacy as any)[privacy] |= this.flags[flag];
    }
    return this;
  }

  /**
   * Remove list of flags from the list under the residing privacy key.
   *
   * @example
   *
   * ```
   * profile.del("friends"; ["email"]); // friends can no longer see email
   * ````
   *
   */
  public del(privacy: keyof P, flags: (keyof F)[]) {
    for (const flag of flags) {
      (this.privacy as any)[privacy] &= ~this.flags[flag];
    }
    return this;
  }

  /**
   * Filter provided document against the rules of residing privacy key.
   */
  public filter<D extends Record<keyof F, unknown>>(privacy: keyof P, document: D) {
    const data: Partial<D> = { ...document };
    for (const key in this.flags) {
      if (this.has(privacy, key) === false) {
        delete data[key];
      }
    }
    return data;
  }
}
