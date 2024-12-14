-- CreateTable
CREATE TABLE "Characters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "health" INTEGER NOT NULL,
    "magic" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,
    "side_name" TEXT NOT NULL,
    "from" TEXT NOT NULL,

    CONSTRAINT "Characters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Characters_id_key" ON "Characters"("id");
