export class MockMutationObserver {
  private observedTarget?: Node;
  static instances: MockMutationObserver[] = [];

  constructor(private readonly callback: MutationCallback) {
    MockMutationObserver.instances.push(this);
  }

  observe(target: Node, options?: MutationObserverInit): void {
    this.observedTarget = target;
  }

  disconnect(): void {}

  takeRecords(): MutationRecord[] {
    return [];
  }

  trigger(records: MutationRecord[]): void {
    this.callback(records, this);
  }

  static findByTarget(target: Node): MockMutationObserver | undefined {
    return this.instances.find((i) => i.observedTarget === target);
  }
}
