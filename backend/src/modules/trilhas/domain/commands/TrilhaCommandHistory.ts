import { ICommand } from './ICommand';

export class TrilhaCommandHistory {
  private readonly history: ICommand[] = [];

  execute(cmd: ICommand): void {
    cmd.execute();
    this.history.push(cmd);
  }

  undoLast(): void {
    if (this.history.length === 0) {
      throw new Error('Histórico de comandos vazio');
    }
    const last = this.history.pop()!;
    last.undo();
  }

  canUndo(): boolean {
    return this.history.length > 0;
  }
}
