-- CreateTable
CREATE TABLE "badges" (
    "id" TEXT NOT NULL,
    "participanteId" TEXT NOT NULL,
    "trilhaId" TEXT NOT NULL,
    "conquistadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "badges_participanteId_trilhaId_key" ON "badges"("participanteId", "trilhaId");

-- AddForeignKey
ALTER TABLE "badges" ADD CONSTRAINT "badges_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "badges" ADD CONSTRAINT "badges_trilhaId_fkey" FOREIGN KEY ("trilhaId") REFERENCES "trilhas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
