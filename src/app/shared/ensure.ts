export class Ensure {

  /**
   * Throws an exception if argument evaluates to false
   */
  public static isTrue(argument, text): void {
    if (argument === false) {
      throw new Error(text);
    }
  }

  /**
   * Throws an exception if index is outside given array
   */
  public static inBounds(index, arr, text): void {
    if (index < 0 || index >= arr.length) {
      throw new Error(text);
    }
  }

  /**
   * Throws an exception if argument is null
   */
  public static notNull(argument, text): void {

    if (argument == null) {
      throw new Error(text);
    }

  }

  /**
   * Throws an exception if argument is an empty string or null
   */
  public static notNullEmpty(argument, text): void {

    if (argument == null || argument.length === 0) {
      throw new Error(text);
    }

  }

}
