module.exports = class Data1676111872428 {
    name = 'Data1676111872428'

    async up(db) {
        await db.query(`CREATE TABLE "transfer_event" ("id" character varying NOT NULL, "from" text NOT NULL, "to" text NOT NULL, "value" numeric NOT NULL, "block" numeric NOT NULL, "timestamp" numeric NOT NULL, "hash" text NOT NULL, CONSTRAINT "PK_2a4e1dce9f72514cd28f554ee2d" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_e3f2115e36145e7e44e40f3d6e" ON "transfer_event" ("from") `)
        await db.query(`CREATE INDEX "IDX_d89c05d6a45f28bb97b161b696" ON "transfer_event" ("to") `)
        await db.query(`CREATE INDEX "IDX_c85ad21c5f5b638321e24ee7fb" ON "transfer_event" ("block") `)
        await db.query(`CREATE INDEX "IDX_c4b5f19cb1e318c18409429c89" ON "transfer_event" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_f9270539e9dde4c3ab5f6e6e87" ON "transfer_event" ("hash") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "transfer_event"`)
        await db.query(`DROP INDEX "public"."IDX_e3f2115e36145e7e44e40f3d6e"`)
        await db.query(`DROP INDEX "public"."IDX_d89c05d6a45f28bb97b161b696"`)
        await db.query(`DROP INDEX "public"."IDX_c85ad21c5f5b638321e24ee7fb"`)
        await db.query(`DROP INDEX "public"."IDX_c4b5f19cb1e318c18409429c89"`)
        await db.query(`DROP INDEX "public"."IDX_f9270539e9dde4c3ab5f6e6e87"`)
    }
}
