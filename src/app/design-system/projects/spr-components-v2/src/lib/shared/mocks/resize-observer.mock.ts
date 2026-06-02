export class MockResizeObserver {
  private observedTarget?: Element;
  static instances: MockResizeObserver[] = [];

  constructor(private readonly callback: ResizeObserverCallback) {
    MockResizeObserver.instances.push(this);
  }

  observe(target: Element, options?: ResizeObserverOptions): void {
    this.observedTarget = target;
  }

  unobserve(target: Element): void {}

  disconnect(): void {}

  trigger(entries: ResizeObserverEntry[]): void {
    this.callback(entries, this);
  }

  static findByTarget(target: Element): MockResizeObserver | undefined {
    return this.instances.find((i) => i.observedTarget === target);
  }
}
