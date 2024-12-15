export class FileUpdate {
  constructor(
    public readonly fileName: string,
    public readonly newContent: string
  ) {}
}
