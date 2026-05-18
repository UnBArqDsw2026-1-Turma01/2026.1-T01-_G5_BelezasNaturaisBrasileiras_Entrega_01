export class Badge {
  constructor(
    public readonly id: string,
    public readonly participanteId: string,
    public readonly trilhaId: string,
    public readonly conquistadoEm: Date,
  ) {}
}
