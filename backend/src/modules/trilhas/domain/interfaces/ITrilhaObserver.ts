export interface ITrilhaObserver {
  onTrilhaFinalizada(trilhaId: string, participanteIds: string[]): Promise<void>;
}
